const originalCard = document.querySelector('.card');
const container = document.querySelector('.container');

for (let i=0;i<4;i++){

  const cardClone = originalCard.cloneNode(true);
  container.appendChild(cardClone);

  if(i==0){
    cardClone.classList.add('focus');
  }

}

const circles = document.querySelectorAll('.circle');

circles.forEach((circle,index)=>
{
  circle.textContent=index;
  circle.style.display = 'flex';
  circle.style.alignItems = 'center';
  circle.style.justifyContent = 'center';
})


let isDragging = false;
let initialY = 0;

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousedown', (event) => {
    isDragging = true;
    draggedCard = card; 
    initialY = event.clientY; 
  })
});


function shiftCards() {

  const cards = container.querySelectorAll('.card');

  cards.forEach((card, index) => {
    card.classList.add('shift-animation');
  });

  const firstCard = container.querySelector('.card');

  firstCard.addEventListener('transitionend', () => {

    container.appendChild(firstCard);

    cards.forEach(card => {
      card.classList.remove('shift-animation');
      card.classList.remove('focus');
      card.style.transform = ''; 
    });
    
    const cardsAfterTransition = container.querySelectorAll('.card');
    cardsAfterTransition[1].classList.add('focus');
  }, { once: true });
}


document.addEventListener('mousemove',(event)=>{
  if (!isDragging) return;

  const distance = event.clientY-initialY;

  if (distance<-50){
    shiftCards();
    isDragging=false;
  }
})

document.addEventListener('mouseup', () => {
  isDragging = false; 
});