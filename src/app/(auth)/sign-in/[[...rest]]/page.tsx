import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div>
      <SignIn routing="path" path="/sign-in" afterSignInUrl="/" />
    </div>
  );
};

export default Page;