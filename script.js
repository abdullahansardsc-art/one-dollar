/**
 * SMOKE TEST LOGIC
 * Manages the "Order Now" modal and tracks interest signals.
 */
const modal = document.getElementById("emailModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close-btn");

// Open Modal when "Order Now" is clicked
if (openBtn) {
    openBtn.onclick = () => {
        modal.style.display = "block";
        console.log("Smoke Test Metric: Primary CTA Clicked (Interest Detected)");
    };
}

// Close Modal when (x) is clicked
if (closeBtn) {
    closeBtn.onclick = () => {
        modal.style.display = "none";
    };
}

// Close Modal if user clicks outside the box
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


/**
 * FAQ ACCORDION LOGIC
 * Allows users to toggle common questions.
 */
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
        const item = question.parentElement;
        
        // Toggle active class on the clicked item
        item.classList.toggle("active");
        
        // Optional: Close other open FAQ items for a cleaner look
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                otherQuestion.parentElement.classList.remove("active");
            }
        });
    });
});


/**
 * FORM SUBMISSION LOGIC
 * Simulates a successful sign-up and confirms the "Smoke Test" conversion.
 */

// Handle the Pre-Order / Waitlist Form
const preorderForm = document.getElementById("preorderForm");
if (preorderForm) {
    preorderForm.onsubmit = (e) => {
        e.preventDefault();
        const emailInput = document.getElementById("userEmail");
        const userEmail = emailInput ? emailInput.value : "Unknown";
        
        console.log("Smoke Test Metric: Conversion Successful - " + userEmail);
        
        // Change the modal content to show a Success Message
        const modalBody = document.querySelector(".modal-body");
        if (modalBody) {
            modalBody.innerHTML = `
                <div style="padding: 20px 0;">
                    <h2 style="color: #8B5E3C; margin-bottom: 15px;">Spot Reserved!</h2>
                    <p style="font-size: 1.1rem; color: #2D2D2D;">
                        We've added <strong>${userEmail}</strong> to our priority production list. 
                        We'll reach out as soon as the next batch of 300 PKR racks is ready for dispatch.
                    </p>
                    <button onclick="location.reload()" style="margin-top: 25px; background: #4A5D4E; color: white; border: none; padding: 12px 25px; cursor: pointer; border-radius: 4px; font-weight: bold;">
                        Back to Home
                    </button>
                </div>
            `;
        }
    };
}

// Handle the Footer Newsletter Form
const footerForm = document.getElementById("footerForm");
if (footerForm) {
    footerForm.onsubmit = (e) => {
        e.preventDefault();
        alert("Success! You're now subscribed for new design updates.");
        footerForm.reset();
    };
}