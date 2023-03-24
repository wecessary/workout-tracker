import Button from "../components/ui/Button";
import { logOut } from "../lib/firebase";

const Settings = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Button variant="outline" onClick={logOut}>
        Log out
      </Button>
    </div>
  );
};

export default Settings;
