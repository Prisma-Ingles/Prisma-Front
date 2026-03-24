// ================= USUÁRIO =================
const user = JSON.parse(localStorage.getItem("usuarioCadastrado"));

const nomeEl = document.getElementById("nomeUsuario");
const emailEl = document.getElementById("emailUsuario");
const avatarEl = document.getElementById("avatar");
const welcome = document.getElementById("userWelcome");
const btn = document.getElementById("authButton");

if(user){
    nomeEl.textContent = user.nome;
    emailEl.textContent = user.email;

    avatarEl.textContent = user.nome.charAt(0).toUpperCase();

    welcome.textContent = `Bem-vindo, ${user.nome} 👋`;
    btn.textContent = "Sair";

    btn.onclick = () => {
        localStorage.removeItem("usuarioCadastrado");
        location.reload();
    };
}else{
    welcome.textContent = "";
    btn.textContent = "Entrar";

    btn.onclick = () => {
        window.location.href = "index.html";
    };
}

// ================= CURSOS =================
const courses = [
    { title: "English for Software Development", progress: 72, modules: "7 de 10" },
    { title: "English for Data Science & AI", progress: 45, modules: "4 de 10" },
    { title: "English for Cybersecurity", progress: 30, modules: "3 de 10" },
    { title: "English for Business", progress: 15, modules: "1 de 10" }
];

const grid = document.getElementById('courseGrid');

courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';

    card.innerHTML = `
        <div style="display:flex; justify-content: space-between;">
            <strong>${course.title}</strong>
            <span>${course.progress}%</span>
        </div>

        <div class="progress-bar-mini">
            <div style="width:${course.progress}%"></div>
        </div>

        <small>${course.modules} módulos</small>
    `;

    grid.appendChild(card);
});