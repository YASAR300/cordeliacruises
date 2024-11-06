let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};
var counter = 1;
     setInterval(function(){
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if(counter > 9){
            counter=1;
        }
     }, 3000);
     window.addEventListener("scroll", function(){
        var header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 0);
     })



     const cardSlider = document.querySelector(".card-slider");
const cards = document.querySelectorAll(".card");
const cardWidth = cards[0].offsetWidth + 20; // Card width + margin

let currentIndex = 0; // Start at the first card
let isTransitioning = false; // To prevent multiple rapid clicks

// Clone the first and last few cards for infinite effect
function cloneCards() {
    const cloneCount = 3; // Number of cards to clone for smooth infinite scroll
    for (let i = 0; i < cloneCount; i++) {
        // Clone the first few cards and add them to the end
        const cloneFirst = cards[i].cloneNode(true);
        cardSlider.appendChild(cloneFirst);

        // Clone the last few cards and add them to the beginning
        const cloneLast = cards[cards.length - 1 - i].cloneNode(true);
        cardSlider.insertBefore(cloneLast, cardSlider.firstChild);
    }
}

cloneCards(); // Call the function to clone the cards

// Adjust initial position after cloning
cardSlider.style.transform = `translateX(-${cardWidth * 3}px)`;
currentIndex = 3; // Start after the cloned cards

// Slide to the left
function slideLeft() {
    if (isTransitioning) return; // Prevent overlapping transitions
    isTransitioning = true;
    currentIndex--;
    cardSlider.style.transition = "transform 0.5s ease";
    cardSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    cardSlider.addEventListener("transitionend", () => {
        isTransitioning = false;
        if (currentIndex === 0) {
            // Reset to the original last card
            cardSlider.style.transition = "none";
            currentIndex = cards.length;
            cardSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    }, { once: true });
}

// Slide to the right
function slideRight() {
    if (isTransitioning) return; // Prevent overlapping transitions
    isTransitioning = true;
    currentIndex++;
    cardSlider.style.transition = "transform 0.5s ease";
    cardSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    cardSlider.addEventListener("transitionend", () => {
        isTransitioning = false;
        if (currentIndex === cards.length + 2) { 
            // Reset to the original first card
            cardSlider.style.transition = "none";
            currentIndex = 3;
            cardSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    }, { once: true });
}
