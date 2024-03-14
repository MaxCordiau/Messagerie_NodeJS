// je vais utiliser expresse pour créer un serveur
// pour utiliser epress, je dois l'installer avec "npm i express"
const expresse = require('express');

// on vas utiliser socket.io pour la communication en temps réel entre le serveur et le client
// Pour l'installer, on utilise "npm i socket.io"
const { createServer } = require('node:http');
const { Server } = require('socket.io');
// fonction pour manipuler les chemins de fichier
const { join } = require('path');

// instancier l'application
const app = expresse();
// Créer un serveur http
const server = createServer(app);
// Créer une instance socket.io
const io = new Server(server);

// on vas gerer l'ajout de fichier statique (css, js, images, ect...)
app.use(expresse.static(join(__dirname, 'public')));

// le point d'entrée du serveur qui vas renvoyer le fichier index.html en front
app.get('/', (req, res) => {
    // Envoyer le fichier index.html
    res.sendFile(join(__dirname, 'index.html'));
});

// ont ecoute les connexion entrante
io.on('connection', (socket) => {
    console.log('un\ utilisateur c\'est connecté');
    // ont lui dit le type d'evenement qu'ont attend
    // ont ecoute les messages envoyer par le client
    socket.on('chat message', (msg, pseudo) => {
        // ont envoie le message à tout les clients connecté
        io.emit('chat message', msg, pseudo);
    });
    // ont ecoute les deconnexion
    socket.on('disconnect', () => {
        console.log('un\ utilisateur c\'est déconnecté');
    });
});

// Lancer le serveur sur le port 3000
server.listen(3000, () => {
    console.log("Serveur esr lancé sur le port 3000 à l'adresse http://localhost:3000/");
});
// avec la commande "node serveur.js", le serveur vas être lancé sur le port 3000