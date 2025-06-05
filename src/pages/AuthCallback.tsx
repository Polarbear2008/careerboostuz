
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Spinner } from "@/components/ui/spinner";

const AuthCallback = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error during auth callback:", error);
        navigate("/login?error=auth-callback-failed");
        return;
      }
      
      if (data?.session) {
        navigate("/");
      } else {
        navigate("/login");
      }
    };
    
    handleAuthCallback();
  }, [navigate]);
  
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="mb-4">
        <Spinner size="lg" />
      </div>
      <h2 className="text-xl font-medium text-gray-700">Completing authentication...</h2>
      <p className="text-gray-500 mt-2">Please wait while we log you in.</p>
    </div>
  );
};

export default AuthCallback;
