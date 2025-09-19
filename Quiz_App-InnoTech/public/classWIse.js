

for (let i = 1; i <= 12; i++) {
    subjectWIN(`cardClass${i}`, `class${i}`);
    Close(`${i}X`, `class${i}`);
}

function subjectWIN(cardID, boxId) {
    const card = document.getElementById(cardID);
    const box = document.getElementById(boxId);

    if (card && box) {
        card.addEventListener('click', () => {
            box.style.display = 'flex';
        });
    }
}

function Close(closeID, boxID) {
    const close = document.getElementById(closeID);
    const box = document.getElementById(boxID);
    
    if (close && box) {
        close.addEventListener('click', () => {
            box.style.display = 'none';
        });
    }
}

let userId;

window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    userId = params.get('userId');
    if (userId) {
        sessionStorage.setItem('user', userId);
    }
};

BACK=()=>{

    if (userId) {
        location.href =`LoggedIN.html?userId=${userId}`;
    } else {
        location.href = 'index.html';
    }

}
