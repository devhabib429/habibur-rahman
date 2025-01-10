import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const UnpopularOpinions = () => {
  const { data: opinions, isLoading } = useQuery({
    queryKey: ['hotTakes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hot_takes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-black">Hot Takes 🔥</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Challenging conventional wisdom in tech
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {opinions?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50 transform transition-transform duration-500 group-hover:scale-110" />
              <div className="relative bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-black" />
                  <span className="text-black font-semibold">{item.category}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-black group-hover:text-gray-800 transition-colors">
                  {item.opinion}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.explanation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnpopularOpinions;