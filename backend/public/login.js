
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let currentPassword = document.getElementById('password').value;
    // Make a POST request to your backend API
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, currentPassword })
    })
        .then(response => {
            if (response.ok) {
                // Parse response body as JSON
                return response.json();
            } else {
                // Handle errors
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .then(data => {
            // Set token in local storage
            localStorage.setItem("token", data.token);
            window.location.href = '/';
        })
        .catch(error => {
            console.log(error);
            showError(error.message);
        });
});




