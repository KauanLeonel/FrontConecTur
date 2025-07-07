document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    document.getElementById('message').textContent = '';

    try {
        const response = await fetch('http://localhost:3000/user/login', { // Verifique esta URL novamente!
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha: password })
        });

        // --- ADICIONE ESTAS LINHAS PARA DEBUG ---
        console.log('Status da Resposta:', response.status);
        const responseText = await response.text(); // Pega o corpo da resposta como texto
        console.log('Corpo da Resposta (Texto Puro):', responseText);

        // Se o status não for OK (2xx), e o corpo for HTML, não tente parsear como JSON
        if (!response.ok && responseText.startsWith('<!DOCTYPE html>')) {
            document.getElementById('message').textContent = 'Erro no servidor: Rota não encontrada ou problema interno.';
            console.error('Servidor retornou HTML inesperado:', responseText);
            return; // Sai da função para evitar o erro de JSON
        }
        // --- FIM DAS LINHAS DE DEBUG ---

        const result = JSON.parse(responseText); // Tenta parsear o texto como JSON

        if (response.ok) {
            localStorage.setItem('userId', result.user.id);
            window.location.href = 'home.html';
        } else {
            document.getElementById('message').textContent = result.message || 'Erro desconhecido no login.';
        }
    } catch (error) {
        console.error('Erro na requisição de login:', error);
        document.getElementById('message').textContent = 'Não foi possível conectar ao servidor. Tente novamente mais tarde.';
    }
});
