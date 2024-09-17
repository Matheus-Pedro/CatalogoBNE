let itens = [
    { id: 1, nome: 'Growth', descricao: 'Creatina Monohidratada, suplemento alimentar em pó, 250g.', imagem: 'images/growth.png' },
    { id: 2, nome: 'Black Skull', descricao: 'Creatina Monohidratada, suplemento alimentar em pó, sem sabor, 300g.', imagem: 'images/black-skull.png' },
    { id: 3, nome: 'Dark Lab', descricao: 'Creatina + Beta Alanina.', imagem: 'images/dark-lab.png' },
    { id: 4, nome: 'Integralmedica', descricao: 'Creatina Integralmedica, 300g.', imagem: 'images/integral.png' },
    { id: 5, nome: 'Probiotica', descricao: 'Creatina Monohidrata, suplemento alimentar, 300g.', imagem: 'images/probiotica.png' },
];

// Função para renderizar um card na página
function renderItem(item) {
    const cardWrapper = document.querySelector('.card-wrapper');

    const card = document.createElement('div');
    card.classList.add('card-item');
    card.setAttribute('id', `card${item.id}`);

    card.innerHTML = `
        <div class="editor">
          <a href="#" onclick="openEditModal(${item.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg>
          </a>
        </div>
        <img src="${item.imagem}" alt="${item.nome}" />
        <div class="card-content">
          <h3>${item.nome}</h3>
          <p>${item.descricao}</p>  
        </div>
        <button type="button">Eu quero isso!</button>
    `;

    cardWrapper.appendChild(card);
}

// Função para renderizar todos os itens
function renderItems() {
    itens.forEach(renderItem);
}

function openAddPostModal() {
    document.getElementById('addPostModal').style.display = 'flex';
  }


// Função para adicionar um novo item ao catálogo
function saveNewPost() {
    const title = document.getElementById('postTitle').value.trim();
    const description = document.getElementById('postDescription').value.trim();
    const image = document.getElementById('postImage').value.trim();

    if (title && description && image) {
        const newItem = {
            id: itens.length + 1,
            nome: title,
            descricao: description,
            imagem: image
        };

        itens.push(newItem);
        renderItem(newItem); // Renderiza o novo item

        closeAddPostModal();
        document.getElementById('addPostForm').reset(); // Limpa o formulário
    } else {
        showModalMessage('Por favor, preencha todos os campos.');
    }
}

// Função para abrir o modal de edição
function openEditModal(itemId) {
    const item = itens.find(i => i.id === itemId);
    if (!item) return;

    document.getElementById('editItemId').value = item.id;
    document.getElementById('editTitle').value = item.nome;
    document.getElementById('editDescription').value = item.descricao;
    document.getElementById('editImage').value = item.imagem;

    document.getElementById('editPostModal').style.display = 'flex';
}

// Função para salvar as alterações feitas no item
function saveEditPost() {
    const itemId = parseInt(document.getElementById('editItemId').value);
    const newTitle = document.getElementById('editTitle').value.trim();
    const newDescription = document.getElementById('editDescription').value.trim();
    const newImage = document.getElementById('editImage').value.trim();

    const itemIndex = itens.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;

    if (newTitle && newDescription && newImage) {
        itens[itemIndex].nome = newTitle;
        itens[itemIndex].descricao = newDescription;
        itens[itemIndex].imagem = newImage;

        atualizarCard(`card${itemId}`, itens[itemIndex]);
        closeEditPostModal();
    } else {
        showModalMessage('Por favor, preencha todos os campos.');
    }
}

// Função para deletar um item
function deleteItem() {
    const itemId = parseInt(document.getElementById('editItemId').value);
    const itemIndex = itens.findIndex(i => i.id === itemId);

    if (itemIndex !== -1) {
        itens.splice(itemIndex, 1);
        document.getElementById(`card${itemId}`).remove();
        closeEditPostModal();
    }
}

// Função para atualizar o card visualmente
function atualizarCard(cardID, item) {
    const card = document.getElementById(cardID);
    const content = card.querySelector('.card-content');
    
    content.querySelector('h3').textContent = item.nome;
    content.querySelector('p').textContent = item.descricao;
    
    const mainImage = card.querySelector('img:not(.editor img)');
    mainImage.src = item.imagem;
    mainImage.alt = item.nome;
}

// Função para filtrar o catálogo com base na busca do usuário
function filterCatalog() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cardItems = document.querySelectorAll('.card-item');

    cardItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        item.style.display = title.includes(searchInput) ? 'block' : 'none';
    });
}

// Função para abrir o modal de adicionar post
function adicionarPost() {
    document.getElementById('addPostModal').style.display = 'flex';
}

// Função para fechar o modal de adicionar post
function closeAddPostModal() {
    document.getElementById('addPostModal').style.display = 'none';
}

// Função para fechar o modal de edição
function closeEditPostModal() {
    document.getElementById('editPostModal').style.display = 'none';
}

// Função para mostrar mensagem em modal
function showModalMessage(message) {
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modalMessage.style.display = 'block';

    setTimeout(() => {
        modalMessage.style.display = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
    // Função de busca no catálogo
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const cardItems = document.querySelectorAll('.card-item');
  
    searchButton.addEventListener('click', function () {
      const searchTerm = searchInput.value.toLowerCase();
      cardItems.forEach((item) => {
        const itemName = item.querySelector('h3').textContent.toLowerCase();
        if (itemName.includes(searchTerm)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  
    // Função ao clicar no botão "Eu quero isso!"
    const wantButtons = document.querySelectorAll('.card-item button');
    wantButtons.forEach((button) => {
      button.addEventListener('click', function () {
        alert('Você escolheu: ' + this.parentElement.querySelector('h3').textContent);
      });
    });
  });
  

// Inicializa o catálogo renderizando os itens
renderItems();

