import { Link } from "react-router-dom";
import { AppIcon } from "../components/ui/Icons";

const Index = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-mobile-bg md:bg-desktop-bg bg-cover bg-center">
        <div className="h-[85vh] flex flex-col justify-between">
          <div>
            <AppIcon />
            <h2 className="mt-4 border-t-4 border-spacing-y-2 font-bold text-white ">
              no-nonsense workout tracker
            </h2>
          </div>

          <Link
            to={"/login"}
            className=" text-center border-2 hover:border-4 border-white p-4 rounded-xl w-full text-white"
          >
            Use for free
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
