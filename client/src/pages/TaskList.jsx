import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getTasks, updateTask } from '../api';

export default function TaskList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchTasks(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchTasks = async (query) => {
    try {
      const data = await getTasks({ search: query });
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTaskStatus = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    setTasks(tasks.map(t => t._id === task._id ? { ...t, status: newStatus } : t));
    try {
      await updateTask(task._id, { status: newStatus });
    } catch (err) {
      fetchTasks(search);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative pb-10 overflow-y-auto">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="px-6 md:px-10 pt-10 pb-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Search */}
      <div className="px-6 md:px-10 pb-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Finish" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 shadow-sm rounded-xl py-4 px-5 pr-12 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Task List */}
      <div className="px-6 md:px-10 flex flex-col gap-0">
        {tasks.map((task, idx, arr) => (
          <div key={task._id}>
            <div className="flex items-center gap-4 py-4 group cursor-pointer" onClick={() => toggleTaskStatus(task)}>
               <div className={`w-[22px] h-[22px] rounded flex items-center justify-center border-2 ${task.status === 'Completed' ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                 {task.status === 'Completed' && <CheckSquare size={16} className="text-white" />}
               </div>
               <span className={`text-[15px] font-semibold ${task.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                 {task.title}
               </span>
               {/* Hidden edit button just for easy navigation from this view */}
               <button 
                 onClick={(e) => { e.stopPropagation(); navigate(`/new?edit=${task._id}`); }}
                 className="ml-auto text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 Edit
               </button>
            </div>
            {idx < arr.length - 1 && <hr className="border-gray-100 ml-[38px]" />}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
