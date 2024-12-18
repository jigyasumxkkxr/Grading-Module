import { Link } from "react-router-dom";
import grade from "../assets/image 1035.svg"

const refresh = () => {
  window.location.reload();
}
const NavbarLogin = () => (
  <div className="p-6 text-black flex justify-between border-b border-black ">
      <div className="flex gap-2">
        <div>
          <img src={grade} alt="" className="h-8" />
        </div>
        <h1 className="font-bold text-2xl cursor-pointer" onClick={refresh}>MODULE FOR GRADING AND GRADESHEET</h1>
      </div>
    <div>
      <Link className="px-2 hover:underline" to="/docs">Docs</Link>
      <Link to="https://buymeacoffee.com/jigyasumakkxr" className="px-2 hover:underline" target="_blank" rel="noopener noreferrer">Buy me a Coffee</Link>
      <Link className="px-2" to="/register">Register</Link>
      <Link className="hover:underline cursor-pointer" to="/">Home</Link>
    </div>
  </div>
);

export default NavbarLogin;
