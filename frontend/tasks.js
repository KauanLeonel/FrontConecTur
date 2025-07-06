const userId = localStorage.getItem('userId');
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

    // Agora coloca o nome do usuário no header
    document.getElementById('username').textContent = user.name;

  } catch (error) {
    console.error('Erro ao carregar nome do usuário:', error);
    document.getElementById('username').textContent = 'Usuário';
  }
});

if (!userId) {
    window.location.href = 'index.html'; // Se não estiver logado, volta pro login
}

// Função para listar tarefas
async function loadTasks() {
    const response = await fetch('http://localhost:3000/task');
    const tasks = await response.json();

    const userTasks = tasks.filter(task => task.userId === userId);
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    userTasks.forEach(task => {
    const li = document.createElement('li');

    li.innerHTML = `
        <strong>${task.title}</strong> - ${task.description} - ${task.complet ? '✅ Concluída' : '❌ Pendente'}
        <button onclick="toggleTask('${task.id}', ${task.complet})">
            ${task.complet ? 'Marcar como Pendente' : 'Concluir'}
        </button>
        <button onclick="deleteTask('${task.id}')">Excluir</button>
    `;

    taskList.appendChild(li);
});

}

// Função para criar nova tarefa
document.getElementById('taskForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const response = await fetch('http://localhost:3000/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            description,
            complet: false,
            userId: userId
        })
    });

    if (response.ok) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').textContent = 'Tarefa adicionada!';
        document.getElementById('taskForm').reset();
        loadTasks();
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').textContent = 'Erro ao adicionar a tarefa.';
    }
});

// Função para deletar tarefa
async function deleteTask(id) {
    const response = await fetch(`http://localhost:3000/task/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        loadTasks();
    } else {
        alert('Erro ao deletar a tarefa');
    }
}

// Botão de logout
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('userId');
    window.location.href = 'index.html';
});

// Carrega as tarefas quando a página abrir
loadTasks();

async function toggleTask(id, currentStatus) {
    const response = await fetch(`http://localhost:3000/task/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            complet: !currentStatus
        })
    });

    if (response.ok) {
        loadTasks();
    } else {
        alert('Erro ao atualizar a tarefa.');
    }
}

document.getElementById('profileBtn').addEventListener('click', () => {
  window.location.href = 'profile.html';
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. Capturar o nome do usuário da URL
  const params = new URLSearchParams(window.location.search);
  const username = params.get('name') || 'Usuário';

  // 2. Mostrar o nome no header
  document.getElementById('username').textContent = username;

  // 3. Evento de clique no botão "Editar Perfil"
  document.getElementById('profileBtn').addEventListener('click', () => {
    window.location.href = `profile.html?name=${encodeURIComponent(username)}`;
  });

  // 4. Evento de Logout (Exemplo simples)
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
  });});

  //Baixar PDF

  document.getElementById('downloadPdfBtn').addEventListener('click', () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('Usuário não autenticado.');
    return;
  }

  window.open(`http://localhost:3000/task/export/pdf?userId=${userId}`, '_blank');
});
