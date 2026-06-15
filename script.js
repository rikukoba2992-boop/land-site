const message = document.getElementById("message");
const intro = document.getElementById("intro");
const hero = document.getElementById("hero");
const enterButton = document.getElementById("enterButton");
const links = document.getElementById("links");

const texts = [
    "WELCOME.",
    "I AM LAND.",
    "WHERE IDEAS TAKE SHAPE.",
    "ENJOY THE EXPERIENCE."
];

const durations = [
    3000,
    3500,
    5000,
    3500
];

let current = 0;

function showText(){
    message.textContent = texts[current];

    message.style.animation = "none";

    setTimeout(() => {
        message.style.animation = `fade ${durations[current]}ms linear`;
    }, 10);

    setTimeout(() => {
        current++;

        if(current < texts.length){
            showText();
        }else{
            intro.style.opacity = "0";

            setTimeout(() => {
                intro.style.display = "none";
                hero.style.display = "block";
            }, 1000);
        }
    }, durations[current]);
}

showText();

enterButton.addEventListener("click", () => {
    hero.style.display = "none";
    links.style.display = "flex";
});