document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let currentPassword = document.getElementById('password').value;
    console.log("I am hereeeeee");
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
                // alert('Login successful!');
                console.log(response);
                localStorage.setItem("token",response.data);
                window.location.href = '/dashboard';
            } else {
                // Handle errors
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .catch(error => {
            console.log(error);
            showError(error.message);
        });
});



