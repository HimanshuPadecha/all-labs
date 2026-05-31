"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles, 
  Play, 
  BookOpen,
  Binary,
  Database,
  Globe,
  Code,
  ArrowRight
} from 'lucide-react';
import { LAB_SUBJECTS } from '@/data/lab-data';
import Link from 'next/link';

interface HeroProps {
  onBrowseClick: () => void;
  onExploreClick: () => void;
  selectedSubjectId: string;
  setSelectedSubjectId: (id: string) => void;
}

export default function Hero({ onBrowseClick, onExploreClick, selectedSubjectId, setSelectedSubjectId }: HeroProps) {
  const [selectedPracticalId, setSelectedPracticalId] = useState<string>('py-p1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [customInputValue, setCustomInputValue] = useState<string>('15');
  const [simulatedRunning, setSimulatedRunning] = useState<boolean>(false);
  const [simulationOutput, setSimulationOutput] = useState<string>('');

  const activeSubject = LAB_SUBJECTS.find(s => s.id === selectedSubjectId) || LAB_SUBJECTS[0];
  const activePractical = activeSubject.practicals.find(p => p.id === selectedPracticalId) || activeSubject.practicals[0] || null;

  useEffect(() => {
    if (activeSubject.practicals && activeSubject.practicals.length > 0) {
      setSelectedPracticalId(activeSubject.practicals[0].id);
      setSimulationOutput('');
      setSimulatedRunning(false);
    }
  }, [selectedSubjectId]);

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => {
      setCopiedCode(false);
    }, 2000);
  };

  const runSimulatedCode = () => {
    if (!activePractical) return;
    setSimulatedRunning(true);
    setSimulationOutput('Compiling code bundle...\n[OK] Allocating runtime sandbox context...\nExecuting file entry...\n\n');

    setTimeout(() => {
      let outputAddition = '';
      if (activeSubject.id === 'python') {
        if (activePractical.id === 'py-p1') {
          outputAddition = `Parsing raw CSV dataset matrix:\nColumns found: ['StudentName', 'Subject', 'Score', 'Attendance']\nVector operational run: Grouping by 'Subject'...\nAggregation analysis complete.\n\nJSON Output:\n[\n    { "Subject": "CS", "Score": 91.66, "Attendance": 92.67 },\n    { "Subject": "Maths", "Score": 81.50, "Attendance": 85.00 }\n]\n\nProcessing successfully completed under Python CPython layout.`;
        } else {
          outputAddition = `Comparing list comprehension of 1M rows vs vectorized numpy...\nNative cycle duration: 0.0825s\nNumPy vectorized duration: 0.0031s\n[OK] Speedup factor verified: 26.6x faster.\nArray arithmetic operation completed successfully inside contiguous heap sectors.`;
        }
      } else if (activeSubject.id === 'dbms') {
        if (activePractical.id === 'db-p1') {
          outputAddition = `Query execution complete.\nRetrieved rows list from relations Department, Employee and Project:\n\n+------------+-----------------+-------------+--------------------+----------------------+\n| EMP_ID     | EMPLOYEE_NAME   | DEPT_NAME   | DELEGATED_PROJECTS | TOTAL_ASSIGNED_BUDGET|\n+------------+-----------------+-------------+--------------------+----------------------+\n| 301490212  | Sanya Sharma    | CS          | 3                  | $1,450,000           |\n| 301490225  | Divya Deshmukh  | CS          | 2                  | $980,000             |\n+------------+-----------------+-------------+--------------------+----------------------+\n\nRows: 2 processed (0.08s)`;
        } else {
          outputAddition = `Registering PL/SQL row level auditory triggers...\nDatabase engine listening for salary modifications...\n[TRIGGER ENGAGED] Capturing salary updating event...\nSuccessfully pushed transaction records to Employee_Audit_Logs columns structure.`;
        }
      } else if (activeSubject.id === 'project-1') {
        if (activePractical.id === 'proj-p1') {
          outputAddition = `Parsing registration HTML registry layout template...\nIntegrating password mismatch rules...\nSimulation event: password "admin123" vs confirm "admin" -> match error caught.\nEvent handled gracefully via native Javascript preventing bad queries.`;
        } else {
          outputAddition = `Booting local PHP 8.2 backend server connection...\nInitializing PDO (PHP Data Objects) parameter bounds...\nExecuting Query "SELECT practical_id FROM practical_registry" safely...\nReady JSON payload printed:\n{ "status": "success", "meta": { "count": 2 }, "data": [...] }\nRequest solved with 0 SQL vulnerabilities.`;
        }
      } else {
        const val = customInputValue || 'No custom variables loaded';
        outputAddition = `Output log trace for: ${activePractical.title}\nVariables parsed: ${val}\n---------------------------------------\nExecution finished gracefully. All assertions passed.`;
      }
      setSimulationOutput(prev => prev + outputAddition);
      setSimulatedRunning(false);
    }, 1100);
  };

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Binary': return <Binary className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const filteredSubjects = LAB_SUBJECTS.filter(s => {
    const term = searchQuery.toLowerCase();
    if (!term) return true;
    return s.name.toLowerCase().includes(term) || 
           s.description.toLowerCase().includes(term) ||
           s.practicals.some(p => p.title.toLowerCase().includes(term) || p.aim.toLowerCase().includes(term));
  });

  return (
    <section className="relative z-10 pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden border-b border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 text-[11px] font-semibold uppercase tracking-wider mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          🚀 Save Hours on Lab Work
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-sans font-black tracking-tight text-white max-w-5xl mx-auto uppercase leading-[0.95]"
        >
          ALL YOUR MCA LAB <span className="text-zinc-650">RESOURCES.</span> <br />
          ONE PLATFORM.
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-zinc-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Access practicals, journals, program source scripts, and complete verified lab materials instantly. Spend less time writing mundane reports and more time writing active projects.
        </motion.p>

        {/* Action CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href={"/labs/78c99b00-c8ba-4264-8a17-2180f186f161"}>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBrowseClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black px-8 py-3.5 rounded-none text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-lg shadow-white/5 active:scale-95"
          >
            Browse Labs
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          </Link>
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-950 border border-zinc-805 hover:bg-zinc-900 text-zinc-300 px-8 py-3.5 rounded-none text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer text-center"
          >
            GitHub Source
          </motion.a>
        </motion.div>

        {/* INTERACTIVE PLAYGROUND CONSOLE */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-16 md:mt-20 text-left border border-zinc-800 bg-zinc-950/90 rounded-none overflow-hidden shadow-2xl shadow-black/80 max-w-6xl mx-auto z-10 relative"
        >
          
          <div className="bg-black px-4 py-3 border-b border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-800"></span>
              <span className="w-3 h-3 rounded-full bg-zinc-800"></span>
              <span className="w-3 h-3 rounded-full bg-zinc-800"></span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest ml-4 uppercase">live_engine_sandbox.sh — Interactive Studio</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[9px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800">
                MONOCHROME MODE: TRUE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            
            {/* Subject Selector Sidebar */}
            <div className="lg:col-span-3 border-r border-zinc-900 bg-black/60 p-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-900 mb-4">
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-bold">1. Select Subject</span>
                <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
              </div>

              <div className="space-y-1">
                {filteredSubjects.map((subject) => {
                  const isActive = subject.id === selectedSubjectId;
                  return (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubjectId(subject.id)}
                      className={`w-full text-left p-3 rounded-none flex items-center gap-2.5 transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-zinc-100 text-black border-l-2 border-black font-semibold' 
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                      }`}
                    >
                      <div className={`p-1 ${isActive ? 'text-black' : 'text-zinc-500'}`}>
                        {getSubjectIcon(subject.iconName)}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs uppercase tracking-wider leading-none">{subject.name}</span>
                        <span className={`text-[9px] font-mono ${isActive ? 'text-zinc-850' : 'text-zinc-600'} mt-1`}>
                          {subject.practicalCount} Practice Entries
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-900">
                <span className="text-[10px] font-mono text-zinc-500 block uppercase mb-2">Subject Filter</span>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-zinc-600 absolute left-2.5 top-2.5" />
                  <input 
                    type="text" 
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white rounded-none pl-8 pr-2 py-2 focus:outline-none focus:border-zinc-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Practical Entries Sidebar */}
            <div className="lg:col-span-3 border-r border-zinc-900 bg-zinc-950/60 p-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-900 mb-4">
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-bold">2. Choose Entry</span>
                <Terminal className="w-3.5 h-3.5 text-zinc-500" />
              </div>

              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {activeSubject.practicals.map((prac) => {
                  const isPracActive = prac.id === selectedPracticalId;
                  return (
                    <button
                      key={prac.id}
                      onClick={() => setSelectedPracticalId(prac.id)}
                      className={`w-full text-left p-3 rounded-none border transition-all cursor-pointer ${
                        isPracActive 
                          ? 'bg-zinc-900 border-zinc-700 text-white' 
                          : 'bg-zinc-950/30 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className={`text-[9px] font-mono px-1 rounded-sm leading-none py-0.5 ${
                          isPracActive ? 'bg-zinc-300 text-black' : 'bg-zinc-900 text-zinc-500'
                        }`}>
                          PRACTICAL {prac.number}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-wide leading-tight truncate">
                        {prac.title}
                      </h4>
                      <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2">
                        {prac.aim}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Code view and simulated log compiler */}
            <div className="lg:col-span-6 bg-black flex flex-col justify-between">
              {activePractical ? (
                <>
                  <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-950">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white uppercase tracking-wider font-extrabold">
                          {activePractical.title}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">
                          [{activePractical.language || 'Code'}]
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                        Aim: {activePractical.aim}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopyCode(activePractical.code || '')}
                      className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors rounded-none border border-zinc-850 cursor-pointer flex items-center gap-1 text-[11px]"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span className="text-white text-[10px] uppercase font-mono font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline font-mono font-semibold uppercase text-[10px]">Copy Node</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 flex-1 font-mono text-xs overflow-y-auto max-h-[300px] bg-black/90 whitespace-pre">
                    <table className="w-full border-collapse">
                      <tbody>
                        {activePractical.code?.split('\n').map((line, idx) => (
                          <tr key={idx} className="hover:bg-zinc-900/40">
                            <td className="w-8 pr-4 text-right text-zinc-600 text-[10px] select-none border-r border-zinc-900/40">
                              {idx + 1}
                            </td>
                            <td className="pl-4 text-zinc-200">
                              {line}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Log Simulator console */}
                  <div className="border-t border-zinc-900 bg-zinc-950 p-4">
                    <div className="flex items-center justify-between mb-3 text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold border-b border-zinc-900 pb-2">
                      <span>3. Sandbox Compiler output</span>
                      <Play className="w-3.5 h-3.5 text-zinc-300" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center mb-3">
                      <div className="sm:col-span-8 flex items-center gap-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase">Arguments:</label>
                        <input 
                          type="text" 
                          value={customInputValue}
                          onChange={(e) => setCustomInputValue(e.target.value)}
                          className="bg-black border border-zinc-805 text-xs text-white rounded-none px-3 py-1 font-mono w-full focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-4 flex justify-end">
                        <button
                          onClick={runSimulatedCode}
                          disabled={simulatedRunning}
                          className="w-full bg-white hover:bg-zinc-250 text-black px-3 py-1.5 text-xs uppercase font-mono font-black tracking-widest flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {simulatedRunning ? (
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin"></span>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>LAUNCH</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {simulationOutput && (
                      <div className="bg-black border border-zinc-900 p-3 font-mono text-[11px] text-zinc-300 max-h-[140px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
                        {simulationOutput}
                      </div>
                    )}

                    <div className="mt-3 flex gap-2.5 items-start bg-zinc-900/40 p-3 border border-zinc-900 text-xs text-zinc-400">
                      <Sparkles className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-zinc-200 block uppercase tracking-wide text-[10px]">Algorithm details</strong>
                        <p className="mt-1 leading-relaxed text-[11px]">
                          {activePractical.explanation || 'Calculates structured computational results cleanly.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col justify-center items-center text-center p-12 text-zinc-600">
                  <Terminal className="w-8 h-8 mb-2" />
                  <p className="text-xs">Select any practical entry to load parameters.</p>
                </div>
              )}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
