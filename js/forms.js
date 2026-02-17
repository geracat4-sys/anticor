function fadeOut() {
    const element = document.querySelector('.form-error-msg');
    if (!element) return;

    element.style.opacity = 1;

    const fadeEffect = setInterval(() => {

        element.style.opacity -= 0.1; 

        if (element.style.opacity <= 0) {
            clearInterval(fadeEffect);
            element.style.display = 'none';
        }
    }, 50);
}


document.querySelectorAll('.contact-form').forEach(form => {
	const formContainer = form.parentNode;
	const checkboxElement = form.querySelector('.form-agree');
	const emailElement = form.querySelector('input[type="email"]');
	const phoneElement = form.querySelector('input[name="phone"]');
	const formErrorElement = document.querySelector('.form-error-msg');
	const formErrorMessage = 'Пожалуйста, заполните поля со *, а также необходимо согласие на обработку персональных данных';
	const inputList = form.querySelectorAll('.form-input');
	const req = Array.from(form.querySelectorAll('input[required],textarea[required]'));
	form.setAttribute('autocomplete', 'off');
	phoneElement.setAttribute('autocomplete', 'new-password');
	// Добавляем скрытое поле для reCAPTCHA если его нет
	// if (!form.querySelector('input[name="g-recaptcha-response"]')) {
	// 	 const recaptchaInput = document.createElement('input');
	// 	 recaptchaInput.type = 'hidden';
	// 	 recaptchaInput.name = 'g-recaptcha-response';
	// 	 form.appendChild(recaptchaInput);
	// }

	// Функция обновления токена
	// const updateRecaptchaToken = () => {
	// 	 grecaptcha.ready(() => {
	// 		  grecaptcha.execute('6LdtCgorAAAAAMK9ww7M5NbL7n4gTnaXVrkePC4J', {action: 'submit'}).then(token => {
	// 				form.querySelector('input[name="g-recaptcha-response"]').value = token;
	// 		  });
	// 	 });
	// };

	// Инициализация reCAPTCHA
	// if (typeof grecaptcha !== 'undefined') {
	// 	 updateRecaptchaToken();
	// 	 setInterval(updateRecaptchaToken, 120000);
	// }

	inputList.forEach(input => {
		 input.addEventListener('blur', () => {
			  toggleInputError(input);
		 });
		 input.addEventListener('input', () => {
			  //toggleInputError(input);
			  //formErrorToggle();
		 });
	});

	checkboxElement.addEventListener('change', () => {
		 toggleInputError(checkboxElement);
		 //formErrorToggle();
	});

	form.addEventListener('submit', async function(event) {
		 event.preventDefault();
		 //const recaptchaError = this.querySelector('.error-recaptcha');
		 // Обновляем токен перед каждой отправкой
		 // await updateRecaptchaToken();
		 // const recaptchaToken = this.querySelector('input[name="g-recaptcha-response"]').value;
		 
		 toggleInputError(checkboxElement);

		 if (hasInvalidInput() || (emailElement && !emailElement.validity.valid)) {
			  formErrorToggle();
			  inputList.forEach(input => {
					toggleInputError(input);
			  });
		 }
		 // else if (!recaptchaToken) {
		// 	  recaptchaError.innerHTML = 'Пожалуйста, подождите, пока reCAPTCHA загрузится';
		// 	  setTimeout(() => {
		// 			recaptchaError.innerHTML = '';
		// 	  }, 4000);
		// 	  updateRecaptchaToken();
		 // }
		 else {
			  let formData = new FormData(this);
			  this.classList.add('_sending');
			  
			  try {
					let response = await fetch('assets/php/process-form-recaptcha2.php', {
						 method: 'POST',
						 body: formData
					});

					let result = await response.text();

					if (response.ok && result === 'Форма успешно отправлена') {
						 formContainer.innerHTML = '<div id="otz_done">Спасибо за запрос, мы свяжемся с вами в самое ближайшее время.</div>';
						 formErrorElement.style.display = 'none';
						 formErrorElement.innerHTML = '';
						 
						 // Обработка целей Яндекс.Метрики
						 // switch(form.action.value) {
						// 	  case 'callorder': 
						// 			if (typeof window.ym === 'undefined') {
						// 				 (function(m,e,t,r,i,k,a){ 
						// 					  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
						// 					  m[i].l=1*new Date();
						// 					  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
						// 				 })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
						// 				 ym(24887855, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
						// 			}
						// 			ym(24887855, 'reachGoal', 'Obratnyj_zvonok');
						// 			break;
						// 	  case 'contactpageform': 
						// 			ym(24887855,'reachGoal','Forma1');
						// 			break;
						// 	  case 'bottomformMain': 
						// 			ym(24887855,'reachGoal','Svyazatsya_s_nami');
						// 			break;
						// 	  case 'specialoffer': 
						// 			ym(24887855,'reachGoal','Specialnoe_predlozhenie');
						// 			break;
						// 	  case 'bottomform': 
						// 			ym(24887855,'reachGoal','Forma2');
						// 			break;
						// 	  case 'landingcta': 
						// 			ym(24887855,'reachGoal','konsultaciya_katalog');
						// 			break;
						// 		case 'bookingform': 
						// 				ym(24887855,'reachGoal','predlozhenie_naladchikam');
						// 				break;
						 // }
						 // ym(24887855,'reachGoal','allforms');
						 let storedDataPre = JSON.parse(localStorage.getItem('formStatusPre'));
							let storedData = JSON.parse(localStorage.getItem('formStatus'));
							storedDataPre.value = "Форма была отправлена";
							storedData.value = "Форма была отправлена";
							localStorage.setItem('formStatusPre', JSON.stringify(storedDataPre));
							localStorage.setItem('formStatus', JSON.stringify(storedData));
					}
					else if (response.ok) {
						 this.classList.remove('_sending');
						 recaptchaError.innerHTML = 'Ошибка проверки reCAPTCHA. Попробуйте еще раз.';
						 setTimeout(() => {
							  recaptchaError.innerHTML = '';
						 }, 8000);
						 updateRecaptchaToken();
					}
					else {
						 formErrorElement.style.display = 'block';
						 formErrorElement.innerHTML = '<span style="font-size:18px;">Ошибка отправки сообщения! Пожалуйста, попробуйте еще раз позже.</span>';
						 this.classList.remove('_sending');
					}
			  } catch (error) {
					formErrorElement.style.display = 'block';
					formErrorElement.innerHTML = '<span style="font-size:18px;">Ошибка соединения. Пожалуйста, проверьте интернет-соединение.</span>';
					this.classList.remove('_sending');
			  }
		 }
	});

	// Остальные функции без изменений
	function hasInvalidInput() {

		 return (
			  req.some(inputElement => !inputElement.validity.valid) || 
			  !checkboxElement.validity.valid || 
			  phoneTest(phoneElement)
		 );
	}

	function formErrorToggle() {
		 if (hasInvalidInput()){
			  formErrorElement.style.display = 'block';
			  formErrorElement.style.opacity = 1;
			  formErrorElement.textContent = formErrorMessage;
			  setTimeout(() => {
				    fadeOut();
				 }, 5000);
		 } else if (emailTest(emailElement)){
			  formErrorElement.style.display = 'block';
			  formErrorElement.style.opacity = 1;
			  formErrorElement.textContent = 'Проверьте правильность заполнения адреса эл. почты';
			  setTimeout(() => {
				    fadeOut();
				 }, 5000);
		 } else {
			  formErrorElement.style.display = 'none';
			  formErrorElement.textContent = ''; 
		 }
	}
});

// Остальные вспомогательные функции без изменений
function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/i.test(input.value);
}

function phoneTest(input) {
	return !/((\+7)|8)\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/g.test(input.value);
}

function toggleInputError(input) {
	if (!input.validity.valid) {
		 if(input.getAttribute("name") === "check"){
			  toggleErrorMess(input, 'Подтвердите согласие на обработку данных'); 
		 } else if (input.value === '' && input.hasAttribute('required')){
			  toggleErrorMess(input, 'Поле обязательно к заполнению.');  
		 } else {
			  toggleErrorMess(input, input.validationMessage);
		 }
	} else if (input.getAttribute('type') === 'tel') {
		if((input.value === '+7 ') || (input.value === '8 ')){
			  toggleErrorMess(input, 'Поле обязательно к заполнению.');  
		 } else {
			  if (phoneTest(input)){
					toggleErrorMess(input, 'Телефон в формате +7 (999) 999-99-99 или 8 (999) 999-99-99');
			  } else {
					toggleErrorMess(input);  
			  }
		 }  
	} else {
		 toggleErrorMess(input);
	}
}

function toggleErrorMess(input, errorMessage){
	const parent = input.parentNode;
	const errorElement = parent.querySelector('.error-lable');
	if (errorMessage) {
		 input.classList.add('error');
		 errorElement.textContent = errorMessage;
		 errorElement.classList.add('error-active');
	} else {
		 input.classList.remove('error');
		 errorElement.textContent = '';
		 errorElement.classList.remove('error-active');
	}
}


// Инициализация reCAPTCHA
// if (typeof grecaptcha === 'undefined') {
// 	const script = document.createElement('script');
// 	script.src = 'https://www.google.com/recaptcha/api.js?render=6LdtCgorAAAAAMK9ww7M5NbL7n4gTnaXVrkePC4J';
// 	document.head.appendChild(script);
// }
// const initRecaptcha = () => {
// 	grecaptcha.ready(() => {
// 	  updateRecaptchaToken();
// 	  setInterval(updateRecaptchaToken, 120000);
// 	});
//  };
 
// if (typeof grecaptcha === 'undefined') {
//   const script = document.createElement('script');
//   script.src = 'https://www.google.com/recaptcha/api.js?render=6LdtCgorAAAAAMK9ww7M5NbL7n4gTnaXVrkePC4J';
//   script.onload = () => {
//     document.dispatchEvent(new Event('grecaptcha-ready'));
//   };
//   document.head.appendChild(script);
// }