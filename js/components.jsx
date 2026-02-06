/**
 * React 元件：幣安風格 UI + 員工模擬功能
 */
const { useState, useEffect, useCallback, useRef } = React;
const {
  getStressLabel, getPerfLabel, getBossLabel,
  getStressColor, getPerfColor, getBossColor,
  getMood, clamp,
} = window.GameHelpers;
const JOBS = window.JOBS;
const INITIAL_STATS = window.INITIAL_STATS;
const INITIAL_EMPLOYEE = window.INITIAL_EMPLOYEE;

// ==================== Helper: pick random ====================
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ==================== Notification Toast ====================
function NotificationToast({ notification, onDismiss }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onDismiss, 300);
    }, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);

  if (!notification) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm ${exiting ? 'notif-exit' : 'notif-enter'}`}>
      <div className="notif-toast p-3 flex items-start gap-3 cursor-pointer" onClick={() => { setExiting(true); setTimeout(onDismiss, 300); }}>
        <span className="text-2xl flex-shrink-0">{notification.icon}</span>
        <div className="min-w-0">
          <div className="text-xs font-semibold" style={{ color: '#F0B90B' }}>{notification.from}</div>
          <div className="text-sm mt-0.5" style={{ color: '#EAECEF' }}>{notification.msg}</div>
        </div>
        <span className="text-xs flex-shrink-0" style={{ color: '#5E6673' }}>剛剛</span>
      </div>
    </div>
  );
}

// ==================== Daily Flavor Text ====================
function DailyFlavor({ text }) {
  if (!text) return null;
  return (
    <div className="anim-fadeIn bn-card p-3 text-center" style={{ borderLeft: '3px solid #F0B90B' }}>
      <p className="text-sm italic" style={{ color: '#848E9C' }}>📝 {text}</p>
    </div>
  );
}

// ==================== Coffee Button ====================
function CoffeeButton({ count, onDrink }) {
  return (
    <button
      onClick={onDrink}
      disabled={count <= 0}
      className="btn-hover flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      style={{
        background: count > 0 ? '#2B3139' : '#1E2329',
        border: '1px solid #2B3139',
        color: '#EAECEF',
      }}
      title="喝咖啡 (壓力-8)"
    >
      <img src="coffee.png" alt="coffee" className="w-4 h-4 object-contain"
        onError={(e) => { e.target.style.display='none'; }} />
      <span>☕ {count}</span>
    </button>
  );
}

// ==================== Wallet Display ====================
function WalletBadge({ salary, bnb }) {
  return (
    <div className="flex items-center gap-3 text-xs" style={{ color: '#848E9C' }}>
      <span>💰 {salary.toLocaleString()} USDT</span>
      <span style={{ color: '#F0B90B' }}>◆ {bnb.toFixed(2)} BNB</span>
    </div>
  );
}

// ==================== Event Log ====================
function EventLog({ logs }) {
  if (logs.length === 0) return null;
  return (
    <div className="bn-card p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold" style={{ color: '#F0B90B' }}>📋 事件紀錄</span>
      </div>
      <div className="log-scroll space-y-1.5 max-h-32 overflow-y-auto">
        {logs.slice(-5).reverse().map((log, i) => (
          <div key={i} className="flex items-start gap-2 text-xs" style={{ color: i === 0 ? '#EAECEF' : '#5E6673' }}>
            <span className="flex-shrink-0" style={{ color: '#848E9C' }}>D{log.day}</span>
            <span className="truncate">{log.title} → {log.outcome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== StatBar ====================
function StatBar({ emoji, label, value, colorFn, showValue }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-sm">{emoji}</span>
        <span className="text-xs font-medium truncate" style={{ color: '#EAECEF' }}>{label}</span>
        {showValue && (
          <span className="text-xs font-bold ml-auto" style={{ color: '#F0B90B' }}>{value}</span>
        )}
      </div>
      <div className="stat-bar-bg">
        <div
          className="stat-bar-fill"
          style={{ width: value + '%', background: colorFn(value) }}
        />
      </div>
    </div>
  );
}

// ==================== Avatar ====================
function Avatar({ job, mood }) {
  const jobData = JOBS[job];
  const src = jobData.images[mood];
  const animClass =
    mood === 'happy' ? 'anim-pulse' :
    mood === 'stressed' ? 'anim-bounce' : 'anim-float';

  return (
    <div className={animClass + ' flex justify-center'}>
      <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden shadow-xl"
           style={{ border: '2px solid #2B3139', background: '#181A20' }}>
        <img
          src={src}
          alt={jobData.name + ' - ' + mood}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML =
              '<div class="w-full h-full flex items-center justify-center text-6xl">' +
              jobData.emoji + '</div>';
          }}
        />
      </div>
    </div>
  );
}

// ==================== Loading ====================
function Loading() {
  const msgs = [
    '正在查看 Slack 訊息...',
    '正在泡咖啡...',
    '正在打開交易面板...',
    '正在刷新工單系統...',
    '正在閱讀合規文件...',
    '正在觀察 K 線...',
    'CZ 正在打字...',
    '正在載入 Binance Dashboard...',
  ];
  const [msg] = useState(() => msgs[Math.floor(Math.random() * msgs.length)]);

  return (
    <div className="bn-card p-8 max-w-2xl mx-auto text-center">
      <div
        className="inline-block w-10 h-10 rounded-full anim-spin mb-4"
        style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: '#2B3139', borderTopColor: '#F0B90B' }}
      />
      <p className="text-sm" style={{ color: '#848E9C' }}>{msg}</p>
    </div>
  );
}

// ==================== EventCard ====================
function EventCard({ event, onChoice, disabled }) {
  return (
    <div className="anim-fadeIn bn-card p-5 md:p-6 max-w-2xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#EAECEF' }}>{event.title}</h2>
      <p className="text-sm md:text-base leading-relaxed mb-5" style={{ color: '#848E9C' }}>
        {event.description}
      </p>
      <div className="space-y-3">
        {event.choices.map((c, i) => (
          <button
            key={i}
            onClick={() => onChoice(c)}
            disabled={disabled}
            className={'choice-enter-' + (i+1) + ' btn-hover w-full text-left rounded-xl p-4 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'}
            style={{ background: '#2B3139', border: '1px solid #363C45', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#F0B90B'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#363C45'; }}
          >
            <div className="font-medium text-sm md:text-base mb-1.5" style={{ color: '#EAECEF' }}>{c.text}</div>
            <div className="flex flex-wrap gap-3 text-xs">
              <span style={{ color: c.stressChange > 0 ? '#F6465D' : c.stressChange < 0 ? '#0ECB81' : '#5E6673' }}>
                😰 壓力 {c.stressChange > 0 ? '+' : ''}{c.stressChange}
              </span>
              <span style={{ color: c.performanceChange > 0 ? '#0ECB81' : c.performanceChange < 0 ? '#F6465D' : '#5E6673' }}>
                📈 績效 {c.performanceChange > 0 ? '+' : ''}{c.performanceChange}
              </span>
              <span style={{ color: c.bossApprovalChange > 0 ? '#0ECB81' : c.bossApprovalChange < 0 ? '#F6465D' : '#5E6673' }}>
                👔 好感 {c.bossApprovalChange > 0 ? '+' : ''}{c.bossApprovalChange}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ==================== OutcomeCard ====================
function OutcomeCard({ choice, onNext }) {
  return (
    <div className="anim-fadeIn bn-card p-6 max-w-2xl mx-auto text-center">
      <p className="text-lg mb-4 font-medium" style={{ color: '#EAECEF' }}>{choice.outcome}</p>
      <div className="flex justify-center gap-5 text-sm mb-5">
        <span style={{ color: choice.stressChange > 0 ? '#F6465D' : '#0ECB81' }}>
          壓力 {choice.stressChange > 0 ? '+' : ''}{choice.stressChange}
        </span>
        <span style={{ color: choice.performanceChange > 0 ? '#0ECB81' : '#F6465D' }}>
          績效 {choice.performanceChange > 0 ? '+' : ''}{choice.performanceChange}
        </span>
        <span style={{ color: choice.bossApprovalChange > 0 ? '#0ECB81' : '#F6465D' }}>
          好感 {choice.bossApprovalChange > 0 ? '+' : ''}{choice.bossApprovalChange}
        </span>
      </div>
      <button onClick={onNext} className="bn-btn-primary text-sm">
        繼續下一天 →
      </button>
    </div>
  );
}

// ==================== TitleScreen ====================
function TitleScreen({ onSelectJob }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: '#0B0E11' }}>
      {/* Header */}
      <div className="anim-slideDown text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <svg width="40" height="40" viewBox="0 0 126 126" fill="none">
            <path d="M63 0L77.5 14.5L63 29L48.5 14.5L63 0Z" fill="#F0B90B"/>
            <path d="M28 35L42.5 49.5L28 64L13.5 49.5L28 35Z" fill="#F0B90B"/>
            <path d="M98 35L112.5 49.5L98 64L83.5 49.5L98 35Z" fill="#F0B90B"/>
            <path d="M63 35L77.5 49.5L63 64L48.5 49.5L63 35Z" fill="#F0B90B"/>
            <path d="M28 70L42.5 84.5L28 99L13.5 84.5L28 70Z" fill="#F0B90B"/>
            <path d="M98 70L112.5 84.5L98 99L83.5 84.5L98 70Z" fill="#F0B90B"/>
            <path d="M63 70L77.5 84.5L63 99L48.5 84.5L63 70Z" fill="#F0B90B"/>
            <path d="M63 105L77.5 119.5L63 126L48.5 112L63 105Z" fill="#F0B90B"/>
          </svg>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: '#EAECEF' }}>
            <span style={{ color: '#F0B90B' }}>Binance</span> 員工模擬器
          </h1>
        </div>
        <p className="text-lg" style={{ color: '#848E9C' }}>在 crypto 最瘋狂的公司裡存活 30 天</p>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl w-full">
        {Object.values(JOBS).map((job, i) => (
          <button
            key={job.id}
            onClick={() => onSelectJob(job.id)}
            className={'card-enter-' + (i+1) + ' btn-hover bn-card-hover p-6 text-left cursor-pointer group'}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{job.emoji}</span>
              <div>
                <h3 className="text-lg font-bold" style={{ color: '#EAECEF' }}>{job.name}</h3>
                <span className={'text-sm font-semibold ' + job.diffColor}>
                  難度：{job.difficulty}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#848E9C' }}>{job.desc}</p>
            <div
              className="text-center py-2 rounded-lg font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: '#F0B90B', color: '#0B0E11' }}
            >
              選擇此職業 →
            </div>
          </button>
        ))}
      </div>

      {/* Footer hint */}
      <div className="mt-10 text-center" style={{ color: '#5E6673' }}>
        <p className="text-sm">存活 30 天且績效 ≥ 70 即可升職</p>
        <p className="text-xs mt-1">壓力爆表 (≥95) 或老闆好感歸零 (≤10) 就 Game Over</p>
      </div>
    </div>
  );
}

// ==================== EndingScreen ====================
function EndingScreen({ type, stats, day, job, employee, onRestart }) {
  const endings = {
    burnout: {
      img: 'fire.png',
      emoji: '🔥',
      title: '壓力過載！你崩潰離職了',
      desc: '在幣安工作了 ' + day + ' 天後，你的精神終於承受不住了。你在凌晨三點對著電腦螢幕發呆了兩小時後，默默提交了離職信。至少你學會了什麼叫「To the moon」的反義詞。',
      bg: '#0B0E11',
      accent: '#F6465D',
    },
    fired: {
      img: 'fire.png',
      emoji: '💀',
      title: '你被開除了！',
      desc: '在第 ' + day + ' 天，老闆終於受不了了。HR 帶著保安來收你的工牌，同事們目送你離開辦公室。你在電梯裡偷偷刪掉了手機上的幣安 APP。「至少我還有 ' + (employee.bnbBalance).toFixed(2) + ' BNB」你安慰自己。',
      bg: '#0B0E11',
      accent: '#F6465D',
    },
    promoted: {
      img: 'trophy.png',
      emoji: '🏆',
      title: '恭喜升職！',
      desc: '經過 30 天的奮鬥，你成功從菜鳥進化成了幣安的中流砥柱！老闆在全體會議上點名表揚你，同事們用 USDT 紅包向你道賀。你的新頭銜是「Senior ' + JOBS[job].name + '」，薪水漲了 20%（以 BNB 計價）。',
      bg: '#0B0E11',
      accent: '#F0B90B',
    },
  };

  var c = endings[type];

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: c.bg }}>
      <div className="anim-fadeIn text-center max-w-lg w-full">
        {/* Icon */}
        <div className="mb-6">
          <img
            src={c.img}
            alt={type}
            className="w-28 h-28 mx-auto object-contain anim-float"
            onError={(e) => {
              e.target.style.display = 'none';
              var span = document.createElement('span');
              span.className = 'text-7xl anim-float inline-block';
              span.textContent = c.emoji;
              e.target.parentNode.appendChild(span);
            }}
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: c.accent }}>{c.title}</h1>
        <p className="leading-relaxed mb-6" style={{ color: '#848E9C' }}>{c.desc}</p>

        {/* Final stats */}
        <div className="bn-card p-5 mb-4">
          <h3 className="font-semibold mb-4 text-sm" style={{ color: '#F0B90B' }}>📊 最終報告</h3>
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
              <div className="text-2xl font-bold" style={{ color: '#F6465D' }}>{stats.stress}</div>
              <div className="text-xs" style={{ color: '#5E6673' }}>壓力值</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: '#0ECB81' }}>{stats.performance}</div>
              <div className="text-xs" style={{ color: '#5E6673' }}>績效</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: '#3b82f6' }}>{stats.bossApproval}</div>
              <div className="text-xs" style={{ color: '#5E6673' }}>老闆好感</div>
            </div>
          </div>
          <div className="pt-3 flex justify-center gap-6 text-xs" style={{ borderTop: '1px solid #2B3139', color: '#5E6673' }}>
            <span>存活 {day} 天</span>
            <span>剩餘 ☕ × 咖啡</span>
            <span>💰 {employee.salary.toLocaleString()} USDT</span>
          </div>
        </div>

        <button onClick={onRestart} className="bn-btn-primary text-lg px-10 py-3">
          再來一局
        </button>
      </div>
    </div>
  );
}

// ==================== GameScreen ====================
function GameScreen({ job, onRestart }) {
  const [day, setDay] = useState(1);
  const [stats, setStats] = useState({ ...INITIAL_STATS });
  const [employee, setEmployee] = useState({ ...INITIAL_EMPLOYEE });
  const [showValues, setShowValues] = useState(false);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chosenResult, setChosenResult] = useState(null);
  const [ending, setEnding] = useState(null);
  const [notification, setNotification] = useState(null);
  const [eventLog, setEventLog] = useState([]);
  const [dailyFlavor, setDailyFlavor] = useState('');
  const eventKeyRef = useRef(0);

  const jobData = JOBS[job];
  const mood = getMood(stats);

  // Show a random Slack notification
  const showRandomNotif = useCallback(() => {
    var notifs = window.SLACK_NOTIFICATIONS[job];
    setNotification(pickRandom(notifs));
  }, [job]);

  // Load a new event (API or fallback)
  const loadEvent = useCallback(async (currentDay, currentStats) => {
    setLoading(true);
    setEvent(null);
    setChosenResult(null);
    eventKeyRef.current += 1;

    // Daily flavor text
    setDailyFlavor(pickRandom(window.DAILY_FLAVOR));

    // Random Slack notification (60% chance)
    if (Math.random() < 0.6) {
      setTimeout(showRandomNotif, 1200);
    }

    try {
      var ev = await window.GameAPI.fetchEvent(job, currentDay, currentStats);
      if (ev && ev.title && ev.choices && ev.choices.length === 3) {
        setEvent(ev);
      } else {
        throw new Error('Invalid event format');
      }
    } catch (err) {
      console.warn('API failed, using fallback:', err);
      setEvent(window.getRandomFallback(job));
    }
    setLoading(false);
  }, [job, showRandomNotif]);

  useEffect(() => {
    loadEvent(day, stats);
  }, []);

  // Drink coffee: stress -8
  const drinkCoffee = () => {
    if (employee.coffee <= 0) return;
    setEmployee(prev => ({ ...prev, coffee: prev.coffee - 1 }));
    setStats(prev => ({ ...prev, stress: clamp(prev.stress - 8) }));
  };

  const handleChoice = (choice) => {
    var newStats = {
      stress: clamp(stats.stress + choice.stressChange),
      performance: clamp(stats.performance + choice.performanceChange),
      bossApproval: clamp(stats.bossApproval + choice.bossApprovalChange),
    };
    setStats(newStats);
    setChosenResult(choice);

    // Log this event
    setEventLog(prev => [...prev, { day: day, title: event.title, outcome: choice.outcome }]);

    // Salary bonus/penalty based on performance
    var salaryDelta = choice.performanceChange > 10 ? 200 : choice.performanceChange < -10 ? -100 : 0;
    var bnbDelta = choice.bossApprovalChange > 8 ? 0.05 : 0;
    if (salaryDelta !== 0 || bnbDelta !== 0) {
      setEmployee(prev => ({
        ...prev,
        salary: Math.max(0, prev.salary + salaryDelta),
        bnbBalance: Math.max(0, prev.bnbBalance + bnbDelta),
      }));
    }

    // Check endings
    if (newStats.stress >= 95) {
      setTimeout(() => setEnding('burnout'), 1200);
    } else if (newStats.bossApproval <= 10) {
      setTimeout(() => setEnding('fired'), 1200);
    } else if (day >= 30 && newStats.performance >= 70) {
      setTimeout(() => setEnding('promoted'), 1200);
    }
  };

  const handleNextDay = () => {
    var nextDay = day + 1;
    if (nextDay > 30 && stats.performance >= 70) {
      setEnding('promoted');
      return;
    }

    // New day: refill 1 coffee (max 3)
    setEmployee(prev => ({ ...prev, coffee: Math.min(3, prev.coffee + 1) }));

    setDay(nextDay);
    loadEvent(nextDay, stats);
  };

  if (ending) {
    return (
      <EndingScreen
        type={ending} stats={stats} day={day}
        job={job} employee={employee} onRestart={onRestart}
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0B0E11' }}>
      {/* Notification Toast */}
      {notification && (
        <NotificationToast
          notification={notification}
          onDismiss={() => setNotification(null)}
        />
      )}

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Top Bar: Binance style header */}
        <div className="anim-slideDown bn-card p-4">
          {/* Row 1: Job title + day + buttons */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">{jobData.emoji}</span>
              <span className="font-bold text-sm" style={{ color: '#EAECEF' }}>{jobData.name}</span>
              <span className="text-sm font-semibold" style={{ color: '#F0B90B' }}>Day {day}/30</span>
            </div>
            <div className="flex items-center gap-2">
              <CoffeeButton count={employee.coffee} onDrink={drinkCoffee} />
              <button
                onClick={() => setShowValues(!showValues)}
                className="btn-hover text-xs rounded-lg px-3 py-1.5 font-medium"
                style={{ background: '#2B3139', border: '1px solid #2B3139', color: '#848E9C' }}
              >
                {showValues ? '🙈 隱藏' : '👀 偷看'}
              </button>
              <button
                onClick={onRestart}
                className="btn-hover text-xs rounded-lg px-3 py-1.5 font-medium"
                style={{ background: '#2B3139', border: '1px solid #2B3139', color: '#848E9C' }}
              >
                🔄
              </button>
            </div>
          </div>

          {/* Row 2: Wallet info */}
          <div className="mb-3">
            <WalletBadge salary={employee.salary} bnb={employee.bnbBalance} />
          </div>

          {/* Row 3: Stat bars */}
          <div className="flex gap-4">
            <StatBar emoji="😰" label={getStressLabel(stats.stress)}
              value={stats.stress} colorFn={getStressColor} showValue={showValues} />
            <StatBar emoji="📈" label={getPerfLabel(stats.performance)}
              value={stats.performance} colorFn={getPerfColor} showValue={showValues} />
            <StatBar emoji="👔" label={getBossLabel(stats.bossApproval)}
              value={stats.bossApproval} colorFn={getBossColor} showValue={showValues} />
          </div>
        </div>

        {/* Daily Flavor */}
        {!loading && !chosenResult && <DailyFlavor text={dailyFlavor} />}

        {/* Avatar */}
        <Avatar job={job} mood={mood} />

        {/* Event / Loading / Outcome */}
        {loading ? (
          <Loading />
        ) : chosenResult ? (
          <OutcomeCard choice={chosenResult} onNext={handleNextDay} />
        ) : event ? (
          <EventCard
            key={eventKeyRef.current}
            event={event}
            onChoice={handleChoice}
            disabled={!!chosenResult}
          />
        ) : null}

        {/* Event Log */}
        <EventLog logs={eventLog} />
      </div>
    </div>
  );
}

// Export
window.GameComponents = {
  TitleScreen,
  GameScreen,
  EndingScreen,
  EventCard,
  OutcomeCard,
  Loading,
  Avatar,
  StatBar,
  NotificationToast,
  CoffeeButton,
  WalletBadge,
  EventLog,
  DailyFlavor,
};
