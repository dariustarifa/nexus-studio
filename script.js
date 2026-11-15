/**
 * MORÍ SOÑANDO — SPECIALTY COFFEE & PANCAKES (GRANADA)
 * Horizontal Spaces Navigation Engine & Fontshare Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================= 1. NAVEGACIÓN HORIZONTAL ENTRE ESPACIOS =================
  const slider = document.getElementById('horizontalSlider');
  const spaceTabs = document.querySelectorAll('.space-tab');
  const spacesTrack = document.getElementById('spacesTrack');
  const panes = document.querySelectorAll('.space-pane');

  function getPaneWidth() {
    return slider ? slider.offsetWidth : window.innerWidth;
  }

  // Clic en pestaña superior -> Desplazamiento horizontal fluido
  spaceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const index = parseInt(tab.getAttribute('data-index') || '0', 10);
      const width = getPaneWidth();

      slider?.scrollTo({
        left: index * width,
        behavior: 'smooth'
      });

      setActiveTab(index);
      playHapticTone(520, 0.04);
    });
  });

  function setActiveTab(index) {
    spaceTabs.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });

    // Asegurar que la pestaña activa queda visible en la barra superior
    const activeTab = spaceTabs[index];
    if (activeTab && spacesTrack) {
      const trackRect = spacesTrack.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      if (tabRect.left < trackRect.left || tabRect.right > trackRect.right) {
        activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }

  // Detección de arrastre táctil horizontal para sincronizar la pestaña superior
  let scrollTimeout = null;
  slider?.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const width = getPaneWidth();
      const currentScroll = slider.scrollLeft;
      const activeIndex = Math.round(currentScroll / width);
      setActiveTab(activeIndex);
    }, 40);
  }, { passive: true });

  // Botón logo -> vuelve al primer espacio (Pancakes)
  document.getElementById('brandHomeBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    slider?.scrollTo({ left: 0, behavior: 'smooth' });
    setActiveTab(0);
  });

  // ================= 2. DICCIONARIO DE IDIOMAS (ES / EN) =================
  const translations = {
    es: {
      reviews: "Google",
      tab_pancakes: "Pancakes",
      tab_coffee: "Café de Finca",
      tab_brunch: "Salados",
      tab_drinks: "Bebidas",
      tab_about: "Nosotros",
      pancakes_eyebrow: "01 / Especialidad Artesanal",
      pancakes_title: "Pancakes de Autor",
      pancakes_sub: "Masa batida a mano cada mañana con harina ecológica. Torres suflé de tres pisos cocinadas al momento.",
      p1_name: "Nutella & Avellana Tostada",
      p1_desc: "Ganache templada de Nutella artesanal, avellanas garrapiñadas de Granada, plátano flameado y lluvia de cacao puro.",
      p2_name: "Matcha Ceremonial & Choco Blanco",
      p2_desc: "Té matcha japonés grado ceremonial en la masa, baño de chocolate blanco templado, frambuesas frescas y ralladura de lima.",
      p3_name: "Caramelo Salado & Nuez Pecana",
      p3_desc: "Toffee casero con mantequilla de pasto y sal marina virgen, nueces pecanas tostadas al romero y quenelle de mantequilla batida.",
      p4_name: "Frutos Silvestres & Ricotta Limón",
      p4_desc: "Compota casera de arándanos y moras reducidas a fuego lento, crema fresca de ricotta con limón de la Vega y sirope de arce Grado A.",
      p5_name: "El Clásico Americano Fluffy",
      p5_desc: "La receta madre. Tres pisos dorados con mantequilla artesana fundente, jarrita de sirope de arce canadiense 100% puro y escamas de sal.",
      coffee_eyebrow: "02 / Tueste y Extracción",
      coffee_title: "Café de Especialidad",
      coffee_sub: "Granos de finca 100% arábica tostados en Andalucía, leche fresca de granja ecológica o bebida vegetal de avena bio.",
      c1_name: "Flat White",
      c1_desc: "Doble espresso de origen con leche emulsionada en micro-espuma sedosa a 62°C. Notas a toffee y avellana.",
      c2_name: "Cold Brew Infusión 18h",
      c2_desc: "Extracción en frío gota a gota durante 18 horas. Cuerpo aterciopelado, acidez vinosa suave y notas a cacao y piel de naranja.",
      c3_name: "Iced Pistachio Latte",
      c3_desc: "Espresso doble sobre leche de avena bio, crema pura de pistacho de Sicilia y escamas crujientes de pistacho tostado.",
      c4_name: "Espresso Doble Origen Único",
      c4_desc: "Extracción precisa a 9 bar en cafetera de palanca. Crema dorada atigrada, notas a jazmín y final dulce de caña de azúcar.",
      brunch_eyebrow: "03 / Brunch Salado",
      brunch_title: "Brunch & Salados",
      brunch_sub: "Huevos ecológicos de granja andaluza y toques salados que combinan a la perfección con nuestro café.",
      b1_name: "Pancake Salado Bacon & Huevo",
      b1_desc: "Dos pancakes esponjosos, bacon curado crujiente al manzano, huevo poché con yema líquida y sirope de arce infusionado con chili suave.",
      drinks_eyebrow: "04 / Tradición",
      drinks_title: "Bebidas de la Casa",
      drinks_sub: "El alma caribeña y andaluza que da nombre a nuestro espacio en Granada.",
      d1_name: "Morisoñando Tradicional",
      d1_desc: "Zumo de naranja recién exprimido batido en frío con leche evaporada, vainilla pura de Madagascar y hielo picado. Pura felicidad en copa.",
      d2_name: "Matcha Latte Uji Orgánico",
      d2_desc: "Té verde matcha japonés de Kioto molido en piedra, batido con batidor de bambú chasen y leche emulsionada a 60°C.",
      about_tag: "Calle Moral de la Magdalena, 3",
      about_title: "Desayunar sin prisa en Granada.",
      about_p1: "Morí Soñando nació en el corazón de Granada con una idea simple: traer la alegría del auténtico brunch y los mejores pancakes esponjosos, fusionados con café de especialidad de micro-lotes andaluces.",
      about_p2: "Sin mezclas prefabricadas, sin prisas. La masa se bate a mano con harina ecológica cada mañana y cada taza se extrae con precisión.",
      loc_address_title: "Dirección",
      loc_hours_title: "Horario",
      reviews_count: "Puntuación media en Google Maps (+340 opiniones de clientes)"
    },
    en: {
      reviews: "Google",
      tab_pancakes: "Pancakes",
      tab_coffee: "Specialty Coffee",
      tab_brunch: "Savory",
      tab_drinks: "Drinks",
      tab_about: "About Us",
      pancakes_eyebrow: "01 / Handcrafted Specialty",
      pancakes_title: "Artisanal Pancakes",
      pancakes_sub: "Hand-whipped fresh every morning with organic flour. Three-tier fluffy soufflé towers cooked to order.",
      p1_name: "Nutella & Toasted Hazelnut",
      p1_desc: "Warm artisanal Nutella ganache, local roasted candied hazelnuts, caramelized banana, and raw cocoa.",
      p2_name: "Ceremonial Matcha & White Choco",
      p2_desc: "Ceremonial Japanese matcha infused in batter, warm white chocolate drizzle, fresh raspberries, and lime zest.",
      p3_name: "Salted Caramel & Rosemary Pecan",
      p3_desc: "House-made grass-fed butter toffee with sea salt flakes, rosemary-toasted pecans, and whipped sweet butter.",
      p4_name: "Wild Forest Berries & Lemon Ricotta",
      p4_desc: "Slow-reduced blueberry and blackberry compote, fresh local ricotta cream with lemon zest, and Grade-A maple syrup.",
      p5_name: "The Classic American Fluffy",
      p5_desc: "The mother recipe. Three golden tiers with melting artisanal butter cubes, pure Canadian maple syrup, and sea salt flakes.",
      coffee_eyebrow: "02 / Roast & Extraction",
      coffee_title: "Specialty Coffee",
      coffee_sub: "100% Arabica micro-lot beans roasted in Andalusia, fresh organic local farm milk or organic oat milk.",
      c1_name: "Flat White",
      c1_desc: "Double origin espresso with silky micro-foam steamed to 62°C. Sweet notes of toffee and hazelnut.",
      c2_name: "18-Hour Cold Brew",
      c2_desc: "Slow drip cold-steeped for 18 hours. Velvety body, low acidity, notes of dark cocoa and orange peel.",
      c3_name: "Iced Pistachio Latte",
      c3_desc: "Double espresso over organic oat milk, pure Sicilian pistachio cream, and crunchy toasted pistachio crumble.",
      c4_name: "Single-Origin Double Espresso",
      c4_desc: "Precision 9-bar extraction on lever machine. Tiger-striped crema, jasmine aroma, and cane sugar finish.",
      brunch_eyebrow: "03 / Savory Brunch",
      brunch_title: "Brunch & Savory",
      brunch_sub: "Organic free-range Andalusian eggs and savory recipes that pair effortlessly with our coffee.",
      b1_name: "Savory Bacon & Poached Egg Pancake",
      b1_desc: "Two fluffy pancakes, applewood smoked crispy bacon, runny poached egg, and mild chili-infused warm maple syrup.",
      drinks_eyebrow: "04 / Tradition",
      drinks_title: "House Signature Drinks",
      drinks_sub: "The Caribbean and Andalusian soul that names our space in Granada.",
      d1_name: "Traditional Morisoñando",
      d1_desc: "Freshly squeezed Valencia orange juice cold-whipped with evaporated milk, Madagascar vanilla, and crushed ice.",
      d2_name: "Organic Uji Matcha Latte",
      d2_desc: "Stone-ground Japanese green matcha from Kyoto, hand-whisked with bamboo chasen and velvety steamed milk.",
      about_tag: "Calle Moral de la Magdalena, 3",
      about_title: "Unhurried mornings in Granada.",
      about_p1: "Morí Soñando was born in the heart of Granada with a simple conviction: bringing the joy of authentic brunch and the fluffiest pancakes together with ethical micro-lot coffee.",
      about_p2: "No pre-made mixes, no rush. Batter is hand-whipped with organic flour every morning and every shot is calibrated.",
      loc_address_title: "Address",
      loc_hours_title: "Hours",
      reviews_count: "Average score on Google Maps (+340 customer reviews)"
    }
  };

  let currentLang = 'es';
  const langSwitch = document.getElementById('langSwitch');

  function applyLanguage(lang) {
    currentLang = lang;
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('.lang-opt').forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });
  }

  langSwitch?.addEventListener('click', () => {
    const nextLang = currentLang === 'es' ? 'en' : 'es';
    applyLanguage(nextLang);
    playHapticTone(460, 0.04);
  });

  // ================= 3. AUDIO HÁPTICO SUTIL =================
  let audioContext = null;
  function playHapticTone(freq = 520, duration = 0.03) {
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContext.state === 'suspended') audioContext.resume();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      gain.gain.setValueAtTime(0.025, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {}
  }

  console.log('✨ Morí Soñando Horizontal Spaces initialized.');
});
