import React from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle } from 'lucide-react';
import ProgressBar from './ProgressBar';

const CourseCard = ({ course, onContinue }) => {
  const { title, duration, progress, thumbnail, completed } = course;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card group overflow-hidden flex flex-col h-full bg-white/5 border-white/10 hover:border-primary/50 transition-all duration-300 shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <Play size={48} className="text-primary/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {completed && (
          <div className="absolute top-4 right-4 bg-green-500 text-black p-1.5 rounded-full shadow-lg z-20">
            <CheckCircle size={16} strokeWidth={3} />
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onContinue(course)}
            className="p-4 bg-primary text-white rounded-full shadow-2xl shadow-primary/40"
          >
            <Play fill="white" size={24} />
          </motion.button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow bg-black/40 backdrop-blur-md">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-400">
            {duration} • 12 Lessons
          </p>
        </div>

        <div className="mt-auto space-y-4">
          <ProgressBar progress={progress} className="mt-2" />
          
          <button
            onClick={() => onContinue(course)}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 group-hover:border-primary/30"
          >
            {completed ? 'Review Course' : 'Continue Learning'}
            <Play size={14} fill="currentColor" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
