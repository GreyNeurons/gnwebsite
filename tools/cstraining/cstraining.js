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

    const questionBank = [
        { 
            question: "You receive an email from your bank asking for your password. What should you do?", 
            options: ["Reply with your password", "Ignore the email", "Verify with the bank's official website", "Click the link and reset"], 
            answer: "Verify with the bank's official website",
            incident: "A major IT company in New York recently suffered a phishing attack where employees unknowingly provided their passwords, leading to a data breach."
        },
        { 
            question: "A colleague asks you to share your login details for an urgent task. What should you do?", 
            options: ["Share only for this instance", "Deny and report", "Write it on a sticky note and give it to them", "Use a weak password so they can remember"], 
            answer: "Deny and report",
            incident: "In a well-known finance firm, an intern shared their login details with a colleague. This resulted in unauthorized access to financial records, leading to legal action."
        }
    ];

    startButton.addEventListener("click", startTraining);

    function startTraining() {
        userProfile = {
            industry: industrySelect.value,
            role: roleSelect.value,
            location: locationInput.value
        };
        toggleVisibility(gameContainer, false);
        toggleVisibility(questionContainer, true);
        loadQuestion();
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
        const isCorrect = selectedOption === questionData.answer;
        if (isCorrect) {
            score++;
        }
        userResponses.push({
            question: questionData.question,
            selected: selectedOption,
            correct: questionData.answer,
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