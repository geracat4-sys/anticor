$(document).ready(function(){

      const fixedButtons = $('.fixed-buttons');
      let scrollUpHeight = $(".scrollup").outerHeight() + 70;

  $(window).scroll(function() {
    if($(this).scrollTop() > window.innerHeight){
      
      $(".scrollup").fadeIn()
      fixedButtons.css('bottom', scrollUpHeight);
    
    }else{
      
      $(".scrollup").fadeOut();
      fixedButtons.css('bottom', '50px');
    }

  });

  $(".scrollup").click(function() {
      return $("html, body").animate({
          scrollTop: 0
      }, 600),
      !1;
  });


  $('.domen-switch').click(function(){
      $('body').addClass('over');
      $('#domens').addClass('open');
  });

  $('.domens__close, .body-overlay').click(function(){
    $('body').removeClass('over');
    $('#domens').removeClass('open');
  });

  $('.faqs-list__item__title').click(function() {

      $('.faqs-list__item__title.open').not(this).each(function(){
          $(this).removeClass('open').next('.faqs-list__item__content').slideUp();
      });

      if ( !$(this).hasClass('open') ) {
          $(this).addClass('open');
          $(this).next('.faqs-list__item__content').slideDown();

      } else {
          $(this).removeClass('open');
          $(this).next('.faqs-list__item__content').slideUp();
      }
  });

  $('.prices-item__button').click(function(){
    let parent = $(this).closest('.prices-item');
    let title = parent.find('.prices-item__title').text();
    
    $('#consult-form').find('input[name="cartype"]').attr('value', title);
  });

  $('[data-fancybox=""]').fancybox({
      autoFocus: false
  });


});


function setEqualHeight(selector) {
    let elements = document.querySelectorAll(selector); // Класс блоков
    let maxHeight = 0;

    // 1. Сброс высоты, чтобы правильно пересчитать
    elements.forEach(el => {
        el.style.height = 'auto';
    });

    // 2. Находим максимальную высоту
    elements.forEach(el => {
        if (el.offsetHeight > maxHeight) {
            maxHeight = el.offsetHeight;
        }
    });

    // 3. Устанавливаем максимальную высоту всем элементам
    elements.forEach(el => {
        el.style.height = maxHeight + 'px';
    });
}

window.addEventListener('load', () => {
    setEqualHeight('.prices-item__title');
    setEqualHeight('.prices-item__prices');
});

window.addEventListener('resize', () => {
    setEqualHeight('.prices-item__title');
    setEqualHeight('.prices-item__prices');
});

const spoilerButtons = document.querySelectorAll('.add-services-slider__item__include .spoiler__button');

spoilerButtons.forEach((element) => {

  const parent = element.closest('.spoiler');

  element.addEventListener('click', function() {
 
    parent.classList.toggle('open');
  });
});


const materialsSlider = new Swiper('.materials-slider', {
  
  //loop: true,
  spaceBetween: 40,
  //centeredSlides: true,
  freeMode: {
    enabled: true,
    momentum: true,
  },

  pagination: {
    el: '.materials-slider-container .swiper-pagination',
  },

  navigation: {
    nextEl: '.materials-slider-container .slider-arrow-next',
    prevEl: '.materials-slider-container .slider-arrow-prev',
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
        slidesPerView: 2,
      }
    }

});

const certificatesSlider = new Swiper('.certificates__slider', {
  
  loop: true,
  spaceBetween: 20,

  navigation: {
    nextEl: '.certificates__slider-arrows .slider-arrow-next',
    prevEl: '.certificates__slider-arrows .slider-arrow-prev',
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
        slidesPerView: 4,
      }
    }

});

const aboutCertificatesSlider = new Swiper('.about-certificates .certificates__slider', {
  
  loop: true,
  spaceBetween: 20,

  navigation: {
    nextEl: '.certificates__slider-arrows .slider-arrow-next',
    prevEl: '.certificates__slider-arrows .slider-arrow-prev',
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

const teamSlider = new Swiper('.team-slider', {
  
  loop: true,
  spaceBetween: 35,

  pagination: {
    el: '.team-slider-container .swiper-pagination',
  },

  navigation: {
    nextEl: '.team-slider-container .slider-arrow-next',
    prevEl: '.team-slider-container .slider-arrow-prev',
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
        slidesPerView: 4,
      }
    }

});

const worksSlider = new Swiper('.works-slider', {
  
  loop: true,
  spaceBetween: 30,

  pagination: {
    el: '.works-slider-container .swiper-pagination',
  },

  navigation: {
    nextEl: '.works-slider-container .slider-arrow-next',
    prevEl: '.works-slider-container .slider-arrow-prev',
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

const aboutSlider = new Swiper('.about-slider', {
  
  loop: true,
  spaceBetween: 30,

  pagination: {
    el: '.about-slider-container .swiper-pagination',
  },

  navigation: {
    nextEl: '.about-slider-container .slider-arrow-next',
    prevEl: '.about-slider-container .slider-arrow-prev',
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
