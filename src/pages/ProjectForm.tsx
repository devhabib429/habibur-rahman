import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { toast } from "sonner";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-md p-8 rounded-xl border border-gray-700/50">
          <h1 className="text-3xl font-light mb-8 text-white text-center font-['Space_Grotesk']">
            Start Your Project
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Project Type</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="devops">DevOps Implementation</option>
                <option value="erpnext">ERPNext Solution</option>
                <option value="automation">Process Automation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Project Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Budget Range</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g., $5,000 - $10,000"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Timeline</label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="e.g., 2-3 months"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
            >
              Submit Project Request
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectForm;