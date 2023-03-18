import { Link } from "react-router-dom";
import { colour } from "../../const/colour";
import { ArrowUp, Cog, PencilSquare } from "../ui/Icons";

const NavBar = () => {
  return (
    <div className="w-screen flex justify-center">
      <nav
        className={`w-full flex justify-evenly fixed bottom-0 p-4 ${colour.background} text-[#a4a4a3] z-40`}
      >
        <Link to="/analytics">
          <ArrowUp />
        </Link>
        <Link to="/tracker">
          <PencilSquare colour="#a4a4a3" />
        </Link>
        <Link to="settings">
          <Cog />
        </Link>
      </nav>
    </div>
  );
};
export default NavBar;
