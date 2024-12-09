import { useEffect, useState } from "react";

const Hero = () => {
  const [text, setText] = useState("");
  const fullText = "Building Digital Solutions";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-gradient-y"></div>
      <div className="container mx-auto px-4 text-center relative">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Hello, I'm <span className="text-primary">Your Name</span>
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold mb-8">
          {text}
          <span className="animate-pulse">|</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 animate-fade-in">
          A passionate developer specializing in DevOps, Full-stack Development, and AI solutions.
        </p>
        <a
          href="#contact"
          className="bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors animate-fade-in"
        >
          Let's Connect
        </a>
      </div>
    </section>
  );
};

export default Hero;