async function sendForm(sendData) {
  await fetch(`/form`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sendData)
  })
}

// document.addEventListener('click', (event) => {
//   if (event.target.dataset.type === 'send') {
//     // event.preventDefault();
//     const submitButton = document.getElementById("submit-button");
//     const successMessage = document.getElementById("successMessage");
//     const contactForm = document.getElementById("contact-form");
//     const fullName = document.getElementById("full-name").value;
//     const phoneNumber = document.getElementById("phone-number").value;
//     const problemDescription = document.getElementById("problem-description").value;
    
//     const sendData = {
//         fullName, phoneNumber, problemDescription
//     }

//     sendForm(sendData);

    
//     successMessage.style.display = "block";
//     contactForm.reset();
//     submitButton.disabled = true;

//   }
// });