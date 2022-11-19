import Button from "../components/Button";
import { logOut } from "../firebae/firebase";

const Settings = () => {
  return (
    <div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
};

export default Settings;
