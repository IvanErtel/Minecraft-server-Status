import serverList from './serversData.js';

document.addEventListener('DOMContentLoaded', function () {

    const serverListContainer = document.querySelector('.server-list');

    serverList.forEach(server => {
        // Hacer la solicitud a la API para obtener el estado del servidor
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
                console.log(data);
                serverListContainer.appendChild(serverCard);
            })
            .catch(error => {
                console.error(`Error al obtener datos del servidor ${server}:`, error);
            });
    });
});



// document.addEventListener('DOMContentLoaded', function () {
//     const serverListContainer = document.querySelector('.server-list');

//     Promise.all(serverList.map(server => fetch(`https://api.mcsrvstat.us/3/${server}`).then(response => response.json())))
//         .then(serverDataArray => {
//             // Ordenamos la lista de servidores por la cantidad de jugadores en línea (de mayor a menor)
//             serverDataArray.sort((a, b) => b.players.online - a.players.online);

//             serverDataArray.forEach(data => {
//                 const serverCard = document.createElement('div');
//                 serverCard.classList.add('server-card');

//                 serverCard.innerHTML = `
//                     <img src="${data.icon || 'imagen_predeterminada.png'}" alt="${data.ip}:${data.port}">
//                     <p>Server: ${data.ip}:${data.port}</p>
//                     <p>Jugadores: ${data.players.online} / ${data.players.max}</p>
//                     <p class="server-status ${data.online ? 'server-online' : 'server-offline'}">${data.online ? 'Online' : 'Offline'}</p>
//                 `;

//                 serverListContainer.appendChild(serverCard);
//             });
//         })
//         .catch(error => {
//             console.error(`Error al obtener datos de los servidores:`, error);
//         });
// });
