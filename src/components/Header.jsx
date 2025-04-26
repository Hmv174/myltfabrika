import React from 'react';
import { motion } from 'framer-motion';
import i18n from '../i18n';
export default function Header() {
  return (
    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-center mb-8 font-cartoon">
      {i18n.texts.title}
    </motion.h1>
  );
}