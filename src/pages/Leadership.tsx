
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

const Leadership = () => {
  return (
    <>
      <NavBar />
      <main className="pt-20">
        <section className="py-20">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Leadership Team</h1>
              <p className="text-lg text-muted-foreground">
                Meet the visionary leaders driving CareerBoost's mission to connect global talent.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Leadership;
