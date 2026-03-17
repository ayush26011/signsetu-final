import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight,
  PlayCircle
} from 'lucide-react';
import ProgressBar from './ProgressBar';
import CourseCard from './CourseCard';

const LearningDashboard = ({ userStats, courses, onContinueCourse, globalProgress }) => {
  const stats = [
    { label: 'Completed', value: userStats.completed || 0, icon: CheckCircle2, color: '#10B981' },
    { label: 'Streak', value: `${userStats.streak || 0} Days`, icon: Flame, color: '#EF4444' },
    { label: 'Learning Time', value: `${userStats.timeSpent || 0}h`, icon: Clock, color: '#3B82F6' },
  ];

  return (
    <div className="space-y-10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            Welcome back, <span className="text-primary">{userStats.name || 'Learner'}</span>! 👋
          </h1>
          <p className="text-gray-400">You're making great progress. Keep it up!</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex items-center gap-6 backdrop-blur-md min-w-[300px]">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-white/5"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray="175.92"
                initial={{ strokeDashoffset: 175.92 }}
                animate={{ strokeDashoffset: 175.92 - (175.92 * globalProgress) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-primary"
              />
            </svg>
            <span className="absolute text-sm font-bold text-white">{globalProgress}%</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Overall Progress</h4>
            <p className="text-xs text-gray-500">Master Level: Intermediate</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden group"
            >
              <div 
                className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ color: stat.color }}
              >
                <Icon size={120} />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div 
                  className="p-3 rounded-2xl"
                  style={{ backgroundColor: `${stat.color}22` }}
                >
                  <Icon size={24} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-2xl font-black text-white">{stat.value}</h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Courses Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <PlayCircle className="text-primary" />
            Continue Learning
          </h2>
          <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
            View All <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <CourseCard 
              key={idx} 
              course={course} 
              onContinue={onContinueCourse} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningDashboard;
