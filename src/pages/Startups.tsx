
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

const Startups = () => {
  return (
    <>
      <NavBar />
      <main className="pt-20">
        <section className="py-20">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Solutions for Startups</h1>
              <p className="text-lg text-muted-foreground">
                Build your startup faster with on-demand access to specialized talent.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Startups;
