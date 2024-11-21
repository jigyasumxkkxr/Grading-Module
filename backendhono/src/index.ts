import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { WebSocket } from 'ws'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'

// Types
type Role = 'STUDENT' | 'TEACHER' | 'ADMIN'

interface User {
  id: number
  name: string
  email: string
  password: string
  role: Role
}

interface Course {
  id: number
  title: string
  description: string
  teacherId: number
}

interface Grade {
  id: number
  marks: number
  courseId: number
  studentId: number
}

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

neonConfig.webSocketConstructor = WebSocket


// Middleware setup
app.use('/*', cors())

// Custom middleware for role-based authentication
async function authenticateRole(roles: Role[], c: any) {
  const connectionString = c.env.DATABASE_URL
  const pool = new Pool({connectionString})
  const adapter = new PrismaNeon(pool)
  const prisma = new PrismaClient({adapter})
  const jwt = c.req.header('Authorization')
  if (!jwt) {
    return c.json({ message: 'Unauthorized: Missing token' }, 401);
  }
  const token = jwt.split(' ')[1]
  try {
  const payload = await verify(token, 'my_top_secret');
  console.log(payload)
  const user = await prisma.user.findUnique({
    //@ts-ignore
    where: { id: payload.id }
  })

  if (!user || !roles.includes(user.role as Role)) {
    return c.json({ message: 'Forbidden' }, 403)
  }
  c.set('user', user)
  return null
  }catch (error) {
  return c.json({ message: 'Unauthorized: Invalid token' }, 401);
}
}

// Routes
app.get('/', (c) => c.text('Hello, Hono!'));
app.post('/register', async (c) => {
  const { name, email, password, role } = await c.req.json()
  
  if (!name || !email || !password || !role) {
    return c.json({ error: 'All fields are required' }, 400)
  }

  const validRoles: Role[] = ['STUDENT', 'TEACHER', 'ADMIN']
  if (!validRoles.includes(role as Role)) {
    return c.json({ error: 'Invalid role' }, 400)
  }

  try {
    const connectionString = c.env.DATABASE_URL;
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    if (existingUser) {
      return c.json({ error: 'User already exists' }, 400)
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as Role
      }
    })
    const jwt = await sign({id : user.id},"my_top_secret")
    return c.json({ message: 'User registered successfully',jwt, user }, 201)
  } catch (error) {
    console.error('Error in /register:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/login', async (c) => {
  const { email, password } = await c.req.json()

  try {
    const connectionString = c.env.DATABASE_URL;
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return c.json({ message: 'Invalid credentials' }, 401)
    }
    const jwt = await sign({id : user.id},"my_top_secret")
    return c.json({ jwt, user })
  } catch (error) {
    return c.json({ error: 'Something went wrong' }, 500)
  }
})

app.get('/teachers', async (c) => {
  try {
    const connectionString = c.env.DATABASE_URL;
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    const teachers = await prisma.user.findMany({
      where: { role: 'TEACHER' },
      select: { id: true, name: true, email: true }
    })
    return c.json(teachers)
  } catch (error) {
    console.error("Error fetching teachers:", error)
    return c.json({ error: "Failed to fetch teachers" }, 500)
  }
})

// Admin routes
app.post('/api/admin/course', async (c) => {
  const auth = await authenticateRole(['ADMIN'], c)
  if (auth) return auth

  const { title, description, teacherId } = await c.req.json()
  const teacherIdParsed = parseInt(String(teacherId), 10)

  if (isNaN(teacherIdParsed)) {
    return c.json({ error: 'Invalid teacherId' }, 400)
  }

  try {
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    const course = await prisma.course.create({
      data: { title, description, teacherId: teacherIdParsed }
    })
    return c.json({ message: 'Course created', course }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Error creating course' }, 400)
  }
})

app.get('/api/admin/courses', async (c) => {
  const auth = await authenticateRole(['ADMIN'], c)
  if (auth) return auth

  try {
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    const courses = await prisma.course.findMany({
      include: {
        teacher: true,
        students: true
      }
    })
    return c.json(courses)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Error fetching courses' }, 400)
  }
})

app.put('/api/admin/course/:id', async (c) => {
  const auth = await authenticateRole(['ADMIN'], c)
  if (auth) return auth

  const { title, description, teacherId } = await c.req.json()
  const courseId = parseInt(c.req.param('id'), 10)

  if (isNaN(courseId)) {
    return c.json({ error: 'Invalid course ID' }, 400)
  }

  try {
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: { 
        title, 
        description, 
        teacherId: parseInt(String(teacherId), 10) 
      }
    })
    return c.json({ message: 'Course updated successfully', updatedCourse })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Error updating course' }, 400)
  }
})

app.delete('/api/admin/course/:id', async (c) => {
  const auth = await authenticateRole(['ADMIN'], c)
  if (auth) return auth

  const courseId = parseInt(c.req.param('id'), 10)

  if (isNaN(courseId)) {
    return c.json({ error: 'Invalid course ID' }, 400)
  }

  try {
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    await prisma.course.delete({
      where: { id: courseId }
    })
    return c.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Error deleting course' }, 400)
  }
})

// Student routes
app.post('/api/student/course', async (c) => {
  const auth = await authenticateRole(['STUDENT'], c)
  if (auth) return auth

  const { courseId } = await c.req.json()
  //@ts-ignore
  const studentId = c.get('user').id

  try {
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    await prisma.course.update({
      where: { id: courseId },
      data: { students: { connect: { id: studentId } } }
    })
    return c.json({ message: 'Enrolled in course' })
  } catch (error) {
    return c.json({ error: 'Error enrolling in course' }, 400)
  }
})

app.delete('/api/student/course/:courseId', async (c) => {
  const auth = await authenticateRole(['STUDENT'], c)
  if (auth) return auth

  const courseId = parseInt(c.req.param('courseId'), 10)
  //@ts-ignore
  const studentId = c.get('user').id

  try {
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    await prisma.course.update({
      where: { id: courseId },
      data: { students: { disconnect: { id: studentId } } }
    })
    return c.json({ message: 'Successfully de-enrolled from course' })
  } catch (error) {
    return c.json({ error: 'Error de-enrolling from course' }, 400)
  }
})

app.get('/api/student/courses', async (c) => {
  const auth = await authenticateRole(['STUDENT'], c)
  if (auth) return auth
  //@ts-ignore
  const studentId = c.get('user').id

  try {
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    const courses = await prisma.course.findMany({
      where: {
        students: {
          some: { id: studentId },
        },
      },
      include: {
        grades: true,
        teacher: {
          select: {
            name: true, // Include only teacher's name
          },
        },
      },
    })

    const enrolledCourses = courses.map((course) => {
      const grade = course.grades.find(
        (grade) => grade.studentId === studentId // Find grade specific to this student
      )
      return {
        id: course.id,
        title: course.title,
        description: course.description,
        teacher: course.teacher,
        grade: grade ? grade.marks : null, // Include grade or null if not found
      }
    })

    return c.json(enrolledCourses)
  } catch (error) {
    return c.json({ error: 'Error fetching enrolled courses' }, 400)
  }
})

// Common routes
app.get('/api/courses', async (c) => {
  const auth = await authenticateRole(['STUDENT', 'ADMIN', 'TEACHER'], c)
  if (auth) return auth

  try {
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    const courses = await prisma.course.findMany({
      include: {
        teacher: true
      }
    })
    return c.json(courses)
  } catch (error) {
    return c.json({ error: 'Error fetching available courses' }, 400)
  }
})

// Teacher routes
app.get('/api/teacher/courses', async (c) => {
  const auth = await authenticateRole(['TEACHER'], c)
  if (auth) return auth
  //@ts-ignore
  const teacherId = c.get('user').id
  
  try {
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    const courses = await prisma.course.findMany({
      where: { teacherId },
      include: {
        teacher: true,
        students: true
      }
    })
    return c.json(courses)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Error fetching courses' }, 400)
  }
})

app.get('/api/teacher/course/:courseId/students', async (c) => {
  const auth = await authenticateRole(['TEACHER'], c)
  if (auth) return auth

  const courseId = parseInt(c.req.param('courseId'), 10)
  
  try {
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        students: true
      }
    })

    if (!course) {
      return c.json({ error: 'Course not found' }, 404)
    }

    return c.json(course.students)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Error fetching students for the course' }, 400)
  }
})

app.post('/api/teacher/course/:courseId/student/:studentId/grade', async (c) => {
  const auth = await authenticateRole(['TEACHER'], c)
  if (auth) return auth

  const courseId = parseInt(c.req.param('courseId'), 10)
  const studentId = parseInt(c.req.param('studentId'), 10)
  const { grade } = await c.req.json()

  try {
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { students: true }
    })

    if (!course) {
      return c.json({ error: 'Course not found' }, 404)
    }

    const studentExists = course.students.some(student => student.id === studentId)
    if (!studentExists) {
      return c.json({ error: 'Student not enrolled in this course' }, 404)
    }

    const existingGrade = await prisma.grade.findFirst({
      where: {
        studentId,
        courseId
      }
    })

    if (existingGrade) {
      await prisma.grade.update({
        where: { id: existingGrade.id },
        data: { marks: grade }
      })
    } else {
      await prisma.grade.create({
        data: {
          marks: grade,
          courseId,
          studentId
        }
      })
    }

    return c.json({ message: 'Grade assigned successfully' })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Error assigning grade' }, 400)
  }
})

app.get('/api/student/course/:courseId/grade', async (c) => {
  const auth = await authenticateRole(['STUDENT'], c)
  if (auth) return auth

  const courseId = parseInt(c.req.param('courseId'), 10)
  //@ts-ignore
  const studentId = c.get('user').id

  try {
    const connectionString = c.env.DATABASE_URL
    const pool = new Pool({connectionString})
    const adapter = new PrismaNeon(pool)
    const prisma = new PrismaClient({adapter})
    const grade = await prisma.grade.findFirst({
      where: {
        studentId,
        courseId
      }
    })

    if (!grade) {
      return c.json({ error: 'Grade not found for this student in the course' }, 404)
    }

    const letterGrade = convertMarksToGrade(grade.marks)
    return c.json({ marks: grade.marks, grade: letterGrade })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Error fetching grade' }, 400)
  }
})

// Helper function
function convertMarksToGrade(marks: number): string {
  if (marks >= 90) return 'A'
  if (marks >= 80) return 'B'
  if (marks >= 70) return 'C'
  if (marks >= 60) return 'D'
  return 'F'
}


export default app