
document.addEventListener('DOMContentLoaded', function () {
    const serverList = [
        "hub.opblocks.com",
        "ms.mysticmc.co",
        "join.insanitycraft.net",
        "mc.advancius.net",
        "play.vulengate.com",
        "org.mc-complex.com",
        "play.pokefind.co",
        "org.earthmc.net",
        "hub.opblocks.com",
        "play.firemc.fun",
        "play.anubismc.com",
        "ms.pixelmonrealms.com",
        "mc.applecraft.org",
        "hub.penguin.gg",
        "mcs.mchub.com",
        "org.cosmosmc.org",
        "hub.neocubest.com",
        "ms.blossomcraft.org",
        "mc.supercraft.fun",
        "ms.loverfella.com",
        "ms.netherite.gg",
        "nationsglory.com",
        "org.lifesteal.rip",
        "play.smashmc.co",
        "hub.fadecloud.com",
        "play.applemc.fun",
        "join.insanitycraft.net",
        "play.pokesaga.org",
        "skyblock.net",
        "play.vulengate.com",
        "play.jackpotmc.com",
        "play.minetop.fun",
        "play.rinaorc.com",
        "play.freshsmp.fun",
        "one.lemoncloud.net",
        "play.invadedlands.net",
        "mc.lotc.co",
        "mc.vortexnetwork.net",
        "play.boxpvp.net",
        "server.mcs.gg",
        "ms.pokehub.org",
        "pokecentral.org",
        "ms.simplesurvival.gg",
        "org.oneblockmc.com",
        "mc.leonemc.net"
    ];

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

                serverListContainer.appendChild(serverCard);
            })
            .catch(error => {
                console.error(`Error al obtener datos del servidor ${server}:`, error);
            });
    });
});
