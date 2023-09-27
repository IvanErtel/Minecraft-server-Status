import serverList from './serversData.js';

document.addEventListener('DOMContentLoaded', function () {
    const serverListContainer = document.querySelector('.server-list');
    const loadMoreButton = document.getElementById('load-more-button');
    const searchInput = document.getElementById('search-input'); // Agregamos un input de búsqueda
    const searchButton = document.getElementById('search-button'); // Agregamos un botón de búsqueda

    // Función para mostrar los servidores que coinciden con la búsqueda
    function filterServers(searchTerm) {
        serverListContainer.innerHTML = ''; // Limpiamos la lista de servidores

        serverList.forEach(server => {
            if (server.includes(searchTerm)) { // Comparamos el término de búsqueda con el nombre del servidor
                fetch(`https://api.mcsrvstat.us/3/${server}`)
                    .then(response => response.json())
                    .then(data => {
                        const serverCard = document.createElement('div');
                        serverCard.classList.add('server-card');

                        serverCard.innerHTML = `
                            <img src="${data.icon || 'imagen_predeterminada.png'}" alt="${server}">
                            <p>Server: ${server}</p>
                            <p>Jugadores: ${data.players.online} / ${data.players.max}</p>
                            <p class="server-status ${data.online ? 'server-online' : 'server-offline'}">${data.online ? 'Online' : 'Offline'}</p>
                        `;
                        serverListContainer.appendChild(serverCard);
                    })
                    .catch(error => {
                        console.error(`Error al obtener datos del servidor ${server}:`, error);
                    });
            }
        });
    }

    // Manejador de evento para el botón de búsqueda
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        filterServers(searchTerm);
    });

    // Manejador de evento para la tecla "Enter" en el input de búsqueda
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            filterServers(searchTerm);
        }
    });

    // Cargar todos los servidores al principio
    filterServers('');

});
