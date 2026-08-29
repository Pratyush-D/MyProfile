const root = document.documentElement;
const themeButton = document.querySelector('[data-theme-switch]');
const themeIcon = document.querySelector('[data-theme-icon]');
const resumeButton = document.querySelector('[data-resume-button]');
const scrollTopLink = document.querySelector('[data-scroll-top]');
const viewPanels = Array.from(document.querySelectorAll('[data-view-panel]'));
const themeMeta = document.querySelector('meta[name="theme-color"]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

root.classList.add('js-enabled');

const setTheme = (theme, persist = false) => {
  const isDark = theme === 'dark';
  root.dataset.theme = theme;

  const themeAction = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  themeButton?.setAttribute('aria-label', themeAction);
  themeButton?.setAttribute('title', themeAction);
  if (themeIcon) themeIcon.textContent = String.fromCodePoint(isDark ? 0x263c : 0x263e);

  if (themeMeta) {
    themeMeta.content = isDark ? '#11110f' : '#f1f1eb';
  }

  if (persist) {
    try {
      window.localStorage.setItem('pratyush-profile-theme', theme);
    } catch (error) {
      // Theme switching remains functional without storage.
    }
  }
};

setTheme(root.dataset.theme === 'light' ? 'light' : 'dark');

themeButton?.addEventListener('click', () => {
  setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
});

let activeView = window.location.hash === '#record' || window.location.hash === '#resume'
  ? 'record'
  : 'narrative';
let isSwitching = false;

const initializeView = () => {
  const showRecord = activeView === 'record';
  resumeButton?.setAttribute('aria-pressed', String(showRecord));
  resumeButton?.setAttribute('aria-label', showRecord ? 'Hide resume' : 'Show resume');

  viewPanels.forEach((panel) => {
    panel.hidden = panel.dataset.viewPanel !== activeView;
  });
};

const setView = (nextView) => {
  if (nextView === activeView || isSwitching) return;

  const currentPanel = viewPanels.find((panel) => panel.dataset.viewPanel === activeView);
  const nextPanel = viewPanels.find((panel) => panel.dataset.viewPanel === nextView);
  if (!currentPanel || !nextPanel) return;

  isSwitching = true;
  const showRecord = nextView === 'record';
  resumeButton?.setAttribute('aria-pressed', String(showRecord));
  resumeButton?.setAttribute('aria-label', showRecord ? 'Hide resume' : 'Show resume');
  currentPanel.classList.add('is-leaving');

  const finishSwitch = () => {
    currentPanel.hidden = true;
    currentPanel.classList.remove('is-leaving');
    nextPanel.hidden = false;
    nextPanel.classList.add('is-entering');
    activeView = nextView;

    window.history.replaceState(null, '', showRecord ? '#resume' : '#journey');

    window.setTimeout(() => {
      nextPanel.classList.remove('is-entering');
      isSwitching = false;
    }, reduceMotion.matches ? 0 : 460);
  };

  window.setTimeout(finishSwitch, reduceMotion.matches ? 0 : 190);
};

resumeButton?.addEventListener('click', () => {
  setView(activeView === 'record' ? 'narrative' : 'record');
});

scrollTopLink?.addEventListener('click', (event) => {
  event.preventDefault();
  window.history.replaceState(null, '', '#top');
  window.scrollTo({
    top: 0,
    behavior: reduceMotion.matches ? 'auto' : 'smooth',
  });
});

initializeView();

if (activeView === 'record' && window.location.hash === '#resume') {
  window.requestAnimationFrame(() => {
    document.getElementById('journey')?.scrollIntoView({ block: 'start' });
  });
}
