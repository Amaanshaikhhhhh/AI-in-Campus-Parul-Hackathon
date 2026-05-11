import React, { useState } from 'react';
import { 
  BellRing, 
  Layers, 
  Building2, 
  History, 
  BarChart3, 
  LogOut, 
  Send,
  Plus,
  Home
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

type Tab = 'post' | 'categories' | 'departments' | 'recent' | 'analytics';

export default function FacultyDashboard() {
  const { user, userData, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('post');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { id: 'post', label: 'Post Notification', icon: Send },
    { id: 'categories', label: 'Notification Categories', icon: Layers },
    { id: 'departments', label: 'Select Department', icon: Building2 },
    { id: 'recent', label: 'Recent Notifications', icon: History },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white overflow-hidden font-sans">
      {/* Left Sidebar */}
      <aside className="w-72 bg-black/40 border-r border-white/5 backdrop-blur-xl flex flex-col pt-6 pb-6 shadow-2xl relative z-10">
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E97262] to-[#c75141] flex items-center justify-center">
            <BellRing size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Faculty Portal</h1>
            <p className="text-xs text-white/40 uppercase tracking-wider">{userData?.role || 'Faculty'}</p>
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
                <Icon size={18} className={isActive ? 'text-[#E97262]' : ''} />
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E97262]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 px-10 py-12 max-w-5xl mx-auto h-full flex flex-col">
          {/* Header */}
          <header className="mb-10 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                {navItems.find(i => i.id === activeTab)?.label}
              </h2>
              <p className="text-white/50 text-sm">
                Manage your alerts and monitor engagement effectively.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'F'}
              </div>
              <span className="text-sm font-medium pr-2">
                {user?.displayName || user?.email?.split('@')[0]}
              </span>
            </div>
          </header>

          {/* Dynamic Content Views */}
          <div className="flex-1 bg-white/5 border border-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-2xl overflow-hidden relative">
            
            {activeTab === 'post' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Send className="text-[#E97262]" size={20} /> Create New Notification
                </h3>
                <div className="space-y-6 flex-1 text-sm">
                  <div>
                    <label className="block text-white/60 mb-2 pl-1">Target Department</label>
                    <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E97262]/50 transition-colors appearance-none">
                      <option>All Departments</option>
                      <option>Computer Science</option>
                      <option>Mechanical</option>
                      <option>Civil</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/60 mb-2 pl-1">Category</label>
                    <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E97262]/50 transition-colors appearance-none">
                      <option>Exams</option>
                      <option>Events</option>
                      <option>Important Alerts</option>
                      <option>General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/60 mb-2 pl-1">Notification Title</label>
                    <input type="text" placeholder="e.g. Mid Semester Exams Schedule" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E97262]/50 transition-colors" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className="block text-white/60 mb-2 pl-1">Message Content</label>
                    <textarea placeholder="Write the details here..." className="w-full flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#E97262]/50 transition-colors resize-none min-h-[150px]"></textarea>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button className="bg-[#E97262] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#E97262]/90 transition-all active:scale-[0.98] shadow-lg shadow-[#E97262]/20">
                      Publish Notification
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Layers className="text-[#E97262]" size={20} /> Manage Categories
                  </h3>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-white/10">
                    <Plus size={16} /> Add Category
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Exams & Academics', 'Events & Fests', 'Placements', 'Important Alerts', 'Fees & Admin'].map((cat, i) => (
                    <div key={i} className="bg-black/30 border border-white/5 rounded-xl p-5 hover:border-white/20 transition-all cursor-pointer group">
                      <div className="font-medium text-white mb-1 group-hover:text-[#E97262] transition-colors">{cat}</div>
                      <div className="text-xs text-white/40">{Math.floor(Math.random() * 50) + 5} active posts</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'departments' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Building2 className="text-[#E97262]" size={20} /> Department Routing
                </h3>
                <div className="bg-black/30 border border-white/5 rounded-2xl p-6 text-sm text-white/60 mb-6">
                  Select which departments receive your notifications by default, or manage department-specific sub-groups.
                </div>
                <div className="space-y-3">
                  {['Computer Science & Engineering', 'Information Technology', 'Civil Engineering', 'Mechanical', 'Business Administration'].map((dept, i) => (
                    <label key={i} className="flex items-center justify-between bg-black/40 border border-white/5 rounded-xl p-4 cursor-pointer hover:bg-white/5 transition-colors">
                      <span className="font-medium text-white/90">{dept}</span>
                      <input type="checkbox" className="w-5 h-5 accent-[#E97262] bg-white/10 border-white/20 cursor-pointer rounded-md" defaultChecked={i < 2} />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'recent' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <History className="text-[#E97262]" size={20} /> Recent Notifications
                </h3>
                <div className="space-y-4 overflow-y-auto pr-2 pb-10">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-black/40 border border-white/10 rounded-xl p-5 flex gap-4 hover:bg-white/5 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <BellRing size={16} className="text-white/60" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-white/90">Mid Sem Schedule Revised</h4>
                          <span className="text-xs text-white/40">{i} hr ago</span>
                        </div>
                        <p className="text-sm text-white/60 mb-3 line-clamp-2">
                          Please note the updated schedule for the mid-semester examinations. The exams starting from Monday have been pushed to Wednesday.
                        </p>
                        <div className="flex gap-2">
                          <span className="text-[10px] uppercase tracking-wider font-semibold bg-[#E97262]/20 text-[#E97262] px-2 py-1 rounded">Exams</span>
                          <span className="text-[10px] uppercase tracking-wider font-semibold bg-white/10 text-white/60 px-2 py-1 rounded">All Departments</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
                  <BarChart3 className="text-[#E97262]" size={20} /> Engagement Analytics
                </h3>
                
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                    <div className="text-5xl font-bold text-white mb-2">1.2k</div>
                    <div className="text-sm text-white/50 uppercase tracking-widest font-semibold flex items-center justify-between">
                      Views Today <span className="text-green-400 text-xs">+12%</span>
                    </div>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                    <div className="text-5xl font-bold text-white mb-2">86%</div>
                    <div className="text-sm text-white/50 uppercase tracking-widest font-semibold flex items-center justify-between">
                      Open Rate <span className="text-green-400 text-xs">+4%</span>
                    </div>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                    <div className="text-5xl font-bold text-white mb-2">45</div>
                    <div className="text-sm text-white/50 uppercase tracking-widest font-semibold flex items-center justify-between">
                      Total Posts <span className="text-white/30 text-xs">This Month</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/40 border border-white/5 rounded-2xl p-8 h-64 flex flex-col items-center justify-center text-white/30">
                  <BarChart3 size={48} className="mb-4 opacity-50" />
                  <p className="text-sm">Detailed charts and graphs will appear here.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
