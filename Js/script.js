
document.addEventListener('DOMContentLoaded', function () {
    const openFormButton = document.getElementById('open-form');
    const imageForm = document.getElementById('image-form');
    const imageInput = document.getElementById('image');

    openFormButton.addEventListener('click', function () {
        imageForm.classList.remove('hidden');
    });

    const imageFormSubmitButton = document.getElementById('save-image');
    imageFormSubmitButton.addEventListener('click', function (event) {
        event.preventDefault();
        addImage();
    });

    const selectImageButton = document.getElementById('select-image');
    selectImageButton.addEventListener('click', function () {
        imageInput.click();
    });

    imageInput.addEventListener('change', function () {
        const imageInputLabel = document.getElementById('image-label');
        imageInputLabel.textContent = imageInput.files[0].name;
    });

    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach(function (image) {
        image.addEventListener('click', function () {
            const title = image.getAttribute('data-title');
            const description = image.getAttribute('data-description');
            const weight = image.getAttribute('data-weight');
            const size = image.getAttribute('data-size');

            showImageDetails(title, description, weight, size);
        });
    });
});

// Função para limpar os campos do formulário de adicionar imagem
function clearImageForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('image').value = '';
}

// Função para adicionar imagem à galeria
function addImage() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageInput = document.getElementById('image');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageInput.files[0]);

    // Aqui você deve adicionar a lógica para realmente adicionar a imagem à galeria
    const gallery = document.getElementById('gallery');
    const imageURL = URL.createObjectURL(imageInput.files[0]);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('relative', 'cursor-pointer');

    const image = document.createElement('img');
    image.onload = function () {
        // Calculando o tamanho da imagem (largura x altura)
        const imageSize = image.naturalWidth + 'x' + image.naturalHeight;

        // Definindo o atributo de dados data-size com o tamanho da imagem
        image.setAttribute('data-size', imageSize);

        // Calculando o peso do arquivo da imagem em kilobytes (KB)
        const fileSizeKB = (imageInput.files[0].size / 1024).toFixed(2); // Peso da imagem em KB

        // Definindo o atributo de dados data-weight com o peso do arquivo em KB
        image.setAttribute('data-weight', fileSizeKB + ' KB');
    };
    image.src = imageURL;
    image.classList.add('gallery-image');
    image.setAttribute('data-title', title);
    image.setAttribute('data-description', description);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('absolute', 'top-2', 'right-2', 'bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded-full');
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', function () {
        confirmDelete(deleteButton);
    });

    imageContainer.appendChild(image);
    imageContainer.appendChild(deleteButton);
    gallery.appendChild(imageContainer);

    // Limpar os campos do formulário após adicionar a imagem
    clearImageForm();

    // Simular envio de formulário
    console.log('Título:', title);
    console.log('Descrição:', description);
    console.log('Imagem:', imageInput.files[0]);
}

// Função para mostrar detalhes da imagem
function showImageDetails(event) {
    const image = event.target;
    const title = image.getAttribute('data-title');
    const description = image.getAttribute('data-description');
    const weight = image.getAttribute('data-weight');
    const size = image.getAttribute('data-size');
    const source = image.src;

    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const popupWeight = document.getElementById('popup-weight');
    const popupSize = document.getElementById('popup-size');
    const popupImage = document.getElementById('popup-image');

    popupTitle.textContent = title;
    popupDescription.textContent = description;
    popupWeight.textContent = weight; // Exibir diretamente o peso do arquivo
    popupSize.textContent = size;
    popupImage.src = source;

    const popup = document.getElementById('image-details-popup');
    popup.classList.remove('hidden');
}


// Função para fechar o popup de detalhes da imagem
function closePopup() {
    const popup = document.getElementById('image-details-popup');
    popup.classList.add('hidden');
}

// Função para fechar o popup ao clicar fora dele
function closePopupOnClickOutside(event) {
    const popupContent = document.querySelector('.popup-content');
    if (!popupContent.contains(event.target)) {
        closePopup();
    }
}

// Função para abrir o formulário de editar imagem
function openEditForm() {
    const editForm = document.getElementById('edit-image-form');
    editForm.classList.remove('hidden');

    // Preencher campos do formulário com os dados da imagem
    const popupTitle = document.getElementById('popup-title').textContent;
    const popupDescription = document.getElementById('popup-description').textContent;
    document.getElementById('edit-title').value = popupTitle;
    document.getElementById('edit-description').value = popupDescription;
}

// Função para cancelar a edição
function cancelEdit() {
    const editForm = document.getElementById('edit-image-form');
    editForm.classList.add('hidden');
}

// Função para salvar alterações da imagem
function saveImageChanges() {
    const newTitle = document.getElementById('edit-title').value;
    const newDescription = document.getElementById('edit-description').value;

    // Atualizar dados da imagem
    document.getElementById('popup-title').textContent = newTitle;
    document.getElementById('popup-description').textContent = newDescription;

    // Fechar o formulário de edição
    cancelEdit();
}

// Função para confirmar exclusão da imagem
function confirmDelete(button) {
    if (confirm("Tem certeza que deseja excluir esta imagem?")) {
        // Lógica para deletar a imagem
        const imageContainer = button.parentNode;
        imageContainer.parentNode.removeChild(imageContainer);
    }
}

// Função para fechar o formulário de adicionar imagem
function closeAddImageForm() {
    const imageForm = document.getElementById('image-form');
    imageForm.classList.add('hidden');
}

// Função para validar o formulário de adicionar imagem
function validateForm() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    if (title.trim() === '' || description.trim() === '' || image.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    return true;
}

// Função para abrir o pop-up ao clicar em qualquer imagem
function showImageDetails(title, description, weight, size) {
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const popupWeight = document.getElementById('popup-weight');
    const popupSize = document.getElementById('popup-size');
    const popupImage = document.getElementById('popup-image');

    popupTitle.textContent = title;
    popupDescription.textContent = description;
    popupWeight.textContent = weight;
    popupSize.textContent = size;

    const popup = document.getElementById('image-details-popup');
    popupImage.src = event.target.src;
    popup.classList.remove('hidden');
}
// Função para mostrar detalhes da imagem no pop-up
function showImageDetails(title, description, weight, size) {
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const popupWeight = document.getElementById('popup-weight');
    const popupSize = document.getElementById('popup-size');
    const popupImage = document.getElementById('popup-image');

    popupTitle.textContent = title;
    popupDescription.textContent = description;
    popupWeight.textContent = weight;
    popupSize.textContent = size;

    const popup = document.getElementById('image-details-popup');
    popupImage.src = event.target.src;
    popup.classList.remove('hidden');
}
document.getElementById('gallery').addEventListener('click', function (event) {
    if (event.target.classList.contains('gallery-image')) {
        const title = event.target.getAttribute('data-title');
        const description = event.target.getAttribute('data-description');
        const weight = event.target.getAttribute('data-weight');
        const size = event.target.getAttribute('data-size');

        showImageDetails(title, description, weight, size);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const subFolders = document.getElementById('subfolders');

    galleryImages.forEach(function (image) {
        const title = image.getAttribute('data-title');
        const description = image.getAttribute('data-description');

        const listItem = document.createElement('li');
        listItem.innerHTML = `
<a href="#" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700">
    <span class="mr-2"><i class="fas fa-image"></i></span>
    ${title}
</a>
`;

        subFolders.appendChild(listItem);
    });
});

// Função para alternar a exibição das subpastas
function toggleSubFolders(event) {
    const subFolders = document.getElementById('subfolders');
    subFolders.classList.toggle('hidden');
}
// Função para adicionar imagem à galeria e como subpasta na barra lateral
function addImage() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageInput = document.getElementById('image');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageInput.files[0]);

    // Aqui você deve adicionar a lógica para realmente adicionar a imagem à galeria
    const gallery = document.getElementById('gallery');
    const imageURL = URL.createObjectURL(imageInput.files[0]);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('relative', 'cursor-pointer');

    const image = document.createElement('img');
    image.onload = function () {
        // Calculando o tamanho da imagem (largura x altura)
        const imageSize = image.naturalWidth + 'x' + image.naturalHeight;

        // Definindo o atributo de dados data-size com o tamanho da imagem
        image.setAttribute('data-size', imageSize);

        // Calculando o peso do arquivo da imagem em kilobytes (KB)
        const fileSizeKB = (imageInput.files[0].size / 1024).toFixed(2); // Peso da imagem em KB

        // Definindo o atributo de dados data-weight com o peso do arquivo em KB
        image.setAttribute('data-weight', fileSizeKB + ' KB');
    };
    image.src = imageURL;
    image.classList.add('gallery-image');
    image.setAttribute('data-title', title);
    image.setAttribute('data-description', description);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('absolute', 'top-2', 'right-2', 'bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded-full');
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', function () {
        confirmDelete(deleteButton);
    });

    imageContainer.appendChild(image);
    imageContainer.appendChild(deleteButton);
    gallery.appendChild(imageContainer);

    // Adicionar a imagem como subpasta na barra lateral
    const subFolders = document.getElementById('subfolders');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
<a href="#" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700">
<span class="mr-2"><i class="fas fa-image"></i></span>
${title}
</a>
`;
    subFolders.appendChild(listItem);

    // Limpar os campos do formulário após adicionar a imagem
    clearImageForm();

    // Simular envio de formulário
    console.log('Título:', title);
    console.log('Descrição:', description);
    console.log('Imagem:', imageInput.files[0]);
}

// Função para confirmar exclusão da imagem
function confirmDelete(button) {
    if (confirm("Tem certeza que deseja excluir esta imagem?")) {
        // Lógica para deletar a imagem
        const imageContainer = button.parentNode;
        const gallery = document.getElementById('gallery');
        gallery.removeChild(imageContainer);

        // Remover a subpasta correspondente na barra lateral
        const subFolders = document.getElementById('subfolders');
        const title = imageContainer.querySelector('.gallery-image').getAttribute('data-title');
        const subFolderItems = subFolders.querySelectorAll('a');
        subFolderItems.forEach(item => {
            if (item.textContent.trim() === title) {
                item.parentNode.removeChild(item);
            }
        });
    }
}

function searchMenu() {
    // Obtém o valor digitado no campo de pesquisa
    var searchText = document.getElementById("search-input").value.toLowerCase();

    // Obtém todos os itens da lista no menu lateral
    var menuItems = document.querySelectorAll('.menu-lateral a');

    // Se o campo de pesquisa estiver vazio, remover destaque de todos os itens
    if (searchText === '') {
        menuItems.forEach(function (item) {
            item.classList.remove('highlight');
        });
        return; // Sai da função, evitando a iteração desnecessária
    }

    // Itera sobre cada item da lista no menu lateral
    menuItems.forEach(function (item) {
        // Obtém o título do item
        var title = item.textContent.toLowerCase();

        // Verifica se o título do item contém o texto de pesquisa
        if (title.includes(searchText)) {
            // Se contiver, adiciona a classe 'highlight' para destacar o título
            item.classList.add('highlight');

            // Abre o submenu 'Fotos'
            document.getElementById('subfolders').classList.remove('hidden');
        } else {
            // Caso contrário, remove a classe 'highlight'
            item.classList.remove('highlight');
        }
    });
}

// Função para filtrar as imagens na galeria com base no título da pesquisa
function filtrarImagensNaGaleria(query) {
    const galeria = document.getElementById('gallery');
    const imagens = galeria.querySelectorAll('.gallery-image');

    imagens.forEach(function (imagem) {
        const titulo = imagem.getAttribute('data-title').toLowerCase();
        const container = imagem.parentNode;

        if (titulo.includes(query.toLowerCase())) {
            container.style.display = 'block'; // Exibir o contêiner da imagem
        } else {
            container.style.display = 'none'; // Ocultar o contêiner da imagem
        }
    });
}

// Adiciona um ouvinte de eventos de entrada ao campo de pesquisa
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function () {
    filtrarImagensNaGaleria(this.value);
});

// Função para exibir/ocultar o menu lateral em dispositivos móveis
function toggleMobileMenu() {
    var menu = document.querySelector('.menu-lateral');
    menu.classList.toggle('menu-lateral-visivel');
}

// Ocultar o menu lateral inicialmente
document.addEventListener('DOMContentLoaded', function () {
    var menu = document.querySelector('.menu-lateral');
    menu.classList.add('menu-lateral-oculto');
});

// Adicionar evento de clique ao ícone do menu hamburger para mostrar/ocultar o menu lateral
document.querySelector('.hamburger').addEventListener('click', function () {
    toggleMobileMenu();
});

function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    var content = document.getElementById("content");

    sidebar.classList.toggle("hidden");
    if (sidebar.classList.contains("hidden")) {
        content.classList.remove("md:pl-64", "lg:pl-80");
    } else {
        content.classList.add("md:pl-64", "lg:pl-80");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Variáveis para o menu lateral e o botão hamburger
    var menuLateral = document.querySelector('.menu-lateral');
    var hamburger = document.querySelector('.hamburger');

    // Função para alternar entre abrir e fechar o menu lateral quando o botão hamburger é clicado
    hamburger.addEventListener('click', function () {
        // Verifica se o menu lateral está aberto ou fechado e alterna o estado
        if (menuLateral.classList.contains('menu-lateral-aberto')) {
            // Fecha o menu lateral
            menuLateral.classList.remove('menu-lateral-aberto');
            // Atualiza o ícone do hamburger
            hamburger.innerText = 'menu';
        } else {
            // Abre o menu lateral
            menuLateral.classList.add('menu-lateral-aberto');
            // Atualiza o ícone do hamburger
            hamburger.innerText = 'close';
        }
    });
});


function closePopup() {
    var popup = document.getElementById('image-details-popup');
    popup.classList.add('shrink'); // Adiciona a classe de animação
    setTimeout(function () {
        popup.classList.remove('shrink'); // Remove a classe após a animação
        popup.classList.add('hidden'); // Oculta o pop-up
    }, 500); // Tempo da animação em milissegundos (0.5s)
}

function confirmDelete(button) {
    if (confirm("Tem certeza de que deseja excluir esta imagem?")) {
        var imageContainer = button.parentElement;
        imageContainer.classList.add('fade-out'); // Adiciona a classe de animação
        setTimeout(function () {
            imageContainer.remove(); // Remove o elemento após a animação
        }, 500); // Tempo da animação em milissegundos (0.5s)
    }
}

// Adicione um novo seletor para dispositivos móveis
document.querySelectorAll('.popup-trigger-mobile').forEach(item => {
    item.addEventListener('click', event => {
        // Exiba o pop-up de detalhes da imagem
        openImagePopup(item);
    });
});

// Função para fechar o menu lateral
function closeSideMenu() {
    var sideMenu = document.getElementById('menu-lateral');
    sideMenu.classList.remove('menu-open');
}

// Adiciona um event listener para detectar cliques fora do menu lateral ou em elementos que o fecham
document.addEventListener('click', function (event) {
    var sideMenu = document.getElementById('menu-lateral');
    var isClickInsideMenu = sideMenu.contains(event.target);
    if (!isClickInsideMenu) {
        closeSideMenu();
    }
});

// Evento de clique para fechar o menu lateral quando clicar em "Adicionar Imagem"
document.getElementById('open-form').addEventListener('click', closeSideMenu);

// Evento de clique para fechar o menu lateral quando clicar em algum botão de exclusão de imagem na galeria
var deleteButtons = document.querySelectorAll('.gallery-image button');
deleteButtons.forEach(function (button) {
    button.addEventListener('click', closeSideMenu);
});


