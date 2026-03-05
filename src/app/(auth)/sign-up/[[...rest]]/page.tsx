import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <div>
      <SignUp routing="path" path="/sign-up" afterSignUpUrl="/" />
    </div>
  );
};

export default Page;