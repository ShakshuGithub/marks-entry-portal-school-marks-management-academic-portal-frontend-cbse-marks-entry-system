
import React, { useState } from 'react';
import { AppConfig, ClassKey, SubjectSet, ExamSet } from '../types';

interface Props {
  config: AppConfig;
  onSave: (newConfig: AppConfig) => void;
}

const ConfigManager: React.FC<Props> = ({ config, onSave }) => {
  const [localConfig, setLocalConfig] = useState<AppConfig>(config);

  const classes: ClassKey[] = ['6', '7', '8', '9', '10', '11S', '11C', '12S', '12C'];

  const addSubjectSet = () => {
    const id = `sub_${Date.now()}`;
    const newSet: SubjectSet = { id, name: 'New Subject Set', subjects: ['Subject 1'] };
    setLocalConfig({ ...localConfig, subjectSets: [...localConfig.subjectSets, newSet] });
  };

  const updateSubjectSet = (id: string, name: string, subjects: string[]) => {
    setLocalConfig({
      ...localConfig,
      subjectSets: localConfig.subjectSets.map(s => s.id === id ? { ...s, name, subjects } : s)
    });
  };

  const removeSubjectSet = (id: string) => {
    setLocalConfig({
      ...localConfig,
      subjectSets: localConfig.subjectSets.filter(s => s.id !== id)
    });
  };

  const addExamSet = () => {
    const id = `ex_${Date.now()}`;
    const newSet: ExamSet = { id, name: 'New Exam Set', exams: ['Exam 1'] };
    setLocalConfig({ ...localConfig, examSets: [...localConfig.examSets, newSet] });
  };

  const updateExamSet = (id: string, name: string, exams: string[]) => {
    setLocalConfig({
      ...localConfig,
      examSets: localConfig.examSets.map(e => e.id === id ? { ...e, name, exams } : e)
    });
  };

  const removeExamSet = (id: string) => {
    setLocalConfig({
      ...localConfig,
      examSets: localConfig.examSets.filter(e => e.id !== id)
    });
  };

  const updateClassAssignment = (cls: ClassKey, field: 'subjectSetId' | 'examSetId', val: string) => {
    setLocalConfig({
      ...localConfig,
      classAssignments: {
        ...localConfig.classAssignments,
        [cls]: {
          ...localConfig.classAssignments[cls],
          [field]: val
        }
      }
    });
  };

  return (
    <div className="p-6 space-y-12">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-black text-slate-800">ADMINISTRATIVE CONFIGURATION</h2>
        <button 
          onClick={() => onSave(localConfig)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded-lg shadow-lg"
        >
          SAVE CONFIGURATION
        </button>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-700 uppercase tracking-widest">1. Manage Subject Sets</h3>
          <button onClick={addSubjectSet} className="text-xs bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded hover:bg-emerald-200">+ Add New Set</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localConfig.subjectSets.map(set => (
            <div key={set.id} className="p-4 border rounded-xl bg-slate-50 relative group">
              <button 
                onClick={() => removeSubjectSet(set.id)}
                className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
              <input 
                type="text" 
                value={set.name} 
                onChange={(e) => updateSubjectSet(set.id, e.target.value, set.subjects)}
                className="w-full bg-transparent font-bold text-slate-800 text-sm mb-3 border-b border-slate-300 focus:border-blue-500 outline-none pb-1"
                placeholder="Set Name"
              />
              <textarea 
                value={set.subjects.join(', ')}
                onChange={(e) => updateSubjectSet(set.id, set.name, e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                className="w-full p-2 text-xs h-24 border rounded bg-white font-mono"
                placeholder="Subjects (comma separated)"
              />
              <p className="text-[10px] text-slate-400 mt-1 italic">Example: Kannada, English, Hindi...</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-700 uppercase tracking-widest">2. Manage Exam Sets</h3>
          <button onClick={addExamSet} className="text-xs bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded hover:bg-emerald-200">+ Add New Set</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localConfig.examSets.map(set => (
            <div key={set.id} className="p-4 border rounded-xl bg-slate-50 relative group">
              <button 
                onClick={() => removeExamSet(set.id)}
                className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
              <input 
                type="text" 
                value={set.name} 
                onChange={(e) => updateExamSet(set.id, e.target.value, set.exams)}
                className="w-full bg-transparent font-bold text-slate-800 text-sm mb-3 border-b border-slate-300 focus:border-blue-500 outline-none pb-1"
                placeholder="Set Name"
              />
              <textarea 
                value={set.exams.join(', ')}
                onChange={(e) => updateExamSet(set.id, set.name, e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                className="w-full p-2 text-xs h-24 border rounded bg-white font-mono"
                placeholder="Exams (comma separated)"
              />
              <p className="text-[10px] text-slate-400 mt-1 italic">Example: FA1, FA2, SA1...</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-lg font-bold text-slate-700 uppercase tracking-widest">3. Class Assignments</h3>
        <div className="overflow-x-auto rounded-xl border">
          <table className="min-w-full divide-y">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-black uppercase">Class</th>
                <th className="px-6 py-3 text-left text-xs font-black uppercase">Subject Set</th>
                <th className="px-6 py-3 text-left text-xs font-black uppercase">Exam Set</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {classes.map(cls => (
                <tr key={cls} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">Class {cls}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={localConfig.classAssignments[cls]?.subjectSetId || ''}
                      onChange={(e) => updateClassAssignment(cls, 'subjectSetId', e.target.value)}
                      className="text-xs p-2 border rounded w-full outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">-- No Subject Set --</option>
                      {localConfig.subjectSets.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={localConfig.classAssignments[cls]?.examSetId || ''}
                      onChange={(e) => updateClassAssignment(cls, 'examSetId', e.target.value)}
                      className="text-xs p-2 border rounded w-full outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">-- No Exam Set --</option>
                      {localConfig.examSets.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ConfigManager;
