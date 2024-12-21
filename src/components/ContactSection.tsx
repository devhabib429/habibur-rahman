import { MessageSquare, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#8B5CF6]/20 to-gray-900" />
      
      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Enhanced Heading with Gradient */}
          <motion.h2 
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] via-[#7E69AB] to-[#D6BCFA] animate-gradient-y font-['Space_Grotesk']"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Let's Connect
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 mb-12 text-lg leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to transform your business? Choose your preferred way to connect with me.
            Let's discuss how we can work together to achieve your goals.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Enhanced Twitter DM Button */}
            <motion.a
              href="https://twitter.com/messages/compose?recipient_id=HRahman429"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-br from-[#1DA1F2] to-[#0D8BD9] text-white flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-[#1DA1F2]/20 hover:shadow-xl hover:shadow-[#1DA1F2]/30 w-full sm:w-auto min-w-[200px]"
            >
              <MessageSquare className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span className="font-medium">DM on X</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
            </motion.a>
            
            {/* Enhanced Calendar Button */}
            <motion.a
              href="https://calendly.com/HRahman429"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#7E69AB] text-white flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-[#8B5CF6]/20 hover:shadow-xl hover:shadow-[#8B5CF6]/30 w-full sm:w-auto min-w-[200px]"
            >
              <Calendar className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span className="font-medium">Schedule a Meeting</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
            </motion.a>
          </div>

          {/* Enhanced Decorative Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#8B5CF6]/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7E69AB]/10 rounded-full filter blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;