import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import student from "../assets/image 2304.svg";

interface Teacher {
  id: number;
  name: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  teacherId: number;
  teacher: Teacher;
  enrolled: boolean;
  grade: number;
}

const refresh = () => {
  window.location.reload();
};

const StudentDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingEnroll, setLoadingEnroll] = useState<number | null>(null);
  const [loadingDeEnroll, setLoadingDeEnroll] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch all available courses
        const response = await axios.get(
          "https://backendhono.medium-jigyasu.workers.dev/api/courses",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourses(response.data);

        // Fetch currently enrolled courses with grades
        const enrolledResponse = await axios.get(
          "https://backendhono.medium-jigyasu.workers.dev/api/student/courses",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEnrolledCourses(enrolledResponse.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const enrollInCourse = async (courseId: number) => {
    setLoadingEnroll(courseId);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://backendhono.medium-jigyasu.workers.dev/api/student/course",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);

      // Fetch updated enrolled courses after enrollment
      const enrolledResponse = await axios.get(
        "https://backendhono.medium-jigyasu.workers.dev/api/student/courses",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrolledCourses(enrolledResponse.data);

    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Failed to enroll in course");
    } finally {
      setLoadingEnroll(null);
    }
  };
  

  const deEnrollFromCourse = async (courseId: number) => {
    setLoadingDeEnroll(courseId);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `https://backendhono.medium-jigyasu.workers.dev/api/student/course/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);

      // Fetch updated enrolled courses after de-enrollment
      const enrolledResponse = await axios.get(
        "https://backendhono.medium-jigyasu.workers.dev/api/student/courses",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrolledCourses(enrolledResponse.data);

    } catch (error) {
      console.error("Error de-enrolling from course:", error);
      alert("Failed to de-enroll from course");
    } finally {
      setLoadingDeEnroll(null);
    }
  };

  const convertMarksToGrade = (marks: number): string => {
    if (marks >= 90) return "A";
    if (marks >= 80) return "B";
    if (marks >= 70) return "C";
    if (marks >= 60) return "D";
    if (marks >= 50) return "E";
    return "F";
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="flex justify-between items-center border-b px-4 border-black pb-4">
        <div className="flex items-center gap-2">
          <img src={student} alt="Student" className="h-8" />
          <h2 className="text-2xl font-semibold cursor-pointer" onClick={refresh}>
            Student Dashboard
          </h2>
        </div>
        <p onClick={logout} className="cursor-pointer hover:underline">
          Logout
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 px-4 mt-4">
        <div className="space-y-4">
          <h3 className="text-lg mb-4 text-center">Available Courses</h3>
          {courses.map((course) => {
            const enrolled = enrolledCourses.some(
              (enrolledCourse) => enrolledCourse.id === course.id
            );
            return (
              <div key={course.id} className="p-4 rounded shadow-md bg-white space-y-2">
                <h4 className="text-lg font-semibold">{course.title}</h4>
                <p>{course.description}</p>
                <p>Teacher: {course.teacher?.name || "No assigned Teacher"}</p>
                {!enrolled ? (
                  <button
                    onClick={() => enrollInCourse(course.id)}
                    className={`text-blue-500 bg-blue-200 hover:text-white hover:bg-blue-600 px-3 py-1 rounded mt-2 ${
                      loadingEnroll === course.id ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={loadingEnroll === course.id}
                  >
                    {loadingEnroll === course.id ? "Enrolling..." : "Enroll"}
                  </button>
                ) : (
                  <p className="text-sm text-gray-600">You are enrolled in this course</p>
                )}

              </div>
            );
          })}
        </div>
        <div className="space-y-4">
          <h3 className="text-lg mb-4 text-center">Enrolled Courses</h3>
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <div key={course.id} className="border p-4 rounded shadow-md bg-white space-y-2">
                <h4 className="text-lg font-semibold">{course.title}</h4>
                <p>{course.description}</p>
                <p>Teacher: {course.teacher?.name || "No assigned Teacher"}</p>
                <p className="text-sm text-gray-600">
                  Your Grade: {course.grade ? convertMarksToGrade(course.grade) : "Pending"}
                </p>
                <button
                  onClick={() => deEnrollFromCourse(course.id)}
                  className={`text-red-500 bg-red-200 px-3 py-1 rounded mt-2 ${
                    course.grade !== null ? "cursor-not-allowed opacity-50" : "hover:bg-red-600 hover:text-white"
                  } ${loadingDeEnroll === course.id ? "cursor-not-allowed opacity-50" : ""}`}
                  disabled={course.grade !== null || loadingDeEnroll === course.id}
                >
                  {loadingDeEnroll === course.id 
                    ? "De-enrolling..." 
                    : course.grade !== null 
                    ? "De-enroll Disabled (Grades Assigned)" 
                    : "De-enroll"
                  }
                </button>

              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No enrolled courses.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
