// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(counter => {
    const target = +counter.dataset.count;
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = target;
    }
    requestAnimationFrame(update);
  });
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) counterObserver.observe(statsBar);

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 15 + 's';
    p.style.animationDuration = (10 + Math.random() * 20) + 's';
    p.style.width = p.style.height = (1 + Math.random() * 3) + 'px';
    p.style.background = Math.random() > 0.5
      ? 'rgba(108,99,255,0.4)'
      : 'rgba(0,212,255,0.3)';
    particlesContainer.appendChild(p);
  }
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// ===== SMOOTH PAGE TRANSITIONS =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});

// ===== CURSOR SPOTLIGHT EFFECT =====
document.querySelectorAll('.spotlight-section').forEach(section => {
  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    section.style.setProperty('--mouse-x', x + '%');
    section.style.setProperty('--mouse-y', y + '%');
  });
});




// ===== TYPING EFFECT =====
const typingEl = document.querySelector('.typing-cursor');
if (typingEl) {
  const roles = [
    'Data Analyst · SQL Expert · Power BI Developer',
    'Dashboard Creator · Data Storyteller',
    'Python · Excel · Power BI Specialist'
  ];
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = false;
  let delay = 3000;

  function typeEffect() {
    const current = roles[roleIndex];
    if (!isDeleting) {
      typingEl.textContent = current.slice(0, charIndex);
      charIndex++;
      if (charIndex > current.length) {
        isDeleting = true;
        delay = 2500;
      } else {
        delay = 60;
      }
    } else {
      typingEl.textContent = current.slice(0, charIndex);
      charIndex--;
      if (charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
        delay = 400;
      } else {
        delay = 30;
      }
    }
    setTimeout(typeEffect, delay);
  }
  setTimeout(typeEffect, 3000);
}

// ===== PARTICLE NETWORK (Canvas) =====
const networkCanvas = document.getElementById('particleNetwork');
if (networkCanvas) {
  const ctx = networkCanvas.getContext('2d');
  let nodes = [];
  const NODE_COUNT = 60;
  const MAX_DIST = 150;

  function resizeNetwork() {
    const hero = networkCanvas.parentElement;
    networkCanvas.width = hero.offsetWidth;
    networkCanvas.height = hero.offsetHeight;
  }
  resizeNetwork();
  window.addEventListener('resize', resizeNetwork);

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * networkCanvas.width,
      y: Math.random() * networkCanvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: 1.5 + Math.random() * 1.5,
      color: Math.random() > 0.5 ? 'rgba(108,99,255,' : 'rgba(0,212,255,'
    });
  }

  let mouseX = -1000, mouseY = -1000;
  networkCanvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = networkCanvas.parentElement.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function drawNetwork() {
    ctx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > networkCanvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > networkCanvas.height) n.vy *= -1;
    });

    // Draw connecting lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.25;
          ctx.strokeStyle = `rgba(108,99,255,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
      // Mouse interaction lines
      const mdx = nodes[i].x - mouseX;
      const mdy = nodes[i].y - mouseY;
      const mDist = Math.sqrt(mdx*mdx + mdy*mdy);
      if (mDist < 200) {
        const alpha = (1 - mDist / 200) * 0.4;
        ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color + '0.6)';
      ctx.fill();
      // Glow
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = n.color + '0.08)';
      ctx.fill();
    });

    requestAnimationFrame(drawNetwork);
  }
  drawNetwork();
}

// ===== MATRIX CODE RAIN =====
const matrixCanvas = document.getElementById('matrixRain');
if (matrixCanvas) {
  const mCtx = matrixCanvas.getContext('2d');
  const chars = '01{}[]<>=/;:SELECT FROM WHERE JOIN GROUP BY ORDER HAVING IMPORT PANDAS NUMPY def class return'.split('');
  let columns, drops;

  function initMatrix() {
    const hero = matrixCanvas.parentElement;
    matrixCanvas.width = hero.offsetWidth;
    matrixCanvas.height = hero.offsetHeight;
    const fontSize = 12;
    columns = Math.floor(matrixCanvas.width / fontSize);
    drops = Array(columns).fill(1);
  }
  initMatrix();
  window.addEventListener('resize', initMatrix);

  function drawMatrix() {
    mCtx.fillStyle = 'rgba(10,10,26,0.08)';
    mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    mCtx.fillStyle = 'rgba(108,99,255,0.35)';
    mCtx.font = '12px "Fira Code", monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      mCtx.fillText(char, i * 12, drops[i] * 12);
      if (drops[i] * 12 > matrixCanvas.height && Math.random() > 0.98) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    setTimeout(() => requestAnimationFrame(drawMatrix), 80);
  }
  drawMatrix();
}

// ===== BINARY RAIN GENERATOR =====
const binaryContainer = document.getElementById('binaryRain');
if (binaryContainer) {
  for (let i = 0; i < 40; i++) {
    const char = document.createElement('span');
    char.className = 'binary-char';
    char.textContent = Math.random() > 0.5 ? '0' : '1';
    char.style.left = Math.random() * 100 + '%';
    char.style.animationDuration = (8 + Math.random() * 15) + 's';
    char.style.animationDelay = Math.random() * 10 + 's';
    char.style.fontSize = (0.6 + Math.random() * 0.5) + 'rem';
    binaryContainer.appendChild(char);
  }
}

// ===== ENHANCED CARD TILT WITH HOLOGRAPHIC GLARE =====
document.querySelectorAll('.glass-card').forEach(card => {
  // Add glare overlay element
  if (!card.querySelector('.card-glare')) {
    const glare = document.createElement('div');
    glare.className = 'card-glare';
    card.appendChild(glare);
  }

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) perspective(800px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
    // Update glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--glare-x', glareX + '%');
    card.style.setProperty('--glare-y', glareY + '%');
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

