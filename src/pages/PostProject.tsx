
import { ProjectForm } from "@/components/post-project/ProjectForm";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PostProject = () => {
  return (
    <>
      <NavBar />
      
      <main className="bg-gray-50 py-12 md:py-16">
        <div className="page-container">
          <div className="mb-6">
            <Link to="/find-talent">
              <Button variant="ghost" className="gap-1">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </Link>
          </div>
          
          <div className="mb-8 md:mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Post Your Project</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share the details of your project and start receiving proposals from talented professionals
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <ProjectForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default PostProject;
