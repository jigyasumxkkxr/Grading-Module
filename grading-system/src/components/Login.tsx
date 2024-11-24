import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import NavbarLogin from "./NavbarLogin";
import loginimg from "../assets/Drawkit-Illustrations-Education-1-10 1 (2).png"

const Login = () => {
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
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-600 opacity-20 blur-[100px]"></div></div>
      <NavbarLogin />
      <div className="flex grow w-screen">
        <div className="w-1/2 flex items-center justify-center">
          <img src={loginimg} alt="" className="mb-6 ml-10 h-96" />
        </div>
        <div className="flex flex-col justify-center items-center w-1/2 mr-10"> <div className="bg-white px-8 pb-12 pt-8 rounded-xl shadow-md">
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
          <button type="submit" className="bg-gray-300 text-gray-600 hover:bg-gray-600 hover:shadow-md hover:shadow-gray-200 hover:text-white px-4 py-2 rounded w-full">
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
      </div>
    </div>
  );
};

export default Login;
