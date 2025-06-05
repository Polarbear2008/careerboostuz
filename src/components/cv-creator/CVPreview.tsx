
import { Button } from "@/components/ui/button";
import { Award, Briefcase, Download, Globe, GraduationCap, Mail, MapPin, Phone, User, Share2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRef } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CVPreview = ({ formValues, skills }) => {
  const cvRef = useRef(null);

  // Handle PDF download
  const handleDownload = async () => {
    if (!cvRef.current) return;

    try {
      const canvas = await html2canvas(cvRef.current, {
        useCORS: true,
        allowTaint: true,
        background: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${formValues.personalInfo.fullName || 'CV'}.pdf`);
      toast.success("CV downloaded successfully!");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Failed to download CV. Please try again.");
    }
  };

  // Handle share
  const handleShare = async () => {
    const shareData = {
      title: `${formValues.personalInfo.fullName}'s CV`,
      text: `Check out ${formValues.personalInfo.fullName}'s professional CV`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success("CV shared successfully!");
      } else {
        // Fallback to copying URL
        await navigator.clipboard.writeText(window.location.href);
        toast.success("CV link copied to clipboard!");
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error("Failed to share CV. Please try again.");
    }
  };

  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Action buttons */}
      <div className="flex justify-center gap-4 mb-6 print:hidden">
        <Button onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button onClick={handleShare} variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share CV
        </Button>
      </div>

      {/* CV Content */}
      <div
        ref={cvRef}
        className="w-full max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              {formValues.personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-xl text-slate-200 mb-4">
              {formValues.personalInfo.jobTitle || "Job Title"}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {formValues.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{formValues.personalInfo.email}</span>
                </div>
              )}
              
              {formValues.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{formValues.personalInfo.phone}</span>
                </div>
              )}
              
              {formValues.personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{formValues.personalInfo.location}</span>
                </div>
              )}
              
              {formValues.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <span>{formValues.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Professional Summary */}
          {formValues.personalInfo.summary && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <User className="h-6 w-6 text-slate-700" />
                <h2 className="text-2xl font-bold text-slate-800">Professional Summary</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {formValues.personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {formValues.experience.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="h-6 w-6 text-slate-700" />
                <h2 className="text-2xl font-bold text-slate-800">Professional Experience</h2>
              </div>
              <div className="space-y-6">
                {formValues.experience.map((exp, index) => (
                  <div key={index} className="relative pl-4 border-l-2 border-slate-200">
                    <div className="absolute w-4 h-4 bg-slate-700 rounded-full -left-2.5 top-0"></div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{exp.position}</h3>
                      <p className="text-lg text-slate-600 mb-1">{exp.company}</p>
                      <p className="text-sm text-slate-500 mb-3">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </p>
                      {exp.description && (
                        <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {formValues.education.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-6 w-6 text-slate-700" />
                <h2 className="text-2xl font-bold text-slate-800">Education</h2>
              </div>
              <div className="space-y-4">
                {formValues.education.map((edu, index) => (
                  <div key={index} className="relative pl-4 border-l-2 border-slate-200">
                    <div className="absolute w-4 h-4 bg-slate-700 rounded-full -left-2.5 top-0"></div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{edu.degree}</h3>
                      <p className="text-lg text-slate-600 mb-1">{edu.institution}</p>
                      <p className="text-sm text-slate-500">
                        {edu.startDate} - {edu.endDate || "Present"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-6 w-6 text-slate-700" />
                <h2 className="text-2xl font-bold text-slate-800">Skills & Expertise</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-slate-100 text-slate-700 px-3 py-2 rounded-lg text-center font-medium"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CVPreview;
