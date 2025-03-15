document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById("game-container");
    const startButton = document.getElementById("start-button");
    const industrySelect = document.getElementById("industry");
    const roleSelect = document.getElementById("role");
    const locationInput = document.getElementById("location");
    const questionContainer = document.getElementById("question-container");
    const quizContainer = document.getElementById("quiz-container");
    const incidentContainer = document.getElementById("incident-container");
    const resultContainer = document.getElementById("result-container");

    let userProfile = {};
    let currentQuestionIndex = 0;
    let score = 0;
    let userResponses = [];
    let questionBank = [];


    startButton.addEventListener("click", startTraining);

    async function startTraining() {
        let industryId = industrySelect.value;
        let roleId = roleSelect.value;
        if (!industryId || !roleId) return;
        
        questionBank = await getAllData("questions");
        questionBank = questionBank.filter(q => q.industry_id == industryId && q.role_id == roleId);
        
        if (questionBank.length === 0) {
            alert("No questions available for this selection.");
            return;
        }
        
        gameContainer.style.display = "none";
        questionContainer.style.display = "block";
        currentQuestionIndex = 0;
        score = 0;
        userResponses = [];
        loadQuestion();

        //======
        //toggleVisibility(gameContainer, false);
        //toggleVisibility(questionContainer, true);
        //loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestionIndex >= questionBank.length) {
            showResults();
            return;
        }
        
        const questionData = questionBank[currentQuestionIndex];
        displayQuestion(questionData);
        displayIncident(questionData.incident);
        displayOptions(questionData);
    }

    function displayQuestion(questionData) {
        quizContainer.innerHTML = `<p class='question'>${questionData.question}</p>`;
    }

    function displayIncident(incident) {
        incidentContainer.innerHTML = `<p><strong>Real Incident:</strong> ${incident}</p>`;
    }

    function displayOptions(questionData) {
        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options");

        questionData.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.onclick = () => checkAnswer(option, questionData);
            optionsContainer.appendChild(button);
        });

        quizContainer.appendChild(optionsContainer);
    }

    function checkAnswer(selectedOption, questionData) {
        const isCorrect = selectedOption === questionData.correct_answer;
        if (isCorrect) {
            score++;
        }
        userResponses.push({
            question: questionData.question,
            selected: selectedOption,
            correct: questionData.correct_answer,
            isCorrect
        });
        currentQuestionIndex++;
        clearContainers();
        loadQuestion();
    }

    function clearContainers() {
        quizContainer.innerHTML = "";
        incidentContainer.innerHTML = "";
    }

    function showResults() {
        toggleVisibility(questionContainer, false);
        toggleVisibility(resultContainer, true);

        let resultHTML = `<h2>Cybersecurity Awareness Training Complete!</h2><p>Your Score: ${score}/${questionBank.length}</p>`;
        userResponses.forEach(response => {
            resultHTML += `
                <div class='result-box'>
                    <p><strong>Question:</strong> ${response.question}</p>
                    <p><strong>Your Answer:</strong> ${response.selected}</p>
                    <p><strong>Correct Answer:</strong> ${response.correct}</p>
                    <p style='color:${response.isCorrect ? 'green' : 'red'}'>${response.isCorrect ? 'Correct' : 'Incorrect'}</p>
                </div>`;
        });
        resultContainer.innerHTML = resultHTML;
    }

    function toggleVisibility(element, isVisible) {
        element.classList.toggle("visible", isVisible);
    }

    // Populate Industry Dropdown from IndexedDB
    async function populateIndustries() {
        const industries = await getAllData("industries");
        industrySelect.innerHTML = "<option value=''>Select Industry</option>";
        industries.forEach(industry => {
            let option = new Option(industry.name, industry.id);
            industrySelect.appendChild(option);
        });
        industrySelect.disabled = false;
    }
        
    // Initialize the dropdowns on page load
    populateIndustries();

    // Populate Role Dropdown based on selected Industry
    async function populateRoles() {
        roleSelect.innerHTML = "<option value=''>Select Role</option>";
        roleSelect.disabled = true;
        let industryId = industrySelect.value;
        if (!industryId) return;

        const roles = await getAllData("roles");
        const filteredRoles = roles.filter(role => role.industry_id == industryId);
        
        filteredRoles.forEach(role => {
            let option = new Option(role.name, role.id);
            roleSelect.appendChild(option);
        });
        roleSelect.disabled = false;
    }
    industrySelect.addEventListener("change", populateRoles);


});