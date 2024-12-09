import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

// Declare Cal type globally
declare global {
  interface Window {
    Cal?: {
      init: (config?: any) => void;
    };
  }
}

const CalendarBooking = () => {
  useEffect(() => {
    // Load Cal.com script
    const script = document.createElement('script');
    script.src = "https://cal.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Cal after script loads
      if (window.Cal) {
        window.Cal.init({
          calLink: "your-cal-username", // Replace with your Cal.com username
          config: {
            name: "Portfolio Booking",
            theme: "light",
          },
        });
      }
    };

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Book a Consultation</CardTitle>
            <CardDescription>
              Let's discuss how I can help bring your project to life
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              data-cal-link="your-cal-username" // Replace with your Cal.com username
              className="min-h-[500px]" 
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CalendarBooking;