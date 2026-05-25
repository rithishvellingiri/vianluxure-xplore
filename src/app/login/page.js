import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login | VIAN LUXURE",
  description: "Access your personalized Vian Luxure account for premium linen clothing, orders, and custom tailoring.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      heading="Welcome Back"
      subheading="Access your personalized linen shopping experience."
    >
      <LoginForm />
    </AuthLayout>
  );
}
