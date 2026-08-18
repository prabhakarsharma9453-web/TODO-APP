import React, { useState, useEffect } from 'react';
import { Search, Check, Plus, Trash2, Edit3, Settings, Bell, X } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTasks, updateTask, deleteTask } from '../api';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const isNewTaskOpen = location.pathname === '/new';

  // State for dates
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // Sunday
  const [selectedDate, setSelectedDate] = useState(today);
  const [searchQuery, setSearchQuery] = useState('');

  // Generate 7 days
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [selectedDate, searchQuery]);

  const fetchTasks = async () => {
    try {
      const params = { week: weekStart.toISOString() };
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      const data = await getTasks(params);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const toggleTaskStatus = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    // Optimistic UI
    setTasks(tasks.map(t => t._id === task._id ? { ...t, status: newStatus } : t));
    try {
      await updateTask(task._id, { status: newStatus });
    } catch (err) {
      // Revert if error
      fetchTasks();
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this task?')) {
      setTasks(tasks.filter(t => t._id !== id));
      try {
        await deleteTask(id);
      } catch (err) {
        fetchTasks();
      }
    }
  };

  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const pendingCount = tasks.filter(t => t.status === 'Pending').length;
  const totalTasks = tasks.length || 1;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="flex flex-col h-full bg-[#f8f8f8] relative overflow-hidden">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col h-full">
        {/* Conditional Header */}
        {isNewTaskOpen ? (
          <div className="px-6 md:px-10 pt-6 pb-2 flex justify-between items-center text-gray-800 shrink-0">
            <Settings size={24} />
            <div className="flex gap-4">
              <Search size={24} />
              <Bell size={24} />
            </div>
          </div>
        ) : (
          <div className="px-6 md:px-10 pt-8 pb-4 shrink-0">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for a task" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-[4px] py-3.5 px-4 pr-12 text-[15px] font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#4361ee]"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900" size={22} />
            </div>
          </div>
        )}

        {/* Date Strip */}
        <div className="px-6 md:px-10 py-1 flex justify-between items-center mb-4 shrink-0">
          {weekDays.map((date, idx) => {
            const isSelected = isSameDay(date, selectedDate);
            return (
              <div 
                key={idx} 
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center justify-center cursor-pointer py-3 px-1 min-w-[44px] transition-colors ${isSelected ? 'bg-[#4361ee] text-white rounded-sm shadow-sm' : 'text-[#b0b0b0] hover:bg-gray-100'}`}
              >
                <span className="text-[12px] font-medium mb-1">{format(date, 'EEE')}</span>
                <span className={`text-[15px] font-semibold ${isSelected ? 'text-white' : 'text-[#b0b0b0]'}`}>
                  {format(date, 'dd')}
                </span>
                {isSelected && <div className="w-1 h-1 bg-white rounded-full mt-1.5"></div>}
              </div>
            )
          })}
        </div>

        {/* Main Content Grid for Desktop */}
        <div className="md:grid md:grid-cols-2 md:gap-10 md:px-10 flex-1 min-h-0 flex flex-col md:flex-row">
          
          {/* Left Column (Stats) */}
          <div className="flex flex-col shrink-0 md:shrink">
            {/* Summary Cards */}
            <div className="px-6 md:px-0 flex gap-4 mb-5">
              <div className="flex-1 bg-[#e8eaf6] p-4 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-3">
                  <div className="border-[1.5px] border-[#4361ee] bg-[#4361ee]/10 w-5 h-5 flex items-center justify-center">
                    <Check size={14} className="text-[#4361ee]" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Task Complete</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold text-gray-900 leading-none">{String(completedCount).padStart(2, '0')}</span>
                  <span className="text-[11px] text-gray-500 font-medium">This Week</span>
                </div>
              </div>
          
              <div className="flex-1 bg-[#fbe9e7] p-4 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-3">
                  <div className="border-[1.5px] border-[#e5383b] bg-[#e5383b]/10 w-5 h-5 flex items-center justify-center">
                    <X size={14} className="text-[#e5383b]" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Task Pending</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold text-gray-900 leading-none">{String(pendingCount).padStart(2, '0')}</span>
                  <span className="text-[11px] text-gray-500 font-medium">This Week</span>
                </div>
              </div>
            </div>
            
            {/* Weekly Progress */}
            <div className="px-6 md:px-0 mb-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Weekly Progress</h3>
              <div className="h-4 bg-[#e8eaf6] overflow-hidden">
                <div 
                  className="h-full bg-[#3f51b5] transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Column (Tasks) */}
          <div className="flex-1 flex flex-col min-h-0 mt-4 md:mt-0">
            {/* Tasks Today */}
            <div className="px-6 md:px-0 mb-3 flex justify-between items-center shrink-0">
              <h3 className="text-base font-bold text-gray-900">Tasks Today</h3>
              <button onClick={() => navigate('/tasks')} className="text-[#4361ee] text-sm font-medium hover:underline">View All</button>
            </div>

            {/* Tasks List */}
            <div className="px-6 md:px-0 flex flex-col gap-0 pb-24 overflow-y-auto hide-scrollbar flex-1 relative">
              {tasks.length === 0 && (
                <div className="text-gray-400 text-sm mt-4">No tasks for today. Add one below!</div>
              )}
              {tasks.map(task => (
                <div key={task._id} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0 group">
                  <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleTaskStatus(task)}>
                    <div className={`w-[22px] h-[22px] flex items-center justify-center border-[1.5px] ${task.status === 'Completed' ? 'border-[#4361ee]' : 'border-[#4361ee]'}`}>
                      {task.status === 'Completed' && <Check size={16} className="text-[#4361ee]" strokeWidth={3} />}
                    </div>
                    <span className={`text-[15px] font-medium ${task.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleDelete(task._id)} className="text-[#b0b0b0] hover:text-red-500 transition-colors"><Trash2 size={20} strokeWidth={1.5} /></button>
                    <button onClick={() => navigate(`/new?edit=${task._id}`)} className="text-[#b0b0b0] hover:text-[#4361ee] transition-colors"><Edit3 size={20} strokeWidth={1.5} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button 
        onClick={() => navigate('/new')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#4361ee] text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-10"
      >
        <Plus size={32} strokeWidth={2} />
      </button>

    </div>
  );
}
