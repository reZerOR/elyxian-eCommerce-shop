import { signIn } from "@/auth";
import { Button } from "../ui/button";

const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
      className="w-full"
    >
      <Button className="w-full" type="submit">
        Continue with Google
      </Button>
    </form>
  );
};

export default SignIn;
