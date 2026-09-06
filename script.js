
document.getElementById("feedbackForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const feedback = document.getElementById("feedback").value;

    const response = await fetch(
        "https://6w8qxt8fc5.execute-api.ap-south-1.amazonaws.com/feedback",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                feedback: feedback
            })
        }
    );

    const result = await response.json();

    document.getElementById("message").textContent =
        result.message || "Feedback submitted successfully!";

    document.getElementById("feedbackForm").reset();
});