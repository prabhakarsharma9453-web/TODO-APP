import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top Blue Hero */}
      <div className="h-[55vh] bg-primary rounded-b-[40px] relative overflow-hidden flex-shrink-0">
        {/* Decorative elements - abstract waves/circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute top-1/4 left-8 flex flex-col opacity-20 transform -rotate-12">
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10C10 10 10 0 20 0C30 0 30 10 40 10C50 10 50 0 60 0" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M0 20C10 20 10 10 20 10C30 10 30 20 40 20C50 20 50 10 60 10" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M0 30C10 30 10 20 20 20C30 20 30 30 40 30C50 30 50 20 60 20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="absolute bottom-12 right-6 flex flex-col opacity-20">
           <svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10C10 10 10 0 20 0C30 0 30 10 40 10C50 10 50 0 60 0C70 0 70 10 80 10" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M0 25C10 25 10 15 20 15C30 15 30 25 40 25C50 25 50 15 60 15C70 15 70 25 80 25" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M0 40C10 40 10 30 20 30C30 30 30 40 40 40C50 40 50 30 60 30C70 30 70 40 80 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="flex-1 flex flex-col px-8 md:px-16 pt-10 pb-12 justify-between max-w-2xl mx-auto w-full">
        <div className="md:text-center">
          <h1 className="text-[28px] font-bold text-gray-900 mb-4 tracking-tight">Manage What To Do</h1>
          <p className="text-gray-500 text-[15px] leading-relaxed max-w-[280px]">
            The best way to manage what you have to do, don't forget your plans
          </p>
        </div>
        
        <div className="w-full flex justify-center">
          <button 
            onClick={() => navigate('/home')}
            className="w-full md:w-80 bg-primary text-white font-semibold text-lg py-4 rounded-2xl hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/30"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
