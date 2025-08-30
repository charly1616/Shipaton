```javascript
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login exitoso');
            // Redirigir a la página principal
            window.location.href = 'home.html';
        } else {
            alert('Error en el login: ' + data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
```