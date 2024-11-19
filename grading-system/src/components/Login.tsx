import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import NavbarLogin from "./NavbarLogin";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
      <NavbarLogin />
      <div className="flex flex-col grow justify-center items-center"> <div className="bg-white px-8 pb-12 pt-8 rounded-xl shadow-md shadow-fuchsia-300">
        <h2 className="text-xl font-semibold mb-4">Login as Student / Teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col gap-2 items-start">
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
          <button type="submit" className="bg-fuchsia-600 text-white hover:bg-fuchsia-400 hover:shadow-md hover:shadow-fuchsia-200 hover:text-black px-4 py-2 rounded w-full">
            Login
          </button>
        </form>
      </div></div>
    </div>
  );
};

export default Login;
