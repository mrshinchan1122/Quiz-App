const quiz = document.getElementById('sectionQuiz');
const guide = document.getElementById('sectionGuide');
const getStartedBtn = document.getElementById('getStartedBtn');
const sectionHOME = document.getElementById('sectionHOME');
const startQuiz = document.getElementById('startQuiz');
const submitBtn = document.getElementById('submitBtn');

getStartedBtn.addEventListener('click', () => {
    guide.style.display='flex';
    sectionHOME.style.display='none';
    quiz.style.display='none';
    submitBtn.style.display='none';
});

startQuiz.addEventListener('click', () => {
    guide.style.display='none';
    sectionHOME.style.display='none';
    quiz.style.display='flex';
    submitBtn.style.display='flex';
})

submitBtn.addEventListener('click', () => {
    alert('please select')
})

document.addEventListener("DOMContentLoaded", function() {
    var guidelinesCheckbox = document.getElementById("guidelinesCheckbox");
    var startQuizButton = document.getElementById("startQuiz");

    
    startQuizButton.disabled = true;

    
    guidelinesCheckbox.addEventListener("change", function() {
        startQuizButton.disabled = !this.checked;
    });
    
});

function showQuiz() {
    
    document.getElementById("sectionGuide").style.display = "none";
    
    document.getElementById("quizContainer").style.display = "block";
}

document.getElementById("startQuiz").addEventListener("click", showQuiz);


document.getElementById('quizForm').addEventListener('submit', function (event) {
    // Check if all questions are answered
    var allAnswered = true;
    var questions = document.querySelectorAll('input[type="radio"]');
    
    Array.from(questions).forEach(function (question) {
        if (!question.checked) {
            allAnswered = false;
        }
    });
    
    if (!allAnswered) {
        alert("Want to submit your Quiz");
        event.preventDefault(); // Prevent form submission if not all questions are answered
    } else {
        // Proceed with form submission
    }
});



// window.addEventListener('beforeunload', function (e) {
//     var confirmationMessage = 'Are you sure you want to leave this page? Your progress will be lost.';
//     e.preventDefault();
//     e.returnValue = confirmationMessage;
//     return confirmationMessage;
// });

// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });
  

//---------------------------- Camera js-----------------------//

// Function to start the webcam
async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = document.getElementById("webcamFeed"); // Updated id
        videoElement.srcObject = stream;
    } catch (error) {
        console.error("Error accessing webcam:", error);
    }
}

// Add event listener to the button
document.getElementById("startQuiz").addEventListener("click", function() {
    startWebcam();
    // Hide the get started button once the webcam starts
    this.style.display = "none";
});
//----------------------------- windows or tab change disbale function------------------------

// Variable to track fullscreen mode
let isFullScreen = false;

// Function to request fullscreen
function requestFullScreen() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    // Update fullscreen flag
    isFullScreen = true;
}

// Event listener for clicking the start quiz button
$("#startQuiz").click(function() {
    requestFullScreen();
});

// Event listener for fullscreen change
document.addEventListener("fullscreenchange", function () {
    // Check if exiting fullscreen
    if (!document.fullscreenElement && isFullScreen) {
        // Show alert and redirect
        const confirmSubmit = window.confirm("Exited Quiz. Click OK to submit.");
        if (confirmSubmit) {
            window.location.href = "result.html";
        } else {
            // Re-enter fullscreen
            requestFullScreen();
        }
    }
});

// Event listener for the submit button
$("#submitBtn").click(function() {
    // Your code for handling the submit button click
    // For example, displaying the score or any other action
});

// Event listener for visibility change (tab change)
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        // Show alert and redirect
        window.alert("Your page has expired or you cheated.");
        window.location.href = "result.html";
    }
});

// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable inspect element and other key combinations
document.onkeydown = function(e) {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || 
        (e.ctrlKey && e.shiftKey && e.key === "C") || 
        (e.ctrlKey && e.shiftKey && e.key === "J") || 
        (e.ctrlKey && e.key === "U") || 
        (e.ctrlKey && e.key === "P") || 
        (e.ctrlKey && e.key === "S")) {
        return false;
    }
};
