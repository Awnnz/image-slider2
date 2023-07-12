import "./../style.css";
export function createImageSlider(imgArr) {

    const slider = document.createElement('div');
    const wrapper = document.createElement('div');
    const slidesIndicator = document.createElement('div');
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');

    // Create image slides + corresponding buttons
    imgArr.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        const newImg = new Image();
        const IndicatorBtn = document.createElement('button');
        newImg.src = img;

        if (index === 0) {
            slide.classList.add('active-slide');
            IndicatorBtn.classList.add('active-button');
        }

        slide.appendChild(newImg);
        slidesIndicator.appendChild(IndicatorBtn)
        wrapper.appendChild(slide);
    });

    slider.classList.add('slider');
    wrapper.classList.add('wrapper');
    slidesIndicator.classList.add('slides-indicator');
    prevBtn.classList.add('prev-button');
    nextBtn.classList.add('next-button');

    slider.appendChild(wrapper);
    slider.appendChild(slidesIndicator);
    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);

    const allSlides = wrapper.children;
    const IndicatorButtons = slidesIndicator.children;

    let currentSlideIndex = 0;

    function changeSlides(currentSlide, selectedSlide) {
        currentSlide.classList.remove('active-slide');
        selectedSlide.classList.add('active-slide');
    };

    function updateIndex(operation) {
        switch (operation) {
            case 'next': currentSlideIndex = currentSlideIndex === imgArr.length -1 ? 0 : currentSlideIndex += 1;
                break;
            
            case 'previous': currentSlideIndex = currentSlideIndex === 0 ? imgArr.length - 1 : currentSlideIndex -= 1;
                break;

            default: currentSlideIndex = operation;
        };
    };

    function changeIndicatorBtn(currentBtn, selectedBtn) {
        currentBtn.classList.remove('active-button');
        selectedBtn.classList.add('active-button');
    };

    function slideAnimation(currentSlide, selectedSlide, slideDirection) {
        const selecteddSlideIndex = Array.prototype.indexOf.call(
            selectedSlide.parentElement.children,
            selectedSlide,
          );
        
        let pos;
        switch(slideDirection) {
            case 'next': pos = -100
            break;

            case 'previous': pos = 100;
            break;

            default: pos = (currentSlideIndex > selecteddSlideIndex) ? -100 : 100;
        };
            
        currentSlide.animate([{transform: `translateX(0)`}, {transform: `translateX(${pos}%)`}], {
            duration: 300,
            easing: 'linear',
        })

        selectedSlide.animate([{transform: `translateX(${pos * -1}%)`}, {transform: `translateX(0)`}], {
            duration: 300,
            easing: 'linear',
        })
    };

    nextBtn.addEventListener('click', () => {
        const nextSlide = currentSlideIndex !== imgArr.length - 1 ? currentSlideIndex + 1 : 0;
        slideAnimation(allSlides[currentSlideIndex], allSlides[nextSlide], 'next');
        changeSlides(allSlides[currentSlideIndex], allSlides[nextSlide]);
        changeIndicatorBtn(IndicatorButtons[currentSlideIndex], IndicatorButtons[nextSlide]);
        updateIndex('next');
    });

    prevBtn.addEventListener('click', () => {
        const prevSlide = currentSlideIndex === 0 ? imgArr.length - 1 : currentSlideIndex - 1;
        slideAnimation(allSlides[currentSlideIndex], allSlides[prevSlide], 'previous')
        changeSlides(allSlides[currentSlideIndex], allSlides[prevSlide]);
        changeIndicatorBtn(IndicatorButtons[currentSlideIndex], IndicatorButtons[prevSlide]);
        updateIndex('previous');
    });

    [...IndicatorButtons].forEach(button => {

        button.addEventListener('click', (function () {
            const selectedSlideIndex = Array.prototype.indexOf.call(
                this.parentElement.children,
                this,
              );
            slideAnimation(allSlides[currentSlideIndex], allSlides[selectedSlideIndex], 'select');
            changeSlides(allSlides[currentSlideIndex], allSlides[selectedSlideIndex]);
            changeIndicatorBtn(IndicatorButtons[currentSlideIndex], IndicatorButtons[selectedSlideIndex]);
            updateIndex(selectedSlideIndex);
        }));

    });

    return slider;
}