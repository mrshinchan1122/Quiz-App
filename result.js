document.addEventListener("DOMContentLoaded", function() {
    // Retrieve user's answers from localStorage
    const userAnswers = JSON.parse(localStorage.getItem("userAnswers"));
    if (!userAnswers) {
        // Handle if userAnswers is not available
        return;
    }
    
    // Calculate the score
    let score = 0;
    const correctAnswers = ["b", "c", "a", "c", "b", "a", "c", "c", "b", "b"];
    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            score++;
        }
    });
    
    // Display the score
    document.getElementsByClassName("score").textContent = score;
    
    // Provide feedback based on the score
    let feedback = "";
    if (score === 10) {
        feedback = "Congratulations! You got all questions correct.";
    } else if (score >= 7) {
        feedback = "Well done! You did a great job.";
    } else if (score >= 5) {
        feedback = "Good effort! Keep practicing to improve.";
    } else {
        feedback = "Don't worry! Keep learning and try again.";
    }
    document.getElementById("feedback").textContent = feedback;
});
