import React from 'react';
import { motion } from 'framer-motion';
export default function ScenarioDisplay({ data }) { return (
  <div className="mt-8 space-y-4">
    <h2 className="text-2xl font-bold">{data.title}</h2>
    <p>{data.synopsis}</p>
    <ul className="list-disc list-inside">
      {data.scenes.map((scene, idx) => (
        <motion.li key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>{scene}</motion.li>
      ))}
    </ul>
  </div>
); }