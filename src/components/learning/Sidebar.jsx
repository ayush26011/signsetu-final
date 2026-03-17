import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Settings, 
  GraduationCap,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'settings', label: 'Preferences', icon: Settings },
  ];

  return (
    <div className="w-72 hidden lg:flex flex-col h-full bg-black/30 border-r border-white/10 p-6 space-y-8 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-2">
        <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20">
          <GraduationCap className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tight text-white">SignSetu</h2>
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Learning Hub</span>
        </div>
      </div>

      <nav className="flex-grow space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={isActive ? 'text-white' : 'group-hover:text-primary transition-colors'} />
                <span className="font-semibold text-sm">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} />}
            </motion.button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="p-5 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-all" />
          <div className="relative z-10">
            <Sparkles className="text-primary mb-3" size={24} />
            <h4 className="text-sm font-bold text-white mb-1">Pass AI Test</h4>
            <p className="text-xs text-gray-400 mb-4">Validate your signs with our AI model.</p>
            <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg">
              Start Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
