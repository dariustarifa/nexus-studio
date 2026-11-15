/**
 * DARIUS BOUGEROL // DESIGN ENGINEERING ENGINE
 * Implementation of Emil Kowalski & taste-skill interaction patterns
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================= 1. THEME CONTROLLER =================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('darius_theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  html.setAttribute('data-theme', savedTheme);

  themeToggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('darius_theme', next);
    playHapticTone(360, 0.05);
    spawnSonnerToast(`Theme switched to ${next} mode`);
  });

  // ================= 2. HAPTIC AUDIO SYNTHESIZER (WEB AUDIO API) =================
  let audioCtx = null;
  let audioEnabled = false;
  const audioToggleBtn = document.getElementById('audioToggleDemo');
  const audioStatusSpan = document.getElementById('audioStatusSpan');

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playHapticTone(freq = 520, duration = 0.05) {
    if (!audioEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  audioToggleBtn?.addEventListener('click', () => {
    initAudio();
    audioEnabled = !audioEnabled;
    if (audioStatusSpan) {
      audioStatusSpan.textContent = `Audio Feedback: ${audioEnabled ? 'Active' : 'Off'}`;
    }
    if (audioEnabled) {
      playHapticTone(640, 0.07);
      spawnSonnerToast('Tactile audio feedback enabled');
    } else {
      spawnSonnerToast('Audio feedback disabled');
    }
  });

  // ================= 3. SONNER TOAST STACK ENGINE =================
  const sonnerRoot = document.getElementById('sonnerRoot');
  let toastStack = [];

  function spawnSonnerToast(message, actionLabel = 'Dismiss') {
    if (!sonnerRoot) return;

    playHapticTone(480, 0.04);

    const toast = document.createElement('div');
    toast.className = 'sonner-toast';
    toast.innerHTML = `
      <span class="toast-msg">${message}</span>
      <button class="toast-dismiss">${actionLabel}</button>
    `;

    toast.querySelector('.toast-dismiss')?.addEventListener('click', () => {
      dismissToast(toast);
    });

    sonnerRoot.prepend(toast);
    toastStack.unshift(toast);

    updateSonnerStack();

    // Auto dismiss after 4s
    setTimeout(() => {
      if (toastStack.includes(toast)) {
        dismissToast(toast);
      }
    }, 4000);
  }

  function dismissToast(toast) {
    toast.style.opacity = '0';
    toast.style.transform = 'translate3d(0, 20px, 0) scale(0.9)';
    setTimeout(() => {
      toast.remove();
      toastStack = toastStack.filter(t => t !== toast);
      updateSonnerStack();
    }, 180);
  }

  function updateSonnerStack() {
    let offsetAccumulator = 0;
    toastStack.forEach((t, i) => {
      t.setAttribute('data-index', i.toString());
      t.style.setProperty('--hover-offset', `${offsetAccumulator}px`);
      offsetAccumulator += (t.offsetHeight || 52) + 8;
    });
  }

  // Hook toast triggers
  document.getElementById('triggerHeroToast')?.addEventListener('click', () => {
    spawnSonnerToast('Changes deployed to production', 'Undo');
  });

  document.getElementById('demoToastAction')?.addEventListener('click', () => {
    spawnSonnerToast('Optimized bundle with zero layout shift', 'Close');
  });

  // Global 'T' key to spawn toast
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key.toLowerCase() === 't' && !e.metaKey && !e.ctrlKey) {
      spawnSonnerToast('Hardware acceleration active (60 FPS)', 'OK');
    }
  });

  // ================= 4. SLIDING SEGMENTED CONTROL =================
  const segmentTabs = document.querySelectorAll('.segment-tab');
  const segmentThumb = document.getElementById('segmentThumb');
  const physicsStatus = document.getElementById('physicsStatus');
  const valStiffness = document.getElementById('valStiffness');
  const valDamping = document.getElementById('valDamping');
  const valMass = document.getElementById('valMass');

  const configs = [
    { name: 'scale(0.97) on :active', stiffness: 420, damping: 28, mass: 0.85 },
    { name: 'scale(0.95) snappy response', stiffness: 580, damping: 22, mass: 0.65 },
    { name: 'scale(0.98) instant snap', stiffness: 800, damping: 35, mass: 0.50 }
  ];

  segmentTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      segmentTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      if (segmentThumb) {
        segmentThumb.style.transform = `translateX(${index * 100}%)`;
      }

      const cfg = configs[index];
      if (physicsStatus) physicsStatus.textContent = cfg.name;
      if (valStiffness) valStiffness.textContent = cfg.stiffness;
      if (valDamping) valDamping.textContent = cfg.damping;
      if (valMass) valMass.textContent = cfg.mass;

      playHapticTone(440 + index * 60, 0.04);
    });
  });

  // ================= 5. TABULAR NUMERIC STEPPERS =================
  const counterVal = document.getElementById('labCounterVal');
  let count = 1024;

  document.getElementById('labCountInc')?.addEventListener('click', () => {
    count += 16;
    if (counterVal) counterVal.textContent = count.toLocaleString();
    playHapticTone(540, 0.03);
  });

  document.getElementById('labCountDec')?.addEventListener('click', () => {
    count = Math.max(0, count - 16);
    if (counterVal) counterVal.textContent = count.toLocaleString();
    playHapticTone(420, 0.03);
  });

  // ================= 6. INLINE MORPHING COPY AFFORDANCE =================
  const codeAffordance = document.getElementById('codeAffordance');
  const copyBtn = document.getElementById('copyTriggerBtn');

  copyBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText('npx create-craft-app').then(() => {
      codeAffordance?.classList.add('copied');
      playHapticTone(680, 0.06);
      spawnSonnerToast('Command copied to clipboard');
      setTimeout(() => {
        codeAffordance?.classList.remove('copied');
      }, 2000);
    });
  });

  // ================= 7. COMMAND PALETTE (INSTANT OPEN) =================
  const cmdPalette = document.getElementById('cmdPalette');
  const cmdTrigger = document.getElementById('cmdTrigger');
  const cmdSearchInput = document.getElementById('cmdSearchInput');
  const cmdItems = document.querySelectorAll('.cmd-item');

  function openCmd() {
    cmdPalette?.classList.add('open');
    cmdPalette?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (cmdSearchInput) {
      cmdSearchInput.value = '';
      cmdSearchInput.focus();
    }
    filterCmd('');
  }

  function closeCmd() {
    cmdPalette?.classList.remove('open');
    cmdPalette?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cmdTrigger?.addEventListener('click', openCmd);

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdPalette?.classList.contains('open')) {
        closeCmd();
      } else {
        openCmd();
      }
    } else if (e.key === 'Escape' && cmdPalette?.classList.contains('open')) {
      closeCmd();
    }
  });

  cmdPalette?.addEventListener('click', (e) => {
    if (e.target === cmdPalette) closeCmd();
  });

  function filterCmd(q) {
    const query = q.toLowerCase().trim();
    cmdItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? 'flex' : 'none';
    });
  }

  cmdSearchInput?.addEventListener('input', (e) => {
    filterCmd(e.target.value);
  });

  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      const goto = item.getAttribute('data-goto');
      const action = item.getAttribute('data-action');
      closeCmd();

      if (goto) {
        const target = document.querySelector(goto);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'spawn-toast') {
        spawnSonnerToast('Action executed via Command Menu', 'OK');
      } else if (action === 'toggle-theme') {
        themeToggle?.click();
      } else if (action === 'toggle-audio') {
        audioToggleBtn?.click();
      }
    });
  });

  // Tactile button sound hooks
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playHapticTone(500, 0.03);
    });
  });

  console.log('Craft & Taste interface engine initialized.');
});
