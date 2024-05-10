const quiz = document.getElementById('sectionQuiz');
const guide = document.getElementById('sectionGuide');
const getStartedBtn = document.getElementById('getStartedBtn');
const sectionHOME = document.getElementById('sectionHOME');
const startQuiz = document.getElementById('startQuiz');
const submitBtn = document.getElementById('submitBtn');

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
function openFullScreen() {
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
console.log(isFullScreen);

// Event listener for clicking the start quiz button
// $("#startQuiz").click(function() {
//     requestFullScreen();
// });

$(document).on("fullscreenchange", function () {
    if (!document.fullscreenElement && isFullScreen) {
        const confirmSubmit = window.confirm("Exited Quiz. Click OK to submit.");
        if (confirmSubmit) {
            window.location.href = "result.html";
        } else {
            // Re-enable fullscreen mode
            openFullScreen();
        }
    }
});

// Trigger the same behavior when the user exits fullscreen without clicking the button
$(document).mouseleave(function() {
    if (!document.fullscreenElement && isFullScreen) {
        const confirmSubmit = window.confirm("Exited Quiz. Click OK to submit.");
        if (confirmSubmit) {
            window.location.href = "result.html";
        } else {
            // Re-enable fullscreen mode
            openFullScreen();
        }
    }
});

// Ensure that the fullscreen behavior is important
$(document).ready(function() {
    $("body").css("fullscreenchange", "important");
});

// Event listener for quiz submission
document.getElementById('quizForm').addEventListener('submit', function (event) {
    // Prevent default form submission
    event.preventDefault();

    // Initialize an array to store user's selected answers
    let userAnswers = [];

    // Loop through all radio button inputs
    document.querySelectorAll('input[type="radio"]').forEach(function (input) {
        // Check if the input is checked
        if (input.checked) {
            // Push the value of the checked input to the userAnswers array
            userAnswers.push(input.value);
        }
    });

    // Store the user's selected answers in local storage
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));

    // Redirect to the result page
    window.location.href = 'result.html';
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

//----------------------------- Custom Alert ----------------------------//
// Function to show the custom alert dialog
function showCustomAlert() {
    $('#customAlert').show();
}

// Function to hide the custom alert dialog
function hideCustomAlert() {
    $('#customAlert').hide();
}

// Event listener for fullscreen change
$(document).on("fullscreenchange", function () {
    if (!document.fullscreenElement && isFullScreen) {
        showCustomAlert(); // Show the custom alert
    }
});

// Event listener for OK button click
$('#confirmExit').on('click', function() {
    hideCustomAlert(); // Hide the custom alert
    window.location.href = "result.html"; // Proceed with the action
});

// Event listener for Cancel button click
$('#cancelExit').on('click', function() {
    hideCustomAlert(); // Hide the custom alert
    requestFullScreen(); // Request fullscreen again
});



