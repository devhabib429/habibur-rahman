import { MessageSquare, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent font-['Space_Grotesk']">
            Let's Connect
          </h2>
          <p className="text-gray-300 mb-12 text-lg">
            Ready to transform your business? Choose your preferred way to connect with me.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="https://twitter.com/messages/compose?recipient_id=YOUR_TWITTER_ID"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden px-8 py-4 rounded-lg bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white flex items-center justify-center gap-3 transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">DM on X</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/0 via-white/20 to-[#0EA5E9]/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
            </motion.a>
            
            <motion.a
              href="https://calendly.com/YOUR_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden px-8 py-4 rounded-lg bg-[#D946EF] hover:bg-[#D946EF]/90 text-white flex items-center justify-center gap-3 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Schedule a Meeting</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF]/0 via-white/20 to-[#D946EF]/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;