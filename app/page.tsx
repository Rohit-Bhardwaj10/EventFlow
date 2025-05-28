"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Star, ArrowRight, Play } from 'lucide-react';
import SimpleNavbar from './components/navbar/page';
import { TypewriterEffect } from './components/ui/typewriter-effect';

interface MousePosition {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
}

interface Stat {
  number: string;
  label: string;
}

const Particles: React.FC = () => {
  const particles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const EventFlowHero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const stats: Stat[] = [
    { number: "10K+", label: "Events Created" },
    { number: "50K+", label: "Happy Users" },
    { number: "99.9%", label: "Uptime" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

// Simple Navbar that blends with the background

  return (
    <div className="min-h-screen overflow-hidden relative bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 linear-gradient(135deg, #0f2027 0%, #2c5364 100%)"
          animate={{
            background: [
              "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)", 
              "linear-gradient(135deg, #2c5364 0%, #0f2027 100%)",
              "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)",
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          top: "10%",
          left: "10%"
        }}
        animate={{
          y: [0, -30, 15, 0],
          x: [0, 20, -10, 0],
          rotate: [0, 120, 240, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute w-48 h-48 rounded-full opacity-20 blur-3xl"
        style={{
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          top: "60%",
          right: "20%"
        }}
        animate={{
          y: [0, 25, -15, 0],
          x: [0, -15, 10, 0],
          rotate: [0, -120, -240, -360]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -7
        }}
      />

      <motion.div
        className="absolute w-60 h-60 rounded-full opacity-20 blur-3xl"
        style={{
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          bottom: "20%",
          left: "20%"
        }}
        animate={{
          y: [0, -20, 10, 0],
          x: [0, 15, -5, 0],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -14
        }}
      />

      {/* Particles */}
      <Particles />

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
        }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5
        }}
      />


      <SimpleNavbar />

      {/* Hero Content */}
      <div className="flex items-center justify-center min-h-screen px-6 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline */}
          <motion.h1 
            className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight lubrifont"
            variants={itemVariants}
          >
            Campus events
            <br />
            <motion.span 
              className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            > 
              without the chaos
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Transform how your organization plans, manages, and executes events including payments. 
            From intimate gatherings to campus-wide celebrations, all managed by you, with seamless payments built in.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={itemVariants}
          >
            <motion.button 
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center space-x-3 shadow-2xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 50px rgba(139, 92, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span>Create Your First Event</span>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div 
                className="text-3xl font-bold text-white mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  delay: 1.4 
                }}
              >
                100%
              </motion.div>
              <div className="text-gray-400 text-sm">Customizable</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div 
                className="text-3xl font-bold text-white mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  delay: 1.5 
                }}
              >
                24/7
              </motion.div>
              <div className="text-gray-400 text-sm">Support</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div 
                className="text-3xl font-bold text-white mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  delay: 1.6 
                }}
              >
                100%            
              </motion.div>
              <div className="text-gray-400 text-sm">Payments Supprot</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};




export default EventFlowHero;

