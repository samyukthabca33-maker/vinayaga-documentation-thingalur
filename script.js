const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const service = String(formData.get('service') || '').trim();
  const message = String(formData.get('message') || '').trim();

  const enquiry = [
    'Hello Vinayaga Documentation,',
    '',
    `My name is ${name}.`,
    `I need help with: ${service}.`,
    message ? `Details: ${message}` : '',
    '',
    'Please let me know the next steps.'
  ].filter(Boolean).join('\n');

  formStatus.textContent = 'Your enquiry text is ready. Copy it below and send it using your preferred messaging app.';
  let preview = document.getElementById('enquiryPreview');
  if (!preview) {
    preview = document.createElement('textarea');
    preview.id = 'enquiryPreview';
    preview.readOnly = true;
    preview.rows = 6;
    preview.setAttribute('aria-label', 'Prepared enquiry message');
    preview.style.cssText = 'width:100%;margin-top:10px;padding:12px;border:1px solid #dce4eb;border-radius:4px;font:12px/1.6 monospace;color:#1a2c3f;background:#f7f9fb;';
    formStatus.insertAdjacentElement('afterend', preview);
  }
  preview.value = enquiry;

  let copyButton = document.getElementById('copyEnquiry');
  if (!copyButton) {
    copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.id = 'copyEnquiry';
    copyButton.className = 'button button-outline';
    copyButton.textContent = 'Copy enquiry';
    copyButton.style.marginTop = '10px';
    preview.insertAdjacentElement('afterend', copyButton);
  }
  copyButton.onclick = async () => {
    try {
      await navigator.clipboard.writeText(enquiry);
      copyButton.textContent = 'Copied!';
    } catch {
      preview.focus();
      preview.select();
      copyButton.textContent = 'Select and copy';
    }
  };
});
