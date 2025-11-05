:root {
  --background-start: #1c1c1e;
  --background-end: #0a0a0c;
  
  --primary-gradient-start: #5e5ce6;
  --primary-gradient-end: #bf5af2;
  --primary-color-static: #8e44ad;

  --secondary-color: #ff9f0a;

  --text-primary: #ffffff;
  --text-secondary: #aeaeb2;

  --success-color: #32d74b;
  --danger-color: #ff453a;

  --glass-surface-bg: rgba(44, 44, 46, 0.7);
  --glass-border-color: rgba(60, 60, 67, 0.36);
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --border-radius-main: 20px;
  --border-radius-inner: 16px;
  --bottom-nav-height: 70px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-family);
  background: linear-gradient(180deg, var(--background-start) 0%, var(--background-end) 100%);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-smoothing: grayscale;
  display: flex;
  justify-content: center;
}

#root {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.app-container {
  width: 100%;
  max-width: 430px; /* Cible iPhone 14/15 Pro Max */
  height: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.main-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1.5rem 1rem calc(var(--bottom-nav-height) + 1.5rem) 1rem;
}

.header h1 {
  font-size: 1.8rem;
  font-weight: 800;
}

.week-navigator {
  margin-top: 1.5rem;
  background: var(--glass-surface-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border-color);
  border-radius: var(--border-radius-main);
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.week-navigator button {
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 2rem;
  cursor: pointer;
}
.week-navigator button:disabled { color: var(--text-secondary); }
.week-display { font-size: 1.25rem; font-weight: 600; }

.block-info {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: var(--border-radius-main);
  background: linear-gradient(135deg, rgba(94, 92, 230, 0.2), rgba(191, 90, 242, 0.2));
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
  padding: 0.5rem;
  background: var(--glass-surface-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border-color);
  border-radius: var(--border-radius-main);
}
.tab {
  padding: 0.75rem 1rem;
  cursor: pointer;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 1rem;
  border-radius: var(--border-radius-inner);
  transition: all 0.3s ease;
  flex-grow: 1;
}
.tab.active {
  color: #fff;
  background: linear-gradient(90deg, var(--primary-gradient-start) 0%, var(--primary-gradient-end) 100%);
  box-shadow: 0 4px 15px rgba(94, 92, 230, 0.4);
}

.workout-overview { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
.start-session-btn {
  background: linear-gradient(90deg, var(--primary-gradient-start) 0%, var(--primary-gradient-end) 100%);
  color: #fff; font-size: 1.1rem; font-weight: 600; border: none; border-radius: var(--border-radius-main);
  padding: 1rem; width: 100%; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
}
.start-session-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(94, 92, 230, 0.4); }
.start-session-btn:disabled { background: var(--glass-surface-bg); color: var(--text-secondary); cursor: not-allowed; transform: none; box-shadow: none; }

.exercise-card, .superset-card {
  background: var(--glass-surface-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border-color);
  border-radius: var(--border-radius-main);
  padding: 1rem;
}
.superset-card { border-left: 4px solid var(--secondary-color); }
.exercise-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
.exercise-details { border-top: 1px solid var(--glass-border-color); padding-top: 0.75rem; font-size: 0.8rem; color: var(--text-secondary); }
h4 { font-size: 1.1rem; }
.sets-reps { color: var(--text-secondary); }

.home-workout-card {
  margin-top: 1.5rem;
  background: var(--glass-surface-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border-color);
  border-left: 4px solid var(--secondary-color);
  padding: 1rem;
  border-radius: var(--border-radius-main);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.home-workout-card .start-home-btn {
  background-color: var(--secondary-color);
  color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 12px; font-weight: 600; cursor: pointer;
}

.bottom-nav {
  position: absolute; bottom: 0; left: 0; right: 0; height: var(--bottom-nav-height);
  background: var(--glass-surface-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--glass-border-color);
  display: flex; justify-content: space-around; align-items: flex-start;
  padding-top: 10px;
}
.nav-item {
  background: none; border: none; cursor: pointer; color: var(--text-secondary);
  display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 0.7rem;
}
.nav-item.active { color: var(--primary-color-static); }
.nav-item svg { width: 24px; height: 24px; }

.stats-header { text-align: center; margin-bottom: 2rem; }
.stats-section { margin-bottom: 2.5rem; }
.stats-section h3 { margin-bottom: 1rem; font-size: 1.2rem; background: linear-gradient(90deg, var(--primary-gradient-start) 0%, var(--primary-gradient-end) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; border-bottom: 1px solid var(--glass-border-color); padding-bottom: 0.5rem; }
.stats-container { display: flex; flex-direction: column; gap: 1rem; }
.stat-item-header { display: flex; justify-content: space-between; font-weight: 600; }
.stat-bar-container { width: 100%; height: 20px; background: var(--glass-surface-bg); border-radius: 10px; overflow: hidden; position: relative; }
.stat-bar { height: 100%; background: linear-gradient(90deg, var(--primary-gradient-start) 0%, var(--primary-gradient-end) 100%); border-radius: 10px; }
.stat-optimal-range { position: absolute; height: 100%; background-color: rgba(255, 255, 255, 0.1); top: 0; }
.pr-list .stat-item-header { background: var(--glass-surface-bg); padding: 1rem; border-radius: var(--border-radius-inner); }
.empty-stat { background: var(--glass-surface-bg); color: var(--text-secondary); padding: 2rem; text-align: center; border-radius: var(--border-radius-main); }
.heatmap-container { display: grid; grid-template-rows: repeat(7, 1fr); grid-auto-flow: column; gap: 4px; }
.heatmap-day { width: 16px; height: 16px; background-color: var(--glass-surface-bg); border-radius: 4px; }
.heatmap-day[data-level="2"] { background: linear-gradient(45deg, var(--primary-gradient-start), var(--primary-gradient-end)); }
.progression-chart { background: var(--glass-surface-bg); padding: 1rem; border-radius: var(--border-radius-main); }
.empty-stat-small { font-size: 0.9rem; color: var(--text-secondary); text-align: center; padding: 1rem 0; }
.projection-item { background: var(--glass-surface-bg); padding: 1rem; border-radius: var(--border-radius-inner); }
.projection-bar-bg { width: 100%; height: 8px; background: rgba(0,0,0,0.3); border-radius: 4px; margin-top: 0.5rem; }
.projection-bar-fg { height: 100%; background: linear-gradient(90deg, var(--primary-gradient-start) 0%, var(--primary-gradient-end) 100%); border-radius: 4px; }

.active-workout-overlay, .rest-timer-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 100;
  display: flex; flex-direction: column;
  background: rgba(10, 10, 12, 0.8);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  animation: slideInUp 0.3s ease-out;
}
@keyframes slideInUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
.active-workout-overlay { padding: 1.5rem 1rem; }
.workout-header { display: flex; justify-content: space-between; align-items: center; }
.end-workout-btn { background: var(--glass-surface-bg); color: var(--danger-color); border: 1px solid var(--danger-color); padding: 0.5rem 1rem; border-radius: 10px; cursor: pointer; font-weight: 600; }
.current-exercise-info { text-align: center; margin: 1rem 0; }
.sets-tracker-container { overflow-y: auto; flex-grow: 1; }
.sets-tracker { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem; }
.set-row { display: grid; grid-template-columns: 30px 1fr 1fr 1fr 50px; gap: 0.75rem; align-items: center; background: var(--glass-surface-bg); padding: 0.5rem 1rem; border-radius: var(--border-radius-inner); }
.set-row.bonus-set { border-left: 3px solid var(--secondary-color); }
.set-input { display: flex; flex-direction: column; align-items: center; }
.set-input label { font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 2px; }
.set-input input { background: transparent; border: none; border-bottom: 2px solid var(--glass-border-color); color: var(--text-primary); font-size: 1.1rem; width: 100%; text-align: center; padding-bottom: 2px; }
.set-input input:focus { border-bottom-color: var(--primary-color-static); outline: none; }
.set-check-btn { width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--glass-border-color); background: none; cursor: pointer; font-size: 1.2rem; color: var(--text-secondary); transition: all 0.2s ease; }
.set-check-btn.completed { background-color: var(--success-color); border-color: var(--success-color); color: #fff; }
.workout-navigation { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--glass-border-color); display: flex; justify-content: space-between; }
.workout-navigation button { background: var(--glass-surface-bg); color: var(--text-primary); border: 1px solid var(--glass-border-color); padding: 1rem 2rem; border-radius: 12px; font-weight: 600; cursor: pointer; }
.workout-navigation button:disabled { opacity: 0.5; cursor: not-allowed; }
.intensification-prompt { background: var(--glass-surface-bg); border-top: 2px solid var(--secondary-color); padding: 1rem; margin-top: 1rem; text-align: center; border-radius: var(--border-radius-inner); }
.intensification-prompt h4 { color: var(--secondary-color); }
.intensification-timer { font-size: 1.5rem; font-weight: 700; color: var(--secondary-color); margin: 0.5rem 0; }
.intensification-action { background-color: var(--secondary-color); color: #000; border: none; padding: 0.75rem 1.5rem; border-radius: 12px; font-weight: 600; cursor: pointer; margin-top: 0.5rem; }
.intensification-action:disabled { background-color: var(--text-secondary); cursor: not-allowed; }
.rest-timer-overlay { justify-content: center; align-items: center; gap: 2rem; text-align: center; }
.rest-timer-circle { font-variant-numeric: tabular-nums; font-size: 5rem; font-weight: 700; color: var(--secondary-color); }
.skip-timer-btn { background: none; border: 1px solid var(--text-secondary); color: var(--text-secondary); padding: 0.75rem 1.5rem; border-radius: 12px; cursor: pointer; }
