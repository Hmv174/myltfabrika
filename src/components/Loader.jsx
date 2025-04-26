import React from 'react';
import { motion } from 'framer-motion';
export default function Loader() {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="w-24 h-24 border-4 border-primary rounded-full border-t-transparent animate-spin" />
    </motion.div>
  );
}