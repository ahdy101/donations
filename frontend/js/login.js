// function togglePassword() {
//     var passwordInput = document.getElementById("passwordInput");
//     var showPasswordCheckbox = document.getElementById("showPassword");

//     if (showPasswordCheckbox.checked) {
//         passwordInput.type = "text";
//     } else {
//         passwordInput.type = "password";
//     }
// }

// function validateForm() {
//     var emailInput = document.getElementById("emailInput");
//     var passwordInput = document.getElementById("passwordInput");
//     var emailError = document.getElementById("emailError");
//     var passwordError = document.getElementById("passwordError");

//     var email = emailInput.value;
//     var password = passwordInput.value;

//     // Clear previous error messages
//     emailError.textContent = "";
//     passwordError.textContent = "";

//     if (!isValidEmail(email)) {
//         emailError.textContent = "Please enter a valid email address.";
//     } else if (password.length < 8) {
//         passwordError.textContent = "Password must be at least 8 characters long.";
//     } else {
//         // Proceed with form submission or other actions
//         alert("Form is valid. Submitting!");
//         // Uncomment the following line to submit the form
//         // document.forms[0].submit();
//     }
// }

// function isValidEmail(email) {
//     // Regular expression for a simple email validation
//     var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }
// // Your frontend JavaScript code

// // Define the URL of your backend server.
// const backendURL = 'http://localhost:3000'; // Replace with the actual URL of your backend server.

// // Function to fetch data from the backend.
// async function fetchDataFromBackend() {
//   try {
//     // Send a GET request to a specific endpoint on your backend.
//     const response = await fetch(`${backendURL}/login`);
    
//     if (response.ok) {
//       // Parse the response as JSON.
//       const data = await response.json();
      
//       // Now, you can work with the data from the backend.
//       console.log('Data from the backend:', data);
//     } else {
//       // Handle any errors from the backend.
//       console.error('Error fetching data:', response.statusText);
//     }
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// }

// // Call the function to fetch data from the backend.
// fetchDataFromBackend();
