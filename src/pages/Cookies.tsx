
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

const Cookies = () => {
  return (
    <>
      <NavBar />
      <main className="pt-20">
        <section className="py-20">
          <div className="page-container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground mb-8">Last updated: March 2024</p>
                
                <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
                <p className="mb-6">
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
                <p className="mb-6">
                  We use cookies to improve your experience on our website, analyze traffic, and personalize content.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
                <p className="mb-6">
                  You can control and manage cookies in your browser settings. Please note that disabling cookies may affect website functionality.
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

export default Cookies;
