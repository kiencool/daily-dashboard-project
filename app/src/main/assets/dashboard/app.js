(() => {
  'use strict';

  const STORAGE_KEY = 'oppo_desk_dashboard_v4';
  const RING_CIRCUMFERENCE = 97.4;
  const IDLE_TIMEOUT_MS = 60 * 1000;
  const THEMES = ['bento', 'standby', 'amber'];
  const BACKGROUNDS = ['aurora', 'stars', 'bokeh', 'cyber', 'oled'];

  const DEFAULT_VN30 = ['HPG', 'FPT'];

  const JP_WORDS = [
    // Bài 26 - Sinh hoạt
    { kanji: '見ます', kana: 'みます', hv: 'KIẾN', vi: 'Xem, kiểm tra, khám', lesson: '26', topic: 'Sinh hoạt', ex: '医者に診てもらいます。' },
    { kanji: '探します', kana: 'さがします', hv: 'THÁM', vi: 'Tìm kiếm', lesson: '26', topic: 'Sinh hoạt', ex: '鍵を探しています。' },
    { kanji: '遅れます', kana: 'おくれます', hv: 'TRÌ', vi: 'Đến muộn, trễ', lesson: '26', topic: 'Công việc', ex: '電車に遅れました。' },
    { kanji: '間に合います', kana: 'まにあいます', hv: 'GIAN HỢP', vi: 'Kịp giờ', lesson: '26', topic: 'Công việc', ex: '会議に間に合いました。' },
    { kanji: '連絡します', kana: 'れんらくします', hv: 'LIÊN LẠC', vi: 'Liên lạc', lesson: '26', topic: 'Công việc', ex: '後で連絡します。' },
    // Bài 27 - Sinh hoạt & Công việc
    { kanji: '飼います', kana: 'かいます', hv: 'TỰ', vi: 'Nuôi (thú cưng)', lesson: '27', topic: 'Sinh hoạt', ex: '犬を飼っています。' },
    { kanji: '建てます', kana: 'たてます', hv: 'KIẾN', vi: 'Xây dựng', lesson: '27', topic: 'Sinh hoạt', ex: '新しい家を建てます。' },
    { kanji: '走ります', kana: 'はしります', hv: 'TẨU', vi: 'Chạy', lesson: '27', topic: 'Sức khỏe', ex: '毎朝公園を走ります。' },
    { kanji: '見えます', kana: 'みえます', hv: 'KIẾN', vi: 'Nhìn thấy (tự nhiên)', lesson: '27', topic: 'Du lịch', ex: 'ここから海が見えます。' },
    { kanji: '聞こえます', kana: 'きこえます', hv: 'VĂN', vi: 'Nghe thấy (tự nhiên)', lesson: '27', topic: 'Sinh hoạt', ex: '音楽が聞こえます。' },
    // Bài 28 - Tính từ & Sinh hoạt
    { kanji: '売れます', kana: 'うれます', hv: 'MẠI', vi: 'Bán chạy', lesson: '28', topic: 'Công việc', ex: 'この本はよく売れます。' },
    { kanji: '踊ります', kana: 'おどります', hv: 'DŨNG', vi: 'Nhảy, khiêu vũ', lesson: '28', topic: 'Sức khỏe', ex: 'みんなで踊りました。' },
    { kanji: '選びます', kana: 'えらびます', hv: 'TUYỂN', vi: 'Lựa chọn', lesson: '28', topic: 'Sinh hoạt', ex: '好きな色を選びます。' },
    { kanji: '熱心', kana: 'ねっしん', hv: 'NHIỆT TÂM', vi: 'Nhiệt tình, chăm chỉ', lesson: '28', topic: 'Tính từ', ex: '彼は仕事に熱心です。' },
    { kanji: '真面目', kana: 'まじめ', hv: 'CHÂN DIỆN MỤC', vi: 'Nghiêm túc, chăm chỉ', lesson: '28', topic: 'Tính từ', ex: '真面目な学生です。' },
    // Bài 29 & 30
    { kanji: '閉まります', kana: 'しまります', hv: 'BẾ', vi: 'Đóng (tự động)', lesson: '29', topic: 'Sinh hoạt', ex: 'ドアが閉まります。' },
    { kanji: '壊れます', kana: 'こわれます', hv: 'HOẠI', vi: 'Hỏng, vỡ', lesson: '29', topic: 'Sinh hoạt', ex: 'パソコンが壊れました。' },
    { kanji: '準備します', kana: 'じゅんびします', hv: 'CHUẨN BỊ', vi: 'Chuẩn bị', lesson: '30', topic: 'Công việc', ex: '旅行の準備をします。' },
    { kanji: '予定', kana: 'よてい', hv: 'DỰ ĐỊNH', vi: 'Dự định, lịch trình', lesson: '30', topic: 'Công việc', ex: '来週の予定を決めます。' },
    { kanji: '復習します', kana: 'ふくしゅうします', hv: 'PHỤC TẬP', vi: 'Ôn tập', lesson: '30', topic: 'Sinh hoạt', ex: '毎日日本語を復習します。' },
    // Bài 31 & 32 - Sức khỏe & Dự định
    { kanji: '続けます', kana: 'つづけます', hv: 'TỤC', vi: 'Tiếp tục', lesson: '31', topic: 'Sức khỏe', ex: '毎日運動を続けます。' },
    { kanji: '見つけます', kana: 'みつけます', hv: 'KIẾN', vi: 'Tìm thấy', lesson: '31', topic: 'Sinh hoạt', ex: 'いい仕事を見つけました。' },
    { kanji: '運動します', kana: 'うんどうします', hv: 'VẬN ĐỘNG', vi: 'Tập thể dục, vận động', lesson: '32', topic: 'Sức khỏe', ex: 'ジムで運動します。' },
    { kanji: '無理', kana: 'むり', hv: 'VÔ LÝ', vi: 'Quá sức, bất khả thi', lesson: '32', topic: 'Sức khỏe', ex: '無理をしないでください。' },
    { kanji: '十分', kana: 'じゅうぶん', hv: 'THẬP PHÂN', vi: 'Đầy đủ', lesson: '32', topic: 'Tính từ', ex: '時間は十分あります。' },
    // Bài 33 - 36 - Du lịch & Công việc
    { kanji: '規則', kana: 'きそく', hv: 'QUY TẮC', vi: 'Quy tắc, nội quy', lesson: '33', topic: 'Công việc', ex: '会社の規則を守ります。' },
    { kanji: '注意します', kana: 'ちゅういします', hv: 'CHÚ Ý', vi: 'Chú ý, nhắc nhở', lesson: '34', topic: 'Du lịch', ex: '車に注意してください。' },
    { kanji: '案内します', kana: 'あんないします', hv: 'ÁN NỘI', vi: 'Hướng dẫn, dẫn đường', lesson: '34', topic: 'Du lịch', ex: '友達を市内案内します。' },
    { kanji: '習慣', kana: 'しゅうかん', hv: 'TẬP QUÁN', vi: 'Thói quen', lesson: '35', topic: 'Sức khỏe', ex: '早起きの習慣をつけます。' },
    { kanji: '経験', kana: 'けいけん', hv: 'KINH NGHIỆM', vi: 'Kinh nghiệm', lesson: '36', topic: 'Công việc', ex: 'いい経験になりました。' }
  ];

  const EXERCISE_DB = [
    { name: 'Bench Press', group: 'Ngực', tip: '4x8-10 • Thanh đòn nằm ngang' },
    { name: 'Incline Dumbbell Press', group: 'Ngực trên', tip: '3x10-12 • Ghế dốc 30°' },
    { name: 'Cable Fly', group: 'Ngực', tip: '3x12-15 • Ép ngực cáp' },
    { name: 'Dips (Xà kép)', group: 'Ngực / Tay sau', tip: '3x8-12 • Hơi ngả người' },
    { name: 'Pull-ups (Xà đơn)', group: 'Lưng xô', tip: '4x8-10 • Kéo rộng tay' },
    { name: 'Lat Pulldown', group: 'Lưng xô', tip: '4x10-12 • Kéo cáp xuống ngực' },
    { name: 'Barbell Row', group: 'Lưng giữa', tip: '4x8-10 • Giữ lưng thẳng' },
    { name: 'Seated Cable Row', group: 'Lưng giữa', tip: '3x10-12 • Siết bả vai' },
    { name: 'Deadlift', group: 'Lưng dưới / Đùi sau', tip: '3x5-8 • Kéo tạ đòn' },
    { name: 'Barbell Squat', group: 'Chân / Đùi trước', tip: '4x6-10 • Xuống sâu song song' },
    { name: 'Leg Press', group: 'Chân', tip: '4x10-12 • Đẩy máy' },
    { name: 'Romanian Deadlift', group: 'Đùi sau / Mông', tip: '3x10 • Cảm nhận căng đùi sau' },
    { name: 'Leg Curl', group: 'Đùi sau', tip: '3x12-15 • Móc đùi sau' },
    { name: 'Leg Extension', group: 'Đùi trước', tip: '3x12-15 • Đá đùi trước' },
    { name: 'Calf Raise', group: 'Bắp chân', tip: '4x15-20 • Nhón bắp chân' },
    { name: 'Overhead Press', group: 'Vai', tip: '4x8-10 • Đẩy vai thanh đòn' },
    { name: 'Dumbbell Shoulder Press', group: 'Vai', tip: '3x10 • Đẩy tạ đơn ngồi' },
    { name: 'Lateral Raise', group: 'Vai giữa', tip: '4x12-15 • Dang tạ ngang' },
    { name: 'Face Pull', group: 'Vai sau', tip: '3x15 • Kéo dây thừng về mặt' },
    { name: 'Barbell Curl', group: 'Tay trước', tip: '3x10-12 • Cuốn tạ đòn' },
    { name: 'Hammer Curl', group: 'Tay trước', tip: '3x10-12 • Cuốn búa tạ đơn' },
    { name: 'Tricep Pushdown', group: 'Tay sau', tip: '3x12-15 • Đẩy cáp tay sau' },
    { name: 'Overhead Tricep Extension', group: 'Tay sau', tip: '3x12 • Kéo cáp qua đầu' },
    { name: 'Plank', group: 'Bụng / Core', tip: '3x60s • Siết chặt bụng' },
    { name: 'Hanging Knee Raise', group: 'Bụng dưới', tip: '3x15 • Treo xà nâng gối' }
  ];

  const DEFAULT_SPLITS = {
    push: {
      label: 'Push',
      title: 'Ngực • Vai • Tay sau',
      items: [
        { id: 'p1', text: 'Bench Press', done: false },
        { id: 'p2', text: 'Incline Dumbbell Press', done: false },
        { id: 'p3', text: 'Lateral Raise', done: false },
        { id: 'p4', text: 'Tricep Pushdown', done: false }
      ]
    },
    pull: {
      label: 'Pull',
      title: 'Lưng • Vai sau • Tay trước',
      items: [
        { id: 'l1', text: 'Lat Pulldown', done: false },
        { id: 'l2', text: 'Seated Cable Row', done: false },
        { id: 'l3', text: 'Face Pull', done: false },
        { id: 'l4', text: 'Barbell Curl', done: false }
      ]
    },
    legs: {
      label: 'Legs',
      title: 'Chân • Mông • Bụng',
      items: [
        { id: 'g1', text: 'Barbell Squat', done: false },
        { id: 'g2', text: 'Romanian Deadlift', done: false },
        { id: 'g3', text: 'Leg Extension', done: false },
        { id: 'g4', text: 'Plank', done: false }
      ]
    },
    upper: {
      label: 'Upper',
      title: 'Thân trên tổng hợp',
      items: [
        { id: 'u1', text: 'Incline Dumbbell Press', done: false },
        { id: 'u2', text: 'Barbell Row', done: false },
        { id: 'u3', text: 'Dumbbell Shoulder Press', done: false },
        { id: 'u4', text: 'Hammer Curl', done: false }
      ]
    },
    full: {
      label: 'Full Body',
      title: 'Toàn thân (khi bận ít buổi)',
      items: [
        { id: 'f1', text: 'Barbell Squat', done: false },
        { id: 'f2', text: 'Bench Press', done: false },
        { id: 'f3', text: 'Pull-ups (Xà đơn)', done: false },
        { id: 'f4', text: 'Overhead Press', done: false }
      ]
    }
  };

  const DEFAULT_STATE = {
    settings: {
      theme: 'bento',
      bg: 'aurora',
      cityValue: '10.8231,106.6297,TP. Hồ Chí Minh',
      vn30: DEFAULT_VN30,
      monthlyBudget: 6000000,
      coins: ['BTC', 'ETH'],
      geminiKey: '',
      firebaseUrl: '',
      firebaseSyncId: '',
      idleClock: true,
      autoDim: true,
      wakeLockPreferred: true
    },
    activeSplit: 'push',
    splits: DEFAULT_SPLITS,
    workoutHistory: [],   // [{ date: 'YYYY-MM-DD', split: 'push' }]
    weightLogs: [],       // [{ date: 'YYYY-MM-DD', weight: 68.5 }]
    exerciseLogs: [],     // [{ date: 'YYYY-MM-DD', name: 'Bench Press', weight: 60, reps: 8, sets: 4 }]
    todos: [
      { id: 't1', text: 'Kiểm tra lịch làm việc hôm nay', done: false },
      { id: 't2', text: 'Uống đủ 2L nước', done: false }
    ],
    quickNote: '',
    dayNotes: {},
    expenses: [],
    jpFilter: { mode: 'topic', value: 'all' },
    customJpWords: [],
    updatedAt: 0
  };

  let state = loadState();
  let activeHubTab = 'gym';
  let activeGymSub = 'workout';
  let wakeLockSentinel = null;
  let idleTimer = null;
  let isIdleClockActive = false;
  let fxRafId = null;
  let calOffset = 0;
  let selectedCalDate = new Date().toISOString().slice(0, 10);
  let pendingLogDate = null;
  let jpIndex = Math.floor(Math.random() * JP_WORDS.length);
  let aiHistory = [];
  let aiTtsEnabled = true;
  let pomoMinutes = 25;
  let pomoSecondsLeft = 25 * 60;
  let pomoTimerId = null;
  let rainCtx = null;
  let rainPlaying = false;
  let quizStreak = 0;
  let quizAnswer = null;

  const $ = (id) => document.getElementById(id);

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEFAULT_STATE);
      const parsed = JSON.parse(raw);
      return {
        settings: {
          ...DEFAULT_STATE.settings,
          ...(parsed.settings || {}),
          geminiKey: parsed.settings?.geminiKey || ''
        },
        activeSplit: parsed.activeSplit || 'push',
        splits: parsed.splits || structuredClone(DEFAULT_SPLITS),
        workoutHistory: Array.isArray(parsed.workoutHistory) ? parsed.workoutHistory : [],
        weightLogs: Array.isArray(parsed.weightLogs) ? parsed.weightLogs : [],
        exerciseLogs: Array.isArray(parsed.exerciseLogs) ? parsed.exerciseLogs : [],
        todos: Array.isArray(parsed.todos) ? parsed.todos : structuredClone(DEFAULT_STATE.todos),
        quickNote: typeof parsed.quickNote === 'string' ? parsed.quickNote : '',
        dayNotes: parsed.dayNotes && typeof parsed.dayNotes === 'object' ? parsed.dayNotes : {},
        expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
        jpFilter: parsed.jpFilter || { mode: 'topic', value: 'all' },
        customJpWords: Array.isArray(parsed.customJpWords) ? parsed.customJpWords : [],
        updatedAt: Number(parsed.updatedAt) || 0
      };
    } catch {
      return structuredClone(DEFAULT_STATE);
    }
  }

  let fbPushTimer = null;

  function getFirebaseEndpoint() {
    const base = (state.settings.firebaseUrl || '').trim().replace(/\/+$/, '');
    const id = (state.settings.firebaseSyncId || '').trim().replace(/[^a-zA-Z0-9_-]/g, '');
    if (!base || !id) return null;
    return `${base}/deskdash/${id}.json`;
  }

  async function pushToFirebase() {
    const url = getFirebaseEndpoint();
    if (!url) return;
    try {
      const payload = {
        monthlyBudget: state.settings.monthlyBudget,
        workoutHistory: state.workoutHistory,
        weightLogs: state.weightLogs,
        exerciseLogs: state.exerciseLogs,
        todos: state.todos,
        quickNote: state.quickNote,
        dayNotes: state.dayNotes,
        expenses: state.expenses,
        updatedAt: state.updatedAt || Date.now()
      };
      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.error('Firebase push failed:', e);
    }
  }

  async function pullFromFirebase() {
    const url = getFirebaseEndpoint();
    if (!url) return;
    try {
      const res = await fetch(url);
      if (!res.ok) return;
      const remote = await res.json();
      if (!remote || typeof remote !== 'object') {
        if ((state.updatedAt || 0) > 0) pushToFirebase();
        return;
      }
      const remoteTime = Number(remote.updatedAt) || 0;
      const localTime = Number(state.updatedAt) || 0;
      if (remoteTime > localTime) {
        if (typeof remote.monthlyBudget === 'number') state.settings.monthlyBudget = remote.monthlyBudget;
        if (Array.isArray(remote.workoutHistory)) state.workoutHistory = remote.workoutHistory;
        if (Array.isArray(remote.weightLogs)) state.weightLogs = remote.weightLogs;
        if (Array.isArray(remote.exerciseLogs)) state.exerciseLogs = remote.exerciseLogs;
        if (Array.isArray(remote.todos)) state.todos = remote.todos;
        if (typeof remote.quickNote === 'string') state.quickNote = remote.quickNote;
        if (remote.dayNotes && typeof remote.dayNotes === 'object') state.dayNotes = remote.dayNotes;
        if (Array.isArray(remote.expenses)) state.expenses = remote.expenses;
        state.updatedAt = remoteTime;
        saveState(true);
        renderAll();
        if (activeGymSub === 'charts') renderCharts();
      } else if (localTime > remoteTime) {
        pushToFirebase();
      }
    } catch (e) {
      console.error('Firebase pull failed:', e);
    }
  }

  function saveState(skipSync = false) {
    try {
      if (!skipSync) {
        state.updatedAt = Date.now();
        if (fbPushTimer) clearTimeout(fbPushTimer);
        if (getFirebaseEndpoint()) {
          fbPushTimer = setTimeout(pushToFirebase, 700);
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Save failed:', e);
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatVND(num) {
    const abs = Math.abs(Math.round(num));
    if (abs >= 1_000_000) {
      return (num < 0 ? '-' : '') + (abs / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'tr';
    }
    return (num < 0 ? '-' : '') + abs.toLocaleString('vi-VN') + 'đ';
  }

  function setRingProgress(el, ratio) {
    const clamped = Math.max(0, Math.min(1, ratio));
    el.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - clamped));
  }

  function applyTheme(theme) {
    const valid = THEMES.includes(theme) ? theme : 'bento';
    document.documentElement.setAttribute('data-theme', valid);
    state.settings.theme = valid;
  }

  function applyBackground(bg) {
    const valid = BACKGROUNDS.includes(bg) ? bg : 'aurora';
    document.documentElement.setAttribute('data-bg', valid);
    state.settings.bg = valid;
    startCanvasFx(valid);
  }

  let currentPage = 0;

  // ===== GPU-ACCELERATED PAGER NAVIGATION =====
  function goToPage(index) {
    currentPage = Math.max(0, Math.min(4, index));
    $('pager').style.transform = `translate3d(-${currentPage * 100}%, 0, 0)`;
    updatePageDots(currentPage);
  }

  function updatePageDots(activeIndex) {
    $('page-dots').querySelectorAll('.dot-pill').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === activeIndex);
    });
  }

  function switchGymSub(subName) {
    activeGymSub = subName;
    $('gym-sub-tabs').querySelectorAll('.seg-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.gymSub === subName);
    });
    $('gym-pane-workout').classList.toggle('hidden', subName !== 'workout');
    $('gym-pane-charts').classList.toggle('hidden', subName !== 'charts');
    if (subName === 'charts') setTimeout(renderCharts, 30);
  }

  // ===== CANVAS FX =====
  function startCanvasFx(mode) {
    if (fxRafId) { cancelAnimationFrame(fxRafId); fxRafId = null; }
    const canvas = $('fx-canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (mode !== 'stars' && mode !== 'bokeh') {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const count = mode === 'stars' ? 75 : 22;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: mode === 'stars' ? Math.random() * 1.6 + 0.5 : Math.random() * 26 + 10,
      vx: (Math.random() - 0.5) * (mode === 'stars' ? 0.12 : 0.35),
      vy: (Math.random() - 0.5) * (mode === 'stars' ? 0.12 : 0.35),
      alpha: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.02;
        if (p.x < -40) p.x = canvas.width + 40;
        if (p.x > canvas.width + 40) p.x = -40;
        if (p.y < -40) p.y = canvas.height + 40;
        if (p.y > canvas.height + 40) p.y = -40;
        const a = p.alpha * (0.65 + 0.35 * Math.sin(p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = mode === 'stars'
          ? `rgba(226, 232, 240, ${a.toFixed(2)})`
          : `rgba(56, 189, 248, ${(a * 0.22).toFixed(2)})`;
        ctx.fill();
      }
      fxRafId = requestAnimationFrame(draw);
    };
    draw();
  }

  // ===== 30s IDLE CLOCK + HARDWARE BRIGHTNESS SAVER =====
  function setHardwareBrightness(level) {
    if (window.AndroidBridge && typeof window.AndroidBridge.setScreenBrightness === 'function') {
      try { window.AndroidBridge.setScreenBrightness(level); } catch {}
    }
  }

  function hasRunningTask() {
    if (pomoTimerId !== null || rainPlaying) return true;
    const modalIds = ['action-sheet', 'settings-modal', 'ai-modal', 'jp-modal', 'jp-quiz-modal', 'pomo-modal', 'day-popup'];
    return modalIds.some((id) => $(id) && !$(id).classList.contains('hidden'));
  }

  function renderKeepAwakeBtn() {
    const alwaysBright = !state.settings.idleClock;
    $('btn-keep-awake')?.classList.toggle('active', alwaysBright);
    if ($('btn-keep-awake')) {
      $('btn-keep-awake').title = alwaysBright
        ? 'Đang tắt tự giảm sáng (Chạm để bật lại)'
        : 'Đang bật tự giảm sáng sau 1p (Chạm để tắt)';
    }
  }

  function enterIdleClock(force = false) {
    if (!force && (!state.settings.idleClock || hasRunningTask())) {
      resetIdleTimer();
      return;
    }
    isIdleClockActive = true;
    $('idle-clock').classList.add('active');
    $('main-shell').classList.add('idle-hidden');
    startCanvasFx('oled');
    setHardwareBrightness(0.03);
  }

  function exitIdleClock() {
    if (isIdleClockActive) {
      isIdleClockActive = false;
      $('idle-clock').classList.remove('active');
      $('main-shell').classList.remove('idle-hidden');
      startCanvasFx(state.settings.bg);
      setHardwareBrightness(-1);
    }
    resetIdleTimer();
  }

  function resetIdleTimer() {
    if (idleTimer) clearTimeout(idleTimer);
    if (!state.settings.idleClock) return;
    idleTimer = setTimeout(enterIdleClock, IDLE_TIMEOUT_MS);
  }

  function driftIdleClock() {
    if (!isIdleClockActive) return;
    const dx = Math.round((Math.random() - 0.5) * 14);
    const dy = Math.round((Math.random() - 0.5) * 10);
    $('idle-inner').style.transform = `translate(${dx}px, ${dy}px)`;
  }

  // ===== MINI CALENDAR (WHITE COMPACT + DATE-LINKED) =====
  function renderCalendar() {
    const now = new Date();
    const viewDate = new Date(now.getFullYear(), now.getMonth() + calOffset, 1);
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    $('cal-title').textContent = `Tháng ${month + 1}, ${year}`;

    const firstDay = (viewDate.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayKey = now.toISOString().slice(0, 10);
    const workoutDays = new Set([
      ...state.workoutHistory.map((w) => w.date),
      ...state.exerciseLogs.map((l) => l.date)
    ]);
    const todoDays = new Set([
      ...state.todos.filter((t) => t.date).map((t) => t.date),
      ...Object.keys(state.dayNotes || {}).filter((k) => (state.dayNotes[k] || '').trim())
    ]);

    const gymIco = '<span class="cal-dot-gym"></span>';
    const todoIco = '<span class="cal-dot-todo"></span>';

    let html = '';
    for (let i = 0; i < firstDay; i++) {
      html += '<span class="cal-day-w empty"></span>';
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const cls = ['cal-day-w'];
      if (dateKey === todayKey) cls.push('today');
      if (dateKey === selectedCalDate) cls.push('selected');
      const hasGym = workoutDays.has(dateKey);
      const hasTodo = todoDays.has(dateKey);
      const marks = (hasGym || hasTodo)
        ? `<span class="cal-marks">${hasGym ? gymIco : ''}${hasTodo ? todoIco : ''}</span>`
        : '';
      html += `<button type="button" class="${cls.join(' ')}" data-cal-date="${dateKey}"><span>${d}</span>${marks}</button>`;
    }
    $('cal-days').innerHTML = html;
    renderSelectedDateSummary();
  }

  function getFilteredJpWords() {
    const all = [...(state.customJpWords || []), ...JP_WORDS];
    const { mode, value } = state.jpFilter || { mode: 'topic', value: 'all' };
    if (!value || value === 'all') return all;
    const filtered = all.filter((w) => (mode === 'lesson' ? String(w.lesson) === String(value) : w.topic === value));
    return filtered.length ? filtered : all;
  }

  function renderJapaneseWord() {
    const list = getFilteredJpWords();
    const w = list[jpIndex % list.length];
    if (!w || !$('jp-kanji')) return;
    $('jp-kanji').textContent = w.kanji;
    $('jp-kana').textContent = w.kana;
    $('jp-hv').textContent = w.hv || (w.lesson ? `BÀI ${w.lesson}` : 'N4');
    $('jp-vi').textContent = w.vi;
    if ($('jp-ex')) $('jp-ex').textContent = w.ex || (w.lesson ? `Minna N4 • Bài ${w.lesson}` : 'Từ vựng N4');

    const { mode, value } = state.jpFilter || { mode: 'topic', value: 'all' };
    if ($('jp-filter-label')) {
      $('jp-filter-label').textContent = value === 'all' ? 'Tất cả' : (mode === 'lesson' ? `Bài ${value}` : value);
    }
  }

  function renderJpFilterChips() {
    const all = [...(state.customJpWords || []), ...JP_WORDS];
    const mode = state.jpFilter?.mode || 'topic';
    const curVal = state.jpFilter?.value || 'all';

    $('jp-mode-tabs').querySelectorAll('.seg-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.jpMode === mode);
    });

    const values = mode === 'lesson'
      ? ['all', ...new Set(all.map((w) => w.lesson).filter(Boolean).sort((a, b) => Number(a) - Number(b)))]
      : ['all', ...new Set(all.map((w) => w.topic).filter(Boolean))];

    $('jp-filter-chips').innerHTML = values.map((v) => {
      const label = v === 'all' ? 'Tất cả N4' : (mode === 'lesson' ? `Bài ${v}` : v);
      return `<button type="button" class="jp-chip ${String(v) === String(curVal) ? 'active' : ''}" data-jp-val="${escapeHtml(v)}">${escapeHtml(label)}</button>`;
    }).join('');
  }

  function openDayPopup(dateKey) {
    const [y, m, d] = dateKey.split('-');
    $('popup-date-title').textContent = `📅 Ngày ${d}/${m}/${y}`;

    // Gym
    const workouts = state.workoutHistory.filter((w) => w.date === dateKey);
    const sets = state.exerciseLogs.filter((l) => l.date === dateKey);
    let gymText = 'Không có buổi tập nào được ghi nhận.';
    if (workouts.length || sets.length) {
      const splitNames = workouts.map((w) => state.splits[w.split]?.label || w.split).join(', ');
      const lines = [];
      if (splitNames) lines.push(`• Buổi tập: ${splitNames}`);
      sets.forEach((s) => {
        const mTag = s.muscle ? `[${s.muscle}] ` : '';
        if (s.muscle === 'Cardio' || s.minutes > 0) {
          lines.push(`• ${mTag}${s.name}: ${s.minutes || 30} phút`);
        } else {
          lines.push(`• ${mTag}${s.name}: ${s.sets} sets × ${s.reps} reps${s.weight > 0 ? ` (${s.weight}kg)` : ''}`);
        }
      });
      gymText = lines.join('\n');
    }

    // Expense
    const exps = state.expenses.filter((e) => e.date === dateKey);
    const spent = exps.filter((e) => e.category !== 'Thu nhập').reduce((s, e) => s + e.amount, 0);
    let expText = 'Không có giao dịch nào.';
    if (exps.length) {
      expText = `Tổng chi: ${formatVND(spent)}\n` +
        exps.slice(0, 5).map((e) => `• ${e.category}: ${e.category === 'Thu nhập' ? '+' : '-'}${formatVND(e.amount)}${e.note ? ` (${e.note})` : ''}`).join('\n');
    }

    // Todos & Day Note
    const todos = state.todos.filter((t) => t.date === dateKey);
    const dayNote = (state.dayNotes?.[dateKey] || '').trim();
    const todoLines = todos.map((t) => `${t.done ? '✓' : '○'} ${t.text}`);
    if (dayNote) todoLines.push(`📌 Ghi chú: ${dayNote}`);
    const todoText = todoLines.length ? todoLines.join('\n') : 'Không có công việc hay ghi chú cho ngày này.';

    $('popup-body').innerHTML = `
      <div class="popup-sec">
        <div class="popup-sec-title">🏋️ GYM & MỨC TẠ</div>
        <div class="popup-sec-text">${escapeHtml(gymText)}</div>
      </div>
      <div class="popup-sec">
        <div class="popup-sec-title">💰 CHI TIÊU</div>
        <div class="popup-sec-text">${escapeHtml(expText)}</div>
      </div>
      <div class="popup-sec">
        <div class="popup-sec-title">📝 CÔNG VIỆC</div>
        <div class="popup-sec-text">${escapeHtml(todoText)}</div>
      </div>
    `;
    $('day-popup').classList.remove('hidden');
  }

  function renderSelectedDateSummary() {
    const todayKey = new Date().toISOString().slice(0, 10);
    const todayGymCount = state.exerciseLogs.filter((l) => l.date === todayKey).length;
    $('snap-gym').textContent = `${todayGymCount} bài`;

    const todaySpend = state.expenses
      .filter((e) => e.date === todayKey && e.category !== 'Thu nhập')
      .reduce((sum, e) => sum + e.amount, 0);
    $('snap-exp').textContent = formatVND(todaySpend);

    const remAll = state.todos.filter((t) => !t.done).length;
    $('snap-todo').textContent = `${remAll} việc`;
  }

  // ===== CLOCK & DIM =====
  const DAYS_VI = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const dateStr = `${DAYS_VI[now.getDay()]}, ${now.getDate()}/${now.getMonth() + 1}`;

    $('clock-time').textContent = `${hh}:${mm}`;
    $('clock-sec').textContent = ss;
    $('clock-date').textContent = dateStr;

    $('idle-hm').textContent = `${hh}:${mm}`;
    $('idle-sec').textContent = ss;
    $('idle-date').textContent = `${dateStr}/${now.getFullYear()}`;

    const h = now.getHours();
    let greet = 'Buổi tối thư giãn';
    if (h >= 5 && h < 12) greet = 'Chào buổi sáng';
    else if (h >= 12 && h < 18) greet = 'Chào buổi chiều';
    $('greeting').textContent = greet;
    $('idle-greeting').textContent = greet;

    const autoNight = state.settings.autoDim && (h >= 22 || h < 6);
    $('dim-overlay').classList.toggle('active', autoNight);
  }

  async function requestWakeLock() {
    if (!('wakeLock' in navigator)) return;
    try { wakeLockSentinel = await navigator.wakeLock.request('screen'); } catch {}
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && state.settings.wakeLockPreferred) requestWakeLock();
  });

  // ===== WEATHER =====
  function weatherInfoFromCode(code) {
    if (code === 0) return ['☀️', 'Trời quang'];
    if (code <= 3) return ['⛅', 'Ít mây'];
    if (code <= 48) return ['🌫️', 'Sương mù'];
    if (code <= 57) return ['🌦️', 'Mưa phùn'];
    if (code <= 67) return ['🌧️', 'Có mưa'];
    if (code <= 77) return ['❄️', 'Tuyết'];
    if (code <= 82) return ['🌧️', 'Mưa rào'];
    if (code >= 95) return ['⛈️', 'Dông bão'];
    return ['🌤️', 'Ổn định'];
  }

  async function fetchWeather() {
    const [lat, lon, city] = state.settings.cityValue.split(',');
    if ($('weather-city')) $('weather-city').textContent = city;
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather error');
      const data = await res.json();
      const cur = data.current;
      const [emoji, desc] = weatherInfoFromCode(cur.weather_code);
      const tempRounded = Math.round(cur.temperature_2m);

      if ($('weather-emoji')) $('weather-emoji').textContent = emoji;
      if ($('weather-temp')) $('weather-temp').textContent = `${tempRounded}°`;
      if ($('weather-desc')) $('weather-desc').textContent = `• ${desc}`;
      if ($('weather-humidity')) $('weather-humidity').textContent = `• ${cur.relative_humidity_2m}%`;
      if ($('weather-wind')) $('weather-wind').textContent = `${Math.round(cur.wind_speed_10m)} km/h`;
      if ($('idle-weather')) $('idle-weather').textContent = `${emoji} ${tempRounded}° • ${city}`;
    } catch {
      if ($('weather-desc')) $('weather-desc').textContent = '• Lỗi thời tiết';
    }
  }

  // ===== VN30 & CRYPTO =====
  async function fetchVN30() {
    const listEl = $('vn30-list');
    const statusEl = $('vn30-status');
    const watch = (state.settings.vn30 || DEFAULT_VN30).map((s) => s.trim().toUpperCase()).filter(Boolean);

    try {
      const url = `https://finfo-api.vndirect.com.vn/v4/stock_prices?sort=date&size=${Math.max(100, watch.length * 5)}&q=code:${watch.join(',')}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('VNDirect error');
      const json = await res.json();
      const rows = Array.isArray(json.data) ? json.data : [];

      const latestByCode = new Map();
      for (const item of rows) {
        if (item.code && !latestByCode.has(item.code)) latestByCode.set(item.code, item);
      }
      const ordered = watch.map((code) => latestByCode.get(code)).filter(Boolean);
      if (ordered.length === 0) throw new Error('Empty VN30');

      listEl.innerHTML = ordered.map((s) => {
        const price = Number(s.close || s.adClose || 0);
        const pct = Number(s.pctChange || 0);
        const cls = pct > 0 ? 'up' : pct < 0 ? 'down' : '';
        const textCls = pct > 0 ? 'c-up' : pct < 0 ? 'c-down' : 'c-flat';
        const sign = pct > 0 ? '+' : '';
        return `<div class="stock-tile ${cls}">
          <span class="stock-code">${escapeHtml(s.code)}</span>
          <div class="stock-right">
            <span class="stock-price ${textCls}">${price.toFixed(2)}</span>
            <span class="stock-chg ${textCls}">${sign}${pct.toFixed(2)}%</span>
          </div>
        </div>`;
      }).join('');

      const lead = ordered[0];
      const leadPct = Number(lead.pctChange || 0);
      $('snap-vn30').textContent = `${lead.code} ${leadPct >= 0 ? '+' : ''}${leadPct.toFixed(1)}%`;
      statusEl.textContent = `Cập nhật ${lead.date || 'Live'}`;
      $('net-dot').classList.remove('offline');
    } catch {
      try {
        const ssiRes = await fetch('https://iboard-query.ssi.com.vn/stock/group/VN30');
        if (!ssiRes.ok) throw new Error('SSI error');
        const ssiJson = await ssiRes.json();
        const items = Array.isArray(ssiJson.data) ? ssiJson.data : [];
        const watchSet = new Set(watch);
        const filtered = items.filter((x) => watchSet.has(x.stockSymbol)).slice(0, 16);
        if (filtered.length === 0) throw new Error('Empty SSI');

        listEl.innerHTML = filtered.map((s) => {
          const matched = Number(s.matchedPrice || s.refPrice || 0) / 1000;
          const ref = Number(s.refPrice || 0) / 1000;
          const pct = ref > 0 ? ((matched - ref) / ref) * 100 : 0;
          const cls = pct > 0 ? 'up' : pct < 0 ? 'down' : '';
          const textCls = pct > 0 ? 'c-up' : pct < 0 ? 'c-down' : 'c-flat';
          const sign = pct > 0 ? '+' : '';
          return `<div class="stock-tile ${cls}">
            <span class="stock-code">${escapeHtml(s.stockSymbol)}</span>
            <div class="stock-right">
              <span class="stock-price ${textCls}">${matched.toFixed(2)}</span>
              <span class="stock-chg ${textCls}">${sign}${pct.toFixed(2)}%</span>
            </div>
          </div>`;
        }).join('');

        $('snap-vn30').textContent = `${filtered[0].stockSymbol} Live`;
        statusEl.textContent = 'SSI Live';
        $('net-dot').classList.remove('offline');
      } catch {
        statusEl.textContent = 'Mất kết nối';
        $('snap-vn30').textContent = 'Offline';
        listEl.innerHTML = '<div class="empty-msg">Không thể tải dữ liệu VN30. Kiểm tra mạng.</div>';
      }
    }
  }

  async function fetchCryptoAndFx() {
    try {
      const symbols = state.settings.coins.map((c) => c.trim().toUpperCase()).filter(Boolean).slice(0, 6);
      const binanceParam = encodeURIComponent(JSON.stringify(symbols.map((s) => `${s}USDT`)));
      const [cryptoRes, fxRes] = await Promise.all([
        fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${binanceParam}`),
        fetch('https://open.er-api.com/v6/latest/USD')
      ]);

      if (fxRes.ok) {
        const fxData = await fxRes.json();
        const vnd = fxData.rates?.VND;
        if (vnd && $('fx-usd')) $('fx-usd').textContent = Math.round(vnd).toLocaleString('vi-VN') + 'đ';
      }

      if (cryptoRes.ok) {
        const list = await cryptoRes.json();
        $('crypto-list').innerHTML = list.map((item) => {
          const sym = item.symbol.replace('USDT', '');
          const price = parseFloat(item.lastPrice);
          const chg = parseFloat(item.priceChangePercent);
          const cls = chg >= 0 ? 'c-up' : 'c-down';
          const arrow = chg >= 0 ? '▲' : '▼';
          const formatted = price >= 100
            ? '$' + price.toLocaleString('en-US', { maximumFractionDigits: 0 })
            : '$' + price.toLocaleString('en-US', { maximumFractionDigits: 2 });
          return `<div class="crypto-row">
            <strong>${escapeHtml(sym)}</strong>
            <div class="stock-right">
              <span class="stock-price">${formatted}</span>
              <span class="stock-chg ${cls}">${arrow} ${Math.abs(chg).toFixed(2)}%</span>
            </div>
          </div>`;
        }).join('');
      }
      $('net-dot').classList.remove('offline');
    } catch {
      $('net-dot').classList.add('offline');
    }
  }

  // ===== GOLD (phuhao2.com) =====
  function parseAndRenderGold(html) {
    const listEl = $('gold-list');
    const statusEl = $('gold-status');
    try {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const rows = [];

      doc.querySelectorAll('table tr').forEach((tr) => {
        const cells = Array.from(tr.querySelectorAll('td, th')).map((c) => c.textContent.replace(/\s+/g, ' ').trim());
        if (cells.length >= 3) {
          const name = cells[0];
          const nums = cells.slice(1).filter((c) => /\d[\d.,]{2,}/.test(c));
          if (name && nums.length >= 2 && !/loại|sản phẩm|mua|bán/i.test(name)) {
            rows.push({ name, buy: nums[0], sell: nums[1] });
          }
        }
      });

      if (rows.length === 0) {
        const textLines = (doc.body?.textContent || html.replace(/<[^>]+>/g, '\n'))
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean);
        for (const line of textLines) {
          const m = line.match(/^(.+?)\s+(\d[\d.,]{2,})\s+(\d[\d.,]{2,})$/);
          if (m) rows.push({ name: m[1].trim(), buy: m[2], sell: m[3] });
        }
      }

      if (rows.length === 0) {
        statusEl.textContent = 'Không tìm thấy bảng giá';
        listEl.innerHTML = '<div class="empty-msg">Không đọc được bảng giá từ phuhao2.com.</div>';
        return;
      }

      const now = new Date();
      statusEl.textContent = `Cập nhật ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      listEl.innerHTML = `<div class="gold-hdr"><span>Loại vàng</span><span style="text-align:right;">Mua vào</span><span style="text-align:right;">Bán ra</span></div>` +
        rows.slice(0, 10).map((r) => `
          <div class="gold-row">
            <span class="gold-name">${escapeHtml(r.name)}</span>
            <span class="gold-buy">${escapeHtml(r.buy)}</span>
            <span class="gold-sell">${escapeHtml(r.sell)}</span>
          </div>
        `).join('');
    } catch {
      statusEl.textContent = 'Lỗi đọc dữ liệu';
      listEl.innerHTML = '<div class="empty-msg">Lỗi phân tích dữ liệu giá vàng.</div>';
    }
  }

  window.onNativeGoldHtml = (html) => parseAndRenderGold(html);
  window.onNativeGoldError = () => {
    if ($('gold-status')) $('gold-status').textContent = 'Mất kết nối';
    if ($('gold-list')) $('gold-list').innerHTML = '<div class="empty-msg">Không thể kết nối tới phuhao2.com.</div>';
  };

  async function fetchGoldPhuHao() {
    const statusEl = $('gold-status');
    if (statusEl) statusEl.textContent = 'Đang tải...';
    if (window.AndroidBridge && typeof window.AndroidBridge.fetchGoldHtml === 'function') {
      window.AndroidBridge.fetchGoldHtml('http://www.phuhao2.com/');
      return;
    }
    try {
      const res = await fetch('http://www.phuhao2.com/');
      if (!res.ok) throw new Error('HTTP error');
      const html = await res.text();
      parseAndRenderGold(html);
    } catch {
      if (statusEl) statusEl.textContent = 'Chặn CORS trình duyệt';
      if ($('gold-list')) {
        $('gold-list').innerHTML = '<div class="empty-msg">Mở bằng app Android trên OPPO để tải trực tiếp từ phuhao2.com.</div>';
      }
    }
  }

  // ===== GYM (DIRECT EXERCISE LOGGING) =====
  function renderGym() {
    const todayKey = new Date().toISOString().slice(0, 10);
    const monthKey = todayKey.slice(0, 7);

    const workoutDaysThisMonth = new Set([
      ...state.workoutHistory.filter((w) => w.date.startsWith(monthKey)).map((w) => w.date),
      ...state.exerciseLogs.filter((l) => l.date.startsWith(monthKey)).map((l) => l.date)
    ]);
    $('gym-streak-info').textContent = `Đã tập: ${workoutDaysThisMonth.size} ngày tháng này`;

    const todayLogs = state.exerciseLogs.filter((l) => l.date === todayKey);
    const todaySets = todayLogs.reduce((s, l) => s + (Number(l.sets) || 0), 0);
    const todayVol = todayLogs.reduce((s, l) => s + l.weight * l.reps * l.sets, 0);
    if ($('gym-today-count')) $('gym-today-count').textContent = `${todayLogs.length} bài`;
    if ($('gym-today-sets')) $('gym-today-sets').textContent = `${todaySets} set`;
    if ($('gym-today-vol')) $('gym-today-vol').textContent = `${todayVol.toLocaleString('vi-VN')} kg`;
    $('snap-gym').textContent = `${todayLogs.length} bài`;

    const recent = [...state.exerciseLogs].reverse().slice(0, 20);
    if (recent.length === 0) {
      $('gym-list').innerHTML = '<li class="empty-msg">Chưa có bài tập nào. Bấm ＋ Ghi bài tập để lưu.</li>';
      return;
    }

    $('gym-list').innerHTML = recent.map((l, revIdx) => {
      const origIdx = state.exerciseLogs.length - 1 - revIdx;
      const muscleTag = l.muscle ? `<span style="color:var(--accent);font-weight:700;">[${escapeHtml(l.muscle)}]</span> ` : '';
      let detail = '';
      if (l.muscle === 'Cardio' || l.minutes > 0) {
        detail = `${l.minutes || 30} phút`;
      } else {
        detail = l.weight > 0
          ? `${l.sets} sets × ${l.reps} reps • ${l.weight}kg`
          : `${l.sets} sets × ${l.reps} reps`;
      }
      return `<li class="list-item">
        <div style="min-width:0;">
          <div style="font-weight:700;">${muscleTag}${escapeHtml(l.name)}</div>
          <div style="font-size:0.74rem;color:var(--muted);">${l.date} • ${detail}</div>
        </div>
        <button type="button" class="del-x" data-exlog-del="${origIdx}">✕</button>
      </li>`;
    }).join('');
  }

  // ===== CHARTS (WEIGHT & WORKOUT FREQUENCY) =====
  function renderCharts() {
    drawWeightChart();
    drawFreqChart();
  }

  function drawWeightChart() {
    const canvas = $('weight-chart');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const logs = state.weightLogs.slice(-14);
    if (logs.length === 0) {
      $('weight-summary').textContent = 'Bấm ＋ Cân nặng để bắt đầu theo dõi';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Chưa có dữ liệu cân nặng', w / 2, h / 2);
      return;
    }

    const latest = logs[logs.length - 1].weight;
    const first = logs[0].weight;
    const diff = latest - first;
    const sign = diff > 0 ? '+' : '';
    $('weight-summary').textContent = `Hiện tại: ${latest} kg (${sign}${diff.toFixed(1)} kg)`;

    const weights = logs.map((l) => l.weight);
    const minW = Math.min(...weights) - 1;
    const maxW = Math.max(...weights) + 1;
    const padX = 24;
    const padY = 18;
    const plotW = w - padX * 2;
    const plotH = h - padY * 2;

    const pts = logs.map((l, i) => ({
      x: logs.length === 1 ? w / 2 : padX + (i / (logs.length - 1)) * plotW,
      y: padY + (1 - (l.weight - minW) / Math.max(1, maxW - minW)) * plotH,
      val: l.weight,
      label: l.date.slice(5)
    }));

    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.stroke();

    pts.forEach((p) => {
      ctx.fillStyle = '#c084fc';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(p.val), p.x, p.y - 8);
    });
  }

  function drawFreqChart() {
    const canvas = $('freq-chart');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const days = [];
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const count = state.exerciseLogs.filter((x) => x.date === key).length + state.workoutHistory.filter((x) => x.date === key).length;
      days.push({ key, dayNum: d.getDate(), count });
    }

    const total14 = days.filter((d) => d.count > 0).length;
    $('workout-freq-summary').textContent = `${total14} ngày có tập / 14 ngày gần nhất`;

    const padX = 12;
    const padB = 20;
    const barAreaW = (w - padX * 2) / 14;
    const barW = Math.max(8, barAreaW * 0.58);

    days.forEach((d, i) => {
      const x = padX + i * barAreaW + (barAreaW - barW) / 2;
      const barH = d.count > 0 ? Math.min(h - 32, 24 + d.count * 24) : 8;
      const y = h - padB - barH;

      ctx.fillStyle = d.count > 0 ? '#34d399' : 'rgba(196, 181, 253, 0.16)';
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(x, y, barW, barH, 4) : ctx.rect(x, y, barW, barH);
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(d.dayNum), x + barW / 2, h - 6);
    });
  }

  // ===== AI GYM ASSISTANT =====
  function renderCoachResults(query = '') {
    const q = query.trim().toLowerCase();
    const matches = EXERCISE_DB.filter((ex) =>
      !q || ex.name.toLowerCase().includes(q) || ex.group.toLowerCase().includes(q)
    ).slice(0, 10);

    if (matches.length === 0) {
      $('coach-results').innerHTML = '<div class="empty-msg">Không tìm thấy bài tập phù hợp.</div>';
      return;
    }

    $('coach-results').innerHTML = matches.map((ex) => `
      <div class="coach-item">
        <div>
          <div class="coach-item-name">${escapeHtml(ex.name)}</div>
          <div class="coach-item-meta">${escapeHtml(ex.group)} • ${escapeHtml(ex.tip)}</div>
        </div>
        <button type="button" class="log-set-btn" data-log-ex="${escapeHtml(ex.name)}">Ghi tạ</button>
      </div>
    `).join('');
  }

  function appendChatMsg(text, isUser = false) {
    const chat = $('coach-chat');
    const div = document.createElement('div');
    div.className = `chat-msg ${isUser ? 'chat-user' : 'chat-bot'}`;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  function analyzeExercise(name) {
    const logs = state.exerciseLogs.filter((l) => l.name.toLowerCase() === name.toLowerCase());
    if (logs.length === 0) {
      return `Chưa có lịch sử cho "${name}". Hãy ghi lại buổi tập đầu tiên để mình theo dõi PR và khối lượng tạ nhé!`;
    }
    const latest = logs[logs.length - 1];
    const maxWeight = Math.max(...logs.map((l) => l.weight));
    const est1RM = Math.round(latest.weight * (1 + latest.reps / 30));
    const latestVol = latest.weight * latest.reps * latest.sets;

    let trend = 'Buổi đầu tiên được ghi nhận.';
    if (logs.length >= 2) {
      const prev = logs[logs.length - 2];
      const prevVol = prev.weight * prev.reps * prev.sets;
      const pct = prevVol > 0 ? Math.round(((latestVol - prevVol) / prevVol) * 100) : 0;
      if (pct > 0) trend = `Tăng +${pct}% volume so với buổi trước (${prev.weight}kg×${prev.reps}). Tiến bộ rất tốt!`;
      else if (pct === 0) trend = 'Giữ ổn định so với buổi trước.';
      else trend = `Volume giảm ${pct}% so với buổi trước — chú ý nghỉ ngơi & dinh dưỡng.`;
    }

    const advice = latest.reps >= 10
      ? `💡 Gợi ý: Bạn đã kéo đủ ${latest.reps} reps, buổi tới thử tăng lên ${latest.weight + 2.5}kg!`
      : `💡 Gợi ý: Giữ mức ${latest.weight}kg và cố gắng chạm 10-12 reps trước khi tăng tạ.`;

    return `📊 Phân tích ${latest.name}:\n• Gần nhất: ${latest.weight}kg × ${latest.reps} reps × ${latest.sets} sets (Volume: ${latestVol}kg)\n• Kỷ lục (PR): ${maxWeight}kg • Ước tính 1RM: ~${est1RM}kg\n• Xu hướng: ${trend}\n${advice}`;
  }

  function generateOverallSummary() {
    const totalSessions = state.workoutHistory.length;
    const totalSets = state.exerciseLogs.length;
    const totalVol = state.exerciseLogs.reduce((sum, l) => sum + l.weight * l.reps * l.sets, 0);
    const latestWeight = state.weightLogs.length ? `${state.weightLogs[state.weightLogs.length - 1].weight}kg` : 'Chưa ghi';
    return `🏋️ Tổng kết quá trình tập:\n• Tổng số buổi đã hoàn thành: ${totalSessions} buổi\n• Số bài đã ghi mức tạ: ${totalSets} lượt\n• Tổng volume tích lũy: ${totalVol.toLocaleString('vi-VN')} kg\n• Cân nặng gần nhất: ${latestWeight}\n💡 Mẹo: Chọn lịch tập linh hoạt (Push/Pull/Legs) để lỡ nghỉ 1 ngày vẫn tiếp tục đúng mạch mà không bị bỏ bài!`;
  }

  function handleCoachPrompt(rawText) {
    const text = rawText.trim();
    if (!text) return;
    appendChatMsg(text, true);

    // Try natural language log: "ghi Bench Press 60kg 8 reps 4 sets" or "bench 60 8 4"
    const logMatch = text.match(/^(?:ghi\s+)?(.+?)\s+(\d+(?:\.\d+)?)\s*(?:kg)?\s+(\d+)\s*(?:reps?)?(?:\s+(\d+)\s*(?:sets?)?)?$/i);
    if (logMatch) {
      const qName = logMatch[1].trim();
      const weight = Number(logMatch[2]);
      const reps = Number(logMatch[3]);
      const sets = Number(logMatch[4] || 4);
      const found = EXERCISE_DB.find((e) => e.name.toLowerCase().includes(qName.toLowerCase()));
      const finalName = found ? found.name : qName;

      state.exerciseLogs.push({
        date: new Date().toISOString().slice(0, 10),
        name: finalName,
        weight,
        reps,
        sets
      });
      saveState();
      renderGym();
      appendChatMsg(`✅ Đã ghi: ${finalName} (${weight}kg × ${reps} reps × ${sets} sets)\n\n${analyzeExercise(finalName)}`);
      return;
    }

    const lower = text.toLowerCase();
    if (lower.includes('tổng kết') || lower.includes('đánh giá') || lower.includes('tiến độ')) {
      appendChatMsg(generateOverallSummary());
      return;
    }

    if (lower.includes('tìm') || lower.includes('gợi ý') || lower.includes('bài')) {
      const kw = lower.replace(/tìm|gợi ý|bài tập|bài/g, '').trim();
      renderCoachResults(kw);
      const hits = EXERCISE_DB.filter((e) => !kw || e.name.toLowerCase().includes(kw) || e.group.toLowerCase().includes(kw)).slice(0, 5);
      if (hits.length) {
        appendChatMsg(`🔍 Các bài tập phù hợp${kw ? ` cho "${kw}"` : ''}:\n` + hits.map((h) => `• ${h.name} (${h.group}) — ${h.tip}`).join('\n'));
      } else {
        appendChatMsg('Không thấy bài tập khớp từ khóa. Thử: ngực, lưng, chân, vai, tay.');
      }
      return;
    }

    const matchedEx = EXERCISE_DB.find((e) => lower.includes(e.name.toLowerCase()));
    if (matchedEx) {
      appendChatMsg(analyzeExercise(matchedEx.name));
      return;
    }

    appendChatMsg('Bạn có thể gõ:\n• "Ghi Bench Press 60kg 8 reps 4 sets"\n• "Tìm bài tập ngực"\n• "Tổng kết tiến độ"');
  }

  // ===== EXPENSES =====
  // ===== GEMINI AI ASSISTANT =====
  function appendAiMsg(text, isUser = false) {
    const box = $('ai-chat-box');
    if (!box) return null;
    const div = document.createElement('div');
    div.className = `chat-msg ${isUser ? 'chat-user' : 'chat-bot'}`;
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    return div;
  }

  function buildDashboardContext() {
    const curN4 = getFilteredJpWords()[jpIndex % getFilteredJpWords().length];
    const todayKey = new Date().toISOString().slice(0, 10);
    const todaySpend = state.expenses
      .filter((e) => e.date === todayKey && e.category !== 'Thu nhập')
      .reduce((s, e) => s + e.amount, 0);
    const recentLogs = state.exerciseLogs.slice(-8).map((l) => `${l.name} ${l.weight}kgx${l.reps}x${l.sets}`).join('; ');
    return `Bạn là trợ lý ảo cá nhân thân thiện trên điện thoại OPPO của người dùng (trả lời ngắn gọn, tự nhiên bằng tiếng Việt).
Dữ liệu hiện tại của người dùng:
- Đang học JLPT N4, từ đang xem: ${curN4 ? `${curN4.kanji} (${curN4.kana}) = ${curN4.vi}` : 'N/A'}
- Tổng buổi Gym đã tập: ${state.workoutHistory.length} buổi. Nhật ký tạ gần đây: ${recentLogs || 'Chưa có'}.
- Chi tiêu hôm nay: ${formatVND(todaySpend)}, ngân sách tháng: ${formatVND(state.settings.monthlyBudget)}.
- Việc cần làm còn lại: ${state.todos.filter((t) => !t.done).map((t) => t.text).join(', ') || 'Không có'}.`;
  }

  function speakText(text, lang = 'vi-VN') {
    if (window.AndroidBridge && typeof window.AndroidBridge.speakWithLang === 'function') {
      window.AndroidBridge.speakWithLang(text, lang);
    } else if (window.AndroidBridge && typeof window.AndroidBridge.speak === 'function' && lang.startsWith('vi')) {
      window.AndroidBridge.speak(text);
    } else if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = lang;
        window.speechSynthesis.speak(u);
      } catch {}
    }
  }

  function speakReply(text) {
    if (!aiTtsEnabled) return;
    speakText(text, 'vi-VN');
  }

  // ===== POMODORO, RAIN AMBIENT SOUND & MORNING BRIEFING =====
  function renderPomo() {
    if (!$('pomo-time')) return;
    const m = String(Math.floor(pomoSecondsLeft / 60)).padStart(2, '0');
    const s = String(pomoSecondsLeft % 60).padStart(2, '0');
    $('pomo-time').textContent = `${m}:${s}`;
    $('btn-pomo')?.classList.toggle('active', Boolean(pomoTimerId));
    if ($('btn-pomo-mode')) $('btn-pomo-mode').textContent = `${pomoMinutes}p ▾`;
  }

  function playChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {}
  }

  function togglePomo() {
    if (pomoTimerId) {
      clearInterval(pomoTimerId);
      pomoTimerId = null;
      renderPomo();
      return;
    }
    pomoTimerId = setInterval(() => {
      pomoSecondsLeft -= 1;
      if (pomoSecondsLeft <= 0) {
        clearInterval(pomoTimerId);
        pomoTimerId = null;
        pomoSecondsLeft = pomoMinutes * 60;
        playChime();
        speakText('Hết giờ tập trung rồi, nghỉ ngơi một chút nhé!', 'vi-VN');
      }
      renderPomo();
    }, 1000);
    renderPomo();
  }

  function toggleRainSound() {
    if (rainPlaying) {
      try { rainCtx?.close(); } catch {}
      rainCtx = null;
      rainPlaying = false;
      $('btn-rain')?.classList.remove('active');
      return;
    }
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      rainCtx = new AudioCtx();
      const bufferSize = rainCtx.sampleRate * 2;
      const buffer = rainCtx.createBuffer(1, bufferSize, rainCtx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.03 * white) / 1.03;
        lastOut = data[i];
        data[i] *= 2.8;
      }
      const noise = rainCtx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = rainCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 950;

      const gain = rainCtx.createGain();
      gain.gain.value = 0.22;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(rainCtx.destination);
      noise.start();
      rainPlaying = true;
      $('btn-rain')?.classList.add('active');
    } catch {}
  }

  function playMorningBriefing() {
    const greet = $('greeting')?.textContent || 'Xin chào';
    const temp = $('weather-temp')?.textContent || '';
    const desc = ($('weather-desc')?.textContent || '').replace('•', '').trim();
    const city = $('weather-city')?.textContent || 'Thành phố Hồ Chí Minh';
    const remTodos = state.todos.filter((t) => !t.done).length;
    const todayKey = new Date().toISOString().slice(0, 10);
    const todayGym = state.exerciseLogs.filter((l) => l.date === todayKey).length;
    const list = getFilteredJpWords();
    const curWord = list[jpIndex % list.length];
    const jpPart = curWord ? `Từ vựng N4 hôm nay là ${curWord.kana}, nghĩa là ${curWord.vi}.` : '';

    const msg = `${greet}. Thời tiết tại ${city} hiện tại ${temp}, ${desc}. Bạn đang có ${remTodos} việc cần làm và đã ghi ${todayGym} bài tập hôm nay. ${jpPart} Chúc bạn một ngày hiệu quả!`;
    speakText(msg, 'vi-VN');
  }

  // ===== N4 MINI QUIZ =====
  function loadNextQuizQuestion() {
    const pool = getFilteredJpWords();
    const allPool = JP_WORDS;
    const q = pool[Math.floor(Math.random() * pool.length)];
    quizAnswer = q;

    const distractors = [];
    const shuffled = [...allPool].sort(() => Math.random() - 0.5);
    for (const item of shuffled) {
      if (item.vi !== q.vi && distractors.length < 3) distractors.push(item.vi);
    }
    const choices = [q.vi, ...distractors].sort(() => Math.random() - 0.5);

    $('quiz-kanji').textContent = q.kanji;
    $('quiz-kana').textContent = q.kana;
    $('quiz-streak').textContent = `Chuỗi: ${quizStreak}`;
    $('quiz-feedback').textContent = '';
    $('quiz-options').innerHTML = choices.map((c) =>
      `<button type="button" class="quiz-opt" data-quiz-choice="${escapeHtml(c)}">${escapeHtml(c)}</button>`
    ).join('');
  }

  window.onNativeVoiceResult = (spokenText) => {
    if (!spokenText) return;
    if ($('ai-modal').classList.contains('hidden')) {
      $('ai-modal').classList.remove('hidden');
    }
    askGemini(spokenText);
  };

  window.onNativeVoiceError = (msg) => {
    appendAiMsg(`⚠️ ${msg}`, false);
  };

  async function askGemini(promptText) {
    const q = promptText.trim();
    if (!q) return;
    appendAiMsg(q, true);

    const apiKey = (state.settings.geminiKey || '').trim();
    if (!apiKey) {
      appendAiMsg('Bạn chưa nhập Gemini API Key.\nHãy vào ⚙ Cài đặt → dán Gemini API Key (tạo miễn phí tại aistudio.google.com) để trò chuyện trực tiếp với Gemini nhé!');
      return;
    }

    const loadingEl = appendAiMsg('Đang suy nghĩ...', false);
    aiHistory.push({ role: 'user', parts: [{ text: q }] });
    if (aiHistory.length > 12) aiHistory = aiHistory.slice(-12);

    // Support free Groq API key (gsk_...) as well as Gemini key
    if (apiKey.startsWith('gsk_')) {
      try {
        const msgs = [
          { role: 'system', content: buildDashboardContext() },
          ...aiHistory.map((m) => ({
            role: m.role === 'model' ? 'assistant' : 'user',
            content: m.parts?.[0]?.text || ''
          }))
        ];

        let groqModels = null;
        try {
          const mRes = await fetch('https://api.groq.com/openai/v1/models', {
            headers: { 'Authorization': `Bearer ${apiKey}` }
          });
          if (mRes.ok) {
            const mJson = await mRes.json();
            const list = (mJson.data || [])
              .map((x) => x.id)
              .filter((id) => !/whisper|guard|tts|audio|vision/i.test(id));
            if (list.length) {
              const pref = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'openai/gpt-oss-120b'];
              groqModels = [...pref.filter((p) => list.includes(p)), ...list.filter((n) => !pref.includes(n))].slice(0, 5);
            }
          }
        } catch {}

        const tryModels = groqModels || ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];
        let gErr = 'HTTP 404';
        for (const gm of tryModels) {
          const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ model: gm, messages: msgs })
          });
          if (!res.ok) {
            let detail = `HTTP ${res.status}`;
            try {
              const ej = await res.json();
              if (ej?.error?.message) detail = `${res.status}: ${ej.error.message}`;
            } catch {}
            gErr = detail;
            if (res.status === 404 || res.status === 400) continue;
            throw new Error(detail);
          }
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content || 'Xin lỗi, chưa có phản hồi.';
          aiHistory.push({ role: 'model', parts: [{ text: reply }] });
          if (loadingEl) loadingEl.textContent = reply;
          speakReply(reply);
          return;
        }
        throw new Error(gErr);
      } catch (err) {
        if (loadingEl) loadingEl.textContent = `Lỗi Groq (${err.message}).`;
      }
      return;
    }

    let cachedModels = null;
    try {
      const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`, {
        headers: { 'x-goog-api-key': apiKey }
      });
      if (listRes.ok) {
        const listJson = await listRes.json();
        const available = (listJson.models || [])
          .filter((m) => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent'))
          .map((m) => m.name.replace(/^models\//, ''))
          .filter((n) => n.startsWith('gemini-') && !/tts|image|audio|robotics|computer|embedding/i.test(n));
        if (available.length) {
          const preferred = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash-lite', 'gemini-flash-latest'];
          const sorted = [
            ...preferred.filter((p) => available.includes(p)),
            ...available.filter((n) => !preferred.includes(n) && n.includes('flash')),
            ...available.filter((n) => !preferred.includes(n) && !n.includes('flash'))
          ];
          cachedModels = sorted.slice(0, 6);
        }
      }
    } catch {}

    const models = cachedModels || ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-flash-latest'];
    let lastError = 'Không rõ lỗi';

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: buildDashboardContext() }] },
            contents: aiHistory
          })
        });
        if (!res.ok) {
          let detail = `HTTP ${res.status}`;
          try {
            const errJson = await res.json();
            if (errJson?.error?.message) detail = `${res.status}: ${errJson.error.message}`;
          } catch {}
          lastError = detail;
          if (res.status === 404 || res.status === 400) continue;
          throw new Error(detail);
        }
        const data = await res.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Xin lỗi, mình chưa nhận được phản hồi.';
        aiHistory.push({ role: 'model', parts: [{ text: reply }] });
        if (loadingEl) loadingEl.textContent = reply;
        speakReply(reply);
        return;
      } catch (err) {
        lastError = err.message || lastError;
        if (!/^(404|400)/.test(String(lastError))) break;
      }
    }

    if (loadingEl) {
      loadingEl.textContent = `Không thể kết nối Gemini (${lastError}).\nMẹo: Bạn cũng có thể dùng key miễn phí từ console.groq.com (bắt đầu bằng gsk_...) dán vào ⚙ Cài đặt.`;
    }
  }

  function renderExpenses() {
    const now = new Date();
    const todayKey = now.toISOString().slice(0, 10);
    const monthKey = now.toISOString().slice(0, 7);

    let todaySpend = 0;
    let monthSpend = 0;
    let monthIncome = 0;

    for (const exp of state.expenses) {
      const dateStr = exp.date || '';
      if (exp.category === 'Thu nhập') {
        if (dateStr.startsWith(monthKey)) monthIncome += exp.amount;
      } else {
        if (dateStr === todayKey) todaySpend += exp.amount;
        if (dateStr.startsWith(monthKey)) monthSpend += exp.amount;
      }
    }

    const budget = (Number(state.settings.monthlyBudget) || 0) + monthIncome;
    const left = budget - monthSpend;
    const ratio = budget > 0 ? monthSpend / budget : 0;
    const pct = Math.min(100, Math.round(ratio * 100));

    $('exp-today').textContent = formatVND(todaySpend);
    $('snap-exp').textContent = formatVND(todaySpend);
    $('exp-month').textContent = formatVND(monthSpend);
    $('exp-left').textContent = formatVND(left);
    $('budget-pct').textContent = `${pct}%`;
    if ($('budget-limit-label')) $('budget-limit-label').textContent = `Ngân sách: ${formatVND(Number(state.settings.monthlyBudget) || 0)}`;
    setRingProgress($('budget-ring'), ratio);

    const recent = state.expenses.slice(0, 14);
    if (recent.length === 0) {
      $('expense-list').innerHTML = '<li class="empty-msg">Chưa có giao dịch. Bấm ＋ Thêm.</li>';
      return;
    }

    $('expense-list').innerHTML = recent.map((exp) => {
      const isIncome = exp.category === 'Thu nhập';
      return `<li class="list-item">
        <div style="min-width:0;">
          <div style="font-weight:700;">${escapeHtml(exp.category)}</div>
          <div style="font-size:0.75rem;color:var(--muted);">${escapeHtml(exp.note || exp.date)}</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <strong class="${isIncome ? 'c-green' : 'c-rose'}">${isIncome ? '+' : '-'}${formatVND(exp.amount)}</strong>
          <button type="button" class="del-x" data-exp-del="${exp.id}">✕</button>
        </div>
      </li>`;
    }).join('');
  }

  // ===== TODOS & NOTE =====
  function renderTodos() {
    const remaining = state.todos.filter((t) => !t.done).length;
    $('todo-count').textContent = `${remaining} việc`;
    $('snap-todo').textContent = `${remaining} việc`;

    if (state.todos.length === 0) {
      $('todo-list').innerHTML = '<li class="empty-msg">Hết việc cần làm!</li>';
    } else {
      $('todo-list').innerHTML = state.todos.map((t) => {
        const dTag = t.date ? `<small style="color:var(--muted);margin-left:6px;">(${t.date.slice(5).split('-').reverse().join('/')})</small>` : '';
        return `<li class="list-item ${t.done ? 'done' : ''}">
          <label class="list-check">
            <input type="checkbox" data-todo-toggle="${t.id}" ${t.done ? 'checked' : ''} />
            <span>${escapeHtml(t.text)}${dTag}</span>
          </label>
          <button type="button" class="del-x" data-todo-del="${t.id}">✕</button>
        </li>`;
      }).join('');
    }

    $('quick-note').value = state.quickNote;
    $('note-preview-text').textContent = state.quickNote.trim()
      ? state.quickNote.trim()
      : 'Chạm vào đây để viết ghi chú...';
  }

  // ===== SHEETS & EVENTS =====
  function openSheet(type, extra = '') {
    ['form-expense', 'form-gym', 'form-weight', 'form-budget', 'form-log-set', 'form-todo-note'].forEach((id) => {
      $(id).classList.add('hidden');
    });

    if (type === 'expense') {
      $('sheet-title').textContent = '💰 Thêm thu / chi';
      $('form-expense').classList.remove('hidden');
      setTimeout(() => $('exp-amount').focus(), 50);
    } else if (type === 'gym') {
      $('sheet-title').textContent = '🏋️ Thêm bài tập';
      $('form-gym').classList.remove('hidden');
      setTimeout(() => $('gym-input').focus(), 50);
    } else if (type === 'weight') {
      $('sheet-title').textContent = '⚖️ Ghi cân nặng hôm nay';
      $('form-weight').classList.remove('hidden');
      setTimeout(() => $('weight-input').focus(), 50);
    } else if (type === 'budget') {
      $('sheet-title').textContent = '💰 Đặt ngân sách tháng';
      $('budget-input').value = state.settings.monthlyBudget;
      $('form-budget').classList.remove('hidden');
      setTimeout(() => $('budget-input').focus(), 50);
    } else if (type === 'log-set') {
      pendingLogDate = extra || new Date().toISOString().slice(0, 10);
      $('sheet-title').textContent = '🏋️ Ghi bài tập';
      $('log-ex-name').value = '';
      $('form-log-set').classList.remove('hidden');
      setTimeout(() => $('log-ex-name').focus(), 50);
    } else {
      const targetDate = extra || selectedCalDate || new Date().toISOString().slice(0, 10);
      $('sheet-title').textContent = '📝 Việc cần làm & Ghi chú';
      if ($('todo-date')) $('todo-date').value = targetDate;
      if ($('day-note-input')) $('day-note-input').value = state.dayNotes?.[targetDate] || '';
      $('form-todo-note').classList.remove('hidden');
      setTimeout(() => $('todo-input').focus(), 50);
    }
    $('action-sheet').classList.remove('hidden');
  }

  function closeSheet() {
    $('action-sheet').classList.add('hidden');
  }

  function bindEvents() {
    ['pointerdown', 'touchstart', 'keydown', 'input', 'scroll'].forEach((evt) => {
      window.addEventListener(evt, () => {
        if (!isIdleClockActive) resetIdleTimer();
      }, { passive: true, capture: true });
    });

    $('idle-clock').addEventListener('click', exitIdleClock);
    $('btn-keep-awake')?.addEventListener('click', () => {
      state.settings.idleClock = !state.settings.idleClock;
      saveState();
      renderKeepAwakeBtn();
      if (!state.settings.idleClock) {
        if (idleTimer) clearTimeout(idleTimer);
        exitIdleClock();
      } else {
        resetIdleTimer();
      }
    });
    $('btn-clock-now').addEventListener('click', (e) => { e.stopPropagation(); enterIdleClock(true); });

    // GPU Touch-Swipe Pager (zero scroll-snap lag)
    let touchStartX = 0;
    let touchStartY = 0;
    $('pager').addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    $('pager').addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        goToPage(dx < 0 ? currentPage + 1 : currentPage - 1);
      }
    }, { passive: true });

    $('page-dots').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-goto]');
      if (btn) goToPage(Number(btn.dataset.goto));
    });

    document.querySelectorAll('[data-jump-page]').forEach((btn) => {
      btn.addEventListener('click', () => {
        goToPage(Number(btn.dataset.jumpPage));
      });
    });

    $('btn-refresh').addEventListener('click', () => {
      fetchWeather();
      fetchVN30();
      fetchCryptoAndFx();
      fetchGoldPhuHao();
    });

    $('gym-sub-tabs').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-gym-sub]');
      if (btn) switchGymSub(btn.dataset.gymSub);
    });

    $('cal-prev').addEventListener('click', () => { calOffset -= 1; renderCalendar(); });
    $('cal-next').addEventListener('click', () => { calOffset += 1; renderCalendar(); });
    $('cal-days').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-cal-date]');
      if (!btn) return;
      selectedCalDate = btn.dataset.calDate;
      renderCalendar();
      openDayPopup(selectedCalDate);
    });

    $('btn-close-popup').addEventListener('click', () => $('day-popup').classList.add('hidden'));
    $('day-popup').addEventListener('click', (e) => { if (e.target === $('day-popup')) $('day-popup').classList.add('hidden'); });
    $('btn-popup-add-gym').addEventListener('click', () => {
      $('day-popup').classList.add('hidden');
      openSheet('log-set', selectedCalDate);
    });
    $('btn-popup-add-todo').addEventListener('click', () => {
      $('day-popup').classList.add('hidden');
      openSheet('todo', selectedCalDate);
    });

    $('btn-ai-chat').addEventListener('click', () => {
      if ($('ai-chat-box').children.length === 0) {
        appendAiMsg('👋 Chào bạn! Mình là trợ lý Gemini trên chiếc OPPO A95. Bạn muốn hỏi về tiếng Nhật N4, lịch tập Gym, chi tiêu hay bất cứ chuyện gì cứ nhắn nhé!');
      }
      $('ai-modal').classList.remove('hidden');
      setTimeout(() => $('ai-chat-input').focus(), 50);
    });
    $('btn-close-ai').addEventListener('click', () => {
      $('ai-modal').classList.add('hidden');
      if (window.AndroidBridge && typeof window.AndroidBridge.stopSpeak === 'function') {
        window.AndroidBridge.stopSpeak();
      }
    });
    $('btn-ai-tts').addEventListener('click', () => {
      aiTtsEnabled = !aiTtsEnabled;
      $('btn-ai-tts').classList.toggle('active', aiTtsEnabled);
      if (!aiTtsEnabled && window.AndroidBridge && typeof window.AndroidBridge.stopSpeak === 'function') {
        window.AndroidBridge.stopSpeak();
      }
    });
    $('btn-ai-mic').addEventListener('click', () => {
      if (window.AndroidBridge && typeof window.AndroidBridge.startVoiceInput === 'function') {
        window.AndroidBridge.startVoiceInput();
      } else {
        appendAiMsg('Tính năng nhận diện giọng nói hoạt động khi chạy bằng app Android trên điện thoại OPPO.', false);
      }
    });
    $('ai-modal').addEventListener('click', (e) => { if (e.target === $('ai-modal')) $('ai-modal').classList.add('hidden'); });
    $('ai-quick-chips').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-ai-q]');
      if (btn) askGemini(btn.dataset.aiQ);
    });
    $('ai-chat-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const val = $('ai-chat-input').value;
      $('ai-chat-input').value = '';
      askGemini(val);
    });

    $('jp-body-tap').addEventListener('click', () => {
      jpIndex += 1;
      renderJapaneseWord();
    });
    $('btn-jp-next').addEventListener('click', () => {
      jpIndex += 1;
      renderJapaneseWord();
    });
    $('btn-jp-speak')?.addEventListener('click', () => {
      const list = getFilteredJpWords();
      const w = list[jpIndex % list.length];
      if (w) speakText(`${w.kana}。${w.ex || ''}`, 'ja-JP');
    });
    $('btn-jp-quiz')?.addEventListener('click', () => {
      loadNextQuizQuestion();
      $('jp-quiz-modal').classList.remove('hidden');
    });
    $('btn-close-quiz')?.addEventListener('click', () => $('jp-quiz-modal').classList.add('hidden'));
    $('jp-quiz-modal')?.addEventListener('click', (e) => {
      if (e.target === $('jp-quiz-modal')) $('jp-quiz-modal').classList.add('hidden');
    });
    $('quiz-options')?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-quiz-choice]');
      if (!btn || !quizAnswer) return;
      const chosen = btn.dataset.quizChoice;
      const isRight = chosen === quizAnswer.vi;
      btn.classList.add(isRight ? 'correct' : 'wrong');
      if (isRight) {
        quizStreak += 1;
        $('quiz-feedback').textContent = 'Chính xác! 🎉';
        $('quiz-feedback').style.color = 'var(--green)';
      } else {
        quizStreak = 0;
        $('quiz-feedback').textContent = `Đáp án đúng: ${quizAnswer.vi}`;
        $('quiz-feedback').style.color = 'var(--rose)';
      }
      $('quiz-streak').textContent = `Chuỗi: ${quizStreak}`;
      setTimeout(loadNextQuizQuestion, 1100);
    });

    $('btn-pomo')?.addEventListener('click', togglePomo);
    $('btn-pomo-mode')?.addEventListener('click', () => {
      $('pomo-custom-min').value = pomoMinutes;
      $('pomo-presets').querySelectorAll('[data-pomo-min]').forEach((b) => {
        b.classList.toggle('active', Number(b.dataset.pomoMin) === pomoMinutes);
      });
      $('pomo-modal').classList.remove('hidden');
    });
    $('btn-close-pomo')?.addEventListener('click', () => $('pomo-modal').classList.add('hidden'));
    $('pomo-modal')?.addEventListener('click', (e) => {
      if (e.target === $('pomo-modal')) $('pomo-modal').classList.add('hidden');
    });
    $('pomo-presets')?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-pomo-min]');
      if (!btn) return;
      if (pomoTimerId) { clearInterval(pomoTimerId); pomoTimerId = null; }
      pomoMinutes = Number(btn.dataset.pomoMin);
      pomoSecondsLeft = pomoMinutes * 60;
      renderPomo();
      $('pomo-modal').classList.add('hidden');
    });
    $('pomo-custom-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = Number($('pomo-custom-min').value);
      if (!val || val < 1 || val > 180) return;
      if (pomoTimerId) { clearInterval(pomoTimerId); pomoTimerId = null; }
      pomoMinutes = val;
      pomoSecondsLeft = pomoMinutes * 60;
      renderPomo();
      $('pomo-modal').classList.add('hidden');
    });
    $('btn-pomo-reset')?.addEventListener('click', () => {
      if (pomoTimerId) { clearInterval(pomoTimerId); pomoTimerId = null; }
      pomoSecondsLeft = pomoMinutes * 60;
      renderPomo();
      $('pomo-modal').classList.add('hidden');
    });
    $('btn-rain')?.addEventListener('click', toggleRainSound);
    $('btn-briefing')?.addEventListener('click', playMorningBriefing);
    $('btn-jp-filter').addEventListener('click', () => {
      renderJpFilterChips();
      $('jp-modal').classList.remove('hidden');
    });
    $('btn-close-jp').addEventListener('click', () => $('jp-modal').classList.add('hidden'));
    $('jp-modal').addEventListener('click', (e) => { if (e.target === $('jp-modal')) $('jp-modal').classList.add('hidden'); });

    $('jp-mode-tabs').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-jp-mode]');
      if (!btn) return;
      state.jpFilter = { mode: btn.dataset.jpMode, value: 'all' };
      saveState();
      renderJpFilterChips();
      renderJapaneseWord();
    });

    $('jp-filter-chips').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-jp-val]');
      if (!btn) return;
      state.jpFilter.value = btn.dataset.jpVal;
      jpIndex = 0;
      saveState();
      renderJpFilterChips();
      renderJapaneseWord();
      $('jp-modal').classList.add('hidden');
    });

    $('btn-add-gym').addEventListener('click', () => openSheet('log-set'));
    $('btn-add-expense').addEventListener('click', () => openSheet('expense'));
    $('btn-edit-budget').addEventListener('click', () => openSheet('budget'));
    $('btn-add-todo').addEventListener('click', () => openSheet('todo'));
    $('btn-add-weight').addEventListener('click', () => openSheet('weight'));
    $('note-preview-btn').addEventListener('click', () => openSheet('todo'));
    $('btn-close-sheet').addEventListener('click', closeSheet);
    $('action-sheet').addEventListener('click', (e) => { if (e.target === $('action-sheet')) closeSheet(); });

    $('gym-list').addEventListener('click', (e) => {
      const del = e.target.closest('[data-exlog-del]');
      if (!del) return;
      const idx = Number(del.dataset.exlogDel);
      if (!Number.isNaN(idx)) {
        state.exerciseLogs.splice(idx, 1);
        saveState();
        renderGym();
        renderCalendar();
      }
    });

    $('form-gym').addEventListener('submit', (e) => {
      e.preventDefault();
      const val = $('gym-input').value.trim();
      if (!val) return;
      state.splits[state.activeSplit].items.push({ id: 'g_' + Date.now(), text: val, done: false });
      $('gym-input').value = '';
      saveState();
      renderGym();
      closeSheet();
    });

    $('form-weight').addEventListener('submit', (e) => {
      e.preventDefault();
      const w = Number($('weight-input').value);
      if (!w || w < 20) return;
      const today = new Date().toISOString().slice(0, 10);
      const existing = state.weightLogs.find((x) => x.date === today);
      if (existing) existing.weight = w;
      else state.weightLogs.push({ date: today, weight: w });
      $('weight-input').value = '';
      saveState();
      renderCharts();
      closeSheet();
    });

    $('form-budget').addEventListener('submit', (e) => {
      e.preventDefault();
      const b = Number($('budget-input').value);
      if (Number.isNaN(b) || b < 0) return;
      state.settings.monthlyBudget = b;
      saveState();
      renderExpenses();
      renderSelectedDateSummary();
      closeSheet();
    });

    $('log-muscle')?.addEventListener('change', (e) => {
      const isCardio = e.target.value === 'Cardio';
      $('log-strength-fields')?.classList.toggle('hidden', isCardio);
      $('log-cardio-fields')?.classList.toggle('hidden', !isCardio);
    });
    $('log-set-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-sets]');
      if (!btn) return;
      $('log-sets').value = btn.dataset.sets;
      $('log-set-pills').querySelectorAll('.seg-btn').forEach((b) => b.classList.toggle('active', b === btn));
    });
    $('log-min-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-mins]');
      if (!btn) return;
      $('log-minutes').value = btn.dataset.mins;
      $('log-min-pills').querySelectorAll('.seg-btn').forEach((b) => b.classList.toggle('active', b === btn));
    });

    $('form-log-set').addEventListener('submit', (e) => {
      e.preventDefault();
      const muscle = $('log-muscle') ? $('log-muscle').value : '';
      const name = $('log-ex-name').value.trim();
      if (!name) return;

      if (muscle === 'Cardio') {
        const minutes = Number($('log-minutes')?.value) || 30;
        state.exerciseLogs.push({
          date: pendingLogDate || new Date().toISOString().slice(0, 10),
          muscle,
          name,
          minutes,
          weight: 0,
          reps: 0,
          sets: 0
        });
      } else {
        const weight = Number($('log-weight').value) || 0;
        const reps = Number($('log-reps').value) || 10;
        const sets = Number($('log-sets').value) || 4;
        state.exerciseLogs.push({
          date: pendingLogDate || new Date().toISOString().slice(0, 10),
          muscle,
          name,
          weight,
          reps,
          sets
        });
      }
      $('log-ex-name').value = '';
      saveState();
      renderGym();
      renderCalendar();
      if (activeGymSub === 'charts') renderCharts();
      closeSheet();
    });

    // Expenses
    $('form-expense').addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = Number($('exp-amount').value);
      if (!amount || amount <= 0) return;
      state.expenses.unshift({
        id: 'e_' + Date.now(),
        amount,
        category: $('exp-category').value,
        note: $('exp-note').value.trim(),
        date: new Date().toISOString().slice(0, 10)
      });
      $('exp-amount').value = '';
      $('exp-note').value = '';
      saveState();
      renderExpenses();
      renderSelectedDateSummary();
      closeSheet();
    });

    $('expense-list').addEventListener('click', (e) => {
      const del = e.target.closest('[data-exp-del]');
      if (!del) return;
      state.expenses = state.expenses.filter((x) => x.id !== del.dataset.expDel);
      saveState();
      renderExpenses();
    });

    // Todos & Note
    $('todo-date')?.addEventListener('change', (e) => {
      const d = e.target.value;
      if ($('day-note-input')) $('day-note-input').value = state.dayNotes?.[d] || '';
    });

    $('day-note-input')?.addEventListener('input', (e) => {
      const d = $('todo-date')?.value || selectedCalDate;
      if (!state.dayNotes) state.dayNotes = {};
      state.dayNotes[d] = e.target.value;
      saveState();
      renderCalendar();
    });

    $('todo-add-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const val = $('todo-input').value.trim();
      if (!val) return;
      const d = $('todo-date')?.value || selectedCalDate;
      state.todos.unshift({ id: 't_' + Date.now(), text: val, done: false, date: d });
      $('todo-input').value = '';
      saveState();
      renderTodos();
      renderCalendar();
    });

    $('todo-list').addEventListener('click', (e) => {
      const toggle = e.target.closest('[data-todo-toggle]');
      if (toggle) {
        const item = state.todos.find((x) => x.id === toggle.dataset.todoToggle);
        if (item) { item.done = !item.done; saveState(); renderTodos(); }
        return;
      }
      const del = e.target.closest('[data-todo-del]');
      if (del) {
        state.todos = state.todos.filter((x) => x.id !== del.dataset.todoDel);
        saveState();
        renderTodos();
      }
    });

    $('quick-note').addEventListener('input', (e) => {
      state.quickNote = e.target.value;
      saveState();
      renderTodos();
    });

    // Settings
    $('btn-settings').addEventListener('click', () => {
      $('set-city').value = state.settings.cityValue;
      $('set-vn30').value = (state.settings.vn30 || DEFAULT_VN30).join(', ');
      $('set-coins').value = state.settings.coins.join(', ');
      $('set-gemini-key').value = state.settings.geminiKey || '';
      if ($('set-fb-url')) $('set-fb-url').value = state.settings.firebaseUrl || '';
      if ($('set-fb-id')) $('set-fb-id').value = state.settings.firebaseSyncId || '';
      $('set-idle-clock').checked = state.settings.idleClock;
      $('set-auto-dim').checked = state.settings.autoDim;
      $('settings-modal').classList.remove('hidden');
    });

    $('btn-close-settings').addEventListener('click', () => $('settings-modal').classList.add('hidden'));
    $('settings-modal').addEventListener('click', (e) => { if (e.target === $('settings-modal')) $('settings-modal').classList.add('hidden'); });

    $('btn-save-settings').addEventListener('click', () => {
      state.settings.cityValue = $('set-city').value;
      const nextStocks = [...new Set(
        $('set-vn30').value.split(/[,\s]+/).map((s) => s.trim().toUpperCase()).filter(Boolean)
      )];
      state.settings.vn30 = nextStocks.length ? nextStocks : DEFAULT_VN30;
      const nextCoins = [...new Set(
        $('set-coins').value.split(/[,\s]+/).map((s) => s.trim().toUpperCase()).filter(Boolean)
      )];
      state.settings.coins = nextCoins.length ? nextCoins : ['BTC', 'ETH'];
      state.settings.geminiKey = $('set-gemini-key').value.trim();
      if ($('set-fb-url')) state.settings.firebaseUrl = $('set-fb-url').value.trim();
      if ($('set-fb-id')) state.settings.firebaseSyncId = $('set-fb-id').value.trim();
      state.settings.idleClock = $('set-idle-clock').checked;
      state.settings.autoDim = $('set-auto-dim').checked;
      saveState();
      $('settings-modal').classList.add('hidden');
      renderKeepAwakeBtn();
      resetIdleTimer();
      fetchWeather();
      fetchVN30();
      fetchCryptoAndFx();
      pullFromFirebase();
    });

    $('btn-export').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `oppo-dashboard-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    $('btn-import').addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          if (data && data.settings) {
            state = { ...structuredClone(DEFAULT_STATE), ...data };
            saveState();
            applyTheme(state.settings.theme);
            applyBackground(state.settings.bg);
            renderAll();
            fetchWeather();
            fetchVN30();
            fetchCryptoAndFx();
            resetIdleTimer();
            $('settings-modal').classList.add('hidden');
          }
        } catch {
          alert('File sao lưu không hợp lệ.');
        }
      };
      reader.readAsText(file);
    });

    window.addEventListener('resize', () => {
      startCanvasFx(state.settings.bg);
      if (activeGymSub === 'charts') renderCharts();
    });
  }

  function renderAll() {
    renderJapaneseWord();
    renderCalendar();
    renderGym();
    renderExpenses();
    renderTodos();
  }

  function init() {
    if (location.hostname.endsWith('netlify.app')) {
      document.documentElement.classList.add('is-netlify');
    }
    applyTheme(state.settings.theme);
    applyBackground(state.settings.bg);
    bindEvents();
    renderKeepAwakeBtn();
    updateClock();
    renderAll();
    fetchWeather();
    fetchVN30();
    fetchCryptoAndFx();
    fetchGoldPhuHao();
    pullFromFirebase();
    resetIdleTimer();

    if (state.settings.wakeLockPreferred) requestWakeLock();

    setInterval(updateClock, 1000);
    setInterval(driftIdleClock, 60 * 1000);
    setInterval(() => {
      if (isIdleClockActive) return;
      pullFromFirebase();
    }, 15 * 1000);
    setInterval(() => {
      jpIndex = (jpIndex + 1) % JP_WORDS.length;
      renderJapaneseWord();
    }, 5 * 60 * 1000);
    setInterval(() => {
      if (isIdleClockActive) return; // Save battery while idle clock is active
      fetchVN30();
      fetchCryptoAndFx();
      fetchGoldPhuHao();
    }, 120 * 1000);
    setInterval(fetchWeather, 15 * 60 * 1000);

    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  init();
})();
