import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';
import EventBanner from '../EventBanner';

const BannerManager = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Event Banner Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Banner Visibility</Label>
              <p className="text-sm text-muted-foreground">
                Toggle the KubeCon + CloudNative India banner visibility
              </p>
            </div>
            <Switch
              checked={isVisible}
              onCheckedChange={setIsVisible}
            />
          </div>
          
          <div className="border-t pt-6">
            <h4 className="text-sm font-medium mb-4">Banner Preview</h4>
            <EventBanner visible={isVisible} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BannerManager;