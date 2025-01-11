import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Bug, Megaphone, BookOpen, Calendar, Link as LinkIcon } from "lucide-react";
import { format } from "date-fns";

const ERPNextUpdates = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: updates, isLoading } = useQuery({
    queryKey: ["erpnext-updates", selectedType],
    queryFn: async () => {
      let query = supabase
        .from("erpnext_updates")
        .select("*")
        .order("created_at", { ascending: false });

      if (selectedType) {
        query = query.eq("update_type", selectedType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "feature":
        return <Newspaper className="w-6 h-6" />;
      case "bugfix":
        return <Bug className="w-6 h-6" />;
      case "announcement":
        return <Megaphone className="w-6 h-6" />;
      case "tutorial":
        return <BookOpen className="w-6 h-6" />;
      default:
        return <Newspaper className="w-6 h-6" />;
    }
  };

  const updateTypes = [
    { label: "All", value: null },
    { label: "Features", value: "feature" },
    { label: "Bug Fixes", value: "bugfix" },
    { label: "Announcements", value: "announcement" },
    { label: "Tutorials", value: "tutorial" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative px-6 py-24 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-light text-gray-900 sm:text-6xl font-['Space_Grotesk']">
              ERPNext Updates
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 font-['Inter']">
              Stay up to date with the latest features, bug fixes, and announcements from the ERPNext ecosystem
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-6 py-8 mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {updateTypes.map((type) => (
            <button
              key={type.value || "all"}
              onClick={() => setSelectedType(type.value)}
              className={`px-6 py-2 rounded-full border transition-all ${
                selectedType === type.value
                  ? "border-black bg-black text-white"
                  : "border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Updates Grid */}
        {isLoading ? (
          <div className="text-center text-gray-600">Loading updates...</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {updates?.map((update) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-black/5 rounded-lg">
                    {getIcon(update.update_type)}
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {update.update_type}
                  </Badge>
                </div>

                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {update.title}
                </h3>

                <p className="mb-4 text-gray-600">
                  {update.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {update.tags?.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(new Date(update.created_at), "MMM d, yyyy")}
                  </div>
                  {update.link && (
                    <a
                      href={update.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <LinkIcon className="w-4 h-4 mr-1" />
                      Learn More
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ERPNextUpdates;