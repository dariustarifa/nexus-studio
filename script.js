/**
 * NEXUS STUDIO // INTERACTIVE ENGINE
 * Motor de interacción reactivo, efectos Web Audio y sistema de diseño dinámico
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================= 1. GESTOR DE TEMAS (CLARO / OSCURO) =================
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  
  // Cargar preferencia guardada o del sistema
  const savedTheme = localStorage.getItem('nexus_theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  
  htmlEl.setAttribute('data-theme', savedTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('nexus_theme', newTheme);
    showToast(`Tema cambiado a modo ${newTheme === 'dark' ? 'Oscuro' : 'Claro'}`, 'info');
    playTone(340, 0.08);
  });

  // ================= 2. PALETAS DE COLOR DINÁMICAS =================
  const palettes = {
    blue: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      glow: 'rgba(59, 130, 246, 0.35)',
      name: 'Cyber Blue'
    },
    violet: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      glow: 'rgba(139, 92, 246, 0.35)',
      name: 'Neon Violet'
    },
    emerald: {
      primary: '#10b981',
      secondary: '#06b6d4',
      glow: 'rgba(16, 185, 129, 0.35)',
      name: 'Tech Emerald'
    },
    coral: {
      primary: '#f43f5e',
      secondary: '#fb923c',
      glow: 'rgba(244, 63, 94, 0.35)',
      name: 'Sunset Coral'
    },
    amber: {
      primary: '#f59e0b',
      secondary: '#ef4444',
      glow: 'rgba(245, 158, 11, 0.35)',
      name: 'Solar Amber'
    }
  };

  function applyPalette(key) {
    const p = palettes[key];
    if (!p) return;
    
    document.documentElement.style.setProperty('--accent-primary', p.primary);
    document.documentElement.style.setProperty('--accent-secondary', p.secondary);
    document.documentElement.style.setProperty('--accent-glow', p.glow);
    
    const codeDisplay = document.getElementById('codeThemeDisplay');
    if (codeDisplay) codeDisplay.textContent = `"${key}"`;

    // Sincronizar botones de paleta
    document.querySelectorAll('.color-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === key);
    });
    document.querySelectorAll('.theme-select-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === key);
    });

    updateExportedCode();
    playTone(520, 0.06);
  }

  document.querySelectorAll('.color-pill, .theme-select-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const color = e.currentTarget.dataset.color;
      if (color) applyPalette(color);
    });
  });

  // ================= 3. BARRA DE PROGRESO DE SCROLL =================
  const scrollProgressBar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  // ================= 4. CURSOR PERSONALIZADO INTERACTIVO =================
  const cursor = document.getElementById('customCursor');
  const cursorLabel = cursor?.querySelector('.cursor-label');

  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Detectar elementos con hover personalizado
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor], input, select, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        const customText = el.getAttribute('data-cursor');
        if (cursorLabel && customText) {
          cursorLabel.textContent = customText;
        } else if (cursorLabel) {
          cursorLabel.textContent = '';
        }
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        if (cursorLabel) cursorLabel.textContent = '';
      });
    });
  }

  // ================= 5. EFECTO 3D TILT EN TARJETAS =================
  const heroCard = document.getElementById('heroCard');
  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // Tilt para Bento Cards
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // ================= 6. CONTROLES DEL HERO (RESPLANDOR Y VELOCIDAD) =================
  const glowSlider = document.getElementById('glowSlider');
  const glowVal = document.getElementById('glowVal');
  const ambientGlowTop = document.querySelector('.glow-top');

  glowSlider?.addEventListener('input', (e) => {
    const val = e.target.value;
    if (glowVal) glowVal.textContent = `${val}%`;
    if (ambientGlowTop) ambientGlowTop.style.opacity = val / 100;
  });

  const speedSlider = document.getElementById('speedSlider');
  const speedVal = document.getElementById('speedVal');
  speedSlider?.addEventListener('input', (e) => {
    const val = e.target.value;
    if (speedVal) speedVal.textContent = `${val}x`;
    document.documentElement.style.setProperty('--transition-normal', `${300 / val}ms var(--ease-smooth)`);
  });

  // ================= 7. MOTOR DE AUDIO SINTÉTICO (WEB AUDIO API) =================
  let audioContext = null;
  let audioEnabled = false;

  const toggleAudioBtn = document.getElementById('toggleAudioBtn');
  const audioIcon = document.getElementById('audioIcon');
  const audioStatusText = document.getElementById('audioStatusText');

  function initAudio() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTone(freq = 440, duration = 0.08, type = 'sine') {
    if (!audioEnabled || !audioContext) return;
    try {
      if (audioContext.state === 'suspended') audioContext.resume();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      gain.gain.setValueAtTime(0.08, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {
      // Audio fallback silencioso
    }
  }

  toggleAudioBtn?.addEventListener('click', () => {
    initAudio();
    audioEnabled = !audioEnabled;
    if (audioIcon && audioStatusText) {
      if (audioEnabled) {
        audioIcon.textContent = '🔊';
        audioStatusText.textContent = 'Sonido Activado';
        showToast('Efectos de audio sintético activados', 'success');
        playTone(660, 0.1);
      } else {
        audioIcon.textContent = '🔈';
        audioStatusText.textContent = 'Activar Sonido al Clic';
        showToast('Audio desactivado', 'info');
      }
    }
  });

  // ================= 8. PLAYGROUND: PESTAÑAS Y CONTROLES =================
  const pgTabs = document.querySelectorAll('.pg-tab');
  const pgContents = document.querySelectorAll('.pg-content');

  pgTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;
      
      pgTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      pgContents.forEach(c => {
        c.classList.remove('active');
        c.hidden = true;
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const activeContent = document.getElementById(targetId);
      if (activeContent) {
        activeContent.classList.add('active');
        activeContent.hidden = false;
      }
      playTone(480, 0.05);
    });
  });

  // Controles dinámicos de radio y desenfoque
  const radiusSlider = document.getElementById('radiusSlider');
  const radiusVal = document.getElementById('radiusVal');
  const blurSlider = document.getElementById('blurSlider');
  const blurVal = document.getElementById('blurVal');
  const demoCard = document.getElementById('interactiveDemoCard');

  radiusSlider?.addEventListener('input', (e) => {
    const val = e.target.value;
    if (radiusVal) radiusVal.textContent = `${val}px`;
    if (demoCard) demoCard.style.borderRadius = `${val}px`;
    updateExportedCode();
  });

  blurSlider?.addEventListener('input', (e) => {
    const val = e.target.value;
    if (blurVal) blurVal.textContent = `${val}px`;
    if (demoCard) demoCard.style.backdropFilter = `blur(${val}px)`;
    updateExportedCode();
  });

  // Contador interactivo de clics
  let clicks = 0;
  const demoInteractBtn = document.getElementById('demoInteractBtn');
  const clickCountEl = document.getElementById('clickCount');

  demoInteractBtn?.addEventListener('click', () => {
    clicks++;
    if (clickCountEl) clickCountEl.textContent = clicks;
    playTone(550 + clicks * 30, 0.08, 'triangle');
    
    // Animación de pulso
    demoInteractBtn.style.transform = 'scale(0.92)';
    setTimeout(() => {
      demoInteractBtn.style.transform = '';
    }, 120);

    if (clicks % 5 === 0) {
      showToast(`¡Excelente! Has probado ${clicks} interacciones dinámicas.`, 'success');
    }
  });

  // Actualizador de código exportado
  function updateExportedCode() {
    const codeEl = document.getElementById('exportedCodeText');
    if (!codeEl) return;
    
    const currentAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#3b82f6';
    const r = radiusSlider ? radiusSlider.value : 16;
    const b = blurSlider ? blurSlider.value : 16;

    codeEl.textContent = `:root {
  --accent-primary: ${currentAccent};
  --card-radius: ${r}px;
  --glass-blur: blur(${b}px);
  --transition-smooth: cubic-bezier(0.16, 1, 0.3, 1);
}

.nexus-glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: var(--glass-blur);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--card-radius);
  transition: transform 0.4s var(--transition-smooth);
}`;
  }

  // Copiar código CSS al portapapeles
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  copyCodeBtn?.addEventListener('click', () => {
    const codeEl = document.getElementById('exportedCodeText');
    if (!codeEl) return;

    navigator.clipboard.writeText(codeEl.textContent)
      .then(() => {
        showToast('¡Código CSS copiado al portapapeles!', 'success');
        playTone(700, 0.1);
      })
      .catch(() => {
        showToast('No se pudo copiar automáticamente', 'info');
      });
  });

  // ================= 9. FILTRO DE PROYECTOS =================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });

      playTone(400, 0.06);
    });
  });

  // ================= 10. CALCULADORA DE PRECIOS (MENSUAL / ANUAL) =================
  const billingToggle = document.getElementById('billingToggle');
  const billingMonthlyLabel = document.getElementById('billingMonthlyLabel');
  const billingAnnualLabel = document.getElementById('billingAnnualLabel');
  const priceValues = document.querySelectorAll('.price-val');
  let isAnnual = true;

  billingToggle?.addEventListener('click', () => {
    isAnnual = !isAnnual;
    billingToggle.setAttribute('aria-checked', isAnnual.toString());

    billingMonthlyLabel?.classList.toggle('active', !isAnnual);
    billingAnnualLabel?.classList.toggle('active', isAnnual);

    priceValues.forEach(price => {
      const monthly = price.getAttribute('data-monthly');
      const annual = price.getAttribute('data-annual');
      price.textContent = isAnnual ? annual : monthly;
    });

    playTone(isAnnual ? 580 : 420, 0.07);
    showToast(isAnnual ? 'Facturación anual seleccionada (20% descuento aplicado)' : 'Facturación mensual seleccionada', 'info');
  });

  // Botones de selección de plan
  document.querySelectorAll('.select-plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      openModal();
      const planSelect = document.getElementById('formPlan');
      if (planSelect && plan) {
        planSelect.value = plan;
      }
      playTone(520, 0.08);
    });
  });

  // ================= 11. MODAL DE CONTACTO =================
  const contactModal = document.getElementById('contactModal');
  const openContactBtns = [
    document.getElementById('openContactModal'),
    document.getElementById('finalCtaBtn')
  ];
  const closeContactBtn = document.getElementById('closeContactModal');
  const contactForm = document.getElementById('contactForm');

  function openModal() {
    contactModal?.classList.add('active');
    contactModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('formName')?.focus();
  }

  function closeModal() {
    contactModal?.classList.remove('active');
    contactModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openContactBtns.forEach(btn => btn?.addEventListener('click', openModal));
  closeContactBtn?.addEventListener('click', closeModal);

  contactModal?.addEventListener('click', (e) => {
    if (e.target === contactModal) closeModal();
  });

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value;
    const plan = document.getElementById('formPlan').value;

    showToast(`¡Gracias, ${name}! Hemos recibido tu solicitud para ${plan}. Te responderemos de inmediato.`, 'success');
    playTone(740, 0.15);
    contactForm.reset();
    closeModal();
  });

  // ================= 12. COMMAND PALETTE (⌘K / CTRL+K) =================
  const cmdModal = document.getElementById('cmdModal');
  const cmdPaletteBtn = document.getElementById('cmdPaletteBtn');
  const cmdInput = document.getElementById('cmdInput');
  const cmdItems = document.querySelectorAll('.cmd-item');

  function openCmd() {
    cmdModal?.classList.add('active');
    cmdModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (cmdInput) {
      cmdInput.value = '';
      cmdInput.focus();
    }
    filterCmd('');
  }

  function closeCmd() {
    cmdModal?.classList.remove('active');
    cmdModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cmdPaletteBtn?.addEventListener('click', openCmd);

  // Atajo global teclado: ⌘K o Ctrl+K
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal?.classList.contains('active')) {
        closeCmd();
      } else {
        openCmd();
      }
    } else if (e.key === 'Escape') {
      closeCmd();
      closeModal();
    }
  });

  cmdModal?.addEventListener('click', (e) => {
    if (e.target === cmdModal) closeCmd();
  });

  function filterCmd(query) {
    const q = query.toLowerCase().trim();
    cmdItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(q) ? 'flex' : 'none';
    });
  }

  cmdInput?.addEventListener('input', (e) => {
    filterCmd(e.target.value);
  });

  // Acciones de los ítems de Command Palette
  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      const navTarget = item.getAttribute('data-nav');

      closeCmd();

      if (navTarget) {
        const targetEl = document.querySelector(navTarget);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (action === 'contact') {
        openModal();
      } else if (action === 'toggle-theme') {
        themeToggle?.click();
      } else if (action === 'toggle-sound') {
        toggleAudioBtn?.click();
      }
    });
  });

  // ================= 13. MENÚ MÓVIL =================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  mobileMenuBtn?.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  // ================= 14. SISTEMA DE TOASTS =================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? '✓' : 'ℹ';
    toast.innerHTML = `<span style="font-weight: 700; color: ${type === 'success' ? '#10b981' : 'var(--accent-primary)'};">${icon}</span> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-in 0.25s reverse forwards';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  // ================= 15. VOLVER AL INICIO =================
  document.getElementById('backToTop')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Inicialización
  updateExportedCode();
  console.log('✨ Nexus Studio Engine listo y operativo.');
});
