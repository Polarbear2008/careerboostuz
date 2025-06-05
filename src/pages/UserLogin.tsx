
import { LoginForm } from "@/components/auth/LoginForm";
import { FormContainer } from "@/components/auth/FormContainer";
import { GradientPanel } from "@/components/auth/GradientPanel";
import { LayoutWrapper } from "@/components/auth/LayoutWrapper";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

const UserLogin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  // If still checking auth status, show loading
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // If user is already authenticated, don't show login form
  if (user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
        <p className="ml-2">You're already logged in. Redirecting...</p>
      </div>
    );
  }

  const benefits = [
    "Access to top talents worldwide",
    "Professional project management",
    "Secure payment protection"
  ];

  return (
    <LayoutWrapper>
      <GradientPanel 
        title="Welcome Back"
        subtitle="Sign in to access your account and continue your journey with us."
        benefitsTitle="Why Choose Us"
        benefits={benefits}
        gradientDirection="br"
      />
      <FormContainer
        title="Sign In"
        subtitle="Access your account and manage your projects"
        alternativeLinkText="New user?"
        alternativeLinkTo="/signup"
        alternativeLinkLabel="Create an account"
      >
        <LoginForm />
      </FormContainer>
    </LayoutWrapper>
  );
};

export default UserLogin;
