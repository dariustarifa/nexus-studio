/**
 * MORÍ SOÑANDO — SPECIALTY COFFEE & PANCAKES (GRANADA)
 * Mobile App Interaction Engine & Real-Time Translations
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================= 1. DICCIONARIO DE IDIOMAS (ES / EN) =================
  const translations = {
    es: {
      reviews: "Reseñas",
      cat_pancakes: "Pancakes",
      cat_coffee: "Café de Finca",
      cat_brunch: "Brunch & Salados",
      cat_drinks: "Bebidas",
      pancakes_title: "Pancakes de Autor",
      pancakes_sub: "Masa batida a mano cada mañana. Servidos calientes en torres de 3 pisos esponjosos.",
      pancake1_name: "Nutella & Avellana Tostada",
      pancake1_desc: "Tres pancakes suflé, ganache templada de Nutella artesanal, avellanas garrapiñadas de la comarca, plátano flameado y cacao puro.",
      pancake2_name: "Matcha Ceremonial & Choco Blanco",
      pancake2_desc: "Infusión de té matcha japonés grado ceremonial en la masa, baño de chocolate blanco templado, frambuesas ácidas y ralladura de lima.",
      pancake3_name: "Caramelo Salado & Nuez Pecana",
      pancake3_desc: "Toffee casero con mantequilla de pasto y sal marina virgen, nueces pecanas tostadas al romero y quenelle de mantequilla batida.",
      pancake4_name: "Frutos Silvestres & Ricotta Limón",
      pancake4_desc: "Compota artesana de arándanos y moras reducida a fuego lento, crema fresca de ricotta con limón de la Vega y sirope de arce Grado A.",
      pancake5_name: "El Clásico Americano Fluffy",
      pancake5_desc: "La receta original. Tres pisos dorados con dados de mantequilla artesana fundente, jarrita de sirope de arce canadiense puro 100% y escamas de sal.",
      coffee_title: "Café de Especialidad",
      coffee_sub: "Granos de origen ético, tueste medio y leche fresca de granja ecológica andaluza (opción vegetal sin coste).",
      coffee1_name: "Flat White",
      coffee1_desc: "Doble shot de espresso de finca con leche emulsionada en micro-espuma sedosa a 62°C. Notas a toffee y avellana.",
      coffee2_name: "Cold Brew Infusión 18h",
      coffee2_desc: "Extracción en frío gota a gota durante 18 horas. Cuerpo aterciopelado, acidez vinosa baja y notas a cacao y piel de naranja. Servido sobre roca de hielo.",
      coffee3_name: "Iced Pistachio Latte",
      coffee3_desc: "Espresso doble de origen etíope sobre leche de avena bio, crema pura de pistacho de Sicilia y escamas crujientes de pistacho tostado.",
      coffee4_name: "Espresso Doble Origen Único",
      coffee4_desc: "Extracción precisa a 9 bar en cafetera de palanca. Crema dorada atigrada, notas a jazmín y final dulce de caña de azúcar.",
      brunch_title: "Brunch & Salados",
      brunch_sub: "Huevos de granja ecológica local y pan brioche artesano de masa madre.",
      brunch1_name: "Pancake Salado Bacon & Huevo",
      brunch1_desc: "Dos pancakes esponjosos, bacon curado crujiente, huevo poché con yema líquida y baño de sirope de arce infusionado con chili suave.",
      drinks_title: "Bebidas de la Casa",
      drinks_sub: "El alma caribeña y andaluza que da nombre a nuestro espacio.",
      drink1_name: "Morisoñando Tradicional",
      drink1_desc: "Zumo de naranja valenciana recién exprimido batido en frío con leche evaporada, vainilla pura de Madagascar y hielo picado. La bebida que te hace soñar despierto.",
      drink2_name: "Matcha Latte Uji Orgánico",
      drink2_desc: "Té verde matcha japonés molido en piedra en Kioto, batido artesanalmente con batidor de bambú chasen y leche emulsionada.",
      about_kicker: "Granada · Moral de la Magdalena",
      about_title: "Un refugio para desayunar sin prisas.",
      story_p1: "Morí Soñando nació en el corazón de Granada con una obsesión sencilla: traer la alegría del auténtico brunch y los mejores pancakes esponjosos, fusionados con café de especialidad de micro-lotes andaluces.",
      story_p2: "Nuestro nombre rinde homenaje a la mítica bebida dominicana 'Morir Soñando': ese momento exacto en el que pruebas algo tan rico que te transporta. En Calle Moral de la Magdalena 3 no usamos mezclas prefabricadas. La masa de los pancakes se bate a mano con harina ecológica cada mañana.",
      m1_title: "Pancakes Suflé",
      m1_desc: "Aireados, esponjosos y cocinados a la plancha en el momento. Nunca recalentados.",
      m2_title: "Café Ético",
      m2_desc: "100% Arábica de especialidad trazable desde la finca hasta tu taza.",
      m3_title: "Ingredientes Reales",
      m3_desc: "Huevos camperos, fruta fresca del día y sirope de arce canadiense puro.",
      cta_heading: "¿Listo para probar los mejores pancakes de Granada?",
      cta_sub: "Explora nuestra carta completa y elige tu mesa.",
      cta_btn: "Ver la Carta Completa",
      address_label: "Dirección",
      hours_label: "Horario de Cocina",
      reviews_count: "Puntuación media en Google Maps (+340 opiniones)",
      tray_empty: "Tu selección",
      tray_empty_msg: "No has añadido productos aún. Pulsa en '+ Añadir' en cualquier pancake o café.",
      sheet_title: "Tu Selección en Mesa",
      total_label: "Total Estimado",
      confirm_btn: "Pedir al Camarero / Copiar",
      nav_menu: "Carta",
      nav_about: "Nosotros",
      nav_reviews: "Opiniones",
      nav_map: "Cómo Llegar"
    },
    en: {
      reviews: "Reviews",
      cat_pancakes: "Pancakes",
      cat_coffee: "Specialty Coffee",
      cat_brunch: "Brunch & Savory",
      cat_drinks: "House Drinks",
      pancakes_title: "Artisanal Pancakes",
      pancakes_sub: "Hand-whipped batter fresh every morning. Served hot in fluffy 3-tier stacks.",
      pancake1_name: "Nutella & Toasted Hazelnut",
      pancake1_desc: "Three soufflé pancakes, warm artisanal Nutella ganache, local roasted candied hazelnuts, caramelized banana, and raw cocoa.",
      pancake2_name: "Ceremonial Matcha & White Choco",
      pancake2_desc: "Japanese ceremonial-grade matcha tea infused into the batter, warm white chocolate drizzle, tart raspberries, and fresh lime zest.",
      pancake3_name: "Salted Caramel & Rosemary Pecan",
      pancake3_desc: "House-made grass-fed butter toffee with virgin sea salt flakes, rosemary toasted pecans, and whipped sweet cream butter quenelle.",
      pancake4_name: "Wild Forest Berries & Lemon Ricotta",
      pancake4_desc: "Slow-simmered blueberry and blackberry compote, fresh local ricotta cream with organic lemon zest, and Grade-A maple syrup.",
      pancake5_name: "The Classic American Fluffy",
      pancake5_desc: "The mother recipe. Three golden fluffy tiers with melting golden butter cubes, pure 100% Canadian maple syrup, and Maldon salt.",
      coffee_title: "Specialty Coffee",
      coffee_sub: "Ethically sourced beans, medium roast, and fresh organic milk from local Andalusian farms (free plant-based options).",
      coffee1_name: "Flat White",
      coffee1_desc: "Double single-origin espresso with silky micro-foamed milk steamed to 62°C. Sweet notes of toffee and hazelnut.",
      coffee2_name: "18-Hour Cold Brew",
      coffee2_desc: "Slow drip cold-steeped for 18 hours. Velvety body, low acidity, notes of dark cocoa and orange peel. Served over hand-cut ice.",
      coffee3_name: "Iced Pistachio Latte",
      coffee3_desc: "Ethiopian espresso over organic oat milk, pure Sicilian pistachio cream, and crunchy toasted pistachio crumble.",
      coffee4_name: "Single-Origin Double Espresso",
      coffee4_desc: "Precision 9-bar extraction on lever machine. Tiger-striped golden crema, jasmine floral aroma, and sweet cane sugar finish.",
      brunch_title: "Brunch & Savory",
      brunch_sub: "Free-range local organic eggs and artisanal sourdough brioche.",
      brunch1_name: "Savory Bacon & Poached Egg Pancake",
      brunch1_desc: "Two fluffy pancakes, applewood smoked crispy bacon, runny poached egg, and mild chili-infused warm maple syrup.",
      drinks_title: "House Signature Drinks",
      drinks_sub: "The Caribbean and Andalusian soul that names our space.",
      drink1_name: "Traditional Morisoñando",
      drink1_desc: "Freshly squeezed Valencia orange juice cold-whipped with evaporated milk, Madagascar vanilla, and crushed ice. The drink of sweet dreams.",
      drink2_name: "Organic Uji Matcha Latte",
      drink2_desc: "Stone-ground Japanese green matcha from Kyoto, hand-whisked with bamboo chasen and velvety steamed milk.",
      about_kicker: "Granada · Moral de la Magdalena",
      about_title: "A sanctuary for unhurried mornings.",
      story_p1: "Morí Soñando was born in the heart of Granada with a simple conviction: bringing the joy of authentic brunch and the fluffiest pancakes together with ethical micro-lot coffee.",
      story_p2: "Our name honors the Dominican classic 'Morir Soñando'—that exact moment when something tastes so sublime you drift away. At Calle Moral de la Magdalena 3, we never use pre-made mixes. Batter is whipped by hand with organic flour every single morning.",
      m1_title: "Soufflé Pancakes",
      m1_desc: "Airy, golden, and grilled fresh to order. Never reheated.",
      m2_title: "Ethical Coffee",
      m2_desc: "100% Specialty Arabica traceable from farm to cup.",
      m3_title: "Real Ingredients",
      m3_desc: "Free-range eggs, fresh seasonal fruit, and pure Canadian maple syrup.",
      cta_heading: "Ready for the best pancakes in Granada?",
      cta_sub: "Explore our full menu and claim your table.",
      cta_btn: "View Full Menu",
      address_label: "Address",
      hours_label: "Kitchen Hours",
      reviews_count: "Average score on Google Maps (+340 reviews)",
      tray_empty: "Your selection",
      tray_empty_msg: "No items added yet. Tap '+ Add' on any pancake or coffee.",
      sheet_title: "Your Table Selection",
      total_label: "Estimated Total",
      confirm_btn: "Order with Server / Copy",
      nav_menu: "Menu",
      nav_about: "About",
      nav_reviews: "Reviews",
      nav_map: "Find Us"
    }
  };

  let currentLang = 'es';

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

    // Actualizar botones de añadir
    document.querySelectorAll('.btn-add-item span').forEach(span => {
      span.textContent = lang === 'es' ? '+ Añadir' : '+ Add';
    });
  }

  document.getElementById('langSwitch')?.addEventListener('click', () => {
    const nextLang = currentLang === 'es' ? 'en' : 'es';
    applyLanguage(nextLang);
    playTactileSound(480, 0.04);
  });

  // ================= 2. ENTRADA DESDE EL LAUNCH SCREEN =================
  const btnEnter = document.getElementById('btnEnter');
  const appHeader = document.getElementById('appHeader');

  btnEnter?.addEventListener('click', () => {
    playTactileSound(580, 0.05);
    appHeader?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('logoToTop')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ================= 3. NAVEGACIÓN INFERIOR (TABS) =================
  const tabItems = document.querySelectorAll('.tab-item[data-nav]');
  const viewSections = document.querySelectorAll('.view-section');

  tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-nav');
      if (!targetId) return;

      tabItems.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      viewSections.forEach(sec => {
        sec.classList.remove('active');
        sec.hidden = true;
      });

      const activeSec = document.getElementById(targetId);
      if (activeSec) {
        activeSec.classList.add('active');
        activeSec.hidden = false;
        appHeader?.scrollIntoView({ behavior: 'smooth' });
      }

      playTactileSound(440, 0.04);
    });
  });

  // Botón CTA gigante en la sección Nosotros
  document.getElementById('btnGoToMenu')?.addEventListener('click', () => {
    const menuTab = document.querySelector('.tab-item[data-nav="viewMenu"]');
    menuTab?.click();
  });

  // ================= 4. PESTAÑAS DE CATEGORÍA =================
  const categoryTabs = document.querySelectorAll('.menu-tab');
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.getAttribute('data-cat');
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetBlock = document.querySelector(`.category-block[data-section="${cat}"]`);
      if (targetBlock) {
        const offset = 120;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetBlock.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

      playTactileSound(460, 0.03);
    });
  });

  // ================= 5. BANDEJA DE PEDIDO & BOTTOM SHEET =================
  let order = [];
  const orderTray = document.getElementById('orderTray');
  const trayCount = document.getElementById('trayCount');
  const trayTotal = document.getElementById('trayTotal');
  const orderSheetOverlay = document.getElementById('orderSheetOverlay');
  const orderSheet = document.getElementById('orderSheet');
  const sheetItemsList = document.getElementById('sheetItemsList');
  const sheetTotalVal = document.getElementById('sheetTotalVal');

  function updateOrderDisplay() {
    const totalCount = order.length;
    const totalPrice = order.reduce((sum, item) => sum + item.price, 0);

    if (trayCount) trayCount.textContent = totalCount;
    if (trayTotal) trayTotal.textContent = `${totalPrice.toFixed(2).replace('.', ',')} €`;
    if (sheetTotalVal) sheetTotalVal.textContent = `${totalPrice.toFixed(2).replace('.', ',')} €`;

    if (totalCount > 0) {
      orderTray?.classList.add('active');
    } else {
      orderTray?.classList.remove('active');
      closeSheet();
    }

    renderSheetItems();
  }

  function renderSheetItems() {
    if (!sheetItemsList) return;
    if (order.length === 0) {
      sheetItemsList.innerHTML = `<p class="empty-tray-msg">${translations[currentLang].tray_empty_msg}</p>`;
      return;
    }

    sheetItemsList.innerHTML = '';
    order.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'sheet-row';
      row.innerHTML = `
        <span class="sheet-row-name">${item.name}</span>
        <div class="sheet-row-right">
          <span class="sheet-row-price">${item.price.toFixed(2).replace('.', ',')} €</span>
          <button class="sheet-remove-btn" data-index="${index}" aria-label="Eliminar">✕</button>
        </div>
      `;

      row.querySelector('.sheet-remove-btn')?.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        order.splice(idx, 1);
        updateOrderDisplay();
        playTactileSound(320, 0.04);
      });

      sheetItemsList.appendChild(row);
    });
  }

  // Añadir productos
  document.querySelectorAll('.btn-add-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = e.currentTarget.getAttribute('data-name');
      const price = parseFloat(e.currentTarget.getAttribute('data-price') || '0');

      order.push({ name, price });
      updateOrderDisplay();
      playTactileSound(620, 0.06);

      // Feedback háptico en móvil si está soportado
      if (navigator.vibrate) navigator.vibrate(12);

      showMiniToast(`${name} añadido a tu mesa`);
    });
  });

  // Abrir y cerrar Bottom Sheet
  document.getElementById('trayPill')?.addEventListener('click', () => {
    orderSheetOverlay?.classList.add('open');
    playTactileSound(500, 0.04);
  });

  function closeSheet() {
    orderSheetOverlay?.classList.remove('open');
  }

  document.getElementById('sheetCloseBtn')?.addEventListener('click', closeSheet);
  orderSheetOverlay?.addEventListener('click', (e) => {
    if (e.target === orderSheetOverlay) closeSheet();
  });

  // Confirmar y copiar pedido
  document.getElementById('btnConfirmOrder')?.addEventListener('click', () => {
    if (order.length === 0) return;
    const summary = order.map(i => `• ${i.name} (${i.price.toFixed(2)}€)`).join('\n');
    const total = order.reduce((s, i) => s + i.price, 0).toFixed(2);
    const textToCopy = `Morí Soñando (Mesa):\n${summary}\nTotal: ${total} €`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      showMiniToast('¡Pedido copiado! Puedes mostrárselo al camarero o enviarlo.');
      playTactileSound(720, 0.08);
      closeSheet();
    });
  });

  // ================= 6. NOTIFICACIONES MINI-TOAST =================
  const toastSink = document.getElementById('toastSink');
  function showMiniToast(msg) {
    if (!toastSink) return;
    const t = document.createElement('div');
    t.className = 'mini-toast';
    t.innerHTML = `<span>🥞</span> <span>${msg}</span>`;
    toastSink.appendChild(t);

    setTimeout(() => {
      t.style.animation = 'toast-in 150ms reverse forwards';
      setTimeout(() => t.remove(), 160);
    }, 2400);
  }

  // ================= 7. MOTOR DE SONIDO TÁCTIL (WEB AUDIO API) =================
  let audioContext = null;
  function playTactileSound(freq = 520, duration = 0.04) {
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContext.state === 'suspended') audioContext.resume();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      gain.gain.setValueAtTime(0.03, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {}
  }

  console.log('✨ Morí Soñando Mobile App initialized with Fontshare typography.');
});
