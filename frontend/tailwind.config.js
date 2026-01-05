/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(100%) scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100%) scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
        },
        fadeInZoom: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95) translateY(40px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        shineSwipe: {
          '0%': {
            left: '-75%',
          },
          '100%': {
            left: '125%',
          },
        },
        floatUp: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        energyGrow: {
          '0%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0px rgba(255, 255, 255, 0.1)',
          },
          '50%': {
            transform: 'scale(1.1)',
            boxShadow: '0 0 25px rgba(255, 255, 255, 0.5)',
          },
          '100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
          },
        },
        floatEnergy: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },

        // ✅ ADDED for glow & background animations
        glowPulse: {
          '0%': {
            boxShadow: '0 0 0px rgba(255,255,255,0.05)',
          },
          '50%': {
            boxShadow: '0 0 25px rgba(255,255,255,0.15)',
          },
          '100%': {
            boxShadow: '0 0 0px rgba(255,255,255,0.05)',
          },
        },
        shineMove: {
          '0%': {
            transform: 'translateX(-100%) rotate(25deg)',
            opacity: '0',
          },
          '50%': {
            opacity: '0.5',
          },
          '100%': {
            transform: 'translateX(200%) rotate(25deg)',
            opacity: '0',
          },
        },
        gradientMove: {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      },
      animation: {
        slideInRight: 'slideInRight 0.7s ease-in-out forwards',
        slideInLeft: 'slideInLeft 0.7s ease-in-out forwards',
        fadeInZoom: 'fadeInZoom 1.5s ease-out both',
        shineSwipe: 'shineSwipe 1s ease-in-out forwards',
        pulseSlow: 'pulse 5s infinite',
        bounce: 'bounce 2s infinite',
        floatUp: 'floatUp 8s ease-in-out infinite',
        fadeUp: 'fadeUp 1s ease-out both',
        float: 'float 4s ease-in-out infinite',
        energyGrow: 'energyGrow 2.5s ease-in-out forwards',
        floatEnergy: 'floatEnergy 4s ease-in-out infinite',

        // ✅ ADDED
        glowPulse: 'glowPulse 6s ease-in-out infinite',
        shineMove: 'shineMove 2s ease-in-out infinite',
        gradientMove: 'gradientMove 60s ease infinite',
      },
    },
  },
  plugins: [scrollbarHide],
};
