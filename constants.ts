
import { StudentMaster, AppConfig } from './types';

export const STUDENT_MASTER: StudentMaster = {
  "6_A": {"1":"ANJALI","2":"ARPITA","3":"BORAMMA","4":"MAHALAXMI","5":"SAKSHI","6":"SAMPURNA","7":"SHRADDHA","8":"SHRAVANI","9":"SOUJANYA","10":"ABHISHEK","11":"AKASH","12":"BHAGANNA","13":"JAIDAV","14":"KIRAN","15":"LOKESH","16":"PRATHAM","17":"RAJUGOUD","18":"SANJU","19":"SAMARTH","20":"SHREESHAIL","21":"SRUSHTIKARTH"},
  "6_B": {"1":"ANU","2":"ASHWINI","3":"CHAITANYA","4":"MALASHREE","5":"MADHU","6":"NAYANA","7":"NIKHITA","8":"HARIPRIYA","9":"PARIMALA","10":"SHIVANI","11":"SAMITA","12":"SHRAVANI","13":"SUHASINI","14":"VEDASHREE","15":"TEJASHWANI","16":"ABHISHEK","17":"AKASH","18":"BASAVRAJ","19":"CHANDRASHEKHAR","20":"MOUNESH","21":"MANASHAPPA","22":"MALLIKARJUN DALAWAT","23":"SATISH KUMAR","24":"SAMARTH TALAWAR","25":"SAMARTH","26":"SAGAR","27":"SRINIVAS SHRIDHAR T","28":"UDAY","29":"PAVAN KUMAR","30":"SACHIN MANJUNATH"},
  "7_A": {"1":"AKANSHA","2":"BHAGYASHREE","3":"BHIMAMBIKE","4":"LAXMI","5":"MALLAMA","6":"PADMINI","7":"SRAVANTI","8":"TANU","9":"VIDYA","10":"KAILASAGOUD","11":"MADESH","12":"MALLIKARJUN N.","13":"MALLIKARJUN S.","14":"PRABHUDEV","15":"SAMARTH","16":"SHARANBASU","17":"SRIDHER","18":"TEJAS KUMAR","19":"RENUKA","20":"NINGAMMA","21":"PALLAVI","22":"ANKHITA","23":"SHREYAS RAJ","24":"MANJUNATH","25":"ABHESHEK","26":"SANKET","27":"SAMARTH J.","28":"SAGARA","29":"BHARTH","30":"BHEEMASHANKER"},
  "7_B": {"1":"AISHWARYA","2":"BHAVANI","3":"BHUMIKA","4":"CHAITRA","5":"DANAMMA","6":"KANCHANA","7":"KAVERI","8":"MAHALAXMI","9":"MAHANTAMMA","10":"SAVINA","11":"SOPANI","12":"YALAMMA","13":"ABHISHEK","14":"AMIT","15":"BHEEMASHANKAR","16":"CHETAN","17":"DAULATARAY","18":"KANAKANAGOUDA","19":"KRISHNA","20":"MALLIKARJUN D","21":"MUNIYANDRA","22":"NAGESH","23":"PRASHANT","24":"RAHUL","25":"RISHIKESH","26":"ROHIT","27":"SANDEEP","28":"SHIVARAJ","29":"SUDEEP","30":"VENKATRAMAN"},
  "8_A": {"1":"AISHWARYA","2":"ANU","3":"BHAGYALAXMI T","4":"BORAMMA NATIKAR","5":"GAYATHRI","6":"GURUBASAMMA","7":"KASHIBAI","8":"KAVYA","9":"KAVERI","10":"REKHA","11":"SEVANTI","12":"SUPRIYA","13":"YASHODA","14":"AJAY KUMAR","15":"AKASH","16":"AMIT","17":"BHAGANNA","18":"BHEEMAREDDY","19":"DEVARAJ E","20":"DEVARAJ H","21":"MALLIKARJUN","22":"PEERAPPA","23":"PRAKASH","24":"PRAVEEN M","25":"SHARANBASU","26":"SHIVARAJ","27":"SIDDESH","28":"UDAYA","29":"VIRESH","30":"VISHAL"},
  "8_B": {"1":"ASHWINI","2":"BHAGAMMA","3":"BHAGYALAXMI","4":"BHAGYASHREE C","5":"BHAGYASHREE M","6":"BHEEMBAI","7":"GEETA","8":"PALLAVI","9":"SHIVANI","10":"SHRUSTI","11":"SINCHANA","12":"TANUJA","13":"VANDANA","14":"ANAND RAJ","15":"ARJUN","16":"DEVRAJ B","17":"PRAJWAL R","18":"PRAJWAL S","19":"PRAVEEN R","20":"RAJSHEKHAR","21":"RAMESH","22":"ROHIT","23":"SANTOSH","24":"SATISH A","25":"SATISH D","26":"SHIVU KUMAR","27":"YOGESH","28":"YUVRAJ"},
  "9_A": {"1":"AMBIKA","2":"BEBI","3":"BHAGYALAXMI S","4":"BHAGYASHREE M","5":"BHAGYASHREE S","6":"DIVYA","7":"KAVERI D","8":"NANDINI","9":"RANGAMMA","10":"SOUNDARYA","11":"VAISHANVI","12":"ABHISHEK","13":"ARUN","14":"AYYAPPA","15":"BASAVARAJ","16":"BHAGWAN","17":"BHEEMASHANKAR D","18":"DAWALATRAYA","19":"DEVENDRA","20":"MALLIKARJUN B","21":"MALLIKARJUN SH","22":"MUTTANNA","23":"PRADEEP","24":"PRAVEEN","25":"RAKESH","26":"SABANNA","27":"SANTOSH","28":"SHARANGOUDA","29":"SUDHAKAR","30":"VINAY KUMAR"},
  "9_B": {"1":"AISHWARYA V","2":"ARATI","3":"BHAGYASHREE D","4":"BHAGYALAXMI N","5":"GANGA","6":"KAVERI G","7":"MAMATA","8":"MAHESHWARI S","9":"NIKITA","10":"SREEDEVI J","11":"SAKSHI","12":"ANAND","13":"BHAGAVANT","14":"BHARATA","15":"BHEEMASHANKAR N","16":"DATTATREYA","17":"DAYANANDAGOUDA","18":"KIRAN","19":"MALLIKARJUN TANAVEDAR","20":"NAGARAJ","21":"NARASIMHA","22":"NITHIN","23":"NAVEEN","24":"PRAKASH","25":"PRAJWAL","26":"RAJESH","27":"SANJU KUMAR","28":"SAYABANNA","29":"SREEKAR","30":"VENKATESH"},
  "11C": {"1":"BHUMIKA","2":"GOURAMMA","3":"KAVITA","4":"MAMATA","5":"MALLAMMA","6":"SIDDAMMA","7":"SHWETA","8":"VIJAYALAXMEE","9":"KRISHNA","10":"PRAKASH NATIKAR","11":"SANTHOSH","12":"SHADAF","13":"MAYURI","14":"SOUBHAGYA","15":"BHIMANNA","16":"PRABHUDEV","17":"BHARATH","18":"RAVI"}
};

export const DEFAULT_CONFIG: AppConfig = {
  subjectSets: [
    { id: 'sub_jr', name: 'Junior Subjects', subjects: ["Kannada", "English", "Hindi", "Mathematics", "Science", "Social Science"] },
    { id: 'sub_sci', name: 'Senior Science', subjects: ["Kannada", "English", "Physics", "Chemistry", "Mathematics", "Biology"] },
    { id: 'sub_com', name: 'Senior Commerce', subjects: ["Kannada", "English", "Economics", "Accountancy", "Business Study", "Computer Science"] }
  ],
  examSets: [
    { id: 'ex_jr', name: 'FA/SA Exams', exams: ["FA1", "FA2", "FA3", "FA4", "SA1", "SA2"] },
    { id: 'ex_sr', name: 'Senior Exams', exams: ["Test-1", "Test-2", "Mid-term", "Final Exam", "Internal / Lab"] }
  ],
  classAssignments: {
    '6': { subjectSetId: 'sub_jr', examSetId: 'ex_jr' },
    '7': { subjectSetId: 'sub_jr', examSetId: 'ex_jr' },
    '8': { subjectSetId: 'sub_jr', examSetId: 'ex_jr' },
    '9': { subjectSetId: 'sub_jr', examSetId: 'ex_jr' },
    '10': { subjectSetId: 'sub_jr', examSetId: 'ex_jr' },
    '11S': { subjectSetId: 'sub_sci', examSetId: 'ex_sr' },
    '11C': { subjectSetId: 'sub_com', examSetId: 'ex_sr' },
    '12S': { subjectSetId: 'sub_sci', examSetId: 'ex_sr' },
    '12C': { subjectSetId: 'sub_com', examSetId: 'ex_sr' },
  }
};

export const DB_KEY = 'emrs_final_master_db';
export const CONFIG_KEY = 'emrs_app_config_v1';
