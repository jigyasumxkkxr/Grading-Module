import { Link } from "react-router-dom";
const refresh = () => {
  window.location.reload();
}
const Navbar = () => (
  <div className="p-6 text-black flex justify-between border-b border-black ">
    <div className="flex items-center">
      {/* <img src={logo} alt="" className="h-24" /> */}
      <h1 className="font-bold text-2xl cursor-pointer" onClick={refresh}>MODULE FOR GRADING AND GRADESHEET</h1>
    </div>
    <div>
      <Link to="https://github.com/jigyasumxkkxr/Grading-Module" className="px-2 hover:underline" target="_blank" rel="noopener noreferrer">Github</Link>
      <Link className="px-2 hover:underline"  to="/login">Login</Link>
      <Link className="px-2 hover:underline" to="/register">Register</Link>
    </div>
  </div>
);

export default Navbar;
