
import React from 'react';
import { ClassKey, Section, StudentMarks, AppConfig } from '../types';
import { getSubs, getMaxMarksArray, getGrade, getResultClass } from '../utils';

interface Props {
  curCls: ClassKey;
  curSec: Section;
  curExam: string;
  config: AppConfig;
  marksList: StudentMarks[];
}

const BroadSheet: React.FC<Props> = ({ curCls, curSec, curExam, config, marksList }) => {
  const subjects = getSubs(config, curCls);
  const maxMarks = getMaxMarksArray(curCls, curExam);

  return (
    <div className="p-8 print-padding">
      <div className="no-print mb-8 flex justify-end">
        <button 
          onClick={() => window.print()}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          Print Broad Sheet
        </button>
      </div>

      <div className="text-center mb-8 border-b-4 border-double border-slate-800 pb-6">
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">EKLAVYA MODEL RESIDENTIAL SCHOOL</h2>
        <h3 className="text-xl font-bold text-slate-700 uppercase tracking-widest">KONCHUR, KALABURAGI</h3>
        <div className="mt-4 bg-slate-900 text-white py-2 px-12 inline-block font-black uppercase text-sm italic">
          ACADEMIC BROAD SHEET (2025-26)
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 px-4 font-black uppercase text-xs tracking-widest text-slate-600">
        <div>CLASS & SECTION: <span className="text-slate-900 ml-2">{curCls} - {curSec}</span></div>
        <div>EXAMINATION: <span className="text-slate-900 ml-2">{curExam}</span></div>
      </div>

      <div className="overflow-x-auto print:overflow-visible border border-slate-400">
        <table className="min-w-full border-collapse text-[10px]">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-slate-400 p-2 text-center uppercase">Roll</th>
              <th className="border border-slate-400 p-2 text-left uppercase w-32">Student Name</th>
              {subjects.map(s => (
                <React.Fragment key={s}>
                  <th className="border border-slate-400 p-2 text-center uppercase truncate max-w-[60px]" title={s}>{s}</th>
                  <th className="border border-slate-400 p-2 text-center uppercase">G</th>
                </React.Fragment>
              ))}
              <th className="border border-slate-400 p-2 text-center uppercase">Total</th>
              <th className="border border-slate-400 p-2 text-center uppercase">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {marksList.sort((a,b) => parseInt(a.r) - parseInt(b.r)).map((s) => {
              const total = s.m.reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
              const failed = s.m.some((m, idx) => getGrade(m, maxMarks[idx]) === 'F');
              const res = failed ? 'FAIL' : 'PASS';
              
              return (
                <tr key={s.r} className="hover:bg-slate-50 transition-colors">
                  <td className="border border-slate-300 p-1 text-center font-bold">{s.r}</td>
                  <td className="border border-slate-300 p-1 text-left font-black">{s.n}</td>
                  {s.m.map((m, i) => (
                    <React.Fragment key={i}>
                      <td className="border border-slate-300 p-1 text-center font-medium">{m || '0'}</td>
                      <td className={`border border-slate-300 p-1 text-center font-black ${getGrade(m, maxMarks[i]) === 'F' ? 'text-red-600' : ''}`}>
                        {getGrade(m, maxMarks[i])}
                      </td>
                    </React.Fragment>
                  ))}
                  <td className="border border-slate-300 p-1 text-center font-black bg-slate-100">{total}</td>
                  <td className={`border border-slate-300 p-1 text-center font-black ${getResultClass(res)}`}>{res}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-24 grid grid-cols-3 gap-8 text-center px-4">
        <div className="space-y-12">
          <div className="font-bold text-xs uppercase tracking-widest border-t border-slate-800 pt-2">Class Teacher</div>
        </div>
        <div className="space-y-12">
          <div className="font-bold text-xs uppercase tracking-widest border-t border-slate-800 pt-2">Examination Incharge</div>
        </div>
        <div className="space-y-12">
          <p className="font-black text-sm uppercase">Sunil Kumar</p>
          <div className="font-bold text-xs uppercase tracking-widest border-t border-slate-800 pt-2">Principal</div>
        </div>
      </div>
    </div>
  );
};

export default BroadSheet;
