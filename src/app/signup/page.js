import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export const metadata = {
  title: "Create Account | VIAN LUXURE",
  description: "Join Vian Luxure to design custom linen garments, save items to your wishlist, and track tailoring orders.",
};

export default function SignupPage() {
  return (
    <AuthLayout
      heading="Create Your Account"
      subheading="Join the Vian Luxure family."
    >
      <SignupForm />
    </AuthLayout>
  );
}
