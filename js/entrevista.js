// Real Interview Questions - 10 questions
const interviewQuestions = [
    { id: 1, english: "Tell me about yourself.", evaluationCriteria: ["experiência", "formação", "goals", "background", "passion"] },
    { id: 2, english: "Why do you want to work for our company?", evaluationCriteria: ["research", "company", "values", "desafios", "growth"] },
    { id: 3, english: "What are your strengths and weaknesses?", evaluationCriteria: ["honesto", "específico", "exemplos", "melhorando", "realista"] },
    { id: 4, english: "Can you describe a challenging situation you faced at work and how you handled it?", evaluationCriteria: ["situation", "challenge", "action", "resultado", "learning"] },
    { id: 5, english: "Why should we hire you?", evaluationCriteria: ["diferencial", "skills", "value", "unique", "contribuição"] },
    { id: 6, english: "Where do you see yourself in five years?", evaluationCriteria: ["ambição", "realistic", "growth", "company", "goals"] },
    { id: 7, english: "How do you handle stress or pressure?", evaluationCriteria: ["técnicas", "exemplos", "positivo", "produtivo", "coping"] },
    { id: 8, english: "Tell me about a time you worked in a team.", evaluationCriteria: ["collaboration", "communication", "role", "resultado", "learning"] },
    { id: 9, english: "What motivates you?", evaluationCriteria: ["genuine", "specific", "aligned", "passion", "growth"] },
    { id: 10, english: "Do you have any questions for us?", evaluationCriteria: ["questions", "interest", "research", "curiosidade", "company"] }
];

// State Management
let currentQuestionIndex = 0;
let interviewActive = false;
let answersGiven = 0;
let studentAnswers = [];
let startTime = null;

// DOM Elements
const moduleSelection = document.getElementById('moduleSelection');
const chatInterface = document.getElementById('chatInterface');
const resultsScreen = document.getElementById('resultsScreen');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const endBtn = document.getElementById('endBtn');
const restartBtn = document.getElementById('restartBtn');
const restartNewBtn = document.getElementById('restartNewBtn');
const selectedModuleSpan = document.getElementById('selectedModule');

// Event Listeners
document.querySelectorAll('.module-btn').forEach(btn => btn.addEventListener('click', startSimulator));
sendBtn.addEventListener('click', submitAnswer);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !userInput.disabled) {
        e.preventDefault();
        submitAnswer();
    }
});
nextQuestionBtn.addEventListener('click', nextQuestion);
endBtn.addEventListener('click', finishInterview);
restartBtn.addEventListener('click', restartInterview);
restartNewBtn.addEventListener('click', restartInterview);

// Functions
function startSimulator(e) {
    const moduleBtn = e.currentTarget;
    moduleBtn.classList.add('active');

    interviewActive = true;
    currentQuestionIndex = 0;
    answersGiven = 0;
    studentAnswers = [];
    startTime = Date.now();

    // Update UI
    moduleSelection.style.display = 'none';
    chatInterface.style.display = 'flex';
    resultsScreen.style.display = 'none';
    selectedModuleSpan.textContent = 'Entrevista Real';
    chatMessages.innerHTML = '';
    userInput.value = '';

    const greeting = `Olá! Sou sua atendente virtual da PRISMA 🤖\n\nVou simular uma entrevista profissional com você. Farei 10 perguntas reais que recrutadores fazem em inglês.\n\nApós cada resposta, vou avaliar:\n✓ Qualidade do inglês utilizado\n✓ Coerência com a pergunta\n✓ Estrutura e conteúdo da resposta\n\nNo final, você receberá um feedback detalhado com sua pontuação. Vamos começar? 💪`;
    addMessage('ai', greeting);

    setTimeout(askQuestion, 2500);
}

function askQuestion() {
    if (currentQuestionIndex >= interviewQuestions.length) {
        finishInterview();
        return;
    }

    const q = interviewQuestions[currentQuestionIndex];
    addMessage('ai', `Pergunta ${currentQuestionIndex + 1} de ${interviewQuestions.length}`);

    setTimeout(() => {
        addMessage('ai', `${q.english}`);
        setTimeout(() => {
            userInput.disabled = false;
            sendBtn.disabled = false;
            userInput.focus();
        }, 500);
    }, 800);
}

function submitAnswer() {
    const answer = userInput.value.trim();
    if (!answer) return;

    userInput.disabled = true;
    sendBtn.disabled = true;
    nextQuestionBtn.style.display = 'none';

    addMessage('user', answer);
    userInput.value = '';
    answersGiven++;

    studentAnswers.push({
        questionId: currentQuestionIndex + 1,
        question: interviewQuestions[currentQuestionIndex].english,
        answer: answer,
        evaluation: evaluateAnswer(answer, currentQuestionIndex)
    });

    setTimeout(() => {
        const evaluation = studentAnswers[studentAnswers.length - 1].evaluation;
        addMessage('ai', generateFeedback(evaluation, answer));

        if (currentQuestionIndex < interviewQuestions.length - 1) {
            setTimeout(() => {
                nextQuestionBtn.style.display = 'block';
                nextQuestionBtn.textContent = 'Próxima Pergunta';
            }, 1200);
        } else {
            setTimeout(() => {
                addMessage('ai', "✅ Essa foi a última pergunta! Clique em 'Finalizar Entrevista' para ver seus resultados.");
                endBtn.style.display = 'block';
            }, 1200);
        }
    }, 1000);
}

function evaluateAnswer(answer, questionIndex) {
    let score = 0;
    let feedback = [];
    const answerLower = answer.toLowerCase();
    const answerLength = answer.split(' ').length;

    if (answerLength < 10) {
        score -= 15;
        feedback.push("A resposta foi muito curta. Elabore mais com exemplos.");
    } else if (answerLength >= 30) {
        score += 10;
        feedback.push("✓ Resposta bem elaborada.");
    }

    const englishQuality = analyzeEnglishQuality(answer);
    score += englishQuality.score;
    if (englishQuality.comment) feedback.push(englishQuality.comment);

    const coherenceScore = analyzeCoherence(answer, questionIndex);
    score += coherenceScore.score;
    if (coherenceScore.comment) feedback.push(coherenceScore.comment);

    if (answer.includes("example") || answer.includes("project") || answer.includes("team") || answer.includes("company") || answer.includes("experience") || answer.includes("years")) {
        score += 10;
        feedback.push("✓ Menção de exemplos específicos.");
    } else if (answerLength > 15) {
        score += 5;
        feedback.push("Poderia incluir exemplos mais específicos.");
    } else {
        score -= 5;
        feedback.push("Faltam exemplos ou detalhes.");
    }

    if ((questionIndex === 3 || questionIndex === 7) && (answerLower.includes("situation") || answerLower.includes("problem") || answerLower.includes("challenge") || answerLower.includes("result") || answerLower.includes("solved"))) {
        score += 15;
        feedback.push("✓ Boa estrutura de resposta com contexto e resultado.");
    }

    score = Math.max(0, Math.min(100, score));

    return { score, quality: getQualityLevel(score), feedback };
}

function analyzeEnglishQuality(answer) {
    let score = 15;
    let comment = "";

    const hasErros = /\b(thier|adn|teh|recieve|occured|begining)\b/i.test(answer);
    if (hasErros) { score -= 10; comment = "⚠️ Erros de ortografia detectados."; }

    const words = answer.split(/\s+/);
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    const diversity = uniqueWords.size / words.length;

    if (diversity > 0.8) score += 5, comment = "✓ Bom vocabulário e variação de termos.";
    else if (diversity < 0.6) score -= 5, comment = "Há repetição de palavras. Use sinônimos.";
    else if (!comment) comment = "✓ Inglês adequado.";

    return { score, comment };
}

function analyzeCoherence(answer, questionIndex) {
    const question = interviewQuestions[questionIndex];
    const answerLower = answer.toLowerCase();
    let score = 15;
    let comment = "";

    const coherenceKeywords = {
        0: ["background","experience","education","professional","years","worked","studied","currently"],
        1: ["company","values","mission","culture","interested","challenges","grow","attracted"],
        2: ["strength","weakness","good","improve","learning","skill","better","development"],
        3: ["problem","challenge","solution","result","team","learned","handled","situation","solved"],
        4: ["skills","experience","unique","contribute","value","different","hire","bring"],
        5: ["years","position","grow","career","goals","company","leader","achieved"],
        6: ["stress","pressure","handle","methods","exercise","organize","calm","manage"],
        7: ["team","collaborate","communication","worked","project","group","colleagues"],
        8: ["motivate","passion","enjoy","interested","drive","goals","challenge"],
        9: ["question","company","team","role","culture","growth","opportunity","learn"]
    };

    const keywords = coherenceKeywords[questionIndex] || [];
    const foundKeywords = keywords.filter(kw => answerLower.includes(kw)).length;
    const keywordPercentage = foundKeywords / keywords.length;

    if (keywordPercentage >= 0.6) score += 15, comment = "✓ Resposta coerente e relevante com a pergunta.";
    else if (keywordPercentage >= 0.3) score += 5, comment = "Resposta parcialmente coerente. Foque mais no tema.";
    else score -= 10, comment = "❌ Resposta não alinhada com a pergunta.";

    return { score, comment };
}

function getQualityLevel(score) {
    if (score >= 85) return "Excelente";
    if (score >= 70) return "Bom";
    if (score >= 50) return "Aceitável";
    return "Precisa Melhorar";
}

function generateFeedback(evaluation, answer) {
    let feedback = `✨ Parabéns pela sua resposta!\n\nPontos a melhorar:\n`;
    feedback += evaluation.feedback.map(item => `• ${item}`).join("\n");
    feedback += `\n\n💪 Você está no caminho certo! Continue praticando!`;
    return feedback;
}

function nextQuestion() {
    currentQuestionIndex++;
    nextQuestionBtn.style.display = 'none';
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.value = '';

    setTimeout(() => {
        const space = document.createElement('div');
        space.style.height = '20px';
        chatMessages.appendChild(space);
        askQuestion();
    }, 500);
}

function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';

    if (sender === 'ai') {
        const img = document.createElement('img');
        img.src = '../img/prisma/logo-prisma-3.png';
        img.alt = 'PRISMA';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        avatar.appendChild(img);
    } else avatar.textContent = 'Você';

    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = text;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function finishInterview() {
    chatInterface.style.display = 'none';
    resultsScreen.style.display = 'block';

    const totalScore = studentAnswers.reduce((sum, ans) => sum + ans.evaluation.score, 0);
    const averageScore = Math.round(totalScore / studentAnswers.length);

    document.getElementById('questionsAnswered').textContent = studentAnswers.length;
    document.getElementById('performance').textContent = getQualityLevel(averageScore);
    document.getElementById('duration').textContent = `${averageScore}/100`;

    const feedbackText = `🎉 Parabéns! Você completou a entrevista!\nSua pontuação: ${averageScore}/100\nDesempenho: ${getQualityLevel(averageScore)}\n\n💡 Próximos passos para melhorar\n• Pesquise a empresa antes da entrevista\n• Use o método STAR para contar histórias\n• Pratique com exemplos específicos\n• Melhore sua fluência em inglês\n• Sempre faça perguntas ao final\n\n💪 Continue praticando e acredite em você\nVocê consegue\n\nFaça outro simulado para melhorar ainda mais 🚀`;
    document.getElementById('feedbackText').textContent = feedbackText;
}

function restartInterview() {
    currentQuestionIndex = 0;
    answersGiven = 0;
    studentAnswers = [];
    startTime = null;
    interviewActive = false;

    moduleSelection.style.display = 'block';
    chatInterface.style.display = 'none';
    resultsScreen.style.display = 'none';
    chatMessages.innerHTML = '';
    userInput.value = '';
    userInput.disabled = false;
    sendBtn.disabled = false;
    nextQuestionBtn.style.display = 'none';
    endBtn.style.display = 'block';
    endBtn.textContent = 'Finalizar Entrevista';

    document.querySelectorAll('.module-btn').forEach(btn => btn.classList.remove('active'));
}