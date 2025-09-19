// Event Listeners for various click actions
document.getElementById("infoLink2").addEventListener("click", () => {
    document.getElementById("quizOption").style.display = "flex";
});

document.getElementById("X").addEventListener("click", () => {
    document.getElementById("quizOption").style.display = "none";
});

document.getElementById("qX").addEventListener("click", () => {
    document.getElementById("outerCNF").style.display = "flex";
});

// Function to show or hide elements based on hover
function ShowFun(elementID, boxID) {
    const element = document.getElementById(elementID);
    const box = document.getElementById(boxID);

    element.addEventListener('mouseenter', () => {
        box.style.display = 'block';
    });
    box.addEventListener("mouseenter", () => {
        box.style.display = 'block';
    });
}

function HideFun(elementID, boxID) {
    const element = document.getElementById(elementID);
    const box = document.getElementById(boxID);

    element.addEventListener('mouseleave', () => {
        box.style.display = 'none';
    });
    box.addEventListener("mouseleave", () => {
        box.style.display = 'none';
    });
}

// Apply show and hide functionality
ShowFun('infoLink1', 'infoBox-student');
HideFun('infoLink1', 'infoBox-student');

ShowFun('infoLink3', 'infoBox-solution');
HideFun('infoLink3', 'infoBox-solution');

ShowFun('infoLink4', 'infoBox-resources');
HideFun('infoLink4', 'infoBox-resources');


// Confirm action logic (for quiz confirmation dialog)
function confirm(decision) {
    if (decision === 'yes') {
        document.getElementById("outer-Layer").style.display = "none";
        document.getElementById("outerCNF").style.display = "none";
        document.getElementById("resultOUT").style.display = "none";
        quesCount = 0;
    } else {
        document.getElementById("outerCNF").style.display = "none";
    }
}

// Function to start the quiz based on quizID
function QuizQuestion(quizID) {
    document.getElementById(quizID).addEventListener("click", () => {
        document.getElementById("quizOption").style.display = "none";
        document.getElementById("outer-Layer").style.display = "flex";
    });
}

const skipElement = document.getElementById('skip');
if (skipElement) {
    skipElement.onclick = function () {
        loadQuestion();
    };
}

let marks = 0, quesCount = 0, lastId = 0;

// Load questions from the server using fetch
function loadQuestion() {
    fetch(`/getQuestion?lastId=${lastId}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === 'No more questions available') {
                alert('Quiz finished!');
                return;
            }

            // Update question and options in the DOM
            document.getElementById('ques').innerText = data.question_text;
            document.getElementById('option1').innerText = data.option_1;
            document.getElementById('option2').innerText = data.option_2;
            document.getElementById('option3').innerText = data.option_3;
            document.getElementById('option4').innerText = data.option_4;

            // Update lastId for next question
            lastId = data.question_id + 1;

            // Clear previous event listeners and add new ones for options
            document.querySelectorAll('.optionBtn').forEach((button, index) => {
                button.onclick = function () {
                    quesCount++;
                    // Check if selected option is correct
                    if (index + 1 === data.correct_option) {
                        marks++;
                    }
                    // Show result after 30 questions
                    if (quesCount >= 30) {
                        document.getElementById('marks').innerText = `Marks: ${marks}`;
                        document.getElementById("resultOUT").style.display = "flex";
                        return;
                    }
                    // Load next question
                    loadQuestion();
                };
            });
        })
        .catch(error => console.error('Error:', error));
}

const params = new URLSearchParams(window.location.search);
let userI = params.get('userId');
sessionStorage.setItem('userI', userI);

window.onload = function () {
    FetchU(userI);
    loadQuestion();
}

function FetchU(userI) {
    const user = userI;
    if (!user) {
        alert('Error: User ID not provided');
        return;
    }

    fetch('/api/logged', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user })
    })
        .then(response => {
            if (!response.ok) {
                // Log response for debugging
                console.error(`HTTP error! Status: ${response.status}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert("Logged in successfully!");
                const uTYPE = data.type;
                const uName = data.name;

                document.getElementById('identity').innerText = `user: ${user} '${uTYPE}'`
                document.getElementById('uName').innerText = uName;
                sessionStorage.setItem('userType', uTYPE);
                sessionStorage.setItem('userName', uName);

            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error); // Log fetch error
            alert('Error: Please login and try again later.');
        });
}



const ebookElement = document.getElementById('Ebook');
if (ebookElement) {
    ebookElement.addEventListener('click', () => {
        location.href = `E-Book.html?userId=${userI}`;
    });
}

const urseElement = document.getElementById('urse');
if (urseElement) {
    urseElement.addEventListener('click', () => {
        location.href = `courses.html?userId=${userI}`;
    });
}

const userCalculator = document.getElementById('calculator');
if (userCalculator) {
    userCalculator.addEventListener('click', () => {
        location.href = `calculator.html?userId=${userI}`;
    });
}


const classwiseElement = document.getElementById('classWise');
if (classwiseElement) {
    classwiseElement.addEventListener('click', () => {
        location.href = `classWise.html?userId=${userI}`;
    });
}


document.getElementById('ChangeBox').addEventListener('click', () => {
    document.getElementById('logout').style.display = 'block';
})

document.getElementById('cx').addEventListener('click',()=>{
    document.getElementById('logout').style.display = 'none';
})

document.getElementById('changePass').addEventListener('click',()=>{
    location.href=`changePassword.html?userId=${userI}`;
})

function HomePG(){
    // Clear session storage or any stored data related to the user
    sessionStorage.removeItem('user'); // Remove the stored userId if using sessionStorage
    sessionStorage.removeItem('userName'); // Also remove userName if stored
    sessionStorage.removeItem('userType'); // Remove userType if stored

    // Clear URL parameters (such as userId)
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState({path: newUrl}, '', newUrl); // Clear any query params like ?userId=

    // Redirect to the homepage
    location.href = 'index.html';
}