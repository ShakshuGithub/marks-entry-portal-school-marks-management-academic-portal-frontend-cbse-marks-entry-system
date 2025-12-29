
import React, { useState } from 'react';
import { ClassKey, Section, AcademicDatabase, AppConfig } from '../types';
import { STUDENT_MASTER } from '../constants';
import { getSubs, getMaxMarksArray, getGrade, getResultClass } from '../utils';

interface Props {
  curCls: ClassKey;
  curSec: Section;
  db: AcademicDatabase;
  config: AppConfig;
  exams: string[];
}

const ProgressReport: React.FC<Props> = ({ curCls, curSec, db, config, exams }) => {
  const [selRoll, setSelRoll] = useState('');
  const [intExam, setIntExam] = useState(exams[0] || '');
  const [extExam, setExtExam] = useState(exams[exams.length - 1] || '');
  const [reportData, setReportData] = useState<any>(null);

  const students = STUDENT_MASTER[curCls.startsWith('11') || curCls.startsWith('12') ? curCls : `${curCls}_${curSec}`] || {};
  const subjects = getSubs(config, curCls);

  const generateReport = () => {
    if (!selRoll) return;

    const isSenior = curCls.startsWith('11') || curCls.startsWith('12');
    const sec = isSenior ? 'NA' : curSec;
    const intKey = `${curCls}_${sec}_${intExam}`;
    const extKey = `${curCls}_${sec}_${extExam}`;

    const intMarks = db[intKey]?.find(x => x.r === selRoll);
    const extMarks = db[extKey]?.find(x => x.r === selRoll);
    
    const intMaxes = getMaxMarksArray(curCls, intExam);
    const extMaxes = getMaxMarksArray(curCls, extExam);

    let grandTotal = 0;
    let failed = false;
    
    const rows = subjects.map((s, i) => {
      const iObt = parseFloat(intMarks?.m[i] || '0');
      const eObt = parseFloat(extMarks?.m[i] || '0');
      const total = iObt + eObt;
      const maxTotal = (intMaxes[i] || 0) + (extMaxes[i] || 0);
      const grade = getGrade(total, maxTotal || 100);
      if (grade === 'F') failed = true;
      grandTotal += total;
      return { subject: s, iMax: intMaxes[i], iObt, eMax: extMaxes[i], eObt, total, grade };
    });

    setReportData({
      name: students[selRoll],
      roll: selRoll,
      classStr: `${curCls}${isSenior ? '' : ` - ${curSec}`}`,
      rows,
      grandTotal,
      finalGrade: getGrade(grandTotal / subjects.length, 100),
      result: failed ? 'FAIL' : 'PASS'
    });
  };

  return (
    <div className="p-8 print-padding">
      <div className="no-print bg-slate-50 p-8 rounded-xl border border-slate-200 mb-10 shadow-inner">
        <h4 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-600 w-1.5 h-6 rounded-full"></span>
          REPORT CARD GENERATOR
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-2">1. Select Student</label>
            <select 
              value={selRoll} 
              onChange={(e) => setSelRoll(e.target.value)}
              className="p-3 border border-slate-300 rounded-lg bg-white shadow-sm font-bold text-slate-700"
            >
              <option value="">-- Choose Student --</option>
              {Object.entries(students).map(([roll, name]) => (
                <option key={roll} value={roll}>{roll} - {name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-2">2. Internal / Partial Exam</label>
            <select 
              value={intExam} 
              onChange={(e) => setIntExam(e.target.value)}
              className="p-3 border border-slate-300 rounded-lg bg-white shadow-sm"
            >
              {exams.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-2">3. Final / Main Exam</label>
            <select 
              value={extExam} 
              onChange={(e) => setExtExam(e.target.value)}
              className="p-3 border border-slate-300 rounded-lg bg-white shadow-sm"
            >
              {exams.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
        </div>
        <button 
          onClick={generateReport}
          className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest"
        >
          Generate Progress Report
        </button>
      </div>

      {reportData && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-end no-print mb-6">
            <button 
              onClick={() => window.print()}
              className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2"
            >
              Print Report Card
            </button>
          </div>

          <div className="border-4 border-slate-900 p-8 shadow-2xl bg-white print:border-2 print:shadow-none">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-900 uppercase">EKLAVYA MODEL RESIDENTIAL SCHOOL</h2>
              <h3 className="text-xl font-bold text-slate-700 uppercase">KONCHUR, KALABURAGI</h3>
              <div className="mt-6 bg-blue-900 text-white py-3 px-12 inline-block font-black text-xl uppercase tracking-widest">
                FINAL PROGRESS REPORT (2025-26)
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8 border-2 border-slate-800 p-6 bg-slate-50">
              <div className="font-black uppercase text-sm">NAME: <span className="text-blue-900 block mt-1 text-lg">{reportData.name}</span></div>
              <div className="font-black uppercase text-sm">ROLL NO: <span className="text-blue-900 block mt-1 text-lg">{reportData.roll}</span></div>
              <div className="font-black uppercase text-sm">CLASS: <span className="text-blue-900 block mt-1 text-lg">{reportData.classStr}</span></div>
            </div>

            <div className="border-2 border-slate-900">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-slate-200 border-b-2 border-slate-900">
                    <th rowSpan={2} className="border-r-2 border-slate-900 p-4 text-left uppercase font-black text-xs">Subject Name</th>
                    <th colSpan={2} className="border-r-2 border-slate-900 p-2 text-center uppercase font-black text-xs">Internal ({intExam})</th>
                    <th colSpan={2} className="border-r-2 border-slate-900 p-2 text-center uppercase font-black text-xs">Final Exam ({extExam})</th>
                    <th rowSpan={2} className="border-r-2 border-slate-900 p-4 text-center uppercase font-black text-xs">Total (100)</th>
                    <th rowSpan={2} className="p-4 text-center uppercase font-black text-xs">Grade</th>
                  </tr>
                  <tr className="bg-slate-100 border-b-2 border-slate-900">
                    <th className="border-r-2 border-slate-900 p-2 text-center text-[10px] font-bold uppercase">Max</th>
                    <th className="border-r-2 border-slate-900 p-2 text-center text-[10px] font-bold uppercase">Obt</th>
                    <th className="border-r-2 border-slate-900 p-2 text-center text-[10px] font-bold uppercase">Max</th>
                    <th className="border-r-2 border-slate-900 p-2 text-center text-[10px] font-bold uppercase">Obt</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-800">
                  {reportData.rows.map((row: any) => (
                    <tr key={row.subject} className="font-bold">
                      <td className="border-r-2 border-slate-900 p-4 text-left uppercase text-sm bg-slate-50">{row.subject}</td>
                      <td className="border-r-2 border-slate-900 p-4 text-center text-sm">{row.iMax}</td>
                      <td className="border-r-2 border-slate-900 p-4 text-center text-sm font-black italic text-slate-600">{row.iObt}</td>
                      <td className="border-r-2 border-slate-900 p-4 text-center text-sm">{row.eMax}</td>
                      <td className="border-r-2 border-slate-900 p-4 text-center text-sm font-black italic text-slate-600">{row.eObt}</td>
                      <td className="border-r-2 border-slate-900 p-4 text-center text-lg font-black bg-blue-50">{row.total}</td>
                      <td className={`p-4 text-center text-lg font-black ${row.grade === 'F' ? 'text-red-600' : 'text-blue-900'}`}>{row.grade}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-900 text-white font-black">
                    <td colSpan={5} className="p-4 text-right uppercase tracking-widest text-sm">Grand Total / Overall Grade</td>
                    <td className="p-4 text-center text-2xl">{reportData.grandTotal}</td>
                    <td className="p-4 text-center text-2xl">{reportData.finalGrade}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-block border-4 border-slate-900 px-12 py-4">
                <span className="text-2xl font-black uppercase mr-4 italic">Result:</span>
                <span className={`text-4xl font-black uppercase ${getResultClass(reportData.result)}`}>{reportData.result}</span>
              </div>
            </div>

            <div className="mt-32 flex justify-between px-8">
              <div className="text-center w-48 border-t-2 border-slate-900 pt-3">
                <span className="font-black uppercase text-xs">Class Teacher</span>
              </div>
              <div className="text-center w-64 border-t-2 border-slate-900 pt-3">
                <p className="font-black text-sm uppercase mb-1 italic">Sunil Kumar</p>
                <span className="font-black uppercase text-xs">Principal's Signature</span>
              </div>
              <div className="text-center w-48 border-t-2 border-slate-900 pt-3">
                <span className="font-black uppercase text-xs">Parent's Signature</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressReport;
