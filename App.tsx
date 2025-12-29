import React, { useState, useEffect } from 'react';
import { ClassKey, Section, FolderType, AcademicDatabase, StudentMarks, AppConfig } from './types';
import { DB_KEY, CONFIG_KEY, DEFAULT_CONFIG } from './constants';
import { getExams } from './utils';
import Header from './components/Header';
import Navigation from './components/Navigation';
import MarksEntry from './components/MarksEntry';
import AwardList from './components/AwardList';
import BroadSheet from './components/BroadSheet';
import ProgressReport from './components/ProgressReport';
import ConfigManager from './components/ConfigManager';
import Login from './components/Login';

const AUTH_KEY = 'emrs_portal_auth_v1';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [curCls, setCurCls] = useState<ClassKey>('6');
  const [curSec, setCurSec] = useState<Section>('A');
  const [curFolder, setCurFolder] = useState<FolderType>('entry');
  const [db, setDb] = useState<AcademicDatabase>({});
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [curExam, setCurExam] = useState<string>('');

  // Initialize DB, Config, and Auth from localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    if (savedAuth === 'true') setIsLoggedIn(true);

    const savedDb = localStorage.getItem(DB_KEY);
    if (savedDb) setDb(JSON.parse(savedDb));

    const savedConfig = localStorage.getItem(CONFIG_KEY);
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  // Update curExam when curCls or config changes
  useEffect(() => {
    const exams = getExams(config, curCls);
    if (exams.length > 0 && (!curExam || !exams.includes(curExam))) {
      setCurExam(exams[0]);
    }
  }, [curCls, config]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem(AUTH_KEY, 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const saveToDb = (classKey: ClassKey, section: Section, exam: string, studentData: StudentMarks) => {
    const compositeKey = `${classKey}_${section === 'NA' ? 'NA' : section}_${exam}`;
    const newDb = { ...db };
    if (!newDb[compositeKey]) newDb[compositeKey] = [];
    newDb[compositeKey] = newDb[compositeKey].filter(x => x.r !== studentData.r);
    newDb[compositeKey].push(studentData);
    setDb(newDb);
    localStorage.setItem(DB_KEY, JSON.stringify(newDb));
  };

  const saveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const isSenior = curCls.startsWith('11') || curCls.startsWith('12');
  const exams = getExams(config, curCls);
  const currentKey = `${curCls}_${isSenior ? 'NA' : curSec}_${curExam}`;
  const currentMarksList = db[currentKey] || [];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="no-print">
        <div className="flex justify-end mb-2">
          <button 
            onClick={handleLogout}
            className="text-[10px] font-bold text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1 uppercase tracking-widest"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout Portal
          </button>
        </div>
        <Header />
        <Navigation 
          curCls={curCls} 
          setCurCls={setCurCls}
          curFolder={curFolder}
          setCurFolder={setCurFolder}
        />
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 min-h-[600px] overflow-hidden">
        {curFolder === 'entry' && (
          <MarksEntry 
            curCls={curCls}
            curSec={isSenior ? 'NA' : curSec}
            setCurSec={setCurSec}
            curExam={curExam}
            setCurExam={setCurExam}
            exams={exams}
            config={config}
            onSave={saveToDb}
            marksList={currentMarksList}
          />
        )}
        {curFolder === 'award' && (
          <AwardList 
            curCls={curCls}
            curSec={isSenior ? 'NA' : curSec}
            curExam={curExam}
            config={config}
            marksList={currentMarksList}
          />
        )}
        {curFolder === 'broad' && (
          <BroadSheet 
            curCls={curCls}
            curSec={isSenior ? 'NA' : curSec}
            curExam={curExam}
            config={config}
            marksList={currentMarksList}
          />
        )}
        {curFolder === 'individual' && (
          <ProgressReport 
            curCls={curCls}
            curSec={isSenior ? 'NA' : curSec}
            db={db}
            config={config}
            exams={exams}
          />
        )}
        {curFolder === 'config' && (
          <ConfigManager 
            config={config} 
            onSave={saveConfig} 
          />
        )}
      </div>
    </div>
  );
};

export default App;