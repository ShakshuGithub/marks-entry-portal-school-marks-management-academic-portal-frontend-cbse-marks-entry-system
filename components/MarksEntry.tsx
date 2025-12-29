
import React, { useState, useEffect } from 'react';
import { ClassKey, Section, StudentMarks, AppConfig } from '../types';
import { STUDENT_MASTER } from '../constants';
import { getSubs, getMaxMarksArray, getGrade, getResultClass } from '../utils';

interface Props {
  curCls: ClassKey;
  curSec: Section;
  setCurSec: (s: Section) => void;
  curExam: string;
  setCurExam: (e: string) => void;
  exams: string[];
  config: AppConfig;
  onSave: (c: ClassKey, s: Section, e: string, data: StudentMarks) => void;
  marksList: StudentMarks[];
}

const MarksEntry: React.FC<Props> = ({ curCls, curSec, setCurSec, curExam, setCurExam, exams, config, onSave, marksList }) => {
  const [roll, setRoll] = useState('');
  const [name, setName] = useState('');
  const [marks, setMarks] = useState<string[]>([]);

  const subjects = getSubs(config, curCls);
  const maxMarks = getMaxMarksArray(curCls, curExam);
  const isSenior = curCls.startsWith('11') || curCls.startsWith('12');

  useEffect(() => {
    setMarks(new Array(subjects.length).fill(''));
  }, [subjects.length, curCls]);

  useEffect(() => {
    const masterKey = isSenior ? curCls : `${curCls}_${curSec}`;
    const studentName = STUDENT_MASTER[masterKey]?.[roll] || '';
    setName(studentName);
  }, [roll, curCls, curSec, isSenior]);

  const handleSave = () => {
    if (!roll || !name) {
      alert("Please enter a valid roll number");
      return;
    }
    onSave(curCls, curSec, curExam, { r: roll, n: name, m: marks });
    setRoll('');
    setMarks(new Array(subjects.length).fill(''));
    alert("Marks Saved!");
  };

  return (
    <div className="p-6">
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl mb-8 no-print">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1">Exam Type</label>
            <select 
              value={curExam}
              onChange={(e) => setCurExam(e.target.value)}
              className="p-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {exams.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          {!isSenior && (
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-500 uppercase mb-1">Section</label>
              <select 
                value={curSec}
                onChange={(e) => setCurSec(e.target.value as Section)}
                className="p-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
            </div>
          )}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1">Roll Number</label>
            <input 
              type="number"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              className="p-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter Roll No"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1">Student Name</label>
            <input 
              type="text"
              value={name}
              readOnly
              className="p-2 border border-slate-200 rounded-md bg-slate-100 text-slate-600 outline-none font-bold"
              placeholder="Name will appear here"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {subjects.map((sub, i) => (
            <div key={sub} className="flex flex-col">
              <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 truncate" title={sub}>{sub}</label>
              <span className="text-[9px] text-slate-400 mb-1">Max: <b>{maxMarks[i] || 100}</b></span>
              <input 
                type="number"
                value={marks[i] || ''}
                onChange={(e) => {
                  const newMarks = [...marks];
                  newMarks[i] = e.target.value;
                  setMarks(newMarks);
                }}
                className="p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0"
              />
            </div>
          ))}
        </div>

        <button 
          onClick={handleSave}
          className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-emerald-200"
        >
          SAVE STUDENT DATA
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          Recently Entered Marks
        </h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase">Roll</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase">Name</th>
                <th className="px-4 py-3 text-center text-[10px] font-bold text-slate-500 uppercase">Total</th>
                <th className="px-4 py-3 text-center text-[10px] font-bold text-slate-500 uppercase">Result</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {marksList.sort((a,b) => parseInt(a.r) - parseInt(b.r)).map((s) => {
                const total = s.m.reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
                const isFail = s.m.some((m, idx) => getGrade(m, maxMarks[idx]) === 'F');
                const result = isFail ? 'FAIL' : 'PASS';
                return (
                  <tr key={s.r} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{s.r}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 font-bold">{s.n}</td>
                    <td className="px-4 py-3 text-sm text-center font-bold text-slate-900">{total}</td>
                    <td className={`px-4 py-3 text-sm text-center ${getResultClass(result)}`}>{result}</td>
                  </tr>
                );
              })}
              {marksList.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-400 italic">No data entered for this exam yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarksEntry;
