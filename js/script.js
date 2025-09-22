document.addEventListener('DOMContentLoaded', () => {
  // ---------- Menu déroulant ----------
  const menuBtn = document.querySelector(".menu-btn");
  const menuDeroulant = document.querySelector(".menu-deroulant");

  menuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    menuDeroulant.classList.toggle("show");
  });

  // fermer si clic à l'extérieur
  window.addEventListener("click", (e) => {
    if (!menuDeroulant.contains(e.target) && menuDeroulant.classList.contains("show")) {
      menuDeroulant.classList.remove("show");
      menuBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  // ---------- Citations aléatoires ----------
  const citations = [
    "Miminella, tu es mon rayon de soleil 🌸",
    "Chaque jour avec toi est plus doux qu’un Monchhichi 🐵💕",
    "À tes côtés, tout devient magique ✨",
    "Mon cœur bat pour toi, Ornella ❤️",
    "Tu es ma joie quotidienne, ma petite Miminella 💖"
  ];
  const citationEl = document.getElementById("citation");
  if(citationEl){
    const idx = Math.floor(Math.random()*citations.length);
    citationEl.textContent = citations[idx];
  }

  // ---------- Cœur secret ----------
  const coeur = document.getElementById("coeur-secret");
  if(coeur){
    coeur.addEventListener('click', () => {
      window.location.href = "secret.html";
    });
  }

  // ---------- TIMERS ----------
  const dateDebut = new Date("2025-04-24T00:00:00+01:00"); // début relation
  const prochainEventBase = { month:12, day:24, hour:0, minute:0 };
  const ornellaOrig = { month:10, day:25, hour:0, minute:0 }; // 25 oct
  const aaronOrig = { month:2, day:26, hour:0, minute:0 };    // 26 feb

  function pad(n){ return n; }

  function elapsedToText(start, now){
    let diff = now - start;
    if(diff < 0) diff = 0;
    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days * (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours * (1000*60*60);
    const mins = Math.floor(diff / (1000*60));
    diff -= mins * (1000*60);
    const secs = Math.floor(diff / 1000);
    return `${days} jours, ${hours}h ${mins}m ${secs}s`;
  }

  function nextOccurrence(month, day, hour=0, minute=0){
    const now = new Date();
    let cand = new Date(now.getFullYear(), month - 1, day, hour, minute);
    if(cand - now <= 0){
      cand = new Date(now.getFullYear() + 1, month - 1, day, hour, minute);
    }
    return cand;
  }

  function countdownText(target, now){
    let diff = target - now;
    if(diff < 0) diff = 0;
    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days * (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours * (1000*60*60);
    const mins = Math.floor(diff / (1000*60));
    diff -= mins * (1000*60);
    const secs = Math.floor(diff / 1000);
    return `${days} jours, ${hours}h ${mins}m ${secs}s`;
  }

  function updateTimers(){
    const now = new Date();

    // timer principal (depuis dateDebut -> elapsed)
    const compteurEl = document.getElementById("compteur");
    if(compteurEl) compteurEl.textContent = elapsedToText(dateDebut, now);

    // prochain event (24 déc - si passé, année suivante)
    const pe = nextOccurrence(prochainEventBase.month, prochainEventBase.day, prochainEventBase.hour, prochainEventBase.minute);
    const nextEventEl = document.getElementById("next-event");
    if(nextEventEl) nextEventEl.textContent = `Nous nous reverrons dans ${countdownText(pe, now)}`;

    // anniversaires
    const ornellaNext = nextOccurrence(ornellaOrig.month, ornellaOrig.day, ornellaOrig.hour, ornellaOrig.minute);
    const aaronNext = nextOccurrence(aaronOrig.month, aaronOrig.day, aaronOrig.hour, aaronOrig.minute);
    const ornellaEl = document.getElementById("ornella-birthday");
    const aaronEl = document.getElementById("aaron-birthday");
    if(ornellaEl) ornellaEl.textContent = `Anniversaire de Miminella dans ${countdownText(ornellaNext, now)}`;
    if(aaronEl) aaronEl.textContent = `Mon anniversaire dans ${countdownText(aaronNext, now)}`;
  }

  updateTimers();
  setInterval(updateTimers, 1000);

});
  // ---------- Galerie / Lightbox ----------
  const galleryImgs = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");

  if(galleryImgs && lightbox && lightboxImg){
    galleryImgs.forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove("hidden");
      });
    });
  }

  closeBtn?.addEventListener("click", () => {
    lightbox.classList.add("hidden");
  });

  // Fermer lightbox si clic en dehors de l’image
  lightbox?.addEventListener("click", (e) => {
    if(e.target === lightbox){
      lightbox.classList.add("hidden");
    }
  });

    // ---------- Jeu attrape-cœurs ----------
  const gameArea = document.getElementById("game-area");
  const player = document.getElementById("player");
  const scoreDisplay = document.getElementById("score");
  const winMessage = document.getElementById("win-message");

  let score = 0;
  let playerX = gameArea ? gameArea.offsetWidth/2 - 30 : 0;

  if(player){
    player.style.left = playerX + "px";
  }

  // Déplacement joueur clavier
  document.addEventListener("keydown", (e) => {
    if(!player) return;
    if(e.key === "ArrowLeft" && playerX > 0){
      playerX -= 20;
    } else if(e.key === "ArrowRight" && playerX < gameArea.offsetWidth - player.offsetWidth){
      playerX += 20;
    }
    player.style.left = playerX + "px";
  });

  // Génération des cœurs
  function createHeart(){
    if(!gameArea) return;
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "💖";
    heart.style.left = Math.random() * (gameArea.offsetWidth - 30) + "px";
    heart.style.animationDuration = (2 + Math.random()*2) + "s";

    gameArea.appendChild(heart);

    const fall = setInterval(() => {
      const heartRect = heart.getBoundingClientRect();
      const playerRect = player.getBoundingClientRect();

      if(
        heartRect.bottom >= playerRect.top &&
        heartRect.left < playerRect.right &&
        heartRect.right > playerRect.left
      ){
        // Attrapé
        score++;
        scoreDisplay.textContent = "Score : " + score;
        heart.remove();
        clearInterval(fall);

        if(score >= 25){
          winMessage.classList.remove("hidden");
        }
      }

      if(heartRect.top > window.innerHeight){
        heart.remove();
        clearInterval(fall);
      }
    }, 50);

    setTimeout(() => heart.remove(), 5000);
  }

  if(gameArea){
    setInterval(createHeart, 1200);
  }

// ---------- Lettre secrète (machine à écrire) ----------
// ---------- Lettre secrète (machine à écrire + surprise) ----------
const letterElement = document.getElementById("secret-letter");

if(letterElement){
  const letterText = `Ma douce Miminella 🐵💖,

Chaque instant passé avec toi est un moment génial que je garde précieusement dans mon cœur.  
Ton sourire illumine mes journées, et ton amour rend ma vie magique.  

Je promets d’être toujours là pour toi, aujourd’hui, demain et pour toujours surtout à jamais!  
Tu es  ma moitié que je recherchais depuis ma naissance et je t'ai enfin trouvée, alors je ne vais plus te lâcher.
Tu es aussi et surtout, mon bonheur infini. 

Ton MimiAaron 💕`;

  let index = 0;

  function typeLetter(){
    if(index < letterText.length){
      letterElement.textContent += letterText.charAt(index);
      index++;
      setTimeout(typeLetter, 50);
    } else {
      triggerHeartsAndMessage(); // 🎉 surprise après la fin
    }
  }

  typeLetter();

  // --- Fonction surprise ---
  function triggerHeartsAndMessage(){
    // Pluie de cœurs
    for(let i=0; i<30; i++){
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.classList.add("falling-heart");
        heart.textContent = ["❤️","💖","💞","💗"][Math.floor(Math.random()*4)];
        heart.style.left = Math.random()*100 + "vw";
        heart.style.fontSize = (20 + Math.random()*20) + "px";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 4000);
      }, i * 200);
    }

    // Message "Je t’aime Miminella"
    const msg = document.createElement("div");
    msg.id = "love-message";
    msg.textContent = "Je t’aime Miminella 💖";
    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 6000);
  }
}


