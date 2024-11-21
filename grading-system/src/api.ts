import axios from "axios";

const API = axios.create({
  baseURL: "https://backendhono.medium-jigyasu.workers.dev", // Adjust backend URL if needed
});


export const login = (data: any) => API.post("/login", data);
export const register = (data: any) => API.post("/register", data);
export const createCourse = (data: any, token: string) =>
  API.post("/admin/course", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const enrollCourse = (data: any, token: string) =>
  API.post("/student/course", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const assignGrade = (data: any, token: string) =>
  API.post("/teacher/grade", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getStudentGrades = (token: string) =>
  API.get("/student/grades", {
    headers: { Authorization: `Bearer ${token}` },
  });
