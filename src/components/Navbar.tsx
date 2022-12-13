import { Link } from "react-router-dom";
import { ArrowUp, Cog, PencilSquare } from "./Icons";

const NavBar = () => {
  return (
    <div className="w-screen flex justify-center">
      <nav className="w-[90%] flex justify-evenly fixed bottom-0 p-4 bg-white border rounded-2xl z-50">
        <Link to="/analytics">
          <ArrowUp />
        </Link>
        <Link to="/tracker">
          <PencilSquare colour="black" />
        </Link>
        <Link to="settings">
          <Cog />
        </Link>
      </nav>
    </div>
  );
};
export default NavBar;
