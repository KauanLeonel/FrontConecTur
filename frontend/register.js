document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if(password !== confirmPassword) {
        document.getElementById('message').textContent = "As senhas não coincidem!";
        return;
    }

    const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const result = await response.json();

    if(response.ok) {
        document.getElementById('message').style.color = "green";
        document.getElementById('message').textContent = "Cadastro realizado com sucesso! Redirecionando...";

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        document.getElementById('message').style.color = "red";
        document.getElementById('message').textContent = result.message || "Erro ao cadastrar!";
    }
});
