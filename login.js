document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if(response.ok) {
        // Aqui você pode salvar o userId ou token no localStorage
        localStorage.setItem('userId', result.user.id);
        // Ir para a tela de tarefas
        window.location.href = 'tasks.html';
    } else {
        document.getElementById('message').textContent = result.message || 'Login inválido';
    }
});
t