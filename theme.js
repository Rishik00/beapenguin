// Theme Management Script
// Shared across all pages (index.html, blog.html, projects.html)

const body = document.body;
let currentTheme = localStorage.getItem('portfolioTheme') || 'dark';

const applyTheme = (themeName) => {
    body.classList.remove('light', 'dark', 'sepia', 'slate');
    body.classList.add(themeName);
    body.classList.add('theme-bg', 'theme-text');
    
    const themeButtons = {
        light: document.getElementById('theme-light'),
        sepia: document.getElementById('theme-sepia'),
        dark: document.getElementById('theme-dark'),
        slate: document.getElementById('theme-slate')
    };

    // Update active theme button styling
    Object.keys(themeButtons).forEach(key => {
        const btn = themeButtons[key];
        if (!btn) return; 
        
        if (key === themeName) {
            btn.classList.add('opacity-100');
            btn.classList.remove('opacity-50');
            // Custom styles for active buttons
            if (key === 'light') btn.style.backgroundColor = 'var(--color-code-bg)';
            else if (key === 'dark') btn.style.backgroundColor = 'var(--color-border)';
            else if (key === 'sepia') btn.style.backgroundColor = '#dcd5c0';
            else if (key === 'slate') btn.style.backgroundColor = 'var(--color-border)'; 
        } else {
            btn.classList.remove('opacity-100');
            btn.classList.add('opacity-50');
            btn.style.backgroundColor = '';
        }
    });

    currentTheme = themeName;
    localStorage.setItem('portfolioTheme', themeName);
};

// Initialize theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const storedTheme = localStorage.getItem('portfolioTheme') || 'dark';
    body.classList.add(storedTheme);
    applyTheme(storedTheme);
    
    // Attach event listeners to theme buttons
    document.getElementById('theme-light').onclick = () => applyTheme('light');
    document.getElementById('theme-sepia').onclick = () => applyTheme('sepia');
    document.getElementById('theme-dark').onclick = () => applyTheme('dark');
    document.getElementById('theme-slate').onclick = () => applyTheme('slate');
});