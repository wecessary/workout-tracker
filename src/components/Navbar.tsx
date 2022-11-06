import { Link } from "react-router-dom";
import { ArrowUp, Cog, PencilSquare } from "./Icons";

const NavBar = () => {
  return (
    <nav className="w-[90%] flex justify-evenly fixed bottom-0 p-4 bg-white border rounded-2xl">
      <Link to="/analytics">
        <ArrowUp />
      </Link>
      <Link to="/tracker">
        <PencilSquare />
      </Link>
      <Link to="settings">
        <Cog />
      </Link>
    </nav>
  );
};
export default NavBar;
