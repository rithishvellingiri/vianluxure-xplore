import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Reset Password | VIAN LUXURE",
  description: "Request a secure password reset link to regain access to your premium Vian Luxure account.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      heading="Reset Password"
      subheading="Restore access to your account."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
