import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center py-6">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
