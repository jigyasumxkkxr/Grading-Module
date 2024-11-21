import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarRegister from "./NavbarRegister";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      await axios.post('https://backendhono.medium-jigyasu.workers.dev/register', form);
      navigate("/student-dashboard");
    } catch (err: any) {
      console.error("Error details:", err);
  
      const errorMessage =
        err.response?.data?.error || err.message || "An unexpected error occurred";
      alert(`Registration failed: ${errorMessage}`);
    }
  };
  
  

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
      <NavbarRegister />
      <div className="flex flex-col grow justify-center items-center">
      <div className="bg-white px-8 pb-12 pt-8 rounded-xl shadow-md shadow-fuchsia-300">
        <h2 className="text-xl font-semibold mb-4">Register as Student / Teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col gap-2 items-start">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="p-2 border rounded w-full"
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>
          <button type="submit" className="bg-fuchsia-600 text-white hover:bg-fuchsia-400 hover:shadow-md hover:shadow-fuchsia-200 hover:text-black px-4 py-2 rounded w-full">
            Register
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Register;
