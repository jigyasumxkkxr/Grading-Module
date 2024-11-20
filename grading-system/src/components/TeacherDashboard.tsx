import React, { useState, useEffect } from "react";
import axios from "axios";

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
        const response = await axios.get("https://dbms-backend-2.onrender.com/teacher/courses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch students for a selected course
  const handleCourseClick = async (courseId: number) => {
    try {
      const response = await axios.get(
        `https://dbms-backend-2.onrender.com/teacher/course/${courseId}/students`,
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
          `https://dbms-backend-2.onrender.com/teacher/course/${selectedCourse.id}/student/${selectedStudent.id}/grade`,
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

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Teacher Dashboard</h2>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {/* Courses Assigned to Teacher */}
          <div className="space-y-4">
            <h3 className="text-lg mb-4">Assigned Courses</h3>
            {courses.map((course) => (
              <div
                key={course.id}
                className="border p-4 rounded shadow-md space-y-2 cursor-pointer"
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
                <h3 className="text-lg mb-4">Enrolled Students - {selectedCourse.title}</h3>
                {students.map((student) => (
                  <div key={student.id} className="border p-4 rounded shadow-md space-y-2">
                    <h4 className="text-lg font-semibold">{student.name}</h4>
                    <button
                      onClick={() => handleGradeChange(student)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                      Assign Grade
                    </button>
                  </div>
                ))}

                {selectedStudent && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Assign Grade to {selectedStudent.name}</h4>
                    <input
                      type="text"
                      placeholder="Enter grade (A, B, C, D, F or numeric value)"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="border p-2 rounded mt-2"
                    />
                    <button
                      onClick={handleAssignGrade}
                      className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                    >
                      Submit Grade
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
