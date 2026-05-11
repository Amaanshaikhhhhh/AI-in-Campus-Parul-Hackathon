import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user, userData } = useAuth();

  return (
    <>
      {/* Hero Content Area */}
      <main className="relative z-30 flex-1 flex flex-col items-center justify-end pb-24 px-6 text-center">
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-10 tracking-tight" 
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Click. Notify. Simplify
        </h1>
        {user && (
          <Link
            to={userData?.role === 'faculty' ? '/faculty-dashboard' : '/student-dashboard'}
            className="mt-8 liquid-glass rounded-full px-8 py-4 text-white text-lg font-medium hover:bg-white/10 transition-colors shadow-lg shadow-white/5"
          >
            Go to Dashboard
          </Link>
        )}
      </main>
    </>
  );
}
