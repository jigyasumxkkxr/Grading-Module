import React, { useState, useEffect } from "react";
import axios from "axios";

interface Teacher {
  id: number;
  name: string;
}

interface Grade {
    id: number;
    marks: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  teacherId: number;
  teacher: Teacher; // Define the 'teacher' object correctly with a 'name' field
  enrolled: boolean; // Whether the student is enrolled in the course
  grades: Grade[]; // Grade for the enrolled course
}

const StudentDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch all courses
        const response = await axios.get("https://dbms-backend-2.onrender.com/courses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCourses(response.data);

        // Fetch enrolled courses with grades
        const enrolledResponse = await axios.get("https://dbms-backend-2.onrender.com/student/courses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEnrolledCourses(enrolledResponse.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const enrollInCourse = async (courseId: number) => {
    try {
      const response = await axios.post(
        "https://dbms-backend-2.onrender.com/student/course",
        { courseId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      alert(response.data.message);

      // Update the enrolled courses list
      const enrolledCourse = courses.find((course) => course.id === courseId);
      if (enrolledCourse) {
        setEnrolledCourses((prevCourses) => [
          ...prevCourses,
          { ...enrolledCourse, enrolled: true, grades: [] }, // Ensure grades is an empty array
        ]);
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Failed to enroll in course");
    }
  };

  const deEnrollFromCourse = async (courseId: number) => {
    try {
      const response = await axios.delete(
        `https://dbms-backend-2.onrender.com/student/course/${courseId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      alert(response.data.message);

      // Remove course from enrolled courses
      setEnrolledCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
    } catch (error) {
      console.error("Error de-enrolling from course:", error);
      alert("Failed to de-enroll from course");
    }
  };

  const convertMarksToGrade = (marks: number): string => {
    if (marks >= 90) return "A";
    if (marks >= 80) return "B";
    if (marks >= 70) return "C";
    if (marks >= 60) return "D";
    if (marks >= 50) return "E";
    return "F"; // F for marks below 50
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Student Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Available Courses Section */}
        <div className="space-y-4">
          <h3 className="text-lg mb-4">Available Courses</h3>
          {courses.map((course) => {
            const enrolled = enrolledCourses.some(
              (enrolledCourse) => enrolledCourse.id === course.id
            );
            return (
              <div key={course.id} className="border p-4 rounded shadow-md space-y-2">
                <h4 className="text-lg font-semibold">{course.title}</h4>
                <p>{course.description}</p>
                <p>Teacher: {course.teacher ? course.teacher.name : "No assigned Teacher"}</p>
                {!enrolled ? (
                  <button
                    onClick={() => enrollInCourse(course.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Enroll
                  </button>
                ) : (
                  <p className="text-sm text-gray-600">You are enrolled in this course</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Enrolled Courses Section */}
        <div className="space-y-4">
          <h3 className="text-lg mb-4">Enrolled Courses</h3>
          {enrolledCourses.map((course) => (
            <div key={course.id} className="border p-4 rounded shadow-md space-y-2">
              <h4 className="text-lg font-semibold">{course.title}</h4>
              <p>{course.description}</p>
              <p>Teacher: {course.teacher ? course.teacher.name : "No assigned Teacher"}</p>
              <p className="text-sm text-gray-600">
                Your Grade:{" "}
                {course?.grades?.[0]?.marks
                  ? convertMarksToGrade(course.grades[0].marks)
                  : "Pending"}
              </p>
              <button
                onClick={() => deEnrollFromCourse(course.id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                De-enroll
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
