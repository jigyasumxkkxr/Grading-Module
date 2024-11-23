import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import adminimg from "../assets/413827ca20a1a0a5038bc8f95d0234a6-sticker 1.png"

const LoginAdmin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await login(form);
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("role", data.user.role);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
      <Navbar />
      <div className="flex grow w-screen">
      <div className="flex flex-col grow justify-center items-center ml-4"> <div className="bg-white px-8 pb-12 pt-8 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Login as Admin</h2>
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
          <button type="submit" className="bg-gray-200 text-gray-600 hover:bg-gray-600 hover:shadow-md hover:shadow-gray-200 hover:text-white px-4 py-2 rounded w-full">
          {loading ? (
                <div className="flex items-center justify-center">
                  <span className="loader border-t-transparent border-2  border-white w-4 h-4 rounded-full animate-spin mr-2"></span>
                  Loading...
                </div>
              ) : (
                "Login"
              )}
          </button>
        </form>
      </div></div>
      <div className="w-1/2 flex items-center justify-center">
          <img src={adminimg} alt="" className="mr-12 mb-6 h-96" />
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
