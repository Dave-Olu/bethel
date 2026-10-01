const BLI_WHATSAPP = '2348166330072';

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const form = document.getElementById('regForm');
const confirmPanel = document.getElementById('confirmPanel');
const refCode = document.getElementById('refCode');
const whatsappHandoff = document.getElementById('whatsappHandoff');

const clearFieldError = (field) => {
  const wrapper = field.closest('.field');
  if (!wrapper) return;
  wrapper.classList.remove('invalid');
  wrapper.querySelector('.field-error')?.remove();
  field.removeAttribute('aria-invalid');
};

const setFieldError = (field, message) => {
  const wrapper = field.closest('.field');
  if (!wrapper) return;
  clearFieldError(field);
  wrapper.classList.add('invalid');
  field.setAttribute('aria-invalid', 'true');
  const error = document.createElement('p');
  error.className = 'field-error';
  error.textContent = message;
  wrapper.append(error);
};

if (form) {
  form.querySelectorAll('input, select').forEach((field) => {
    field.addEventListener('input', () => clearFieldError(field));
    field.addEventListener('change', () => clearFieldError(field));
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    form.querySelectorAll('input, select').forEach(clearFieldError);

    const fullName = document.getElementById('fullName').value.trim();
    const age = document.getElementById('age').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const guardianName = document.getElementById('guardianName').value.trim();
    const guardianPhone = document.getElementById('guardianPhone').value.trim();
    const program = document.getElementById('program').value;
    const schedule = document.querySelector('input[name="schedule"]:checked')?.value || 'Not specified';
    const experience = document.getElementById('experience').value;
    const referral = document.getElementById('referral').value;

    const fields = {
      fullName: document.getElementById('fullName'),
      age: document.getElementById('age'),
      email: document.getElementById('email'),
      phone: document.getElementById('phone'),
      guardianName: document.getElementById('guardianName'),
      guardianPhone: document.getElementById('guardianPhone'),
      program: document.getElementById('program')
    };
    const errors = [];
    const addError = (field, message) => {
      setFieldError(field, message);
      errors.push(field);
    };

    if (fullName.length < 2) addError(fields.fullName, 'Please enter your full name.');
    if (!age || Number(age) < 8 || Number(age) > 99) addError(fields.age, 'Enter an age between 8 and 99.');
    if (!fields.email.validity.valid) addError(fields.email, 'Enter a valid email address.');
    if (!/^\+?[0-9\s()-]{7,20}$/.test(phone)) addError(fields.phone, 'Enter a valid phone or WhatsApp number.');
    if (!program) addError(fields.program, 'Please select a program.');
    if (Number(age) < 18 && !guardianName) addError(fields.guardianName, 'Guardian name is required for applicants under 18.');
    if (Number(age) < 18 && !guardianPhone) addError(fields.guardianPhone, 'Guardian phone is required for applicants under 18.');
    if (guardianName && !guardianPhone) addError(fields.guardianPhone, 'Please add the guardian phone number.');
    if (guardianPhone && !/^\+?[0-9\s()-]{7,20}$/.test(guardianPhone)) addError(fields.guardianPhone, 'Enter a valid guardian phone number.');

    if (errors.length) {
      errors[0].focus();
      return;
    }

    const code = 'BLI-' + Math.floor(100000 + Math.random() * 900000);

    const guardian = guardianName
      ? `Guardian: ${guardianName} | ${guardianPhone || 'no number given'}`
      : 'Guardian: N/A (adult applicant)';

    const msg =
      `*New BLI Enrollment — ${code}*\n\n` +
      `*Name:* ${fullName}\n` +
      `*Age:* ${age}\n` +
      `*Email:* ${email}\n` +
      `*Phone/WhatsApp:* ${phone}\n` +
      `*${guardian}*\n\n` +
      `*Program:* ${program}\n` +
      `*Schedule:* ${schedule}\n` +
      `*Experience:* ${experience}\n` +
      `*Referral:* ${referral}\n\n` +
      `_Reference: ${code}_`;

    const waURL = `https://wa.me/${BLI_WHATSAPP}?text=${encodeURIComponent(msg)}`;
    if (whatsappHandoff) whatsappHandoff.href = waURL;
    refCode.textContent = code;

    form.classList.add('hide');
    confirmPanel.classList.add('show');
    confirmPanel.querySelector('h3')?.focus();
  });
}
