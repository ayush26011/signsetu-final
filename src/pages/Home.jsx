import { motion } from 'framer-motion';
import { Camera, BookOpen, Globe, Accessibility, ShieldCheck, Zap, ArrowRight, Play, Github, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SplineScene } from '../components/ui/splite';
import { Spotlight } from '../components/ui/spotlight';
import SplitText from '../components/ui/SplitText';

const fadeInRules = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function Home() {
  useEffect(() => {
    // Handle smooth scrolling for hash links on load or map
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="home-page">
      {/* 2. Enhanced Hero Section */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#020617]">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] z-0" />
        
        {/* Spotlight Effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        {/* Animated Stars/Particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
                y: [0, -30, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6">
          {/* Left: Content */}
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInRules}
            className="flex flex-col gap-6 items-center text-center"
          >
            <SplitText
              text="Breaking Communication Barriers with AI"
              className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#DED1B6]"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              tag="h1"
            />
            <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
              SignSetu uses advanced artificial intelligence to translate sign language in real time, 
              empowering communication and connection for everyone.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link to="/detection" className="btn btn-primary bg-blue-600 hover:bg-blue-500 border-none px-8 py-3 text-lg">
                Start Live Detection
              </Link>
              <Link to="/learning" className="btn btn-glass text-white border-white/20 hover:bg-white/10 px-8 py-3 text-lg">
                Explore Learning <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Spline 3D Scene */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[400px] md:h-[600px] w-full"
          >
            {/* Subtle glow behind model */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" />
            
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full relative z-10"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. Core Features */}
      <section className="features-section section">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRules}>
            Core Features
          </motion.h2>
          <div className="features-grid">
            <FeatureCard icon={<Camera />} title="AI Live Detection" desc="Real-time sign language detection using camera and AI." />
            <FeatureCard icon={<BookOpen />} title="Interactive Learning" desc="Learn sign language through guided lessons and AI feedback." />
            <FeatureCard icon={<Globe />} title="Global Community" desc="Connect with users through rooms, chats, and video interactions." />
            <FeatureCard icon={<Accessibility />} title="Accessibility Tools" desc="Tools specially designed for deaf and mute users." />
          </div>
        </div>
      </section>

      {/* NEW: About SignSetu */}
      <section id="about" className="about-section section bg-alt">
        <div className="container">
          <motion.div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRules}>
            <h2>About SignSetu</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
              SignSetu is an AI-powered platform helping deaf and mute individuals communicate using state-of-the-art sign language detection,
              interactive learning modules, and real-time community interaction. Our mission is to break global communication barriers.
            </p>
          </motion.div>

          <motion.h3 style={{ textAlign: 'center', marginBottom: '3rem' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRules}>
            Developers
          </motion.h3>

          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <DeveloperCard
              name="Ayush Tiwari"
              role="AI Developer"
              img="https://i.postimg.cc/Nfh3bbdn/ayushsignsetu.jpg"
            />
            <DeveloperCard
              name="Saumya Agrahari"
              role="Frontend Developer"
              img="https://i.postimg.cc/Hkv3vkpp/somi1.jpg"
            />
            <DeveloperCard
              name="Unnati Kesarwani"
              role="Backend Developer"
              img="https://i.postimg.cc/htmbsb5F/badtameez.jpg"
            />
            <DeveloperCard
              name="Anshuman Rai"
              role="UI/UX Designer"
              img="https://i.postimg.cc/BbdPPR3z/hanger.jpg"
            />
          </div>
        </div>
      </section>

      {/* 4. Learning Preview (Netflix/Coursera style) */}
      <section className="learning-preview section bg-alt">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRules}>
            Start Learning
          </motion.h2>
          <div className="horizontal-scroll">
            <CourseCard title="Beginner Sign Language" level="Beginner" duration="2 Hrs" progress={0} />
            <CourseCard title="Daily Communication Signs" level="Intermediate" duration="4 Hrs" progress={20} />
            <CourseCard title="Emergency Signs" level="All Levels" duration="1 Hr" progress={100} />
            <CourseCard title="Advanced Sign Language" level="Advanced" duration="6 Hrs" progress={0} />
          </div>
        </div>
      </section>

      {/* 5. Community Preview */}
      <section className="community-preview section">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRules}>
            Community Activity
          </motion.h2>
          <div className="community-grid">
            <div className="glass-card feed-card">
              <h4>Trending Rooms</h4>
              <p>Sign Practice • 12 Online</p>
              <button className="btn btn-secondary">Join</button>
            </div>
            <div className="glass-card feed-card">
              <h4>Live Sign Discussions</h4>
              <p>Discussing new ASL updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AI Technology Section */}
      <section className="ai-tech section bg-primary text-white">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRules} className="text-white">
            Powered by Next-Gen AI
          </motion.h2>
          <div className="features-grid">
            <FeatureCard dark icon={<Camera />} title="AI Detection" />
            <FeatureCard dark icon={<Zap />} title="Machine Learning" />
            <FeatureCard dark icon={<ShieldCheck />} title="Computer Vision" />
            <FeatureCard dark icon={<Accessibility />} title="Accessibility Innovation" />
          </div>
        </div>
      </section>

      {/* 10. Call To Action */}
      <section className="cta-section section text-center">
        <div className="container">
          <div className="glass-card cta-box">
            <h2>Start Communicating Without Barriers</h2>
            <div className="hero-actions">
              <Link to="/detection" className="btn btn-primary glow-effect">Try Live Detection</Link>
              <Link to="/community" className="btn btn-glass">Join the Community</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, dark }) {
  return (
    <motion.div className={`glass-card feature-card ${dark ? 'dark-card' : ''}`} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInRules}>
      <div className="feature-icon animate-float">{icon}</div>
      <h3>{title}</h3>
      {desc && <p>{desc}</p>}
    </motion.div>
  );
}

function CourseCard({ title, level, duration, progress }) {
  return (
    <motion.div className="glass-card course-card-mini" whileHover={{ scale: 1.05 }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInRules}>
      <div className="course-thumb"><Play size={24} color="#FFF" className="animate-float" style={{ animationDuration: '4s' }} /></div>
      <h4>{title}</h4>
      <div className="course-meta">
        <span>{level}</span> • <span>{duration}</span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }}></div></div>
      </div>
    </motion.div>
  );
}

function DeveloperCard({ name, role, img }) {
  return (
    <motion.div className="glass-card developer-card tilt-card flex-center" style={{ flexDirection: 'column', padding: '2rem 1.5rem', textAlign: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInRules}>
      <img src={img} alt={name} style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem', border: '3px solid var(--color-primary)', objectFit: 'cover' }} />
      <h4 style={{ margin: '0 0 0.5rem 0' }}>{name}</h4>
      <p style={{ margin: '0 0 1.5rem 0', color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 600 }}>{role}</p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <a href="#" className="social-icon-btn glow-effect-hover"><Instagram size={20} /></a>
        <a href="#" className="social-icon-btn glow-effect-hover"><Github size={20} /></a>
        <a href="#" className="social-icon-btn glow-effect-hover"><Linkedin size={20} /></a>
      </div>
    </motion.div>
  );
}