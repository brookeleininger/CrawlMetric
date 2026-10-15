document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("crawlmetric-intro");
    const brandName = document.getElementById("brand-name");

    const text = "CRAWLMETRIC";

    let index = 0;

    // Start typing after the C finishes building
    setTimeout(() => {

        const typing = setInterval(() => {

            brandName.textContent += text[index];

            index++;

            if (index >= text.length) {
                clearInterval(typing);
            }

        }, 140);

    }, 3350);


    // Fade intro away
    setTimeout(() => {

        intro.classList.add("intro-finished");

    }, 6500);

});