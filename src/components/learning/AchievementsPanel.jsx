import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Users, Target, Award } from 'lucide-react';
import BadgeCard from './BadgeCard';

const AchievementsPanel = ({ progress }) => {
  const badges = [
    {
      id: 'beginner',
      title: 'Beginner Explorer',
      description: 'Reach 25% overall progress to unlock.',
      icon: Target,
      color: '#3B82F6',
      threshold: 25
    },
    {
      id: 'fast-learner',
      title: 'Fast Learner',
      description: 'Reach 50% overall progress to unlock.',
      icon: Zap,
      color: '#F59E0B',
      threshold: 50
    },
    {
      id: 'consistency',
      title: 'Consistency King',
      description: 'Reach 75% overall progress to unlock.',
      icon: Star,
      color: '#EF4444',
      threshold: 75
    },
    {
      id: 'ai-communicator',
      title: 'AI Communicator',
      description: 'Reach 100% overall progress to unlock.',
      icon: Award,
      color: '#10B981',
      threshold: 100
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-500/20 rounded-lg">
          <Trophy className="text-yellow-500" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Your Achievements</h2>
          <p className="text-gray-400 text-sm">Track your milestones and unlock special badges.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <BadgeCard 
            key={badge.id} 
            badge={badge} 
            isUnlocked={progress >= badge.threshold} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="glass-card p-6 bg-white/5 border-white/10 rounded-3xl relative overflow-hidden group">
          <div className="relative z-10 flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-2xl">
              <Star className="text-primary" size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">Weekly Challenge</h4>
              <p className="text-sm text-gray-400 mb-4">Complete 3 new courses this week to earn bonus XP.</p>
              <div className="flex items-center gap-2">
                <div className="flex-grow h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/3 rounded-full" />
                </div>
                <span className="text-xs font-bold text-white">1/3</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 bg-white/5 border-white/10 rounded-3xl relative overflow-hidden group">
          <div className="relative z-10 flex items-start gap-4">
            <div className="p-3 bg-purple-500/20 rounded-2xl">
              <Users className="text-purple-500" size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">Community Leaderboard</h4>
              <p className="text-sm text-gray-400 mb-4">You are in the top 15% of learners this month!</p>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition-all">
                View Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPanel;
