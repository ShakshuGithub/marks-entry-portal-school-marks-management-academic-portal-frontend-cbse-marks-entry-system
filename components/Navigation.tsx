
import React from 'react';
import { ClassKey, FolderType } from '../types';

interface Props {
  curCls: ClassKey;
  setCurCls: (c: ClassKey) => void;
  curFolder: FolderType;
  setCurFolder: (f: FolderType) => void;
}

const Navigation: React.FC<Props> = ({ curCls, setCurCls, curFolder, setCurFolder }) => {
  const classes: ClassKey[] = ['6', '7', '8', '9', '10', '11S', '11C', '12S', '12C'];
  const folders: { id: FolderType; label: string }[] = [
    { id: 'entry', label: 'MARKS ENTRY' },
    { id: 'award', label: 'AWARD LIST' },
    { id: 'broad', label: 'BROAD SHEET' },
    { id: 'individual', label: 'PROGRESS REPORT' },
    { id: 'config', label: 'ADMIN CONFIG' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1 border-b border-slate-200">
        {classes.map((c) => (
          <button
            key={c}
            onClick={() => setCurCls(c)}
            className={`px-4 py-2 text-xs md:text-sm font-bold uppercase transition-all duration-200 ${
              curCls === c
                ? 'bg-blue-600 text-white rounded-t-lg'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
          >
            Class {c}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
        {folders.map((f) => (
          <button
            key={f.id}
            onClick={() => setCurFolder(f.id)}
            className={`flex-1 min-w-[120px] px-4 py-3 text-xs md:text-sm font-bold transition-all duration-200 rounded-md ${
              curFolder === f.id
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
