const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
const sections = Array.from(document.querySelectorAll('.section'));
const tabs = Array.from(document.querySelectorAll('.profile-tabs .tab'));
const tabContents = Array.from(document.querySelectorAll('.profile-tabs .tab-content'));
const dropZone = document.querySelector('.drop-zone');
const themeToggle = document.getElementById('themeToggle');
let glowMode = false;

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const sectionId = button.dataset.section;
    navButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    sections.forEach((section) => {
      section.classList.toggle('active', section.id === sectionId);
      if (section.id === sectionId) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((btn) => btn.classList.toggle('active', btn === tab));
    tabContents.forEach((content) => {
      content.classList.toggle('active', content.id === tab.dataset.tab);
    });
  });
});

if (dropZone) {
  ['dragenter', 'dragover'].forEach((eventName) => {
    dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropZone.classList.add('drag-hover');
    });
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropZone.classList.remove('drag-hover');
    });
  });

  dropZone.addEventListener('drop', (event) => {
    const files = Array.from(event.dataTransfer.files).map((file) => file.name).join(', ');
    dropZone.querySelector('p').textContent = files || 'Files uploaded!';
  });

  dropZone.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.addEventListener('change', () => {
      const files = Array.from(fileInput.files).map((file) => file.name).join(', ');
      dropZone.querySelector('p').textContent = files || 'Files uploaded!';
    });
    fileInput.click();
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    glowMode = !glowMode;
    document.body.classList.toggle('glow-mode', glowMode);
    themeToggle.textContent = glowMode ? 'Glow Active' : 'Glow Boost';
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.2,
  }
);

sections.forEach((section) => observer.observe(section));
