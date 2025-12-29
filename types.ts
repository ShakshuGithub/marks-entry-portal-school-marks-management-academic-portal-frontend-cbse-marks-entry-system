
export type ClassKey = '6' | '7' | '8' | '9' | '10' | '11S' | '11C' | '12S' | '12C';
export type Section = 'A' | 'B' | 'NA';
export type FolderType = 'entry' | 'award' | 'broad' | 'individual' | 'config';

export interface StudentMarks {
  r: string; // Roll No
  n: string; // Name
  m: string[]; // Marks array
}

export interface AcademicDatabase {
  [key: string]: StudentMarks[]; // Key: class_section_exam
}

export interface StudentMaster {
  [key: string]: { [roll: string]: string };
}

export interface SubjectSet {
  id: string;
  name: string;
  subjects: string[];
}

export interface ExamSet {
  id: string;
  name: string;
  exams: string[];
}

export interface AppConfig {
  subjectSets: SubjectSet[];
  examSets: ExamSet[];
  classAssignments: {
    [key in ClassKey]: {
      subjectSetId: string;
      examSetId: string;
    }
  };
}
