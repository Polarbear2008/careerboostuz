
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <section className="py-20">
          <div className="page-container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground mb-8">Last updated: March 2024</p>
                
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <p className="mb-6">
                  We collect information you provide directly to us, such as when you create an account, 
                  complete your profile, post projects, or communicate with other users.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="mb-6">
                  We use the information we collect to provide, maintain, and improve our services, 
                  process transactions, and communicate with you.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
                <p className="mb-6">
                  We do not sell, trade, or rent your personal information to third parties. 
                  We may share your information in certain limited circumstances as outlined in this policy.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p className="mb-6">
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at 
                  privacy@careerboost.uz
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

export default Privacy;
