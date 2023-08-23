import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp appearance={{ variables: { colorPrimary: "#3b82f6" } }} />
    </div>
  );
}
