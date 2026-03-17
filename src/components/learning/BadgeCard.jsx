import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const BadgeCard = ({ badge, isUnlocked }) => {
  const { title, icon: Icon, description, color } = badge;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative p-4 rounded-2xl border transition-all duration-500 ${
        isUnlocked 
          ? 'bg-white/5 border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden group' 
          : 'bg-black/20 border-white/5 grayscale blur-[0.5px] opacity-60'
      }`}
    >
      {isUnlocked && (
        <div 
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at center, ${color}, transparent)` }}
        />
      )}
      
      <div className="flex flex-col items-center text-center space-y-3 relative z-10">
        <div 
          className={`p-4 rounded-full ${isUnlocked ? 'bg-white/5 shadow-inner' : 'bg-black/40'}`}
          style={isUnlocked ? { boxShadow: `inset 0 0 20px ${color}33` } : {}}
        >
          {isUnlocked ? (
            <Icon size={32} style={{ color: color }} />
          ) : (
            <Lock size={32} className="text-gray-600" />
          )}
        </div>
        
        <div>
          <h4 className={`font-bold text-sm ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
            {title}
          </h4>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            {isUnlocked ? description : 'Keep learning to unlock'}
          </p>
        </div>
      </div>

      {isUnlocked && (
        <motion.div
          layoutId={`badge-glow-${title}`}
          className="absolute -inset-1 rounded-2xl opacity-20 group-hover:opacity-40 blur-md transition-opacity"
          style={{ background: color }}
        />
      )}
    </motion.div>
  );
};

export default BadgeCard;
