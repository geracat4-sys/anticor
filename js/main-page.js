$(document).ready(function(){

  $(window).scroll(function() {
    if($(this).scrollTop() > window.innerHeight){
      
      $("#page-guide-button").fadeIn();
    
    }else{
      
      $("#page-guide-button").fadeOut();
    }

  });

  $('#page-guide-button').click(function(){
    $('body').addClass('over');
    $('#page-guide').addClass('open');
  });

  $('.page-guide-close, .page-guide-link, .body-overlay').click(function(){
    $('body').removeClass('over');
    $('#page-guide').removeClass('open');
  });

  $('.prices-section__variant-button').click(function(){

    let relBlockID = '#' + $(this).attr('data-target');
    let relBlock = $(relBlockID);
    
    $('body').addClass('over');
    $(relBlock).addClass('open');
  
  });

  $('.complex-content__close, .body-overlay').click(function(){
    $('body').removeClass('over');
    $('.sliding-block').removeClass('open');
  });

});

const initOptions = () => {
  const optionsContainer = document.querySelector('.options')
  const options = document.querySelectorAll('.option')

  optionsContainer.style.setProperty('--total-options', options.length)

  optionsContainer.addEventListener('mouseover', (event) => {
    const clickedOption = event.target.closest('.option')

    if (!clickedOption || clickedOption.classList.contains('active')) return

    options.forEach((option) => {
      option.classList.remove('active')
    })

    clickedOption.classList.add('active')
  })
}

document.addEventListener('DOMContentLoaded', initOptions);

//ocument.addEventListener("DOMContentLoaded", (event) => {
  
  gsap.registerPlugin(ScrollTrigger,ScrollSmoother)
  
  const addvantagesSection = document.querySelector('.advantages-section .container');
  const addvantagesItems = addvantagesSection.querySelectorAll('.advantages-item')
 
  let addvantagesDirection = 'vertical';

  // initAddvantagesScroll(addvantagesSection, addvantagesItems, addvantagesDirection);

  function initAddvantagesScroll(addvantagesSection, addvantagesItems, addvantagesDirection) {

      addvantagesItems.forEach((item, index) => {
        if(index !== 0) {
          gsap.set(item, { yPercent: 100 });
        }
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: addvantagesSection,
          pin: true,
          start: 'top top',
          end: () => `+=${addvantagesItems.length}%`,
          scrub: 1,
          invalidateOnRefresh: true,
          //markers: true
        },
        defaults: {
          ease : 'none'
        }
      });

      addvantagesItems.forEach((item, index) => {
        
        timeline.to(item, {
          scale: 0.9
        });

        timeline.to(
          addvantagesItems[index + 1], 
          {
            yPercent: 0
          },
          '<'
        );

      });

      
  }

 // });

// gsap.to(".process-slider__wrapper", {
//   scrollTrigger: {
//     trigger: ".process-block", 
//     start: "top top",  
//     end: "bottom bottom",
//     pin: true,              // Включить закрепление
//     scrub: true,            // Плавная привязка к скроллу (опционально)
//     markers: true           // Показать маркеры (для отладки)
//   }
// });

let target = 0;
let current =   0;
let ease = 0.075;
let totalSteps = 10;

const processSlider = document.querySelector('.process-slider');
const processSliderWrapper = document.querySelector('.process-slider__wrapper'); 
const markerWrapper = document.querySelector('.marker-wrapper');
const activeSlide = document.querySelector('.current-step');

let maxScroll = processSliderWrapper.offsetWidth - window.innerWidth;

// let scrollSliderTransform = processSliderWrapper.offsetWidth - processSlider.offsetWidth;

// //Create ScrollTrigger
// gsap.to('.process-slider__wrapper', {
//   scrollTrigger: {
//     trigger: '.process-block',
//     start: '-50px top',
//     end: () => '+=' + processSliderWrapper.offsetWidth,
//     pin: true,
//     scrub: true,
//     x: '-=' + scrollSliderTransform + 'px'
//   }
// });

function lerp(start, end, factor){

  return start + (end - start) * factor;
}

function updateActiveSliderNumber(markerMove, markerMaxMove) {

  const partWidth = markerMaxMove / totalSteps;
  let currentPart = Math.round((markerMove - 150) / partWidth) + 1;
  currentPart = Math.min(totalSteps, currentPart);
  activeSlide.textContent = `${currentPart}`;
}

function update(){
  current = lerp(current, target, ease);

  gsap.set('.process-slider__wrapper', {
    x: -current,
  });

  let moveRatio = current / maxScroll;
  let markerMaxMove = window.innerWidth - markerWrapper.offsetWidth - 170;

  let markerMove = 100 + moveRatio * markerMaxMove;

  gsap.set('.marker-wrapper', {
    x: markerMove,
  });

  updateActiveSliderNumber(markerMove, markerMaxMove);

  requestAnimationFrame(update);


}

window.addEventListener('resize', () => {
  maxScroll = processSliderWrapper.offsetWidth - window.innerWidth;
});

// window.addEventListener('wheel', (e) => {
//   target += e.deltaY;
//   target = Math.max(0, target);
//   target = Math.min(maxScroll, target);
// });

//update();

const promoSlider = new Swiper('.promo-slider', {
  
  loop: true,

  pagination: {
    el: '.promo-slider-container .swiper-pagination',
  },

  navigation: {
    nextEl: '.promo-slider-container .slider-arrow-next',
    prevEl: '.promo-slider-container .slider-arrow-prev',
  },

  breakpoints: {
      0:{
        slidesPerView: 1
      },
      360: {
        slidesPerView: 1.5
      },
      510: {
        slidesPerView: 1.8
      },
      660: {
        slidesPerView: 2.6
      },
      780: {
        slidesPerView: 3
      },
      1024: {
        slidesPerView: 3,
      }
    }

});

const addServicesSlider = new Swiper('.add-services-slider', {
  
  loop: true,

  pagination: {
    el: '.add-services-slider-container .swiper-pagination',
  },

  navigation: {
    nextEl: '.add-services-slider-container .slider-arrow-next',
    prevEl: '.add-services-slider-container .slider-arrow-prev',
  },

  breakpoints: {
      0:{
        slidesPerView: 1
      },
      360: {
        slidesPerView: 1.5
      },
      510: {
        slidesPerView: 1.8
      },
      660: {
        slidesPerView: 2.6
      },
      780: {
        slidesPerView: 3
      },
      1024: {
        slidesPerView: 3,
      }
    }

});

const reviewssSlider = new Swiper('.reviews-slider', {
  
  loop: true,
  spaceBetween:30,
  pagination: {
    el: '.reviews-slider-container .swiper-pagination',
  },

  navigation: {
    nextEl: '.reviews-slider-container .slider-arrow-next',
    prevEl: '.reviews-slider-container .slider-arrow-prev',
  },

  breakpoints: {
      0:{
        slidesPerView: 1
      },
      360: {
        slidesPerView: 1.5
      },
      510: {
        slidesPerView: 1.8
      },
      660: {
        slidesPerView: 2.6
      },
      1024: {
        slidesPerView: 3,
      }
    }

});