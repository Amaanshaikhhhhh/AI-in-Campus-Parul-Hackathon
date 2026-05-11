import React, { useState } from 'react';
import { 
  Bell, 
  CalendarDays, 
  BookOpen, 
  History, 
  LogOut, 
  Home,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

type Tab = 'feed' | 'timetable' | 'classes' | 'history';

export default function StudentDashboard() {
  const { user, userData, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { id: 'feed', label: 'Notification Feed', icon: Bell },
    { id: 'timetable', label: 'TimeTable', icon: CalendarDays },
    { id: 'classes', label: 'Lectures / Lab', icon: BookOpen },
    { id: 'history', label: 'Notification History', icon: History },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white overflow-hidden font-sans">
      {/* Left Sidebar */}
      <aside className="w-72 bg-black/40 border-r border-white/5 backdrop-blur-xl flex flex-col pt-6 pb-6 shadow-2xl relative z-10">
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#3730A3] flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Student Portal</h1>
            <p className="text-xs text-white/40 uppercase tracking-wider">{userData?.role || 'Student'}</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-medium ${
                  isActive 
                    ? 'bg-white/10 text-white shadow-lg shadow-white/5 translate-x-1 border border-white/10' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#4F46E5]' : ''} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-4 mt-auto space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium text-white/50 hover:text-white hover:bg-white/5"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-400/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 right-0 overflow-y-auto relative bg-[#0a0a0a]">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4F46E5]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 px-10 py-12 max-w-5xl mx-auto h-full flex flex-col">
          {/* Header */}
          <header className="mb-10 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                {navItems.find(i => i.id === activeTab)?.label}
              </h2>
              <p className="text-white/50 text-sm">
                Stay updated with your daily academic schedule and alerts.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'S'}
              </div>
              <span className="text-sm font-medium pr-2">
                {user?.displayName || user?.email?.split('@')[0]}
              </span>
            </div>
          </header>

          {/* Dynamic Content Views */}
          <div className="flex-1 bg-white/5 border border-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-2xl overflow-hidden relative">
            
            {activeTab === 'feed' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Bell className="text-[#4F46E5]" size={20} /> Latest Updates
                </h3>
                <div className="space-y-4 overflow-y-auto pr-2 pb-10">
                  {/* Mock notification cards */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-black/40 border border-[#4F46E5]/20 rounded-xl p-5 hover:bg-white/5 transition-colors relative overflow-hidden group">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4F46E5]"></div>
                      <div className="flex gap-4">
                        <div className="flex-1 ml-2">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-white">Lab schedule changes for CS-301</h4>
                            <span className="text-xs text-[#4F46E5] font-medium">New</span>
                          </div>
                          <p className="text-sm text-white/60 mb-3">
                            The laboratory session scheduled for Tuesday at 10 AM is shifted to Wednesday 2 PM in Room 404.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase tracking-wider font-semibold bg-white/10 text-white/60 px-2 py-1 rounded">Dept: Computer Science</span>
                            <button className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition-colors">
                              <CheckCircle2 size={12} /> Mark as Read
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-5 hover:bg-white/5 transition-colors">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-white/90">Mid Sem Schedule Released</h4>
                        <span className="text-xs text-white/40">2 hrs ago</span>
                      </div>
                      <p className="text-sm text-white/60 mb-3 line-clamp-2">
                        Timetable for the mid-semester evaluation is now available on the portal. Please ensure to check your respective subjects.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase tracking-wider font-semibold bg-white/10 text-white/60 px-2 py-1 rounded">Exams &amp; Academics</span>
                        <button className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition-colors">
                          <CheckCircle2 size={12} /> Mark as Read
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'timetable' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                 <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <CalendarDays className="text-[#4F46E5]" size={20} /> Weekly Schedule
                  </h3>
                  <select className="bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-[#4F46E5]/50 transition-colors">
                    <option className="bg-black">Current Week</option>
                    <option className="bg-black">Next Week</option>
                  </select>
                </div>
                
                {/* Simplified TimeTable Grid */}
                <div className="flex-1 overflow-auto rounded-xl border border-white/10 bg-black/20">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white/5 text-white/60 sticky top-0">
                      <tr>
                        <th className="px-6 py-4 font-medium border-b border-white/10">Time</th>
                        <th className="px-6 py-4 font-medium border-b border-white/10">Monday</th>
                        <th className="px-6 py-4 font-medium border-b border-white/10">Tuesday</th>
                        <th className="px-6 py-4 font-medium border-b border-white/10">Wednesday</th>
                        <th className="px-6 py-4 font-medium border-b border-white/10">Thursday</th>
                        <th className="px-6 py-4 font-medium border-b border-white/10">Friday</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { time: '09:00 AM', mon: 'CS-301 (L)', tue: 'CS-302 (L)', wed: 'Math-201 (L)', thu: 'CS-301 (L)', fri: 'CS-303 (L)' },
                        { time: '10:00 AM', mon: 'CS-302 (L)', tue: 'Math-201 (L)', wed: 'CS-301 (T)', thu: 'CS-303 (L)', fri: 'Open Elective' },
                        { time: '11:00 AM', mon: '', tue: 'CS-303 (T)', wed: '', thu: 'CS-302 (T)', fri: '' },
                        { time: '01:00 PM', mon: 'CS-301 Lab (G1)', tue: 'CS-302 Lab (G1)', wed: 'CS-301 Lab (G2)', thu: 'CS-302 Lab (G2)', fri: 'Mini Project' }
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 text-white/40 whitespace-nowrap">{row.time}</td>
                          <td className="px-6 py-4 font-medium"><span className={row.mon ? "bg-[#4F46E5]/20 text-[#818cf8] px-3 py-1 rounded-md" : ""}>{row.mon}</span></td>
                          <td className="px-6 py-4 font-medium"><span className={row.tue ? "bg-[#4F46E5]/20 text-[#818cf8] px-3 py-1 rounded-md" : ""}>{row.tue}</span></td>
                          <td className="px-6 py-4 font-medium"><span className={row.wed ? "bg-[#4F46E5]/20 text-[#818cf8] px-3 py-1 rounded-md" : ""}>{row.wed}</span></td>
                          <td className="px-6 py-4 font-medium"><span className={row.thu ? "bg-[#4F46E5]/20 text-[#818cf8] px-3 py-1 rounded-md" : ""}>{row.thu}</span></td>
                          <td className="px-6 py-4 font-medium"><span className={row.fri ? "bg-white/10 text-white/80 px-3 py-1 rounded-md" : ""}>{row.fri}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'classes' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <BookOpen className="text-[#4F46E5]" size={20} /> Today's Lectures & Labs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Data Structures and Algorithms', type: 'Lecture', code: 'CS-301', time: '09:00 AM - 10:00 AM', room: 'Room 204' },
                    { title: 'Operating Systems', type: 'Lecture', code: 'CS-302', time: '10:00 AM - 11:00 AM', room: 'Room 204' },
                    { title: 'Data Structures Lab', type: 'Lab', code: 'CS-301L', time: '01:00 PM - 03:00 PM', room: 'Computer Center 2' },
                  ].map((cls, i) => (
                    <div key={i} className="bg-black/30 border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-all group">
                      <div className="flex justify-between items-start mb-3">
                        <div className="inline-block text-[10px] uppercase tracking-wider font-semibold bg-[#4F46E5]/20 text-[#818cf8] px-2 py-1 rounded">
                          {cls.type}
                        </div>
                        <span className="text-xs text-white/40">{cls.room}</span>
                      </div>
                      <h4 className="font-semibold text-white/90 mb-1">{cls.title}</h4>
                      <p className="text-sm text-white/50 mb-4">{cls.code}</p>
                      <div className="text-sm font-medium bg-black/50 py-2 px-3 rounded-lg border border-white/5 inline-block text-white/80">
                        {cls.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <History className="text-[#4F46E5]" size={20} /> Older Notifications
                </h3>
                <div className="space-y-3 overflow-y-auto pr-2 pb-10">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="opacity-60 bg-black/20 border border-white/5 rounded-xl p-5 flex gap-4 hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                        <Bell size={14} className="text-white/40" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-white/80">Fee Submission Deadline Reminder</h4>
                          <span className="text-xs text-white/30">{i + 2} days ago</span>
                        </div>
                        <p className="text-sm text-white/50 line-clamp-1">
                          The last date for submitting the semester fee is coming up. Please ensure...
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
