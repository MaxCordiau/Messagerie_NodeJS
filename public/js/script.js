const socket =io();

// ont s'occupe de nos selecteur
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const messages = document.querySelector('#messages');
const pseudo = document.querySelector('#pseudo');

// on vas traiter le formulaire
form.addEventListener('submit', (e) => {
    // e ont recuper l'evenement
    // preventDefault: ont vas empecher le formulaire de se soumettre en http classique(par default)
    e.preventDefault();
    // si le message est vide ont n'envoie pas le message'

    // if (!input.value || !pseudo.value) {
    //     return;
    // } 
    // ceci fait la même chose que la suite :
    if (!input.value) {
        return;
    }
    if (!pseudo.value) {
        return;
    }
    // on envoie le message au serveur et ont rensegner un pseudo
    socket.emit('chat message', pseudo.value, input.value);
    // ont vide le champ input
    input.value = '';
    // pseudo.value = '';
    // ont focus sur le champ input pour pouvoir utiliser la touche entrée pour envoyer le message(et ne pas etre obligé de cliquer sur le bouton envoyer)
    input.focus();
});

// // ont recuperer les messages est mettre a jour le DOM
// socket.on('chat message', (pseudo, msg) => {
//     const item = document.createElement('li');
//     const div = document.createElement('div');
//     div.textContent =pseudo + " : ";
//     item.textContent = msg;
//     messages.appendChild(div);
//     div.appendChild(item);
//     // ont vas scroller vers le bas pour voir le dernier message
//     window.scrollTo(0, document.body.scrollHeight);
// });
// ont recuperer les messages est mettre a jour le DOM
socket.on('chat message', (pseudo, msg) => {

    const div = document.createElement('div');
    const p = document.createElement('p');
    const item = document.createElement('li');

    
    div.textContent = p
    p.textContent = pseudo + " : ";
    item.textContent = msg;

    messages.appendChild(div);
    div.appendChild(p);
    div.appendChild(item);
    // ont vas scroller vers le bas pour voir le dernier message
    window.scrollTo(0, document.body.scrollHeight);
});
