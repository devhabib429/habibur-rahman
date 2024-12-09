import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const CalendarBooking = () => {
  useEffect(() => {
    // Initialize Cal.com embed
    (async function () {
      const Cal = await import("@calcom/embed-react");
      Cal.default({
        calLink: "your-cal-username", // Replace with your Cal.com username
        config: {
          name: "Portfolio Booking",
          theme: "light",
        },
      });
    })();
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
            <div data-cal-link="your-cal-username" className="min-h-[500px]" /> {/* Replace with your Cal.com username */}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CalendarBooking;