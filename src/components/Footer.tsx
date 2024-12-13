import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              We specialize in DevOps and ERPNext solutions, helping businesses streamline their operations and achieve digital transformation.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>ERPNext Implementation</li>
              <li>DevOps Consulting</li>
              <li>Cloud Solutions</li>
              <li>Process Automation</li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@example.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Location: Global</li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Ready to Start?</h3>
            <p className="mb-4">Let's transform your ideas into reality.</p>
            <Link
              to="/start-project"
              className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-all transform hover:scale-105"
            >
              Start Project
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;