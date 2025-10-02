document.addEventListener('DOMContentLoaded', () => {
  // Navigation mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Fermer le menu au clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Thème sombre/clair
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      
      if (document.body.classList.contains('dark-theme')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
      } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
      }
    });

    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      themeIcon.textContent = '☀️';
    }
  }

  // Citations aléatoires
  const citations = [
    "Miminella, tu es mon rayon de soleil 🌸",
    "Chaque jour avec toi est plus doux qu'un Monchhichi 🐵💕",
    "À tes côtés, tout devient magique ✨",
    "Mon cœur bat pour toi, Ornella ❤️",
    "Tu es ma joie quotidienne, ma petite Miminella 💖"
  ];

  const citationEl = document.getElementById('citation');
  if (citationEl) {
    const randomIndex = Math.floor(Math.random() * citations.length);
    citationEl.textContent = citations[randomIndex];
  }

  // Cœur secret
  const coeurSecret = document.getElementById('coeur-secret');
  if (coeurSecret) {
    coeurSecret.addEventListener('click', () => {
      window.location.href = 'secret.html';
    });
  }

  // Bouton page secrète bonus
  const codeBtn = document.getElementById('code-secret-btn');
  if (codeBtn) {
    codeBtn.addEventListener('click', () => {
      const code = prompt('💝 Indice : Evenement recent ou tu a beaucoup stresser (jj/mm/aaaa) \n');
      if (code && code.toLowerCase() === '310725') {
        window.location.href = 'secret2.html';
      } else if (code) {
        alert('Ce n\'est pas le bon code... Réfléchis bien à l\'indice ! 💭');
      }
    });
  }

  // TIMERS
  // Date de début en heure de Paris (France)
  const dateDebut = new Date('2025-04-24T00:00:00+02:00'); // +02:00 = heure d'été à Paris
  const prochainEvent = { month: 12, day: 24, hour: 0, minute: 0 };
  const ornellaBirthday = { month: 10, day: 25, hour: 0, minute: 0 };
  const aaronBirthday = { month: 2, day: 26, hour: 0, minute: 0 };

  function formatDuration(ms) {
    if (ms < 0) ms = 0;
    
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    ms -= days * (1000 * 60 * 60 * 24);
    
    const hours = Math.floor(ms / (1000 * 60 * 60));
    ms -= hours * (1000 * 60 * 60);
    
    const minutes = Math.floor(ms / (1000 * 60));
    ms -= minutes * (1000 * 60);
    
    const seconds = Math.floor(ms / 1000);
    
    return `${days}j ${hours}h ${minutes}m ${seconds}s`;
  }

  function getNextOccurrence(month, day, hour = 0, minute = 0) {
    const now = new Date();
    let next = new Date(now.getFullYear(), month - 1, day, hour, minute);
    
    if (next <= now) {
      next = new Date(now.getFullYear() + 1, month - 1, day, hour, minute);
    }
    
    return next;
  }

  function updateTimers() {
    const now = new Date();
    
    // Temps écoulé depuis le début
    const compteurEl = document.getElementById('compteur');
    if (compteurEl) {
      const elapsed = now - dateDebut;
      compteurEl.textContent = formatDuration(elapsed);
    }

    // Prochain événement
    const nextEventEl = document.getElementById('next-event');
    if (nextEventEl) {
      const nextEvent = getNextOccurrence(prochainEvent.month, prochainEvent.day);
      const remaining = nextEvent - now;
      nextEventEl.textContent = formatDuration(remaining);
    }

    // Anniversaires
    const ornellaEl = document.getElementById('ornella-birthday');
    if (ornellaEl) {
      const nextOrnella = getNextOccurrence(ornellaBirthday.month, ornellaBirthday.day);
      const remaining = nextOrnella - now;
      ornellaEl.textContent = formatDuration(remaining);
    }

    const aaronEl = document.getElementById('aaron-birthday');
    if (aaronEl) {
      const nextAaron = getNextOccurrence(aaronBirthday.month, aaronBirthday.day);
      const remaining = nextAaron - now;
      aaronEl.textContent = formatDuration(remaining);
    }
  }

  // Mettre à jour les timers toutes les secondes
  updateTimers();
  setInterval(updateTimers, 1000);

  // GALERIE & LIGHTBOX
  const galleryImgs = document.querySelectorAll('.gallery img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox .close');

  if (galleryImgs.length > 0 && lightbox && lightboxImg) {
    // Ajouter un délai d'animation pour chaque image
    galleryImgs.forEach((img, index) => {
      img.style.animationDelay = `${index * 0.1}s`;
      
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hidden');
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
      }
    });
  }

  // MULTI-JEUX
  const jeux = [
    { id: 'game-area', label: 'Attrape-cœurs 💖' },
    { id: 'quiz-game', label: 'Quiz d\'amour 💘' },
    { id: 'puzzle-game', label: 'Puzzle d\'amour 🧩' },
    { id: 'memory-game', label: 'Memory cœur 🧠' }
  ];

  const selectJeu = document.getElementById('select-jeu');
  
  if (selectJeu) {
    jeux.forEach(jeu => {
      const option = document.createElement('option');
      option.value = jeu.id;
      option.textContent = jeu.label;
      selectJeu.appendChild(option);
    });

    selectJeu.addEventListener('change', function() {
      jeux.forEach(jeu => {
        const element = document.getElementById(jeu.id);
        if (element) {
          element.style.display = (jeu.id === this.value) ? 'block' : 'none';
        }
      });

      // Initialiser le jeu sélectionné
      if (this.value === 'quiz-game') {
        initQuizGame();
      } else if (this.value === 'puzzle-game') {
        initPuzzleGame();
      } else if (this.value === 'memory-game') {
        initMemoryGame();
      }
    });

    // Afficher le premier jeu par défaut
    selectJeu.value = 'game-area';
    selectJeu.dispatchEvent(new Event('change'));
  }

  // JEU ATTRAPE-CŒURS
  const gameArea = document.getElementById('game-area');
  const player = document.getElementById('player');
  const scoreDisplay = document.getElementById('score');
  const winMessage = document.getElementById('win-message');
  
  let gameScore = 0;
  let playerX = 0;
  let gameInterval = null;
  
  if (gameArea && player) {
    // Initialiser la position du joueur
    function initPlayer() {
      playerX = gameArea.offsetWidth / 2 - 30;
      player.style.left = playerX + 'px';
    }
    
    initPlayer();
    window.addEventListener('resize', initPlayer);

    document.addEventListener('keydown', (e) => {
      if (!gameArea || gameArea.style.display === 'none' || gameArea.style.display === 'block') {
        const currentDisplay = window.getComputedStyle(gameArea).display;
        if (currentDisplay === 'none') return;
      }

      if (e.key === 'ArrowLeft' && playerX > 0) {
        playerX -= 25;
      } else if (e.key === 'ArrowRight' && playerX < gameArea.offsetWidth - 60) {
        playerX += 25;
      }
      
      player.style.left = playerX + 'px';
    });

    function createFallingHeart() {
      const currentDisplay = window.getComputedStyle(gameArea).display;
      if (currentDisplay === 'none') return;

      const heart = document.createElement('div');
      heart.style.cssText = `
        position: absolute;
        top: 0;
        font-size: 2rem;
        animation: floatHeart 4s linear;
      `;
      heart.textContent = '💖';
      heart.style.left = Math.random() * (gameArea.offsetWidth - 40) + 'px';
      gameArea.appendChild(heart);

      const checkCollision = setInterval(() => {
        if (!heart.parentElement) {
          clearInterval(checkCollision);
          return;
        }

        const heartRect = heart.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        const gameRect = gameArea.getBoundingClientRect();

        if (
          heartRect.bottom >= playerRect.top &&
          heartRect.left < playerRect.right &&
          heartRect.right > playerRect.left &&
          heartRect.top < playerRect.bottom
        ) {
          gameScore++;
          if (scoreDisplay) scoreDisplay.textContent = 'Score : ' + gameScore;
          heart.remove();
          clearInterval(checkCollision);

          if (gameScore >= 25 && winMessage) {
            winMessage.classList.remove('hidden');
          }
        }

        if (heartRect.top > gameRect.bottom) {
          heart.remove();
          clearInterval(checkCollision);
        }
      }, 50);

      setTimeout(() => {
        if (heart.parentElement) heart.remove();
        clearInterval(checkCollision);
      }, 4500);
    }

    // Démarrer le jeu
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(createFallingHeart, 1200);
  }

  // JEU QUIZ D'AMOUR
  function initQuizGame() {
    const quizGame = document.getElementById('quiz-game');
    if (!quizGame) return;

    quizGame.innerHTML = `
      <h2 style="text-align:center; color:var(--accent); margin-bottom:1.5rem;">Quiz d'amour 💘</h2>
      <form id="quiz-form">
        <label>
          <strong>Quelle est la date de notre premier bisou ?</strong><br>
          <input type="radio" name="q1" value="24 avril"> 24 avril<br>
          <input type="radio" name="q1" value="15 avril"> 15 avril<br>
          <input type="radio" name="q1" value="27 aout"> 27 août
        </label>
        
        <label>
          <strong>Quel animal est notre mascotte ?</strong><br>
          <input type="radio" name="q2" value="Monchhichi"> Monchhichi<br>
          <input type="radio" name="q2" value="Chat"> Chat<br>
          <input type="radio" name="q2" value="Lapin"> Lapin
        </label>
        
        <label>
          <strong>À quelle date est l'anniversaire d'Ornella ?</strong><br>
          <input type="radio" name="q3" value="25 octobre"> 25 octobre<br>
          <input type="radio" name="q3" value="26 février"> 26 février<br>
          <input type="radio" name="q3" value="24 décembre"> 24 décembre
        </label>
        
        <button type="submit">Valider mes réponses</button>
        <div id="quiz-result" style="display:none;"></div>
      </form>
    `;

    document.getElementById('quiz-form').onsubmit = function(e) {
      e.preventDefault();
      let score = 0;
      
      if (this.q1.value === '24 avril') score++;
      if (this.q2.value === 'Monchhichi') score++;
      if (this.q3.value === '25 octobre') score++;
      
      const result = document.getElementById('quiz-result');
      result.style.display = 'block';
      
      if (score === 3) {
        result.textContent = '🎉 Parfait ! Tu es incollable sur notre amour ! 💖';
      } else {
        result.textContent = `Tu as eu ${score}/3 bonnes réponses. Réessaie ! 😊`;
      }
    };
  }

  // JEU CLIC RAPIDE
  function initClickGame() {
    const clickGame = document.getElementById('click-game');
    if (!clickGame) return;

    clickGame.innerHTML = `
      <h2 style="text-align:center; color:var(--accent); margin-bottom:1rem;">Clic rapide 💥</h2>
      <p style="text-align:center; margin-bottom:1.5rem;">Clique sur le plus de cœurs possible en 10 secondes !</p>
      <button id="start-click" style="display:block; margin:0 auto 1rem; background:var(--accent); color:white; border:none; padding:1rem 2rem; border-radius:50px; cursor:pointer; font-weight:600;">Démarrer</button>
      <div id="click-zone" style="min-height:200px; display:flex; flex-wrap:wrap; justify-content:center; gap:10px; margin-bottom:1rem;"></div>
      <div id="click-score" style="text-align:center; font-size:1.2rem; font-weight:600; color:var(--accent);"></div>
    `;

    document.getElementById('start-click').onclick = function() {
      let clickScore = 0;
      let timeLeft = 10;
      const zone = document.getElementById('click-zone');
      const scoreEl = document.getElementById('click-score');
      
      zone.innerHTML = '';
      scoreEl.textContent = 'Temps restant : 10s';
      this.disabled = true;

      const heartInterval = setInterval(() => {
        const heart = document.createElement('span');
        heart.textContent = '💖';
        heart.style.fontSize = '2.5rem';
        heart.style.cursor = 'pointer';
        heart.style.transition = 'transform 0.2s';
        
        heart.onmouseover = function() {
          this.style.transform = 'scale(1.2)';
        };
        heart.onmouseout = function() {
          this.style.transform = 'scale(1)';
        };
        
        heart.onclick = function() {
          clickScore++;
          this.remove();
        };
        
        zone.appendChild(heart);
      }, 300);

      const timer = setInterval(() => {
        timeLeft--;
        scoreEl.textContent = `Temps restant : ${timeLeft}s`;
        
        if (timeLeft <= 0) {
          clearInterval(heartInterval);
          clearInterval(timer);
          zone.innerHTML = '';
          scoreEl.textContent = `🎉 Score final : ${clickScore} cœurs attrapés ! 💖`;
          document.getElementById('start-click').disabled = false;
        }
      }, 1000);
    };
  }

  // JEU MEMORY
  function initMemoryGame() {
    const memGame = document.getElementById('memory-game');
    if (!memGame) return;

    memGame.innerHTML = `
      <h2 style="text-align:center; color:var(--accent); margin-bottom:1rem;">Memory cœur 🧠</h2>
      <p style="text-align:center; margin-bottom:1.5rem;">Retrouve les paires de cœurs !</p>
      <div id="memory-cards" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; max-width:400px; margin:0 auto;"></div>
    `;

    const hearts = ['💖', '💗', '❤️', '💞', '🧡', '💜'];
    const deck = [...hearts, ...hearts].sort(() => Math.random() - 0.5);
    const cardsZone = document.getElementById('memory-cards');
    
    let firstCard = null;
    let secondCard = null;
    let matchedPairs = 0;
    let canClick = true;

    deck.forEach((heart, index) => {
      const card = document.createElement('button');
      card.textContent = '❔';
      card.style.cssText = `
        font-size:2.5rem;
        padding:1rem;
        background:var(--bg-glass);
        border:2px solid var(--accent);
        border-radius:15px;
        cursor:pointer;
        transition:all 0.3s;
        aspect-ratio:1;
      `;
      
      card.dataset.index = index;
      card.dataset.value = heart;

      card.onclick = function() {
        if (!canClick || this.disabled || this === firstCard) return;

        this.textContent = heart;
        this.style.background = 'var(--accent)';

        if (!firstCard) {
          firstCard = this;
        } else {
          secondCard = this;
          canClick = false;

          setTimeout(() => {
            if (firstCard.dataset.value === secondCard.dataset.value) {
              firstCard.disabled = true;
              secondCard.disabled = true;
              firstCard.style.opacity = '0.5';
              secondCard.style.opacity = '0.5';
              matchedPairs++;

              if (matchedPairs === hearts.length) {
                setTimeout(() => {
                  cardsZone.innerHTML = '<p style="text-align:center; font-size:1.5rem; color:var(--accent); grid-column:1/-1;">🎉 Bravo ! Toutes les paires trouvées ! 💕</p>';
                }, 500);
              }
            } else {
              firstCard.textContent = '❔';
              secondCard.textContent = '❔';
              firstCard.style.background = 'var(--bg-glass)';
              secondCard.style.background = 'var(--bg-glass)';
            }

            firstCard = null;
            secondCard = null;
            canClick = true;
          }, 800);
        }
      };

      cardsZone.appendChild(card);
    });
  }

  // LETTRE SECRÈTE (effet machine à écrire)
  const letterElement = document.getElementById('secret-letter');
  
  if (letterElement) {
    const letterText = `Ma douce Miminella 🐵💖,

Chaque instant passé avec toi est un moment génial que je garde précieusement dans mon cœur.  
Ton sourire illumine mes journées, et ton amour rend ma vie magique.  

Je promets d'être toujours là pour toi, aujourd'hui, demain et pour toujours surtout à jamais!  
Tu es ma moitié que je recherchais depuis ma naissance et je t'ai enfin trouvée, alors je ne vais plus te lâcher.
Tu es aussi et surtout, mon bonheur infini. 

Ton MimiAaron 💕`;

    let charIndex = 0;

    function typeWriter() {
      if (charIndex < letterText.length) {
        letterElement.textContent += letterText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
      } else {
        setTimeout(triggerSurprise, 500);
      }
    }

    function triggerSurprise() {
      // Créer des cœurs qui tombent
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.className = 'falling-heart';
          heart.textContent = ['❤️', '💖', '💞', '💗'][Math.floor(Math.random() * 4)];
          heart.style.left = Math.random() * 100 + 'vw';
          heart.style.fontSize = (20 + Math.random() * 20) + 'px';
          document.body.appendChild(heart);

          setTimeout(() => heart.remove(), 4000);
        }, i * 200);
      }

      // Afficher le message d'amour
      setTimeout(() => {
        const loveMsg = document.createElement('div');
        loveMsg.id = 'love-message';
        loveMsg.textContent = 'Je t\'aime Miminella 💖';
        document.body.appendChild(loveMsg);

        setTimeout(() => loveMsg.remove(), 6000);
      }, 1000);
    }

    typeWriter();
  }

  // Ajouter des particules animées au fond
  createParticles();

  function createParticles() {
    const particlesBg = document.querySelector('.particles-bg');
    if (!particlesBg) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: var(--accent);
        opacity: ${Math.random() * 0.3 + 0.1};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      particlesBg.appendChild(particle);
    }
  }

  // Bouton retour en haut
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.setAttribute('aria-label', 'Retour en haut');
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});