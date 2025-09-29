// Citations d'amour
const loveQuotes = [
  "L'amour, c'est être idiot ensemble. - Paul Valéry",
  "Aimer, ce n'est pas se regarder l'un l'autre, c'est regarder ensemble dans la même direction. - Antoine de Saint-Exupéry",
  "On n'aime que ce qu'on ne possède pas tout entier. - Marcel Proust",
  "Le véritable amour ne se voit pas avec les yeux, mais avec le cœur. - William Shakespeare",
  "Il n'y a qu'un bonheur dans la vie, c'est d'aimer et d'être aimé. - George Sand",
  "Miminella, tu es la plus belle chose qui me soit arrivée 💖",
  "Chaque jour avec toi est un cadeau que je chéris",
  "Tu es mon aujourd'hui et tous mes demains",
  "Dans tes bras, j'ai trouvé ma maison",
  "Tu es la réponse à toutes mes prières",
  "Mon amour pour toi grandit chaque jour un peu plus",
  "Avec toi, même les moments ordinaires deviennent extraordinaires",
  "Tu es mon âme sœur, ma meilleure amie, mon tout",
  "Ensemble, nous sommes invincibles 💪💖",
  "Tu es le sourire que je cherche chaque matin",
  "Notre amour est plus fort que la distance",
  "Tu es ma personne, pour toujours",
  "Aimer, c'est trouver sa richesse hors de soi. - Alain",
  "L'amour est la poésie des sens. - Honoré de Balzac",
  "La mesure de l'amour, c'est d'aimer sans mesure. - Saint Augustin",
  "Tous les jours avec toi sont des aventures",
  "Tu es mon coup de foudre permanent",
  "Notre histoire d'amour est mon conte de fées préféré",
  "Tu fais battre mon cœur plus vite qu'un Monchhichi qui court 🐵💕",
  "Chaque moment loin de toi me rapproche de nos retrouvailles"
];

// Fonction pour obtenir la citation du jour
function getDailyQuote() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const index = dayOfYear % loveQuotes.length;
  return loveQuotes[index];
}

// Fonction pour obtenir une citation aléatoire
function getRandomQuote() {
  return loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
}

// Charger la citation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  const quoteElement = document.getElementById('daily-quote-text');
  if (quoteElement) {
    quoteElement.textContent = getDailyQuote();
  }
});

// Fonction globale pour rafraîchir la citation
window.refreshQuote = function() {
  const quoteElement = document.getElementById('daily-quote-text');
  if (quoteElement) {
    quoteElement.style.transition = 'opacity 0.3s, transform 0.3s';
    quoteElement.style.opacity = '0';
    quoteElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      quoteElement.textContent = getRandomQuote();
      quoteElement.style.opacity = '1';
      quoteElement.style.transform = 'translateY(0)';
    }, 300);
  }
};