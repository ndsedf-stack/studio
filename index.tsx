import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// --- TYPE DEFINITIONS ---
interface SetRecord {
  id: number;
  weight: string | number;
  reps: string | number;
  rir: string | number;
  completed: boolean;
  isBonus?: boolean;
}

interface ExerciseRecord {
  id: string;
  name: string;
  sets: SetRecord[];
  type?: 'superset';
  exercises?: ExerciseRecord[];
  notes?: string;
  rest?: number;
}

interface WorkoutRecord {
  date: string;
  week: number;
  day: string;
  isHomeWorkout: boolean;
  exercises: ExerciseRecord[];
}

interface HistoryData {
  [date: string]: WorkoutRecord;
}

// --- DATA STRUCTURE & DATABASE ---
const programData = {
  blocks: [
    { id: 1, name: "BLOC 1 (S1-5): FONDATION TECHNIQUE", weeks: [1, 2, 3, 4, 5], technique: { name: 'Tempo & Pauses', desc: "Tempo 3-1-2 et pauses stratégiques." } },
    { id: 2, name: "BLOC 2 (S7-11): SURCHARGE PROGRESSIVE", weeks: [7, 8, 9, 10, 11], technique: { name: 'Rest-Pause', desc: "Tempo 2-1-2. Rest-Pause sur la dernière série des exercices principaux." } },
    { id: 3, name: "BLOC 3 (S13-17): SURCOMPENSATION", weeks: [13, 14, 15, 16, 17], technique: { name: 'Drop-Sets & Myo-Reps', desc: "Drop-sets et Myo-reps sur la dernière série des isolations." } },
    { id: 4, name: "BLOC 4 (S19-25): INTENSIFICATION MAXIMALE", weeks: [19, 20, 21, 22, 23, 25], technique: { name: 'Clusters & Partials', desc: "Clusters, Myo-reps sur toutes les isolations, et Partials." } },
  ],
  deloadWeeks: [6, 12, 18, 24, 26],
  workouts: {
    dimanche: { name: "Dos + Jambes Lourdes + Bras", exercises: [ { id: 'tbdl', name: 'Trap Bar Deadlift', sets: 5, reps: '6-8', rir: 2, rest: 120, startWeight: 75, progression: { increment: 5 }, intensification: 'rest-pause' }, { id: 'goblet', name: 'Goblet Squat', sets: 4, reps: '10', rir: 2, rest: 75, startWeight: 25, progression: { increment: 2.5 }, intensification: 'drop-set' }, { id: 'legpress', name: 'Leg Press', sets: 4, reps: '10', rir: 2, rest: 75, startWeight: 110, progression: { increment: 10 }, intensification: 'cluster' }, { type: 'superset', id: 'superset_dos_pecs', rest: 90, exercises: [ { id: 'latpull', name: 'Lat Pulldown (large)', sets: 4, reps: '10', rir: 2, startWeight: 60, progression: { increment: 2.5 }, intensification: 'drop-set' }, { id: 'landminepress', name: 'Landmine Press', sets: 4, reps: '10', rir: 2, startWeight: 35, progression: { increment: 2.5 } } ]}, { id: 'rowmachine', name: 'Rowing Machine (large)', sets: 4, reps: '10', rir: 2, rest: 75, startWeight: 50, progression: { increment: 2.5 }, intensification: 'myo-reps' }, { type: 'superset', id: 'superset_bras_dim', rest: 75, exercises: [ { id: 'biceps_dim', name: 'Spider Curl / Incline Curl', sets: 4, reps: '12', rir: 1, startWeight: 12, progression: { increment: 2.5 }, bicepsRotation: true, intensification: 'myo-reps' }, { id: 'pushdown', name: 'Cable Pushdown', sets: 3, reps: '12', rir: 1, startWeight: 20, progression: { increment: 2.5 } } ]}, ] },
    mardi: { name: "Pecs + Épaules + Triceps", exercises: [ { id: 'dbpress', name: 'Dumbbell Press', sets: 5, reps: '10', rir: 2, rest: 105, startWeight: 22, progression: { increment: 2.5 }, intensification: 'rest-pause' }, { id: 'cablefly', name: 'Cable Fly', sets: 4, reps: '12', rir: 1, rest: 60, startWeight: 10, progression: { increment: 2.5 }, intensification: 'drop-set' }, { id: 'legpresslight', name: 'Leg Press léger', sets: 3, reps: '15', rir: 2, rest: 60, startWeight: 80, progression: { increment: 10 } }, { type: 'superset', id: 'superset_tri_epaules', rest: 75, exercises: [ { id: 'tricepsext', name: 'Extension Triceps Corde', sets: 5, reps: '12', rir: 1, startWeight: 20, progression: { increment: 2.5 }, intensification: 'drop-set' }, { id: 'latraises', name: 'Lateral Raises', sets: 5, reps: '15', rir: 1, startWeight: 8, progression: { increment: 2.5 }, intensification: 'myo-reps' } ]}, { id: 'facepull', name: 'Face Pull', sets: 5, reps: '15', rir: 2, rest: 60, startWeight: 20, progression: { increment: 2.5 }, intensification: 'myo-reps' }, { id: 'rowmachineserre', name: 'Rowing Machine (serrée)', sets: 4, reps: '12', rir: 2, rest: 75, startWeight: 50, progression: { increment: 2.5 } }, { id: 'overheadext', name: 'Overhead Extension', sets: 4, reps: '12', rir: 1, rest: 60, startWeight: 15, progression: { increment: 2.5 }, intensification: 'myo-reps' }, ] },
    vendredi: { name: "Dos + Jambes Légères + Bras + Épaules", exercises: [ { id: 'landminerow', name: 'Landmine Row', sets: 5, reps: '10', rir: 2, rest: 105, startWeight: 55, progression: { increment: 2.5 }, intensification: 'rest-pause' }, { type: 'superset', id: 'superset_jambes_ven', rest: 75, exercises: [ { id: 'legcurl', name: 'Leg Curl', sets: 5, reps: '12', rir: 1, startWeight: 40, progression: { increment: 5 }, intensification: 'partials' }, { id: 'legext', name: 'Leg Extension', sets: 4, reps: '15', rir: 1, startWeight: 35, progression: { increment: 5 }, intensification: 'partials' } ]}, { type: 'superset', id: 'superset_pecs_ven', rest: 60, exercises: [ { id: 'cablefly_ven', name: 'Cable Fly', sets: 4, reps: '15', rir: 1, startWeight: 10, progression: { increment: 2.5 }, intensification: 'myo-reps' }, { id: 'dbfly', name: 'Dumbbell Fly', sets: 4, reps: '12', rir: 1, startWeight: 10, progression: { increment: 2.5 }, intensification: 'drop-set' } ]}, { type: 'superset', id: 'superset_bras_ven', rest: 75, exercises: [ { id: 'ezcurl', name: 'EZ Bar Curl', sets: 5, reps: '12', rir: 1, startWeight: 25, progression: { increment: 2.5 }, intensification: 'myo-reps' }, { id: 'overheadext_ven', name: 'Overhead Extension', sets: 3, reps: '12', rir: 1, startWeight: 15, progression: { increment: 2.5 }, intensification: 'myo-reps' } ]}, { id: 'latraises_ven', name: 'Lateral Raises', sets: 3, reps: '15', rir: 1, rest: 60, startWeight: 8, progression: { increment: 2.5 }, intensification: 'myo-reps' }, { id: 'wristcurl', name: 'Wrist Curl', sets: 3, reps: '20', rir: 0, rest: 45, startWeight: 30, progression: { increment: 2.5 } }, ] },
  },
  homeWorkouts: {
    mardi: { id: 'hammer_home', name: 'Hammer Curl', sets: 3, reps: '12', startWeight: 12, progression: { increment: 2.5 } },
    jeudi: { id: 'hammer_home', name: 'Hammer Curl', sets: 3, reps: '12', startWeight: 12, progression: { increment: 2.5 } }
  },
  stats: {
    projections: [
        { id: 'tbdl', name: 'Trap Bar DL', start: 75, end: 120 },
        { id: 'dbpress', name: 'Dumbbell Press', start: 22, end: 45 },
        { id: 'legpress', name: 'Leg Press', start: 110, end: 240 },
        { id: 'rowmachine', name: 'Rowing Machine', start: 50, end: 82.5 },
        { id: 'ezcurl', name: 'EZ Bar Curl', start: 25, end: 47.5 },
    ],
    weeklyVolume: [ { muscle: "Quadriceps", series: 23, optimal: [18, 24] }, { muscle: "Ischios", series: 17, optimal: [14, 20] }, { muscle: "Fessiers", series: 19, optimal: [14, 20] }, { muscle: "Dos", series: 30, optimal: [18, 24] }, { muscle: "Pectoraux", series: 22, optimal: [16, 22] }, { muscle: "Épaules lat.", series: 10, optimal: [6, 10] }, { muscle: "Biceps", series: 19, optimal: [14, 20] }, { muscle: "Triceps", series: 20, optimal: [12, 18] }, ]
  }
};

const DB_KEY = 'hybridMaster51_data_v4';

const useWorkoutHistory = () => {
    const [history, setHistory] = useState<HistoryData>(() => { try { const s = localStorage.getItem(DB_KEY); return s ? JSON.parse(s) : {}; } catch (e) { return {}; } });
    const saveWorkout = useCallback((w: WorkoutRecord) => { const n = { ...history, [w.date]: w }; setHistory(n); localStorage.setItem(DB_KEY, JSON.stringify(n)); }, [history]);
    
    const getExercisePR = useCallback((exerciseId: string) => {
        let best = { weight: 0, reps: 0 };
        Object.values(history).forEach((workout: any) => {
            if (!workout?.exercises) return;
            const processExo = (exo: any) => {
                if (exo.id === exerciseId) {
                    (exo.sets || []).forEach((set: any) => {
                        const w = parseFloat(String(set.weight));
                        const r = parseInt(String(set.reps));
                        if (set.completed && w >= best.weight) {
                            if (w > best.weight) best = { weight: w, reps: r };
                            else if (r > best.reps) best.reps = r;
                        }
                    });
                }
            };
            workout.exercises.forEach((exo: any) => { (exo.type === 'superset' ? exo.exercises : [exo]).forEach(processExo); });
        });
        return best;
    }, [history]);

    const getSuggestedWeight = useCallback((exercise: any) => {
        const historyEntries: any[] = Object.values(history).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        for (const entry of historyEntries) {
            if (!entry?.exercises) continue;
            for (const performedExo of entry.exercises) {
                const checkExo = (exo: any) => {
                    if (exo.id === exercise.id && exo.sets?.length > 0) {
                        const lastSet = exo.sets[exo.sets.length - 1];
                        if (lastSet?.completed) {
                            const targetReps = parseInt((exercise.reps || "0").split('-').pop()!);
                            if (parseInt(String(lastSet.reps)) >= targetReps && parseInt(String(lastSet.rir)) >= (exercise.rir || 1)) {
                                return parseFloat(String(lastSet.weight)) + (exercise.progression?.increment || 0);
                            }
                            return parseFloat(String(lastSet.weight));
                        }
                    } return null;
                };
                const subExos = performedExo.type === 'superset' ? performedExo.exercises : [performedExo];
                for (const subExo of subExos) { const w = checkExo(subExo); if (w !== null) return w; }
            }
        }
        return exercise.startWeight;
    }, [history]);

    return { history, saveWorkout, getExercisePR, getSuggestedWeight };
};

// --- ICONS ---
const DumbbellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 8.5C21 7.12 19.88 6 18.5 6H17V5C17 4.45 16.55 4 16 4H8C7.45 4 7 4.45 7 5V6H5.5C4.12 6 3 7.12 3 8.5V15.5C3 16.88 4.12 18 5.5 18H7V19C7 19.55 7.45 20 8 20H16C16.55 20 17 19.55 17 19V18H18.5C19.88 18 21 16.88 21 15.5V8.5ZM5 16.5V8.5C5 8.22 5.22 8 5.5 8H6V16H5.5C5.22 16 5 16.28 5 16.5ZM19 15.5C19 16.28 18.78 16 18.5 16H18V8H18.5C18.78 8 19 8.22 19 8.5V15.5Z"></path></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6H18V20H16V6ZM11 11H13V20H11V11ZM6 16H8V20H6V16ZM20 2H2V4H20V2Z"></path></svg>;

// --- REUSABLE COMPONENTS ---
const CalendarHeatmap = ({ history }: { history: HistoryData }) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 180);
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    const workoutDates = Object.keys(history).map(dateStr => new Date(dateStr).toDateString());
    return <div className="heatmap-container">{dates.map(date => <div key={date.toISOString()} className="heatmap-day" data-level={workoutDates.includes(date.toDateString()) ? 2 : 0}></div>)}</div>;
};

const ProgressionChart = ({ exerciseId, exerciseName, history }: { exerciseId: string, exerciseName: string, history: HistoryData }) => {
    const dataPoints = useMemo(() => {
        const points: { date: Date; weight: number }[] = [];
        Object.values(history).forEach((w: any) => {
            if (!w?.exercises) return;
            let maxWeight = 0;
            w.exercises.forEach((exo: any) => (exo.type === 'superset' ? exo.exercises : [exo]).forEach((subExo: any) => {
                if(subExo.id === exerciseId) subExo.sets.forEach((set: any) => { if (set.completed) maxWeight = Math.max(maxWeight, parseFloat(String(set.weight))); });
            }));
            if (maxWeight > 0) points.push({ date: new Date(w.date), weight: maxWeight });
        });
        return points.sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [history, exerciseId]);
    
    if (dataPoints.length < 2) return <div className="progression-chart"><h4 style={{marginBottom: 0}}>{exerciseName}</h4><p className="empty-stat-small">Pas assez de données pour un graphique.</p></div>;

    const weights = dataPoints.map(p => p.weight), maxW = Math.max(...weights), minW = Math.min(...weights), firstD = dataPoints[0].date.getTime(), lastD = dataPoints[dataPoints.length - 1].date.getTime();
    const getCoords = (p: { date: Date, weight: number }) => ({ x: lastD === firstD ? 50 : ((p.date.getTime() - firstD) / (lastD - firstD)) * 100, y: maxW === minW ? 50 : 100 - ((p.weight - minW) / (maxW - minW)) * 90 - 5 });
    const path = dataPoints.map(getCoords).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return <div className="progression-chart"><h4>{exerciseName}</h4><svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width: '100%', height: '100px'}}><path d={path} fill="none" stroke="url(#line-gradient)" strokeWidth="2" /><defs><linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="var(--primary-gradient-start)" /><stop offset="100%" stopColor="var(--primary-gradient-end)" /></linearGradient></defs></svg></div>;
};

const RestTimer = ({ duration, onFinish }: { duration: number, onFinish: () => void }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    useEffect(() => { if (timeLeft <= 0) { onFinish(); return; } const i = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000); return () => clearInterval(i); }, [timeLeft, onFinish]);
    return <div className="rest-timer-overlay"><h3>Repos</h3><div className="rest-timer-circle">{`${Math.floor(timeLeft/60)}:${(timeLeft%60).toString().padStart(2,'0')}`}</div><button className="skip-timer-btn" onClick={onFinish}>Passer</button></div>;
};

const IntensificationStep = ({ title, description, actionText, onAction, timer }: { title: string, description?: string, actionText: string, onAction: () => void, timer?: number }) => {
    const [timeLeft, setTimeLeft] = useState(timer);
    useEffect(() => {
        if (!timer) return;
        const interval = setInterval(() => setTimeLeft(t => t! <= 1 ? 0 : t! - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);
    return <div className="intensification-prompt"><h4>{title}</h4>{description && <p>{description}</p>}{timer && <div className="intensification-timer">Repos: {timeLeft}s</div>}<button className="intensification-action" onClick={onAction} disabled={!!(timeLeft && timeLeft > 0)}>{actionText}</button></div>;
};

const SetsTracker = ({ exercise, onSetComplete, onInputChange, onAddBonusSet, block }: { exercise: ExerciseRecord, onSetComplete: any, onInputChange: any, onAddBonusSet: any, block: any }) => {
    const [intensificationState, setIntensificationState] = useState<{ active: boolean, type?: string, step: number }>({ active: false, step: 0 });

    const handleCheck = (set: SetRecord, setIndex: number, subExoIndex: number = -1) => {
        onSetComplete(!set.completed, setIndex, subExoIndex);
        const targetExo = subExoIndex > -1 ? exercise.exercises![subExoIndex] : exercise;
        if (!set.completed && !set.isBonus && setIndex === (targetExo as any).sets - 1 && (targetExo as any).intensification) {
            setIntensificationState({ active: true, type: (targetExo as any).intensification, step: 1 });
        }
    };

    const renderIntensificationGuide = (exo: any, subExoIndex: number = -1) => {
        if (!intensificationState.active || intensificationState.type !== exo.intensification || !block) return null;
        const lastSet = exo.sets.filter((s: SetRecord) => !s.isBonus).pop(); if (!lastSet) return null;
        if (block.technique.name === 'Rest-Pause' && intensificationState.type === 'rest-pause') return <IntensificationStep title="🔥 Rest-Pause" actionText="Ajouter la série bonus" onAction={() => { onAddBonusSet({ weight: lastSet.weight, reps: '', rir: 0 }, subExoIndex); setIntensificationState({ active: false, step: 0 }); }} timer={20} />;
        if (block.technique.name.includes('Drop-Sets') && intensificationState.type === 'drop-set') return <IntensificationStep title="🔥 Drop-Set" description="Baissez le poids de ~25%." actionText="Ajouter la série Drop" onAction={() => { onAddBonusSet({ weight: (parseFloat(String(lastSet.weight)) * 0.75).toFixed(1), reps: '', rir: 0 }, subExoIndex); setIntensificationState({ active: false, step: 0 }); }} />;
        return null;
    };
    
    if (exercise.type === 'superset') {
      const numSets = (exercise.exercises![0] as any).sets;
      const allSets = Array.from({ length: numSets });
      return <div className="sets-tracker">{allSets.map((_, setIndex) => <div className="set-row" key={setIndex}><div className="set-number">{setIndex + 1}</div>{exercise.exercises!.map((subExo, subExoIndex) => <div key={subExo.id} className="set-input-group"><input type="number" value={subExo.sets[setIndex]?.weight || ''} onChange={(e) => onInputChange(e.target.value, 'weight', setIndex, subExoIndex)} /><input type="number" value={subExo.sets[setIndex]?.reps || ''} onChange={(e) => onInputChange(e.target.value, 'reps', setIndex, subExoIndex)} /></div>)}<button className={`set-check-btn ${exercise.exercises![0].sets[setIndex]?.completed ? 'completed' : ''}`} onClick={() => { handleCheck(exercise.exercises![0].sets[setIndex], setIndex, 0); handleCheck(exercise.exercises![1].sets[setIndex], setIndex, 1); }}>✓</button></div>)}</div>;
    }

    return <div className="sets-tracker-container"><div className="sets-tracker">{exercise.sets.map((set, index) => <div className={`set-row ${set.isBonus ? 'bonus-set' : ''}`} key={set.id}><div className="set-number">{set.isBonus ? '🔥' : index + 1}</div><div className="set-input"><label>Poids</label><input type="number" value={set.weight} onChange={(e) => onInputChange(e.target.value, 'weight', index)} /></div><div className="set-input"><label>Reps</label><input type="number" value={set.reps} onChange={(e) => onInputChange(e.target.value, 'reps', index)} /></div><div className="set-input"><label>RIR</label><input type="number" value={set.rir} onChange={(e) => onInputChange(e.target.value, 'rir', index)} /></div><button className={`set-check-btn ${set.completed ? 'completed' : ''}`} onClick={() => handleCheck(set, index)}>✓</button></div>)}{renderIntensificationGuide(exercise)}</div></div>;
};

const ActiveWorkoutView = ({ workout, meta, onEndWorkout, getSuggestedWeight }: { workout: any, meta: any, onEndWorkout: (w: any) => void, getSuggestedWeight: (e: any) => number }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isResting, setIsResting] = useState(false);
    const [restTime, setRestTime] = useState(0);
    const [workoutState, setWorkoutState] = useState<ExerciseRecord[]>(() => 
        workout.exercises.map((exo: any) => {
            const processExo = (subExo: any): ExerciseRecord => ({ ...subExo, sets: Array.from({ length: subExo.sets }, (_, i): SetRecord => ({ id: i, weight: getSuggestedWeight(subExo) || '', reps: (subExo.reps || "8").toString().split('-')[0], rir: subExo.rir || 1, completed: false })) });
            return exo.type === 'superset' ? { ...exo, exercises: exo.exercises.map(processExo) } : processExo(exo);
        })
    );
    const currentExercise = workoutState[currentIndex];
    const currentBlock = useMemo(() => programData.blocks.find(b => b.weeks.includes(meta.week)), [meta.week]);

    const handleSetComplete = (isCompleted: boolean, setIndex: number, subExoIndex = -1) => {
        const newWorkoutState = JSON.parse(JSON.stringify(workoutState));
        const newExo = newWorkoutState[currentIndex];
        const set = subExoIndex > -1 ? newExo.exercises![subExoIndex].sets[setIndex] : newExo.sets[setIndex];
        set.completed = isCompleted;
        setWorkoutState(newWorkoutState);
        if (isCompleted) {
            const restDuration = newExo.rest;
            if (restDuration) { setRestTime(restDuration); setIsResting(true); }
        }
    };

    const handleInputChange = (value: string, field: 'weight' | 'reps' | 'rir', setIndex: number, subExoIndex = -1) => {
        const newWorkoutState = JSON.parse(JSON.stringify(workoutState));
        const set = (subExoIndex > -1 ? newWorkoutState[currentIndex].exercises![subExoIndex] : newWorkoutState[currentIndex]).sets[setIndex];
        (set as any)[field] = value;
        setWorkoutState(newWorkoutState);
    };

    const handleAddBonusSet = (newSet: Partial<SetRecord>, subExoIndex = -1) => {
        const newWorkoutState = [...workoutState];
        const targetExo = subExoIndex > -1 ? newWorkoutState[currentIndex].exercises![subExoIndex] : newWorkoutState[currentIndex];
        targetExo.sets.push({ id: targetExo.sets.length, weight: '', reps: '', rir: 0, ...newSet, completed: false, isBonus: true });
        setWorkoutState(newWorkoutState);
    };
    return <div className="active-workout-overlay"><div className="workout-header"><span className="workout-progress">{currentIndex + 1} / {workoutState.length}</span><button className="end-workout-btn" onClick={() => onEndWorkout({ exercises: workoutState })}>Terminer</button></div><div className="current-exercise-info"><h2>{currentExercise.name || currentExercise.exercises!.map(e => e.name).join(' + ')}</h2></div><div className="sets-tracker-container"><SetsTracker exercise={currentExercise} onSetComplete={handleSetComplete} onInputChange={handleInputChange} onAddBonusSet={handleAddBonusSet} block={currentBlock} /></div><div className="workout-navigation"><button onClick={() => setCurrentIndex(i => i - 1)} disabled={currentIndex === 0}>Précédent</button><button onClick={() => setCurrentIndex(i => i + 1)} disabled={currentIndex === workoutState.length - 1}>Suivant</button></div>{isResting && <RestTimer duration={restTime} onFinish={() => setIsResting(false)} />}</div>;
};

// --- VIEW COMPONENTS ---
const ProjectionsView = ({ getExercisePR }: { getExercisePR: (id: string) => { weight: number, reps: number } }) => {
    return (
        <div className="stats-container">
            {programData.stats.projections.map(proj => {
                const currentPR = getExercisePR(proj.id).weight;
                const progress = Math.min(100, Math.max(0, ((currentPR - proj.start) / (proj.end - proj.start)) * 100));
                return (
                    <div className="projection-item" key={proj.id}>
                        <div className="stat-item-header"><span>{proj.name}</span><span>{currentPR || proj.start}kg / {proj.end}kg</span></div>
                        <div className="projection-bar-bg"><div className="projection-bar-fg" style={{width: `${progress}%`}}></div></div>
                    </div>
                );
            })}
        </div>
    );
};

const WeeklyVolumeView = () => {
    const statsData = programData.stats.weeklyVolume;
    const maxSeries = Math.max(...statsData.map(s => s.series), ...statsData.map(s => s.optimal[1]));
    return (
        <div className="stats-container">
            {statsData.map(stat => (
                <div key={stat.muscle}>
                    <div className="stat-item-header"><span>{stat.muscle}</span><span>{stat.series} séries</span></div>
                    <div className="stat-bar-container">
                        <div className="stat-optimal-range" style={{left: `${(stat.optimal[0]/maxSeries)*100}%`, width: `${((stat.optimal[1]-stat.optimal[0])/maxSeries)*100}%`}}></div>
                        <div className="stat-bar" style={{width: `${(stat.series/maxSeries)*100}%`}}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const StatisticsView = ({ getExercisePR, history }: { getExercisePR: (id: string) => { weight: number, reps: number }, history: HistoryData }) => {
    const hasHistory = Object.keys(history).length > 0;
    return (
      <div className="main-content">
        <h2 className="stats-header">Statistiques & Progression</h2>
        {!hasHistory && <div className="empty-stat">Enregistrez votre première séance pour voir vos statistiques ici !</div>}
        {hasHistory && <>
          <div className="stats-section"><h3>🗓️ Calendrier d'Activité</h3><CalendarHeatmap history={history} /></div>
          <div className="stats-section"><h3>🎯 Objectifs & Projections</h3><ProjectionsView getExercisePR={getExercisePR} /></div>
          <div className="stats-section"><h3>📈 Progression des Charges</h3>{programData.stats.projections.map(exo => <ProgressionChart key={exo.id} exerciseId={exo.id} exerciseName={exo.name} history={history} /> )}</div>
        </>}
        <div className="stats-section"><h3>📊 Volume Hebdomadaire</h3><WeeklyVolumeView /></div>
      </div>
    );
};

const ExerciseCard = ({ exercise }: { exercise: any }) => { if (exercise.type === 'superset') return <div className="superset-card">{exercise.exercises.map((subExo: any, i: number) => <div key={subExo.id} style={{ marginBottom: i === 0 ? '1rem' : '0' }}><div className="exercise-header"><h4>{subExo.name}</h4><div className="sets-reps">{subExo.sets} × {subExo.reps}</div></div></div>)}<div className="exercise-details">Repos: {exercise.rest}s après le duo</div></div>; return <div className="exercise-card"><div className="exercise-header"><h4>{exercise.name}</h4><div className="sets-reps">{exercise.sets} × {exercise.reps}</div></div><div className="exercise-details"><span>RIR {exercise.rir} | Repos: {exercise.rest}s</span></div></div>; };

const WorkoutPlannerView = ({ onStartWorkout }: { onStartWorkout: (w: any, wk: number, d: string, isHome?: boolean) => void }) => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [activeDay, setActiveDay] = useState(() => { const dayIndex = new Date().getDay(); const dayMap: { [k: number]: string } = {0: 'dimanche', 2: 'mardi', 4: 'jeudi', 5: 'vendredi'}; return dayMap[dayIndex] || 'dimanche'; });

  const { currentBlock, isDeload } = useMemo(() => {
    if (programData.deloadWeeks.includes(currentWeek)) return { isDeload: true, currentBlock: { name: `SEMAINE ${currentWeek}: DELOAD`, technique: { name: "Récupération", desc: "Charges réduites, RPE 5-6." } } };
    const block = programData.blocks.find(b => b.weeks.includes(currentWeek)) || { name: "Phase Initiale", technique: { name: "Technique", desc: "Concentration sur la forme." } };
    return { isDeload: false, currentBlock: block };
  }, [currentWeek]);
  
  const gymWorkout = useMemo(() => {
    const originalWorkout = (programData.workouts as any)[activeDay];
    if (!originalWorkout) return null;
    let workout = JSON.parse(JSON.stringify(originalWorkout));
    const getBicepsName = (w: number) => { const b = programData.blocks.find(bl => bl.weeks.includes(w))?.id; return (b === 1 || b === 3) ? 'Incline Curl' : 'Spider Curl'; };
    workout.exercises.forEach((exo: any) => (exo.type === 'superset' ? exo.exercises : [exo]).forEach((subExo: any) => { if (subExo.bicepsRotation) subExo.name = getBicepsName(currentWeek); }));
    return workout;
  }, [activeDay, currentWeek]);

  const homeWorkout = (programData.homeWorkouts as any)[activeDay];

  return (
    <div className="main-content">
      <header className="header"><h1>HYBRID MASTER 51</h1></header>
      <div className="week-navigator"><button onClick={() => setCurrentWeek(w => Math.max(1, w - 1))}>&lt;</button><div className="week-display">Semaine {currentWeek}</div><button onClick={() => setCurrentWeek(w => Math.min(26, w + 1))}>&gt;</button></div>
      <div className="block-info"><h3>{currentBlock.name}</h3><p><strong>Technique :</strong> {currentBlock.technique.desc}</p></div>
      <div className="tabs">{['dimanche', 'mardi', 'jeudi', 'vendredi'].map(day => <button key={day} className={`tab ${activeDay === day ? 'active' : ''}`} onClick={() => setActiveDay(day)}>{day.charAt(0).toUpperCase() + day.slice(1)}</button>)}</div>
      <div className="workout-overview">
        {gymWorkout && <button className="start-session-btn" onClick={() => onStartWorkout(gymWorkout, currentWeek, activeDay)} disabled={isDeload}>{isDeload ? 'Jour de repos / Deload' : `Commencer - ${gymWorkout.name}`}</button>}
        {gymWorkout && gymWorkout.exercises.map((exo: any, index: number) => <ExerciseCard key={exo.id || `superset-${index}`} exercise={exo} />)}
        {homeWorkout && <div className="home-workout-card"><div><h4>🏠 Séance à la Maison</h4><p>{homeWorkout.name} - {homeWorkout.sets} × {homeWorkout.reps}</p></div><button className="start-home-btn" onClick={() => onStartWorkout({ name: "Séance Maison", exercises: [homeWorkout] }, currentWeek, activeDay, true)}>Démarrer</button></div>}
        {!gymWorkout && !homeWorkout && <p style={{textAlign: 'center', marginTop: '2rem'}}>Jour de repos.</p>}
      </div>
    </div>
  );
};

const BottomNav = ({ currentView, setView }: { currentView: string, setView: (v: string) => void }) => (
    <nav className="bottom-nav"><button className={`nav-item ${currentView === 'program' ? 'active' : ''}`} onClick={() => setView('program')}><DumbbellIcon /><span>Programme</span></button><button className={`nav-item ${currentView === 'stats' ? 'active' : ''}`} onClick={() => setView('stats')}><ChartIcon /><span>Stats</span></button></nav>
);

// --- MAIN APP COMPONENT ---
const App = () => {
  const [currentView, setCurrentView] = useState('program');
  const [activeWorkout, setActiveWorkout] = useState<any>(null);
  const { history, saveWorkout, getExercisePR, getSuggestedWeight } = useWorkoutHistory();
  
  const handleStartWorkout = (workout: any, week: number, day: string, isHomeWorkout = false) => { setActiveWorkout({ workout, meta: { week, day, isHomeWorkout }, startTime: Date.now() }); };
  const handleEndWorkout = (completedWorkout: any) => {
    if (completedWorkout) { saveWorkout({ date: new Date().toISOString(), ...activeWorkout.meta, exercises: completedWorkout.exercises }); }
    setActiveWorkout(null);
  };

  return (
    <div className="app-container">
      <div style={{display: currentView === 'program' ? 'block' : 'none', height: '100%'}}><WorkoutPlannerView onStartWorkout={handleStartWorkout} /></div>
      <div style={{display: currentView === 'stats' ? 'block' : 'none', height: '100%'}}><StatisticsView getExercisePR={getExercisePR} history={history} /></div>
      {activeWorkout && <ActiveWorkoutView key={activeWorkout.startTime} workout={activeWorkout.workout} meta={activeWorkout.meta} onEndWorkout={handleEndWorkout} getSuggestedWeight={getSuggestedWeight} />}
      {!activeWorkout && <BottomNav currentView={currentView} setView={setCurrentView} />}
    </div>
  );
};

// --- RENDER APP ---
const container = document.getElementById('root');
if(container) { createRoot(container).render(<App />); }
