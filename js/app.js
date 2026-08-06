const loader = document.querySelector('.loader');
const loaderBar = document.querySelector('.loader-bar');
const loaderText = document.querySelector('.loader-text');
const cursorFollower = document.querySelector('.cursor-follower');
const progressBar = document.querySelector('.scroll-progress');
const header = document.querySelector('.header');
const cards = document.querySelectorAll('.vehicle-card, .feature-card, .tech-card, .gallery-card, .stat-card, .btn');
const mobileToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');

function animateLoader() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 16;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    loaderBar.style.width = `${progress}%`;
    loaderText.textContent = `Loading ${Math.round(progress)}%`;
    if (progress === 100) {
      setTimeout(() => loader.classList.add('hidden'), 400);
    }
  }, 70);
}

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  header.classList.toggle('scrolled', scrollTop > 16);
}

function createParticleField() {
  for (let i = 0; i < 28; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    document.body.appendChild(particle);
  }
}

function addRipple(event) {
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const rect = event.currentTarget.getBoundingClientRect();
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  ripple.style.width = `${Math.max(rect.width, rect.height)}px`;
  ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
  event.currentTarget.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach((button) => {
    button.addEventListener('mousemove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      button.style.transform = `translate(${(x - rect.width / 2) / 14}px, ${(y - rect.height / 2) / 14}px)`;
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
}

function initTilt() {
  cards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function initCategorySwitcher() {
  const buttons = document.querySelectorAll('.category-switcher button');
  const vehicles = document.querySelectorAll('.vehicle-card');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.category;
      vehicles.forEach((vehicle) => {
        const show = filter === 'all' || vehicle.dataset.category === filter;
        vehicle.classList.toggle('is-hidden', !show);
      });
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      const end = Number(target.dataset.count);
      let value = 0;
      const duration = 1400;
      const startTime = performance.now();
      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        value = Math.floor(progress * end);
        target.textContent = `${value}${target.dataset.suffix || ''}`;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      observer.unobserve(target);
    });
  }, { threshold: 0.6 });
  counters.forEach((counter) => observer.observe(counter));
}

function initGallery() {
  const modal = document.querySelector('.modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalDescription = document.getElementById('modal-description');
  const modalGalleryOne = document.getElementById('modal-gallery-one');
  const modalGalleryTwo = document.getElementById('modal-gallery-two');
  const modalEngine = document.getElementById('modal-engine');
  const modalTransmission = document.getElementById('modal-transmission');
  const modalFuel = document.getElementById('modal-fuel');
  const modalMileage = document.getElementById('modal-mileage');
  const modalSafety = document.getElementById('modal-safety');
  const modalTech = document.getElementById('modal-tech');
  const modalColors = document.getElementById('modal-colors');
  const modalEmi = document.getElementById('modal-emi');
  const closeBtn = document.querySelector('.modal-close');
  const dataSet = {
    creta: { title: 'Creta', price: '₹10.99 Lakh', description: 'A premium SUV with sculpted stance, connected comfort and elevated family space.', image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80', galleryOne: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80', galleryTwo: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=900&q=80', engine: '1.5L Turbo', transmission: '6-speed MT / 7DCT', fuel: 'Petrol / Diesel', mileage: '17.4 - 21.1 km/l', safety: 'ADAS + 6 Airbags', tech: 'Panoramic display', colors: 'Titan Grey / Starry Night', emi: '₹18,500/mo*' },
    alcazar: { title: 'Alcazar', price: '₹17.80 Lakh', description: 'A commanding three-row SUV that blends luxurious space with premium detailing.', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80', galleryOne: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80', galleryTwo: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80', engine: '2.0L Diesel', transmission: '6-speed AT', fuel: 'Diesel', mileage: '14.5 km/l', safety: 'Blind View Monitor', tech: 'Dual 10.25" screens', colors: 'Atlas White / Ranger Khaki', emi: '₹30,500/mo*' },
    venue: { title: 'Venue', price: '₹7.94 Lakh', description: 'An urban compact SUV with expressive design and seamless everyday convenience.', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80', galleryOne: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80', galleryTwo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80', engine: '1.2L Kappa', transmission: 'IVT / 5-speed MT', fuel: 'Petrol', mileage: '17.5 km/l', safety: '6 Airbags', tech: 'BlueLink + Voice', colors: 'Polar White / Denim Blue', emi: '₹13,500/mo*' },
    verna: { title: 'Verna', price: '₹11.07 Lakh', description: 'A premium sedan with elegant linework, refined comfort and strong performance.', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80', galleryOne: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80', galleryTwo: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80', engine: '1.5L Petrol', transmission: '6-speed MT / 7DCT', fuel: 'Petrol', mileage: '18.0 km/l', safety: '6 Airbags + TPMS', tech: 'Digital cluster', colors: 'Atlas White / Black', emi: '₹18,800/mo*' },
    aura: { title: 'Aura', price: '₹6.54 Lakh', description: 'An intelligent compact sedan built for streamlined city elegance and practicality.', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80', galleryOne: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80', galleryTwo: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80', engine: '1.2L Petrol', transmission: '5-speed MT / AMT', fuel: 'Petrol', mileage: '20.5 km/l', safety: 'Dual Airbags', tech: 'Smart infotainment', colors: 'Typhoon Silver / Black', emi: '₹11,200/mo*' },
    ioniq5: { title: 'IONIQ 5', price: '₹45.95 Lakh', description: 'A futuristic EV with fast charging, lounge-like comfort and standout design.', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80', galleryOne: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80', galleryTwo: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=900&q=80', engine: 'Rear / AWD Electric', transmission: 'Single-speed', fuel: 'Electric', mileage: '631 km', safety: 'Level 2 ADAS', tech: 'Ultra-fast charging', colors: 'Gravity Gold / Galactic Grey', emi: '₹76,000/mo*' }
  };
  document.querySelectorAll('.vehicle-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('.btn')) return;
      const key = card.dataset.model;
      const item = dataSet[key];
      if (!item) return;
      modalImage.src = item.image;
      modalTitle.textContent = item.title;
      modalPrice.textContent = item.price;
      modalDescription.textContent = item.description;
      modalGalleryOne.src = item.galleryOne;
      modalGalleryTwo.src = item.galleryTwo;
      modalEngine.textContent = item.engine;
      modalTransmission.textContent = item.transmission;
      modalFuel.textContent = item.fuel;
      modalMileage.textContent = item.mileage;
      modalSafety.textContent = item.safety;
      modalTech.textContent = item.tech;
      modalColors.textContent = item.colors;
      modalEmi.textContent = item.emi;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  });
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

function initMobileNav() {
  if (!mobileToggle || !navLinks) return;
  mobileToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    mobileToggle.classList.toggle('active', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('mousemove', (event) => {
  cursorFollower.style.left = `${event.clientX}px`;
  cursorFollower.style.top = `${event.clientY}px`;
});

document.addEventListener('mousedown', () => cursorFollower.classList.add('active'));
document.addEventListener('mouseup', () => cursorFollower.classList.remove('active'));

document.querySelectorAll('.btn, .magnetic, .gallery-card, .vehicle-card, .feature-card, .tech-card').forEach((element) => {
  element.addEventListener('click', addRipple);
});

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('load', () => {
  animateLoader();
  createParticleField();
  initMagnetic();
  initTilt();
  initCategorySwitcher();
  initCounters();
  initGallery();
  initMobileNav();
  updateScrollProgress();
  document.querySelectorAll('.hero-copy, .hero-panel, .reveal').forEach((el) => {
    el.style.opacity = '';
    el.style.transform = '';
  });
});
