// Gestion du livre d'or
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('message-form');
  const messagesList = document.getElementById('messages-list');
  const noMessages = document.getElementById('no-messages');

  if (!form) return;

  // Charger les messages existants
  loadMessages();

  // Soumettre un nouveau message
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const author = document.getElementById('author-name').value.trim();
    const text = document.getElementById('message-text').value.trim();
    const emoji = document.getElementById('message-emoji').value;

    if (!author || !text) return;

    const message = {
      id: Date.now(),
      author: author,
      text: text,
      emoji: emoji,
      date: new Date().toISOString()
    };

    // Sauvegarder le message
    saveMessage(message);

    // Réinitialiser le formulaire
    form.reset();

    // Afficher une confirmation
    showNotification('Message ajouté avec succès ! 💖');

    // Recharger les messages
    loadMessages();
  });

  function saveMessage(message) {
    let messages = getMessages();
    messages.unshift(message); // Ajouter au début
    localStorage.setItem('loveMessages', JSON.stringify(messages));
  }

  function getMessages() {
    const stored = localStorage.getItem('loveMessages');
    return stored ? JSON.parse(stored) : [];
  }

  function loadMessages() {
    const messages = getMessages();

    if (messages.length === 0) {
      noMessages.style.display = 'block';
      messagesList.innerHTML = '';
      return;
    }

    noMessages.style.display = 'none';
    messagesList.innerHTML = '';

    messages.forEach(msg => {
      const messageCard = document.createElement('div');
      messageCard.className = 'message-card';
      messageCard.style.animationDelay = '0s';

      const date = new Date(msg.date);
      const formattedDate = date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      messageCard.innerHTML = `
        <div class="message-header">
          <span class="message-emoji">${msg.emoji}</span>
          <div class="message-meta">
            <span class="message-author">${msg.author}</span>
            <span class="message-date">${formattedDate}</span>
          </div>
          <button class="message-delete" onclick="deleteMessage(${msg.id})" title="Supprimer">🗑️</button>
        </div>
        <div class="message-body">${msg.text}</div>
      `;

      messagesList.appendChild(messageCard);
    });
  }

  // Fonction globale pour supprimer un message
  window.deleteMessage = function(id) {
    if (!confirm('Veux-tu vraiment supprimer ce message ?')) return;

    let messages = getMessages();
    messages = messages.filter(m => m.id !== id);
    localStorage.setItem('loveMessages', JSON.stringify(messages));
    loadMessages();
    showNotification('Message supprimé');
  };

  function showNotification(text) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = text;
    document.body.appendChild(notif);

    setTimeout(() => {
      notif.classList.add('show');
    }, 100);

    setTimeout(() => {
      notif.classList.remove('show');
      setTimeout(() => notif.remove(), 300);
    }, 3000);
  }
});