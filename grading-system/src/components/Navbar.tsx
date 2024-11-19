import { Link } from "react-router-dom";

const Navbar = () => (
  <div className="p-6 text-black flex justify-between border-b border-black ">
    <h1 className="font-bold text-2xl">MODULE FOR GRADING AND GRADESHEET</h1>
    <div>
      <Link className="px-2" to="/login">Login</Link>
      <Link className="px-2" to="/register">Register</Link>
    </div>
  </div>
);

export default Navbar;
