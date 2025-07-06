const editForm = document.getElementById('editForm');
const deleteBtn = document.getElementById('deleteBtn');

document.addEventListener('DOMContentLoaded', async () => {
  const userId = localStorage.getItem('userId');

  if (!userId) {
    alert('Usuário não autenticado.');
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar usuário');
    }

    const user = await response.json();

    // Exemplo de preenchimento de um campo com o nome do usuário
    document.getElementById('name').value = user.name;

  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    alert('Erro ao carregar informações do usuário.');
  }
});


// Supondo que você tem o userId salvo (ex: localStorage ou sessionStorage)
const userId = localStorage.getItem('userId');  // Ajuste conforme seu login

// Função para atualizar o nome
editForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newName = document.getElementById('name').value.trim();

  if(newName.length < 3){
    alert('O nome deve ter no mínimo 3 caracteres.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`, {
      method: 'PUT',  // PUT pois vai atualizar o usuário
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    });

    if(response.ok){
      alert('Nome atualizado com sucesso!');
            window.location.href = 'tasks.html'; // redireciona pra login

      // Aqui você pode atualizar o localStorage, UI, etc.
    } else {
      const data = await response.json();
      alert('Erro ao atualizar: ' + (data.message || 'Tente novamente.'));
    }
  } catch(err){
    alert('Erro na comunicação com o servidor.');
  }
});

// Função para excluir o usuário
deleteBtn.addEventListener('click', async () => {
  // Confirmação simples
  if (!confirm('Tem certeza que deseja excluir seu perfil? Essa ação é irreversível.')) {
    return; // para se usuário cancelar
  }

  try {
    // Faz a requisição DELETE para seu backend
    const response = await fetch(`http://localhost:3000/user/${userId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Perfil excluído com sucesso!');
      localStorage.clear(); // limpa dados do usuário no frontend
      window.location.href = 'index.html'; // redireciona pra login
    } else {
      // Pega a mensagem de erro da resposta JSON
      const data = await response.json();
      alert('Erro ao excluir: ' + (data.message || 'Tente novamente.'));
    }
  } catch (err) {
    alert('Erro na comunicação com o servidor.');
    console.error(err);
  }
});

