import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "devops",
    description: "",
    budget: "",
    timeline: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('projects')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            project_type: formData.projectType,
            description: formData.description,
            budget: formData.budget,
            timeline: formData.timeline
          }
        ]);

      if (error) throw error;

      toast.success("Thank you for your submission! We'll get back to you soon.");
      
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "devops",
        description: "",
        budget: "",
        timeline: ""
      });
    } catch (error) {
      console.error('Error submitting project:', error);
      toast.error("There was an error submitting your project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-light mb-8 text-black text-center font-['Space_Grotesk']">
            Start Your Project
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Project Type</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-colors"
              >
                <option value="devops">DevOps Implementation</option>
                <option value="erpnext">ERPNext Solution</option>
                <option value="automation">Process Automation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Project Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Budget Range</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g., $5,000 - $10,000"
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Timeline</label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="e.g., 2-3 months"
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  Submit Project Request
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectForm;