document.getElementById("feedbackForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const feedback = document.getElementById("feedback").value;

    const inquiryId = "INQ-" + Date.now();

    const response = await fetch(
        "https://mrrplklp83.execute-api.ap-south-1.amazonaws.com/default/Task2LambdaFunction",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inquiryId: inquiryId,
                name: name,
                email: email,
                message: feedback
            })
        }
    );

    const result = await response.json();

    document.getElementById("message").textContent =
        result.message || "Inquiry submitted successfully!";

    document.getElementById("feedbackForm").reset();
});