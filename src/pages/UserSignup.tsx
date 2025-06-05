
import { SignupForm } from "@/components/auth/SignupForm";
import { FormContainer } from "@/components/auth/FormContainer";
import { GradientPanel } from "@/components/auth/GradientPanel";
import { LayoutWrapper } from "@/components/auth/LayoutWrapper";

const UserSignup = () => {
  const benefits = [
    "Create and manage multiple projects",
    "Connect with top talents in your field",
    "Secure payment and milestone tracking",
    "Detailed analytics and reporting"
  ];

  return (
    <LayoutWrapper>
      <FormContainer
        title="Create Account"
        subtitle="Join our community of freelancers and clients"
        alternativeLinkText="Already have an account?"
        alternativeLinkTo="/login"
        alternativeLinkLabel="Sign In"
      >
        <SignupForm />
      </FormContainer>
      <GradientPanel 
        title="Join Our Platform"
        subtitle="Create an account to unlock all features and start your journey with us."
        benefitsTitle="Benefits of Signing Up"
        benefits={benefits}
        gradientDirection="tl"
      />
    </LayoutWrapper>
  );
};

export default UserSignup;
