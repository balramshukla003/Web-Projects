
var input;
function INPUT(input) {

    input.addEventListener('input', function (event) {
        let value = this.value.replace(/[^0-9-]/g, '');

        // Handle backspace separately to remove hyphen correctly
        if (event.inputType === 'deleteContentBackward') {
            // Simply remove the last character
            if (value.endsWith('-')) {
                value = value.slice(0, -1);
            }
        } else {
            // Remove any non-digit and non-hyphen characters
            value = value.replace(/[^0-9]/g, '');

            // Add hyphens after day and month
            if (value.length >= 2) {
                value = value.slice(0, 2) + '-' + value.slice(2);
            }
            if (value.length >= 5) {
                value = value.slice(0, 5) + '-' + value.slice(5);
            }
        }

        // Ensure the value doesn't exceed the length of 10 characters
        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        this.value = value;
    });

}

// Common Infobox Logic
function Infobox(linkId, boxId) {
    const link = document.getElementById(linkId);
    const box = document.getElementById(boxId);

    if (link && box) {
        link.addEventListener('mouseenter', () => box.style.display = 'block');
        box.addEventListener('mouseenter', () => box.style.display = 'block');
        link.addEventListener('mouseleave', () => box.style.display = 'none');
        box.addEventListener('mouseleave', () => box.style.display = 'none');
    }
}

// Set up all infoboxes
Infobox('infoLink1', 'infoBox-student');
Infobox('infoLink3', 'infoBox-solution');
Infobox('infoLink4', 'infoBox-resources');
Infobox('infoLink5', 'infoBox-teacher');


// Quote Floating Window
const quoteBtn = document.getElementById("quoteBtn");
const quoteWin = document.getElementById("quote-win");
if (quoteBtn && quoteWin) {
    document.getElementById("quoteX").addEventListener('click', () => quoteWin.style.display = "none");
    quoteBtn.addEventListener('click', () => quoteWin.style.display = "block");
}

// Login Form
window.addEventListener('load', () => {
    if (window.location.hash === '#login') {
        Login();
        history.replaceState(null, null, window.location.pathname);
    }
});
document.getElementById("login")?.addEventListener("click", Login = () => {
    document.getElementById('login-win').style.display = 'flex';
});
document.getElementById("loginX")?.addEventListener("click", () => {
    document.getElementById('login-win').style.display = 'none';
});

// Register Form
document.getElementById("register")?.addEventListener("click", Register = () => {
    const loginWin = document.getElementById('login-win');
    if (loginWin && loginWin.style.display === 'flex') {
        loginWin.style.display = 'none';
    }
    document.getElementById('register-window').style.display = 'flex';
});
document.getElementById("registerX")?.addEventListener("click", () => {
    document.getElementById('register-window').style.display = 'none';
});

// Show Teacher Registration
document.getElementById('imgTeacher')?.addEventListener('click', () => {
    document.getElementById('teacherForm').style.display = 'flex';
    input = document.getElementById('tdob');
    INPUT(input);
    document.getElementById('register-window').style.display = 'none';
});

// Show Student Registration
document.getElementById('imgStudent')?.addEventListener('click', () => {
    document.getElementById('studentForm').style.display = 'flex';
    input = document.getElementById('sdob');
    INPUT(input);
    document.getElementById('register-window').style.display = 'none';
});

// Close Teacher Form
document.getElementById('teacherX')?.addEventListener('click', () => {
    document.querySelector('#teacherName').value = "",
        document.querySelector('#rtuserID').value = "",
        document.getElementById("rTpassword").value = "",
        document.querySelector('#tdob').value = "",
        document.querySelector('#teacherEmail').value = ""
    document.getElementById('teacherForm').style.display = 'none';
});

// Close Student Form
document.getElementById('studentX')?.addEventListener('click', () => {
    document.querySelector('#studentName').value = "",
        document.querySelector('#rsuserID').value = "",
        document.getElementById("rSpassword").value = "",
        document.querySelector('#sdob').value = "",
        document.querySelector('#studentEmail').value = "",
        document.getElementById('studentForm').style.display = 'none';
});

// Back Button to Registration Window
document.getElementById("tBack")?.addEventListener("click", Back);
document.getElementById("sBack")?.addEventListener("click", Back);

function Back() {
    document.getElementById('teacherForm').style.display = 'none';
    document.getElementById('studentForm').style.display = 'none';
    document.getElementById('register-window').style.display = 'flex';
}

// Fetch Quote
function fetchQuote() {
    fetch('/api/quote')
        .then(response => response.json())
        .then(data => {
            document.getElementById('quote-text').textContent = `"${data.quote}"`;
            document.getElementById('author').textContent = `– ${data.author}`;
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
        });
}

function comingSoon() {
    document.getElementById("comingSoon").style.display = "flex";
}
function comingSoonClose() {
    document.getElementById("comingSoon").style.display = "none";
}

function loginUser() {
    const userId = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, password }) // Send both userId and password
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server error');
        }
        return response.json();
    })
    .then(result => {
        if (result.success) {
            document.getElementById("password").value = "";
            window.location.href = `/LoggedIN.html?userId=${userId}`;
        } else {
            alert(result.message || 'Login failed');
            document.getElementById("password").value = "";
        }
    })
    .catch(error => {
        alert(error.message);
        document.getElementById("user").value = "";
        document.getElementById("password").value = "";
    });
}

// Register User
function Registeration(event, type) {
    event.preventDefault();

    let data = {};

    if (type === 'Student') {
        data = {
            name: document.querySelector('#studentName').value,
            userID: document.querySelector('#rsuserID').value,
            password: document.getElementById("rSpassword").value,
            dob: document.querySelector('#sdob').value,
            email: document.querySelector('#studentEmail').value,
            type: 'Student'
        };
    } else {
        data = {
            name: document.querySelector('#teacherName').value,
            userID: document.querySelector('#rtuserID').value,
            password: document.getElementById("rTpassword").value,
            dob: document.querySelector('#tdob').value,
            email: document.querySelector('#teacherEmail').value,
            type: 'Teacher'
        };
    }

    fetch('/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful Redirecting to login window');
                if (type === 'Student') {

                    document.querySelector('#studentName').value = "",
                        document.querySelector('#rsuserID').value = "",
                        document.getElementById("rSpassword").value = "",
                        document.querySelector('#sdob').value = "",
                        document.querySelector('#studentEmail').value = "",
                        document.getElementById('studentForm').style.display = 'none';
                    document.getElementById('login-win').style.display = 'flex';
                } else {
                    document.querySelector('#teacherName').value = "",
                        document.querySelector('#rtuserID').value = "",
                        document.getElementById("rTpassword").value = "",
                        document.querySelector('#tdob').value = "",
                        document.querySelector('#teacherEmail').value = ""
                    document.getElementById('teacherForm').style.display = 'none';
                    document.getElementById('login-win').style.display = 'flex';
                }

            } else {
                alert('Registration failed: ' + (data.message || 'Unknown error'));
            }
        })
}


let USERid;
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    USERid = params.get('userId');
    if (USERid) {
        sessionStorage.setItem('user',  USERid);
    }
};
document.getElementById("calculator").addEventListener('click',()=>{
    location.href="calculator.html#home"
})

document.getElementById("location_course").addEventListener("click",()=>{
    location.href="courses.html"
});
document.getElementById("location_classwise").addEventListener("click",()=>{
    location.href="classWise.html"
});
document.getElementById("location_Ebook").addEventListener("click",()=>{
    location.href="E-Book.html"
});