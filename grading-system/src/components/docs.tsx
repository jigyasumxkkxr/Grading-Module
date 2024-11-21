import { Link } from "react-router-dom"
import docs from "../assets/image 1031.svg"
import intro from "../assets/image 1461.svg"
import tick from "../assets/image 632.svg"
import feature from "../assets/image 930.svg"
import technology from "../assets/image 644.svg"
import endpoint from "../assets/image 994.svg"
import call from "../assets/image 1194.svg"

export const Docs = () => {
    return(
        <div className="py-4 max-w-screen h-fit"> 
         <div className="fixed top-0 -z-10 h-full w-full bg-white">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(187,222,251,0.5)]  blur-[70px]"></div>
        </div>
        <div className="flex justify-between items-center border-b border-black pb-4 px-4">
                <div className="flex justify-center items-center gap-2">
                    <img src={docs} alt="" className="h-8" />
                    <h1 className="text-2xl font-bold">
                        Docs for Grading System Module Documentation
                    </h1>
                </div>
                <Link className="hover:underline cursor-pointer" to="/">Home</Link>
            </div> 
            <div className="flex flex-col px-8 gap-2 py-10">
                <div className="flex justify-start items-center gap-2">
                    <img src={intro} alt="" className="h-8"/>
                    <h1 className="text-4xl font-extrabold">Introduction : </h1>
                </div>
                <div>
                <p className="pl-10">This project is a module for a Grading System, designed to streamline the process of course management and grade assignment. It provides three roles: Admin, Teacher, and Student, each with distinct responsibilities:</p>
                <div className="pt-3 flex flex-col">
                <div className="flex items-center pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                <p className="text-lg font-semibold ">Admin:</p>
                </div>  
                    <p className="text-md pl-12">Design new courses.</p>
                    <p className="text-md pl-12">Assign courses to teachers.</p>
                    <div className="flex items-center pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                <p className="text-lg font-semibold ">Teacher:</p>
                </div>

                    <p className="text-md pl-12">Register in the system.</p>
                    <p className="text-md pl-12">Assign grades to students for the courses they teach.</p>
                    <div className="flex items-center pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                <p className="text-lg font-semibold ">Student:</p>
                </div>

                    <p className="text-md pl-12">Enroll in courses.</p>
                    <p className="text-md pl-12">View assigned grades for enrolled courses.</p>
                </div>
                <div className="pt-3 pl-10">
                The primary purpose of the system is to simplify the grading process, making it efficient for students to access their grades and for teachers and admins to manage their responsibilities.
                </div>
                </div>
                <div className="mt-5">
                    <div className="flex justify-start items-center gap-2">
                        <img src={feature} alt="" className="h-8"/>
                        <h1 className="text-4xl font-extrabold">Features : </h1>
                    </div>
                    <div>
                    <div className="flex items-center pt-3 pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                        <p className="text-lg font-semibold ">User Roles:</p>
                        </div>

                    <p className="text-md pl-12">Three distinct roles: Admin, Teacher, and Student.</p>
                    </div>
                    <div>
                    <div className="flex items-center pt-3 pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                        <p className="text-lg font-semibold ">Admin Functionalities:</p>
                        </div>

                    <p className="text-md pl-12">Add new courses to the system.</p>
                    <p className="text-md pl-12">Assign teachers and students to courses.</p>
                    <p className="text-md pl-12">Access the admin dashboard.</p>
                    <div className="flex items-center pt-3 pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                        <p className="text-lg font-semibold ">Teacher Functionalities:</p>
                        </div>

                    <p className="text-md pl-12">Register and log in.</p>
                    <p className="text-md pl-12">View assigned courses.</p>
                    <p className="text-md pl-12">Assign grades to students for each course.</p>
                    <p className="text-md pl-12">Access the teacher dashboard.</p>
                    <div className="flex items-center pt-3 pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                        <p className="text-lg font-semibold ">Student Functionalities:</p>
                        </div>

                    <p className="text-md pl-12">Register and log in.</p>
                    <p className="text-md pl-12">Enroll in courses.</p>
                    <p className="text-md pl-12">View enrolled courses and assigned grades.</p>
                    <p className="text-md pl-12">Access the student dashboard.</p>
                    <div className="flex items-center pt-3 pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                        <p className="text-lg font-semibold ">Course Management:</p>
                        </div>

                    <p className="text-md pl-12">Admin manages the creation and assignment of courses.</p>
                    <p className="text-md pl-12">Teachers and students interact with assigned courses.</p>
                    <div className="flex items-center pt-3 pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                        <p className="text-lg font-semibold ">Grade Assignment:</p>
                        </div>

                    <p className="text-md pl-12">Teachers assign grades to students for specific courses.</p>
                    <p className="text-md pl-12">Students view their grades in real time.</p>
                    <div className="flex items-center pt-3 pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                        <p className="text-lg font-semibold ">Authentication and Security:</p>
                        </div>

                    <p className="text-md pl-12">Role-based access control with secure login endpoints.</p>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="flex justify-start items-center gap-2">
                        <img src={technology} alt="" className="h-8"/>
                        <h1 className="text-4xl font-extrabold">Technologies Used : </h1>
                    </div>
                    <div>
                    <div className="flex items-center pt-3 pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                        <p className="text-lg font-semibold ">Frontend</p>
                        </div>

                    <p className="text-md pl-12">React: For building an interactive and dynamic user interface.</p>
                    <p className="text-md pl-12">Tailwind CSS: For styling the application with utility-first CSS.</p>
                    <div className="flex items-center pt-3 pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                        <p className="text-lg font-semibold ">Backend</p>
                        </div>

                    <p className="text-md pl-12">Cloudflare Workers: For handling serverless functions.</p>
                    <p className="text-md pl-12">Hono: A lightweight web framework for managing API routes and logic.</p>
                    <p className="text-md pl-12">Prisma: ORM for interacting with the database.</p>
                    <div className="flex items-center pt-3 pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                        <p className="text-lg font-semibold ">Database</p>
                        </div>

                    <p className="text-md pl-12">Neon PostgreSQL: A cloud-based, high-performance PostgreSQL database.</p>
                    <div className="flex items-center pt-3 pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                        <p className="text-lg font-semibold ">Hosting</p>
                        </div>

                    <p className="text-md pl-12">Vercel: For hosting the frontend.</p>
                    <p className="text-md pl-12">Cloudflare Workers: For hosting the backend.</p>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="flex justify-start items-center gap-2">
                        <img src={endpoint} alt="" className="h-8"/>
                        <h1 className="text-4xl font-extrabold">API Endpoints : </h1>
                    </div>
                    <div className="flex items-center pt-3 pl-5 gap-1">
                    <img src={tick} alt="" className="h-4" />
                        <p className="text-lg font-semibold ">Public Endpoints :</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-sm ml-12 bg-yellow-200 text-yellow-700 px-2 py-1 rounded-md cursor-none hover:bg-yellow-600 hover:text-white">POST /register :</p>
                            <p className="text-md">Allows users to register by providing their name, email, password, and role.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-sm ml-12 bg-yellow-200 text-yellow-700 px-2 py-1 rounded-md cursor-none hover:bg-yellow-600 hover:text-white">POST /login :</p>
                            <p className="text-md">Authenticates a user using email and password.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-sm ml-12 bg-green-200 text-green-700 px-2 py-1 rounded-md cursor-none hover:bg-green-600 hover:text-white">GET /teachers :</p>
                            <p className="text-md">Fetches a list of all teachers.</p>
                        </div>
                        <div className="flex items-center pt-3 pl-5 gap-1">
                            <img src={tick} alt="" className="h-4" />
                            <p className="text-lg font-semibold ">Admin-Specific Endpoints :</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-sm ml-12 bg-yellow-200 text-yellow-700 px-2 py-1 rounded-md cursor-none hover:bg-yellow-600 hover:text-white">POST /api/admin/course :</p>
                            <p className="text-md">Allows an admin to create a new course by providing a title, description, and teacher ID.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-sm ml-12 bg-green-200 text-green-700 px-2 py-1 rounded-md cursor-none hover:bg-green-600 hover:text-white">GET /api/admin/courses :</p>
                            <p className="text-md">Dashboard for teachers to view courses and assign grades.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-sm ml-12 bg-blue-200 text-blue-700 px-2 py-1 rounded-md cursor-none hover:bg-blue-600 hover:text-white">PUT /api/admin/course/:id :</p>
                            <p className="text-md">Retrieves a list of all courses, including teacher and enrolled students' information.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-sm ml-12 bg-red-200 text-red-700 px-2 py-1 rounded-md cursor-none hover:bg-red-600 hover:text-white">DELETE /api/admin/course/:id :</p>
                            <p className="text-md">Deletes a course by its ID.</p>
                        </div>
                        <div className="flex items-center pt-3 pl-5 gap-1">
                            <img src={tick} alt="" className="h-4" />
                            <p className="text-lg font-semibold ">Student-Specific Endpoints :</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-sm ml-12 bg-yellow-200 text-yellow-700 px-2 py-1 rounded-md cursor-none hover:bg-yellow-600 hover:text-white">POST /api/student/course :</p>
                            <p className="text-md">Enrolls the logged-in student in a course by providing the course ID.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-sm ml-12 bg-red-200 text-red-700 px-2 py-1 rounded-md cursor-none hover:bg-red-600 hover:text-white">DELETE /api/student/course/:courseId :</p>
                            <p className="text-md">De-enrolls the logged-in student from a course by providing the course ID.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-sm ml-12 bg-green-200 text-green-700 px-2 py-1 rounded-md cursor-none hover:bg-green-600 hover:text-white">GET /api/student/courses :</p>
                            <p className="text-md">Fetches all courses in which the logged-in student is enrolled, including their grades and teacher information.</p>
                        </div>
                        <div className="flex items-center pt-3 pl-5 gap-1">
                            <img src={tick} alt="" className="h-4" />
                            <p className="text-lg font-semibold ">Teacher-Specific Endpoints :</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-sm ml-12 bg-green-200 text-green-700 px-2 py-1 rounded-md cursor-none hover:bg-green-600 hover:text-white">GET /api/teacher/courses :</p>
                            <p className="text-md">Fetches all courses taught by the logged-in teacher.</p>
                        </div>
                        <div className="flex items-center pt-3 pl-5 gap-1">
                            <img src={tick} alt="" className="h-4" />
                            <p className="text-lg font-semibold ">Common Endpoints (Accessible by Multiple Roles) :</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-sm ml-12 bg-green-200 text-green-700 px-2 py-1 rounded-md cursor-none hover:bg-green-600 hover:text-white">GET /api/courses :</p>
                            <p className="text-md">Retrieves a list of all courses, including teacher details.</p>
                        </div>
                </div>
                <div className="mt-5">
                <div className="flex justify-start items-center gap-2">
                        <img src={call} alt="" className="h-8"/>
                        <h1 className="text-4xl font-extrabold">Contact Information : </h1>
                    </div>
                    <div className="flex items-center pt-3 pl-5 gap-1">
                            <img src={tick} alt="" className="h-4" />
                            <p className="text-lg font-semibold ">Jigyasu :</p>
                            <p>2022ume0209@gmail.com</p>
                        </div>
                        <div className="flex items-center pt-3 pl-5 gap-1">
                            <img src={tick} alt="" className="h-4" />
                            <p className="text-lg font-semibold ">Kashish :</p>
                            <p>2022umt0171@gmail.com</p>
                        </div>
                        <div className="flex items-center pt-3 pl-5 gap-1">
                            <img src={tick} alt="" className="h-4" />
                            <p className="text-lg font-semibold ">Mohit Pooniya :</p>
                            <p>2022umt0173@gmail.com</p>
                        </div>
                        <div className="flex items-center pt-3 pl-5 gap-1">
                            <img src={tick} alt="" className="h-4" />
                            <p className="text-lg font-semibold ">Sutar Pranav Prakash :</p>
                            <p>2022umt0186@gmail.com</p>
                        </div>
                        <div className="flex items-center pt-3 pl-5 gap-1">
                            <img src={tick} alt="" className="h-4" />
                            <p className="text-lg font-semibold ">Shubham Mandal :</p>
                            <p>2022umt0183@gmail.com</p>
                        </div>
                </div>
            </div>
        </div>
    )
}