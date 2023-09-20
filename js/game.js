const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  { name: 'ancylostoma', description: '../images/ancylostoma.png' },
  { name: 'ascaris', description: '../images/ascaris.png' },
  { name: 'entamoeba', description: '../images/entamoeba.png' },
  { name: 'enterobius', description: '../images/enterobius.png' },
  { name: 'giardia', description: '../images/giardia.png' },
  { name: 'hymenolepis', description: '../images/hymenolepis.png' },
  { name: 'schistosoma', description: '../images/schistosoma.png' },
  { name: 'strongyloides', description: '../images/strongyloides.png' },
  { name: 'taenia', description: '../images/taenia.png' },
  { name: 'trichuris', description: '../images/trichuris.png' },
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    const matchedCharacter = characters.find(char => char.name === firstCharacter);
    
    // Mostra a imagem de descrição
    const descImgDiv = document.getElementById("descriptionImage");
    const descImg = document.getElementById("descImg");
    descImg.src = matchedCharacter.description;
    descImgDiv.style.display = "block";
    setTimeout(() => {
      descImgDiv.style.display = "none";
    }, 5000); // a imagem de descrição será exibida por 5 segundos.

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      firstCard = '';
      secondCard = '';
    }, 500);
  }
}


const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    checkCards();
  }
}

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character.name}.png')`;

  card.appendChild(front);
  card.appendChild(back);
  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character.name);

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
