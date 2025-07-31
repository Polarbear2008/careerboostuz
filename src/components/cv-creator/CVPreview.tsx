
import { Button } from "@/components/ui/button";
import { Award, Briefcase, Download, Globe, GraduationCap, Mail, MapPin, Phone, User, Share2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRef } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CVPreviewProps {
  formValues: any;
  skills: string[];
  selectedTemplate: string;
}

const CVPreview = ({ formValues, skills, selectedTemplate }: CVPreviewProps) => {
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

  // Template rendering logic
  function renderClassic() {
    return (
      <div
        ref={cvRef}
        className="w-full max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none rounded-lg overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white px-8 py-8">
          <div className="text-center">
            {formValues.personalInfo.imageUrl ? (
              <img
                src={formValues.personalInfo.imageUrl}
                alt="Profile"
                className="mx-auto mb-4 w-20 h-20 rounded-full object-cover border-2 border-white shadow"
              />
            ) : (
              <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-10 h-10 text-white/70" />
              </div>
            )}
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
              <div className="space-y-6">
                {formValues.education.map((edu, index) => (
                  <div key={index} className="relative pl-4 border-l-2 border-blue-200">
                    <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2.5 top-0"></div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800">{edu.degree}</h3>
                      <p className="text-lg text-blue-600 mb-1">{edu.institution}</p>
                      <p className="text-sm text-blue-500 mb-3">
                        {edu.startDate} - {edu.endDate || "Present"}
                      </p>
                      {edu.description && (
                        <p className="text-blue-700 leading-relaxed">{edu.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-6 w-6 text-indigo-700" />
                <h2 className="text-2xl font-bold text-indigo-800">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <span key={idx} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  function renderModern() {
    return (
      <div ref={cvRef} className="w-full max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none rounded-lg flex overflow-hidden">
        {/* Sidebar */}
        <div className="bg-gradient-to-b from-blue-700 to-blue-500 text-white w-1/3 min-w-[210px] p-8 flex flex-col items-center">
          <div className="mb-6">
            {formValues.personalInfo.imageUrl ? (
              <img
                src={formValues.personalInfo.imageUrl}
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover border-2 border-white mb-2"
              />
            ) : (
              <User className="h-20 w-20 rounded-full bg-white/10 p-3 mb-2" />
            )}
            <h1 className="text-2xl font-bold mb-1 text-white">
              {formValues.personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-base text-blue-100 mb-3">
              {formValues.personalInfo.jobTitle || "Job Title"}
            </p>
          </div>
          <div className="space-y-2 text-sm w-full">
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
          {/* Skills in sidebar */}
          {skills.length > 0 && (
            <div className="mt-8 w-full">
              <h3 className="text-lg font-semibold mb-2 text-white">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="bg-blue-200 text-blue-900 px-2 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Main Content */}
        <div className="flex-1 p-10 space-y-8">
          {/* Professional Summary */}
          {formValues.personalInfo.summary && (
            <section>
              <h2 className="text-xl font-bold text-blue-900 mb-2">Professional Summary</h2>
              <p className="text-blue-800 leading-relaxed">
                {formValues.personalInfo.summary}
              </p>
            </section>
          )}
          {/* Experience */}
          {formValues.experience.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-900 mb-2">Professional Experience</h2>
              <div className="space-y-4">
                {formValues.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-300 pl-4">
                    <h3 className="text-lg font-semibold text-blue-800">{exp.position}</h3>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-sm mb-1">
                      <span className="text-blue-700">{exp.company}</span>
                      <span className="text-blue-400">{exp.startDate} - {exp.endDate || "Present"}</span>
                    </div>
                    {exp.description && (
                      <p className="text-blue-800 leading-relaxed text-sm">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* Education */}
          {formValues.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-900 mb-2">Education</h2>
              <div className="space-y-4">
                {formValues.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-yellow-300 pl-4">
                    <h3 className="text-lg font-semibold text-yellow-700">{edu.degree}</h3>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-sm mb-1">
                      <span className="text-yellow-700">{edu.institution}</span>
                      <span className="text-yellow-400">{edu.startDate} - {edu.endDate || "Present"}</span>
                    </div>
                    {edu.description && (
                      <p className="text-yellow-700 leading-relaxed text-sm">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  function renderMinimalistPremium() {
    return (
      <div ref={cvRef} className="w-full max-w-3xl mx-auto bg-white shadow-2xl print:shadow-none rounded-2xl overflow-hidden border-4 border-yellow-300 relative">
        {/* Premium Badge */}
        <div className="absolute top-6 right-6 z-10">
          <span className="bg-gradient-to-r from-yellow-400 to-blue-400 text-white px-4 py-1 rounded-full font-bold text-xs shadow-lg">Premium</span>
        </div>
        {/* Header */}
        <div className="px-10 pt-12 pb-6 bg-gradient-to-r from-blue-50 to-yellow-50 border-b-2 border-yellow-200 text-center">
          <h1 className="text-3xl font-extrabold text-yellow-600 mb-1">
            {formValues.personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-lg text-blue-700 mb-2">
            {formValues.personalInfo.jobTitle || "Job Title"}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600">
            {formValues.personalInfo.email && (
              <span><Mail size={15} className="inline mr-1" />{formValues.personalInfo.email}</span>
            )}
            {formValues.personalInfo.phone && (
              <span><Phone size={15} className="inline mr-1" />{formValues.personalInfo.phone}</span>
            )}
            {formValues.personalInfo.location && (
              <span><MapPin size={15} className="inline mr-1" />{formValues.personalInfo.location}</span>
            )}
            {formValues.personalInfo.website && (
              <span><Globe size={15} className="inline mr-1" />{formValues.personalInfo.website}</span>
            )}
          </div>
        </div>
        {/* Main Content */}
        <div className="p-10 space-y-7">
          {/* Professional Summary */}
          {formValues.personalInfo.summary && (
            <section>
              <h2 className="text-xl font-bold text-blue-700 mb-1">Professional Summary</h2>
              <p className="text-slate-700 leading-relaxed">
                {formValues.personalInfo.summary}
              </p>
            </section>
          )}
          {/* Experience */}
          {formValues.experience.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-yellow-700 mb-1">Professional Experience</h2>
              <div className="space-y-3">
                {formValues.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-yellow-300 pl-4">
                    <h3 className="text-lg font-semibold text-blue-700">{exp.position}</h3>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-sm mb-1">
                      <span className="text-yellow-700">{exp.company}</span>
                      <span className="text-blue-400">{exp.startDate} - {exp.endDate || "Present"}</span>
                    </div>
                    {exp.description && (
                      <p className="text-slate-700 leading-relaxed text-sm">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* Education */}
          {formValues.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-700 mb-1">Education</h2>
              <div className="space-y-3">
                {formValues.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-300 pl-4">
                    <h3 className="text-lg font-semibold text-yellow-700">{edu.degree}</h3>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-sm mb-1">
                      <span className="text-blue-700">{edu.institution}</span>
                      <span className="text-yellow-400">{edu.startDate} - {edu.endDate || "Present"}</span>
                    </div>
                    {edu.description && (
                      <p className="text-slate-700 leading-relaxed text-sm">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-yellow-700 mb-1">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="bg-yellow-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  let renderedTemplate;
  if (selectedTemplate === "modern") {
    renderedTemplate = renderModern();
  } else if (selectedTemplate === "minimalist-premium") {
    renderedTemplate = renderMinimalistPremium();
  } else if (selectedTemplate === "elegant-minimalist") {
    renderedTemplate = renderElegantMinimalist();
  } else if (selectedTemplate === "creative-designer") {
    renderedTemplate = renderCreativeDesigner();
  } else {
    renderedTemplate = renderClassic();
  }

  // Elegant Minimalist Template
  function renderElegantMinimalist() {
    return (
      <div ref={cvRef} className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 print:shadow-none print:border-none">
        {/* Header */}
        <div className="px-10 py-10 text-center bg-white border-b border-gray-200">
          {formValues.personalInfo.imageUrl ? (
            <img
              src={formValues.personalInfo.imageUrl}
              alt="Profile"
              className="mx-auto mb-4 w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow"
            />
          ) : (
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>
          )}
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2">{formValues.personalInfo.fullName || "Your Name"}</h1>
          <p className="text-lg text-gray-500 mb-2">{formValues.personalInfo.jobTitle || "Job Title"}</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {formValues.personalInfo.email && <span>{formValues.personalInfo.email}</span>}
            {formValues.personalInfo.phone && <span>{formValues.personalInfo.phone}</span>}
            {formValues.personalInfo.location && <span>{formValues.personalInfo.location}</span>}
            {formValues.personalInfo.website && <span>{formValues.personalInfo.website}</span>}
          </div>
        </div>
        {/* Main Content */}
        <div className="px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white">
          {/* Left: Skills & Education */}
          <div className="md:col-span-1 space-y-8">
            {skills.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-700 mb-2 border-b border-gray-100 pb-1">Skills</h2>
                <ul className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <li key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">{skill}</li>
                  ))}
                </ul>
              </section>
            )}
            {formValues.education.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-700 mb-2 border-b border-gray-100 pb-1">Education</h2>
                <ul className="space-y-3">
                  {formValues.education.map((edu, i) => (
                    <li key={i}>
                      <div className="font-medium text-gray-900">{edu.degree}</div>
                      <div className="text-gray-500 text-sm">{edu.institution}</div>
                      <div className="text-gray-400 text-xs">{edu.startDate} - {edu.endDate || "Present"}</div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
          {/* Right: Summary & Experience */}
          <div className="md:col-span-2 space-y-8">
            {formValues.personalInfo.summary && (
              <section>
                <h2 className="text-lg font-semibold text-gray-700 mb-2 border-b border-gray-100 pb-1">Professional Summary</h2>
                <p className="text-gray-600 leading-relaxed">{formValues.personalInfo.summary}</p>
              </section>
            )}
            {formValues.experience.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-700 mb-2 border-b border-gray-100 pb-1">Experience</h2>
                <ul className="space-y-5">
                  {formValues.experience.map((exp, i) => (
                    <li key={i}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="font-medium text-gray-900">{exp.position}</div>
                        <div className="text-gray-400 text-xs md:text-right">{exp.startDate} - {exp.endDate || "Present"}</div>
                      </div>
                      <div className="text-gray-500 text-sm">{exp.company}</div>
                      {exp.description && <div className="text-gray-600 text-xs mt-1">{exp.description}</div>}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Creative Designer Template
  function renderCreativeDesigner() {
    return (
      <div ref={cvRef} className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row print:shadow-none">
        {/* Sidebar */}
        <div className="md:w-1/3 bg-gradient-to-b from-indigo-600 to-purple-500 text-white p-8 flex flex-col items-center justify-start">
          <div className="mb-6 w-28 h-28 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
            {formValues.personalInfo.imageUrl ? (
              <img
                src={formValues.personalInfo.imageUrl}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <User className="w-16 h-16 text-white/80" />
            )}
          </div>
          <h1 className="text-3xl font-bold mb-1 text-white text-center">{formValues.personalInfo.fullName || "Your Name"}</h1>
          <p className="text-lg text-indigo-100 mb-4 text-center">{formValues.personalInfo.jobTitle || "Job Title"}</p>
          <div className="space-y-2 text-sm mb-8">
            {formValues.personalInfo.email && <div className="flex items-center gap-2"><Mail size={16} />{formValues.personalInfo.email}</div>}
            {formValues.personalInfo.phone && <div className="flex items-center gap-2"><Phone size={16} />{formValues.personalInfo.phone}</div>}
            {formValues.personalInfo.location && <div className="flex items-center gap-2"><MapPin size={16} />{formValues.personalInfo.location}</div>}
            {formValues.personalInfo.website && <div className="flex items-center gap-2"><Globe size={16} />{formValues.personalInfo.website}</div>}
          </div>
          {skills.length > 0 && (
            <div className="w-full mt-8">
              <h2 className="text-lg font-semibold mb-2 border-b border-white/20 pb-1">Skills</h2>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <li key={i} className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Main Content */}
        <div className="flex-1 p-10 bg-white">
          {formValues.personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-indigo-700 mb-2 flex items-center gap-2"><User className="h-5 w-5" />Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{formValues.personalInfo.summary}</p>
            </section>
          )}
          {formValues.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2"><Briefcase className="h-5 w-5" />Experience</h2>
              <div className="flex flex-col gap-6">
                {formValues.experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-4 border-indigo-200">
                    <div className="absolute w-4 h-4 bg-indigo-600 rounded-full -left-2 top-1"></div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="font-semibold text-indigo-900">{exp.position}</div>
                      <div className="text-indigo-400 text-xs md:text-right">{exp.startDate} - {exp.endDate || "Present"}</div>
                    </div>
                    <div className="text-indigo-700 text-sm">{exp.company}</div>
                    {exp.description && <div className="text-gray-600 text-xs mt-1">{exp.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}
          {formValues.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2"><GraduationCap className="h-5 w-5" />Education</h2>
              <div className="flex flex-col gap-6">
                {formValues.education.map((edu, i) => (
                  <div key={i} className="relative pl-6 border-l-4 border-purple-200">
                    <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-2 top-1"></div>
                    <div className="font-semibold text-purple-900">{edu.degree}</div>
                    <div className="text-purple-700 text-sm">{edu.institution}</div>
                    <div className="text-purple-400 text-xs">{edu.startDate} - {edu.endDate || "Present"}</div>
                    {edu.description && <div className="text-gray-600 text-xs mt-1">{edu.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

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
      {renderedTemplate}
    </motion.div>
  );
};

export default CVPreview;
