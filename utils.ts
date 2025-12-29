
import { ClassKey, AppConfig } from './types';

export const getSubs = (config: AppConfig, curCls: ClassKey): string[] => {
  const assignment = config.classAssignments[curCls];
  const set = config.subjectSets.find(s => s.id === assignment?.subjectSetId);
  return set ? set.subjects : [];
};

export const getExams = (config: AppConfig, curCls: ClassKey): string[] => {
  const assignment = config.classAssignments[curCls];
  const set = config.examSets.find(e => e.id === assignment?.examSetId);
  return set ? set.exams : [];
};

export const getMaxMarksArray = (curCls: ClassKey, examType: string): number[] => {
  // We keep the heuristic for now, but in a real system we might configure this per exam
  if (!curCls.startsWith('11') && !curCls.startsWith('12')) {
    return examType.startsWith('FA') ? [40, 40, 40, 40, 40, 40] : [80, 80, 80, 80, 80, 80];
  }
  if (curCls.includes('S')) {
    if (examType.includes('Test')) return [40, 40, 35, 35, 40, 35];
    if (examType === 'Internal / Lab') return [20, 20, 30, 30, 20, 30];
    return [80, 80, 70, 70, 80, 70];
  } else {
    if (examType.includes('Test')) return [40, 40, 40, 40, 40, 35];
    if (examType === 'Internal / Lab') return [20, 20, 20, 20, 20, 30];
    return [80, 80, 80, 80, 80, 70];
  }
};

export const getGrade = (m: number | string, mx: number): string => {
  const mark = typeof m === 'string' ? parseFloat(m) : m;
  if (isNaN(mark) || m === "" || m === null) return "F";
  const p = (mark / mx) * 100;
  if (p >= 91) return "A1";
  if (p >= 81) return "A2";
  if (p >= 71) return "B1";
  if (p >= 61) return "B2";
  if (p >= 51) return "C1";
  if (p >= 41) return "C2";
  if (p >= 33) return "D";
  return "F";
};

export const getResultClass = (res: string) => res === 'PASS' ? 'text-green-600 font-bold' : 'text-red-600 font-bold';
