
import React, { useState } from 'react';
import { ClassKey, Section, StudentMarks, AppConfig } from '../types';
import { getSubs, getMaxMarksArray, getGrade, getResultClass } from '../utils';

interface Props {
  curCls: ClassKey;
  curSec: Section;
  curExam: string;
  config: AppConfig;
  marksList: StudentMarks[];
}

const AwardList: React.FC<Props> = ({ curCls, curSec, curExam, config, marksList }) => {
  const [subIdx, setSubIdx] = useState(0);
  const subjects = getSubs(config, curCls);
  const maxMarks = getMaxMarksArray(curCls, curExam);

  return (
    <div className="p-8 print-padding">
      <div className="no-print mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="font-bold text-blue-900 text-sm">Select Subject:</label>
          <select 
            value={subIdx}
            onChange={(e) => setSubIdx(parseInt(e.target.value))}
            className="p-2 border border-blue-200 rounded-md bg-white focus:ring-2 focus:ring-blue-500 outline-none w-64 shadow-sm"
          >
            {subjects.map((s, i) => <option key={s} value={i}>{s}</option>)}
          </select>
        </div>
        <button 
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-blue-700 transition-all"
        >
          Print Award List
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-slate-900 uppercase">EKLAVYA MODEL RESIDENTIAL SCHOOL</h2>
        <h3 className="text-lg font-bold text-slate-600 uppercase">KONCHUR, KARNATAKA</h3>
        <div className="mt-4 bg-slate-800 text-white py-2 px-8 inline-block rounded-full font-bold uppercase tracking-widest">
          AWARD LIST
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 font-bold text-sm uppercase text-slate-700 border-y-2 border-slate-200 py-3">
        <div className="text-center">CLASS: <span className="text-blue-700">{curCls} - {curSec}</span></div>
        <div className="text-center">SUBJECT: <span className="text-blue-700">{subjects[subIdx]}</span></div>
        <div className="text-center">MAX MARKS: <span className="text-blue-700">{maxMarks[subIdx] || 100}</span></div>
      </div>

      <div className="overflow-hidden border-2 border-slate-300 rounded-sm">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-slate-300">
              <th className="border-r-2 border-slate-300 px-4 py-2 text-center text-xs font-black uppercase">Roll No</th>
              <th className="border-r-2 border-slate-300 px-4 py-2 text-left text-xs font-black uppercase">Student Name</th>
              <th className="border-r-2 border-slate-300 px-4 py-2 text-center text-xs font-black uppercase">Obtained</th>
              <th className="border-r-2 border-slate-300 px-4 py-2 text-center text-xs font-black uppercase">Grade</th>
              <th className="px-4 py-2 text-center text-xs font-black uppercase">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300 font-medium">
            {marksList.sort((a,b) => parseInt(a.r) - parseInt(b.r)).map((s) => {
              const mark = s.m[subIdx];
              const grade = getGrade(mark, maxMarks[subIdx]);
              return (
                <tr key={s.r} className="hover:bg-slate-50">
                  <td className="border-r-2 border-slate-300 px-4 py-2 text-center text-sm">{s.r}</td>
                  <td className="border-r-2 border-slate-300 px-4 py-2 text-left text-sm font-bold">{s.n}</td>
                  <td className="border-r-2 border-slate-300 px-4 py-2 text-center text-sm font-black">{mark || '0'}</td>
                  <td className="border-r-2 border-slate-300 px-4 py-2 text-center text-sm">{grade}</td>
                  <td className={`px-4 py-2 text-center text-sm ${getResultClass(grade === 'F' ? 'FAIL' : 'PASS')}`}>{grade === 'F' ? 'FAIL' : 'PASS'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-20 flex justify-between items-end px-4">
        <div className="text-center w-48">
          <div className="border-t border-slate-900 pt-2 font-bold text-xs">Subject Teacher</div>
        </div>
        <div className="text-center w-48">
          <p className="font-bold text-sm mb-1">SUNIL KUMAR</p>
          <div className="border-t border-slate-900 pt-2 font-bold text-xs uppercase">Principal Signature</div>
        </div>
      </div>
    </div>
  );
};

export default AwardList;
