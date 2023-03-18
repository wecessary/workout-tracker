import Button from "../components/ui/Button";
import { logOut } from "../lib/firebase";

const Settings = () => {
  return (
    <div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
};

export default Settings;
