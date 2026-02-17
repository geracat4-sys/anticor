function sectionNav (){
  window.addEventListener('scroll', () => {
  	const nav = document.querySelector('#page-contents ul');
  	const navLink = document.querySelectorAll('#page-contents ul li a');
    let scrollDistance = window.scrollY;

    //navLink[0].classList.add('active');

      document.querySelectorAll('.text-content h2,.text-content h3,.text-content h4,.text-content h5,.text-content h6').forEach((el, i) => {
        if (el.offsetTop - nav.clientHeight <= scrollDistance) {
          navLink.forEach((el) => {
            if (el.classList.contains('active')) {
              el.classList.remove('active');
            }
          });

          document.querySelectorAll('#page-contents ul li')[i].querySelector('a').classList.add('active');
        }
      });
  });

  	document.querySelectorAll('.page-contents-link').forEach(link => {

	    link.addEventListener('click', function(e) {
	        e.preventDefault();

	        let href = this.getAttribute('href').substring(1);

	        const scrollTarget = document.getElementById(href);

	        const topOffset = document.querySelector('.header').offsetHeight * 0.45;
	        // const topOffset = 0; // если не нужен отступ сверху 
	        const elementPosition = scrollTarget.getBoundingClientRect().top;
	        const offsetPosition = elementPosition - topOffset;

	        window.scrollBy({
	            top: offsetPosition,
	            behavior: 'smooth'
	        });
	    });
	});
}
sectionNav();
window.addEventListener('resize', sectionNav);

const articleNav = new Swiper('.page-contents-wrapper', {
  mousewheel:{
    eventsTarget:'.page-contents-wrapper',
    sensitivity:1
  },
  freeMode: true,
  scrollbar: {
    el: '.page-contents-wrapper .swiper-scrollbar'
  },
  slidesPerView:'auto',
  direction: 'vertical',
});