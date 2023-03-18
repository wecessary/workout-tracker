import Button from "../components/ui/Button";

const GetStartedPage = () => {
  // @ts-ignore
  const hero = new URL("../assets/renaissant-man.png", import.meta.url);

  return (
    <>
      <div className="h-screen flex flex-col items-center gap-5">
        <img src={String(hero)} className="h-[40vh] rounded-md mt-10" />
        <h1 className="text-3xl font-bold">Muscle Department</h1>
        <h1> The all in one workout tracker</h1>
        <Button variant="outline" localStyling="w-52">
          Get Started
        </Button>
        <div>
          <p>
            Already have an account?<Button> Login</Button>
          </p>
        </div>
      </div>
    </>
  );
};

export default GetStartedPage;
