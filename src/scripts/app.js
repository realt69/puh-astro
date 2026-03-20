
const setRandomAccent = () => {
    const hues = [354, 210, 160, 280, 25, 190];
    const randomHue = hues[Math.floor(Math.random() * hues.length)];

    // Передаємо ТІЛЬКИ відтінок (число) у нашу CSS-змінну
    document.documentElement.style.setProperty('--accent-h', randomHue.toString());
};
setRandomAccent();

const themeBtn = document.getElementById("top-theme-toggle");
themeBtn?.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.documentElement.classList.contains("dark")
            ? "dark"
            : "light",
    );
});
/* =========================================
   ЛОГІКА КАСТОМНОГО КУРСОРА
   ========================================= */
const initCursor = () => {
    const cursor = document.getElementById('magic-cursor');
    // Запускаємо тільки якщо є курсор і це пристрій з мишкою
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    // Відстежуємо реальні координати миші
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Плавна анімація наближення (Lerp)
    const loop = () => {
        // Коефіцієнт 0.15 відповідає за "тяжкість" курсора. Менше число - більша затримка.
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        // Центруємо курсор відносно його координат
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(loop);
    };
    loop();

    // Додаємо ховер-ефекти для всіх інтерактивних елементів
    const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer, .category-pill');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
    });
};
initCursor();
