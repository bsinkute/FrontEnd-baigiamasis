export function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'blue' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const toggle = document.querySelector('.toggle');
    if (newTheme === 'blue') {
        toggle.classList.add('on');
    } else {
        toggle.classList.remove('on');
    }
}

export function loadTheme() {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded event fired');
        const savedTheme = localStorage.getItem('theme') || 'light';
        console.log('Saved theme:', savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        const toggle = document.querySelector('.toggle');
        console.log('Toggle button found:', toggle);
        if (toggle) {
            if (savedTheme === 'blue') {
                toggle.classList.add('on');
            } else {
                toggle.classList.remove('on');
            }
            toggle.addEventListener('click', toggleTheme);
            console.log('Event listener added to toggle button');
        }
    });
}