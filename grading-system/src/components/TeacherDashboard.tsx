import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import teacher from "../assets/image 2314.svg"

interface Student {
  id: number;
  name: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  students: Student[];
  teacher: {
    id: number;
    name: string;
  };
}

const TeacherDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [grade, setGrade] = useState<string>(""); // This will handle numeric or letter grade input
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://backendhono.medium-jigyasu.workers.dev/api/teacher/courses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch students for a selected course
  const handleCourseClick = async (courseId: number) => {
    try {
      const response = await axios.get(
        `https://backendhono.medium-jigyasu.workers.dev/api/teacher/course/${courseId}/students`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setStudents(response.data);
      const course = courses.find((course) => course.id === courseId);
      setSelectedCourse(course || null);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  // Handle student selection for grade assignment
  const handleGradeChange = (student: Student) => {
    setSelectedStudent(student);
  };

  const refresh = () => {
    window.location.reload();
  }

  // Validate grade (either numeric or letter grade)
  const isValidGrade = (input: string) => {
    const numericGrade = Number(input);
    return (
      (!isNaN(numericGrade) && numericGrade >= 0 && numericGrade <= 100) || // Valid numeric marks
      ["A", "B", "C", "D", "F"].includes(input.toUpperCase()) // Valid letter grade
    );
  };

  // Submit the grade for the selected student
  const handleAssignGrade = async () => {
    if (selectedStudent && selectedCourse) {
      if (!grade || !isValidGrade(grade)) {
        alert("Please enter a valid grade (A, B, C, D, F or numeric value).");
        return;
      }

      try {
        // Convert letter grades to numeric marks if necessary
        const numericMarks =
          ["A", "B", "C", "D", "F"].includes(grade.toUpperCase())
            ? convertLetterGradeToMarks(grade.toUpperCase())
            : Number(grade); // Keep numeric marks as they are

        await axios.post(
          `https://backendhono.medium-jigyasu.workers.dev/api/teacher/course/${selectedCourse.id}/student/${selectedStudent.id}/grade`,
          { grade: numericMarks }, // Send the numeric marks to the backend
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        alert("Grade assigned successfully!");
        setGrade(""); // Reset grade input
        setSelectedStudent(null); // Clear selected student
      } catch (error) {
        console.error("Error assigning grade:", error);
        alert("Failed to assign grade");
      }
    }
  };

  // Convert letter grades to numeric marks
  const convertLetterGradeToMarks = (letter: string): number => {
    switch (letter) {
      case "A":
        return 90;
      case "B":
        return 80;
      case "C":
        return 70;
      case "D":
        return 60;
      case "F":
        return 50;
      default:
        return 0;
    }
  };
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
      <div className="flex justify-between px-4 pb-4 border-b border-black items-center">
        <div className="flex items-center gap-2">
          <img src={teacher} alt="" className="h-10" />
          <h2 className="text-2xl font-semibold hover:cursor-pointer" onClick={refresh}>Teacher Dashboard</h2>
        </div>
        <p onClick={logout} className="cursor-pointer hover:underline">Logout</p>
      </div>
        <div className="grid grid-cols-2 gap-4 px-4">
          {/* Courses Assigned to Teacher */}
          <div className="space-y-4">
            <h3 className="text-lg pt-4 text-center">Assigned Courses</h3>
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded shadow-md bg-white shadow-fuchsia-200 space-y-2 cursor-pointer"
                onClick={() => handleCourseClick(course.id)}
              >
                <h4 className="text-lg font-semibold">{course.title}</h4>
                <p>{course.description}</p>
              </div>
            ))}
          </div>

          {/* Students Enrolled in the Selected Course */}
          <div className="space-y-4">
            {selectedCourse && (
              <>
                <h3 className="text-lg pt-4 text-center">Enrolled Students - {selectedCourse.title}</h3>
                {students.map((student) => (
                  <div key={student.id} className="p-4 rounded shadow-md bg-white shadow-fuchsia-200 space-y-2 flex items-center justify-between">
                    <h4 className="text-lg font-semibold">{student.name}</h4>
                    <button
                      onClick={() => handleGradeChange(student)}
                      className="text-blue-500 bg-blue-200 hover:bg-blue-600 hover:text-white px-3 py-1 rounded"
                    >
                      Assign Grade
                    </button>
                  </div>
                ))}

                {selectedStudent && (
                  <div className="mt-4">
                    <h4 className="text-lg">Assign Grade to {selectedStudent.name}</h4>
                    <div className="flex justify-between items-center gap-32">
                      <input
                        type="text"
                        placeholder="Enter grade (A, B, C, D, F or numeric value)"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="border px-3 py-1 rounded-sm mt-2 grow"
                      />
                      <button
                        onClick={handleAssignGrade}
                        className="text-green-600 bg-green-300 hover:text-white hover:bg-green-600 px-3 py-1 rounded mt-2 mr-2"
                      >
                        Submit Grade
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
    </div>
  );
};

export default TeacherDashboard;
