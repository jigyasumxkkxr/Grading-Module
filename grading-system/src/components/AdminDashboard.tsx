import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import admin from "../assets/image 641.svg"

interface Teacher {
  id: number;
  name: string;
  email: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  teacherId: number;
  teacher: Teacher;
}
const refresh = () => {
  window.location.reload();
}

const AdminDashboard = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    teacherId: "",
  });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (role == "STUDENT") {
      navigate("/student-dashboard"); // Redirect to home page or login page if not admin
    }
    else if( role == "TEACHER"){
      navigate("/teacher-dashboard")
    } else {
      const fetchTeachers = async () => {
        try {
          const response = await axios.get("https://backendhono.medium-jigyasu.workers.dev/teachers", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setTeachers(response.data);
        } catch (error) {
          console.error("Failed to fetch teachers:", error);
        }
      };

      const fetchCourses = async () => {
        try {
          const response = await axios.get("https://backendhono.medium-jigyasu.workers.dev/api/admin/courses", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setCourses(response.data);
        } catch (error) {
          console.error("Failed to fetch courses:", error);
        }
      };

      fetchTeachers();
      fetchCourses();
      Promise.all([fetchTeachers(), fetchCourses()])
        .finally(() => setLoading(false));
    }
  }, [role, navigate]);

  // Handle form submission for course creation or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourse) {
      // Update existing course
      try {
        await axios.put(
          `https://backendhono.medium-jigyasu.workers.dev/api/admin/course/${selectedCourse.id}`,
          form,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        alert("Course updated successfully");
        setForm({ title: "", description: "", teacherId: "" });
        setSelectedCourse(null); // Reset selected course
        // Re-fetch courses after update
        const updatedCourses = await axios.get("https://backendhono.medium-jigyasu.workers.dev/api/admin/courses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCourses(updatedCourses.data);
      } catch (error) {
        console.error("Error updating course:", error);
        alert("Failed to update course");
      }
    } else {
      // Create new course
      try {
        await axios.post(
          "https://backendhono.medium-jigyasu.workers.dev/api/admin/course",
          form,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        alert("Course created successfully");
        setForm({ title: "", description: "", teacherId: "" });
        // Re-fetch courses after creation
        const updatedCourses = await axios.get("https://backendhono.medium-jigyasu.workers.dev/api/admin/courses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCourses(updatedCourses.data);
      } catch (error) {
        console.error("Error creating course:", error);
        alert("Failed to create course");
      }
    }
  };

  // Handle course selection for editing
  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setForm({
      title: course.title,
      description: course.description,
      teacherId: String(course.teacherId),
    });
  };

  // Handle course delete
  const handleCourseDelete = async (courseId: number) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`https://backendhono.medium-jigyasu.workers.dev/api/admin/course/${courseId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Course deleted successfully");
        // Re-fetch courses after deletion
        const updatedCourses = await axios.get("https://backendhono.medium-jigyasu.workers.dev/api/admin/courses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCourses(updatedCourses.data);
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete course");
      }
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
      <div className="flex justify-between items-center border-b border-black pb-4 px-4">
        <div className="flex items-center gap-2">
          <img src={admin} alt="" className="h-10" />
          <h2 className="text-2xl font-semibold hover:cursor-pointer" onClick={refresh}>Admin Panel</h2>
        </div>
        <p onClick={logout} className="cursor-pointer hover:underline">Logout</p>
      </div>

      {/* Form for creating or editing a course */}
      <div className="flex flex-col gap-4 px-4">
        <h3 className="text-lg pt-8">{selectedCourse ? "Edit Course" : "Create a New Course"}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-8">
          <input
            type="text"
            placeholder="Course Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <select
            value={form.teacherId}
            onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
            className="p-2 border rounded w-1/3"
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name} ({teacher.email})
              </option>
            ))}
          </select>
          </div>
          <textarea
            placeholder="Course Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <button type="submit" className="bg-fuchsia-200 text-fuchsia-600 hover:text-white hover:bg-fuchsia-600 px-4 py-2 rounded">
            {selectedCourse ? "Update Course" : "Create Course"}
          </button>
        </form>
      </div>

      {/* Displaying existing courses */}
      <div className="mt-8 px-4">
        <h3 className="text-xl mb-4">Existing Courses</h3>
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <ul>
            {courses.map((course) => (
              <li key={course.id} className="flex justify-between items-center mb-4 bg-white py-4 shadow-md px-4 shadow-fuchsia-200 rounded">
                <span>{course.title} - {course.teacher.name}</span>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleCourseSelect(course)}
                    className="text-blue-500 bg-blue-200 px-3 py-1 rounded hover:bg-blue-600 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleCourseDelete(course.id)}
                    className="text-red-500 bg-red-200 px-3 py-1 rounded hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
