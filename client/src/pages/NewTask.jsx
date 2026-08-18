import React, { useState, useEffect } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createTask, getTask, updateTask } from '../api';

export default function NewTask() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [formData, setFormData] = useState({
    title: '',
    timeStart: '',
    timeEnd: '',
    date: '',
    description: '',
    priority: 'Low'
  });

  useEffect(() => {
    if (editId) {
      fetchTask();
    }
  }, [editId]);

  const fetchTask = async () => {
    try {
      const task = await getTask(editId);
      setFormData({
        title: task.title,
        timeStart: task.time?.start || '',
        timeEnd: task.time?.end || '',
        date: task.date ? new Date(task.date).toISOString().split('T')[0] : '',
        description: task.description || '',
        priority: task.priority || 'Low'
      });
    } catch (err) {
      console.error('Error fetching task', err);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.date || !formData.timeStart || !formData.timeEnd) {
      alert('Please fill out required fields (Title, Date, Start & End time)');
      return;
    }

    const taskPayload = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: {
        start: formData.timeStart,
        end: formData.timeEnd
      },
      priority: formData.priority
    };

    try {
      if (editId) {
        await updateTask(editId, taskPayload);
      } else {
        await createTask(taskPayload);
      }
      navigate('/home');
    } catch (err) {
      console.error('Error saving task', err);
      alert('Failed to save task');
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col h-full bg-[#b0b0b0]/50 backdrop-blur-[1px]">
      {/* Dimmed Background Area */}
      <div className="flex-1" onClick={() => navigate(-1)}></div>

      {/* Bottom Sheet */}
      <div className="bg-white w-full rounded-t-xl md:rounded-t-2xl p-6 md:p-8 flex flex-col animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[20px] font-bold text-[#111827]">{editId ? 'Edit Task' : 'Add New Task'}</h2>
          <button onClick={() => navigate(-1)} className="text-gray-900 hover:bg-gray-100 p-1 rounded-full transition-colors">
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="block text-[13px] font-semibold text-[#6b7280] mb-2">Task title</label>
            <input 
              type="text" 
              placeholder="Doing Homework"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full border border-gray-200 rounded-[4px] px-3 py-2.5 text-[14px] font-medium text-gray-900 placeholder-gray-900 focus:outline-none focus:border-[#4361ee] focus:ring-1 focus:ring-[#4361ee] transition-all"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-[13px] font-semibold text-[#6b7280] mb-2">Set Time</label>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                 <input 
                    type="text" 
                    placeholder="Start"
                    onFocus={(e) => e.target.type = 'time'}
                    onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                    value={formData.timeStart}
                    onChange={(e) => setFormData({...formData, timeStart: e.target.value})}
                    className="w-full border border-gray-200 rounded-[4px] pl-10 pr-2 py-2.5 text-[14px] font-medium text-gray-900 placeholder-gray-900 focus:outline-none focus:border-[#4361ee]" 
                 />
                 <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" />
              </div>
              <div className="flex-1 relative">
                 <input 
                    type="text" 
                    placeholder="Ends"
                    onFocus={(e) => e.target.type = 'time'}
                    onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                    value={formData.timeEnd}
                    onChange={(e) => setFormData({...formData, timeEnd: e.target.value})}
                    className="w-full border border-gray-200 rounded-[4px] pl-10 pr-2 py-2.5 text-[14px] font-medium text-gray-900 placeholder-gray-900 focus:outline-none focus:border-[#4361ee]" 
                 />
                 <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-[13px] font-semibold text-[#6b7280] mb-2">Set Date</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Friday 14, January"
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full border border-gray-200 rounded-[4px] px-3 py-2.5 text-[14px] font-medium text-gray-900 placeholder-gray-900 focus:outline-none focus:border-[#4361ee] appearance-none"
              />
              <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[13px] font-semibold text-[#6b7280] mb-2">Description</label>
            <textarea 
              rows="3"
              placeholder="Add Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border border-gray-200 rounded-[4px] px-3 py-2.5 text-[14px] font-medium text-gray-900 placeholder-gray-900 focus:outline-none focus:border-[#4361ee] resize-none"
            ></textarea>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full bg-[#4361ee] text-white font-semibold text-[15px] py-3.5 rounded-[4px] mt-2 hover:bg-[#4361ee]/90 transition-all active:scale-[0.98] shadow-sm"
          >
            {editId ? 'Update task' : 'Create task'}
          </button>
        </div>
      </div>
    </div>
  );
}
