
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

const Press = () => {
  return (
    <>
      <NavBar />
      <main className="pt-20">
        <section className="py-20">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Press & Media</h1>
              <p className="text-lg text-muted-foreground">
                Latest news, press releases, and media resources about CareerBoost.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Press;
