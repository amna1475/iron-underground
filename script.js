/* ============================================================
   Iron Underground Gym — script.js
   All interactive functionality: nav, BMI, schedule, FAQ, form
   ============================================================ */

/* ── MOBILE MENU ── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('flex');
  mobileMenu.classList.toggle('hidden', isOpen);
  mobileMenu.classList.toggle('flex',   !isOpen);
});

function closeMobileMenu() {
  mobileMenu.classList.add('hidden');
  mobileMenu.classList.remove('flex');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobileMenu();
  }
});


/* ── BACK TO TOP ── */
const backTopBtn = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backTopBtn.classList.remove('opacity-0', 'pointer-events-none');
    backTopBtn.classList.add('opacity-100');
  } else {
    backTopBtn.classList.add('opacity-0', 'pointer-events-none');
    backTopBtn.classList.remove('opacity-100');
  }
});


/* ── BMI CALCULATOR ── */
function calcBMI() {
  const height = parseFloat(document.getElementById('bmi-height').value);
  const weight = parseFloat(document.getElementById('bmi-weight').value);

  if (!height || !weight || height < 100 || weight < 30) {
    alert('Please enter a valid height (cm) and weight (kg).');
    return;
  }

  const bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);

  let category, color, tip, barPercent;

  if (bmi < 18.5) {
    category   = 'Underweight';
    color      = '#4A90D9';
    barPercent = 20;
    tip        = 'Focus on a caloric surplus and progressive strength training to build lean mass.';
  } else if (bmi < 25) {
    category   = 'Healthy Weight';
    color      = '#27AE60';
    barPercent = 45;
    tip        = 'Great baseline! Our strength programs will help you build muscle and improve body composition.';
  } else if (bmi < 30) {
    category   = 'Overweight';
    color      = '#E8912A';
    barPercent = 65;
    tip        = 'Our Iron Cardio and Hypertrophy Blueprint combo is great for body recomposition.';
  } else {
    category   = 'Obese';
    color      = '#E8152A';
    barPercent = 85;
    tip        = 'Our trainers specialize in all starting points. A free consult sets you up with the right plan.';
  }

  document.getElementById('bmi-score-val').textContent = bmi;

  const catEl = document.getElementById('bmi-cat-val');
  catEl.textContent  = category;
  catEl.style.color  = color;

  const bar = document.getElementById('bmi-bar');
  bar.style.width      = barPercent + '%';
  bar.style.background = color;

  document.getElementById('bmi-tip').textContent = tip;

  const resultEl = document.getElementById('bmi-result');
  resultEl.classList.remove('hidden');
}


/* ── SCHEDULE DATA ── */
const scheduleData = {
  mon: [
    { time: '6:00 AM',  cls: 'Powerlifting Fundamentals', trainer: 'Marcus Cole',  dur: '75 min', spots: 'Open'   },
    { time: '8:30 AM',  cls: 'Iron Cardio',               trainer: 'Priya Santos', dur: '45 min', spots: 'Open'   },
    { time: '12:00 PM', cls: 'Hypertrophy Blueprint',     trainer: 'Priya Santos', dur: '60 min', spots: '3 Left' },
    { time: '5:00 PM',  cls: 'Olympic Weightlifting',     trainer: 'Diana Reeves', dur: '90 min', spots: 'Open'   },
    { time: '6:30 PM',  cls: 'Powerlifting Fundamentals', trainer: 'Marcus Cole',  dur: '75 min', spots: 'Full'   },
  ],
  tue: [
    { time: '6:00 AM',  cls: 'Iron Cardio',               trainer: 'Andre Tatum',  dur: '45 min', spots: 'Open'   },
    { time: '9:00 AM',  cls: 'Personal Training',         trainer: 'Any',          dur: '60 min', spots: 'Book'   },
    { time: '5:30 PM',  cls: 'Hypertrophy Blueprint',     trainer: 'Priya Santos', dur: '60 min', spots: 'Open'   },
    { time: '7:00 PM',  cls: 'Powerlifting Fundamentals', trainer: 'Marcus Cole',  dur: '75 min', spots: '4 Left' },
  ],
  wed: [
    { time: '6:00 AM',  cls: 'Olympic Weightlifting',     trainer: 'Diana Reeves', dur: '90 min', spots: 'Open'   },
    { time: '10:00 AM', cls: 'Iron Cardio',               trainer: 'Andre Tatum',  dur: '45 min', spots: 'Open'   },
    { time: '5:00 PM',  cls: 'Powerlifting Fundamentals', trainer: 'Marcus Cole',  dur: '75 min', spots: '2 Left' },
    { time: '7:00 PM',  cls: 'Hypertrophy Blueprint',     trainer: 'Priya Santos', dur: '60 min', spots: 'Open'   },
  ],
  thu: [
    { time: '6:00 AM',  cls: 'Iron Cardio',               trainer: 'Priya Santos', dur: '45 min', spots: 'Open'   },
    { time: '9:00 AM',  cls: 'Hypertrophy Blueprint',     trainer: 'Priya Santos', dur: '60 min', spots: 'Open'   },
    { time: '5:30 PM',  cls: 'Olympic Weightlifting',     trainer: 'Diana Reeves', dur: '90 min', spots: '5 Left' },
    { time: '7:00 PM',  cls: 'Powerlifting Fundamentals', trainer: 'Marcus Cole',  dur: '75 min', spots: 'Open'   },
  ],
  fri: [
    { time: '5:30 AM',  cls: 'Powerlifting Fundamentals', trainer: 'Marcus Cole',  dur: '75 min', spots: 'Open'   },
    { time: '8:00 AM',  cls: 'Iron Cardio',               trainer: 'Andre Tatum',  dur: '45 min', spots: 'Open'   },
    { time: '12:00 PM', cls: 'Personal Training',         trainer: 'Any',          dur: '60 min', spots: 'Book'   },
    { time: '5:30 PM',  cls: 'Hypertrophy Blueprint',     trainer: 'Priya Santos', dur: '60 min', spots: '1 Left' },
  ],
  sat: [
    { time: '8:00 AM',  cls: 'Strongman Saturday',        trainer: 'Andre Tatum',  dur: '2 hrs',  spots: 'Open'   },
    { time: '10:30 AM', cls: 'Powerlifting Fundamentals', trainer: 'Marcus Cole',  dur: '75 min', spots: 'Open'   },
    { time: '1:00 PM',  cls: 'Olympic Weightlifting',     trainer: 'Diana Reeves', dur: '90 min', spots: 'Open'   },
    { time: '3:00 PM',  cls: 'Iron Cardio',               trainer: 'Priya Santos', dur: '45 min', spots: 'Open'   },
  ],
  sun: [
    { time: '9:00 AM',  cls: 'Hypertrophy Blueprint',     trainer: 'Priya Santos', dur: '60 min', spots: 'Open' },
    { time: '11:00 AM', cls: 'Open Gym / Free Training',  trainer: '—',            dur: '—',      spots: 'Open' },
  ],
};

// Render schedule for a given day key
function renderSchedule(day) {
  const rows = scheduleData[day];
  const tbody = document.getElementById('schedule-body');

  tbody.innerHTML = rows.map(row => `
    <tr>
      <td>${row.time}</td>
      <td>${row.cls}</td>
      <td>${row.trainer}</td>
      <td>${row.dur}</td>
      <td><span class="sched-badge">${row.spots}</span></td>
    </tr>
  `).join('');
}

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSchedule(btn.dataset.day);
  });
});

// Load Monday by default on page ready
renderSchedule('mon');


/* ── FAQ ACCORDION ── */
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

  // Open clicked if it was closed
  if (!isOpen) {
    item.classList.add('open');
  }
}


/* ── CONTACT FORM ── */
function submitForm(e) {
  e.preventDefault();

  const successEl = document.getElementById('form-success');
  successEl.classList.remove('hidden');
  e.target.reset();

  // Hide message after 5 seconds
  setTimeout(() => {
    successEl.classList.add('hidden');
  }, 5000);
}

const reveals = document.querySelectorAll(".reveal");

function revealSections() {

    reveals.forEach((section) => {

        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 120;

        if (sectionTop < triggerPoint) {
            section.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);