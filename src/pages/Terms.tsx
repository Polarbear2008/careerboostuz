
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <section className="py-20">
          <div className="page-container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground mb-8">Last updated: March 2024</p>
                
                <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
                <p className="mb-6">
                  By accessing and using CareerBoost, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
                <p className="mb-6">
                  You are responsible for maintaining the confidentiality of your account and password 
                  and for restricting access to your computer.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
                <p className="mb-6">
                  You may not use our service for any illegal or unauthorized purpose nor may you, 
                  in the use of the service, violate any laws in your jurisdiction.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="mb-6">
                  CareerBoost shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages resulting from your use of the service.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p>
                  Questions about the Terms of Service should be sent to us at legal@careerboost.uz
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Terms;
