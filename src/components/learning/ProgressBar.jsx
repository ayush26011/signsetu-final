import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, className = "", showLabel = true, color = "var(--color-primary)" }) => {
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-400">{progress}% Completed</span>
        </div>
      )}
      <div className="h-2 w-full bg-gray-800/50 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ backgroundColor: color }}
          className="h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
