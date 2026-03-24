const courses = [
    { title: "English for Tech", progress: 72, modules: "7 de 10" },
    { title: "English for Health", progress: 45, modules: "4 de 10" },
    { title: "English for Finance", progress: 30, modules: "3 de 10" },
    { title: "English for Industry", progress: 72, modules: "1 de 10" }
];

const grid = document.getElementById('courseGrid');

courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
        <div style="display:flex; justify-content: space-between; align-items: center;">
            <small><strong>${course.title}</strong></small>
            <span style="color: blue; font-size: 10px;">${course.progress}%</span>
        </div>
        <div class="progress-bar-main" style="width: 100%; height: 4px;">
            <div style="width: ${course.progress}%;"></div>
        </div>
        <p style="font-size: 10px; color: #777;">${course.modules} módulos</p>
    `;
    grid.appendChild(card);
});