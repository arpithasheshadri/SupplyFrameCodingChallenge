document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("hereeeeeeeee");
    // Get form input values
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let contact = document.getElementById('contact').value;

    // Construct payload
    let formData = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "currentPassword": password,
        "contact": contact
    };
    console.log("hereeeeeeeee");
    // Make a POST request to your backend API
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                alert('Registration successful!');
                window.location.href = '/login';
            } else {
                throw new Error('Registration failed');
            }
        })
        .catch(error => {
            showError(error.message); // Show error message if registration fails
        });
});

function showError(message) {
    let errorElement = document.getElementById('error');
    errorElement.style.display = 'block';
    errorElement.textContent = message;
}

