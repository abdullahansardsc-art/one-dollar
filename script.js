// CONFIGURATION: Paste your Google Script Web App URL here
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz9WwiRcy7R9WLcc-nh4X3d9mP6wD4nM2yHQ6YLzlFYijI5DskqUqoutQtFt5USpzQ5/exec';

/**
 * MODAL LOGIC
 */
const modal = document.getElementById("emailModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close-btn");

if (openBtn) {
    openBtn.onclick = () => {
        modal.style.display = "block";
    };
}

if (closeBtn) {
    closeBtn.onclick = () => {
        modal.style.display = "none";
    };
}

window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
};

/**
 * FAQ ACCORDION LOGIC
 */
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
        const item = question.parentElement;
        item.classList.toggle("active");
        
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                otherQuestion.parentElement.classList.remove("active");
            }
        });
    });
});

/**
 * SHARED FORM SUBMISSION LOGIC (Actual Data Sending)
 */
const handleFormSubmit = async (formElement, emailInputId, successCallback) => {
    const emailInput = document.getElementById(emailInputId);
    const submitBtn = formElement.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;

    // 1. Prevent multiple clicks (Loading State)
    submitBtn.disabled = true;
    submitBtn.innerText = "Saving...";

    const formData = new FormData(formElement);

    try {
        // 2. Send to Google Sheets (or Formspree)
        const response = await fetch(SCRIPT_URL, { 
            method: 'POST', 
            body: formData 
        });

        if (response.ok) {
            successCallback(emailInput.value);
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('Error!', error.message);
        alert("Something went wrong. Please try again or check your internet.");
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
    }
};

// MODAL FORM: Pre-order Waitlist
const preorderForm = document.getElementById("preorderForm");
if (preorderForm) {
    preorderForm.onsubmit = (e) => {
        e.preventDefault();
        handleFormSubmit(preorderForm, "userEmail", (email) => {
            const modalBody = document.querySelector(".modal-body");
            modalBody.innerHTML = `
                <div style="padding: 20px 0;">
                    <h2 style="color: #8B5E3C; margin-bottom: 15px;">Spot Reserved!</h2>
                    <p>We've added <strong>${email}</strong> to our priority list. We'll contact you for the 300 PKR rack soon.</p>
                    <button onclick="location.reload()" style="margin-top: 25px; background: #4A5D4E; color: white; border: none; padding: 12px 25px; cursor: pointer; border-radius: 4px;">Back to Home</button>
                </div>
            `;
        });
    };
}

// FOOTER FORM: Newsletter
const footerForm = document.getElementById("footerForm");
if (footerForm) {
    footerForm.onsubmit = (e) => {
        e.preventDefault();
        // Since the footer form uses a standard input, we find it inside the form
        const footerInput = footerForm.querySelector('input[type="email"]');
        handleFormSubmit(footerForm, footerInput.id, () => {
            alert("Success! You're on the list for design updates.");
            footerForm.reset();
        });
    };
}