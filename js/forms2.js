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
    const phoneElement2 = form.querySelector('input[name="company_phone"]');
    const formErrorElement = form.querySelector('.error-msg');
    const formErrorMessage = 'Пожалуйста, заполните поля со *, а также необходимо согласие на обработку персональных данных';
    const inputList = form.querySelectorAll('.form-input');
    const req = Array.from(form.querySelectorAll('input[required],textarea[required]'));
    
    inputList.forEach(input => {

        input.addEventListener('blur', () => {
          toggleInputError(input);
        });
        input.addEventListener('input', () => {
          toggleInputError(input);
          formErrorToggle();
        });
        
    });
    
    checkboxElement.addEventListener('change', () => {
        toggleInputError(checkboxElement);
        formErrorToggle();
    });
    
    form.addEventListener('submit', async function (event) {
        
        event.preventDefault();
        
        let recaptchaTag = this.querySelector('.g-recaptcha');
        let widgetId = recaptchaTag.dataset.widgetId;
        let recaptchaError = this.querySelector('.error-recaptcha');
        
        if (hasInvalidInput() || (emailElement && !emailElement.validity.valid)) {

            formErrorToggle();
            inputList.forEach(input => {
                toggleInputError(input);
            });
            toggleInputError(checkboxElement);

        }else if (grecaptcha.getResponse(widgetId) === ''){
            recaptchaError.innerHTML = 'Пожалуйста, подтвердите, что Вы не робот';
            setTimeout(() => {
              recaptchaError.innerHTML = '';
            }, 4000);
        }
        else{

            let formData = new FormData(this);
            this.classList.add('_sending');
            let response = await fetch('assets/php/process-form-recaptcha.php', {
                method: 'POST',
                body: formData
            });
            
            let result = await response.text();
        
            if (response.ok && result == 'Капча пройдена') {
                formContainer.innerHTML = '<div id="otz_done">Спасибо за запрос, мы свяжемся с вами в самое ближайшее время.</div';
                formErrorElement.style.display = 'none';
                formErrorElement.innerHTML = '';
                switch(form.action.value){
                    case 'callorder': 
                        //console.log('Заказ звонка')
                        if (typeof window.ym == 'undefined') {
                            (function(m,e,t,r,i,k,a){ m[i]=m[i]||function(){ (m[i].a=m[i].a||[]).push(arguments) };
                           m[i].l=1*new Date();
                           for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; }}
                           k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                           (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                        
                           ym(24887855, "init", {
                                clickmap:true,
                                trackLinks:true,
                                accurateTrackBounce:true,
                                webvisor:true
                           });
                            ym(24887855, 'reachGoal', 'Obratnyj_zvonok');
                        } else {
                            ym(24887855, 'reachGoal', 'Obratnyj_zvonok');
                        }
                        break
                    case 'contactpageform': 
                        //console.log('Форма в контактах') 
                        ym(24887855,'reachGoal','Forma1')
                        break
                    case 'bottomformMain': 
                        //console.log('Форма на главной')
                        ym(24887855,'reachGoal','Svyazatsya_s_nami')
                        break
                    case 'specialoffer': 
                        //console.log('Спецпредложение') 
                        ym(24887855,'reachGoal','Specialnoe_predlozhenie')
                        break
                    case 'bottomform': 
                        //console.log('Форма в футере') 
                        ym(24887855,'reachGoal','Forma2')
                        break
                    default:
                        break
                }
            }
            else if(response.ok && result != 'Капча пройдена'){
                this.classList.remove('_sending');
                recaptchaError.innerHTML = 'Сервису reCaptcha не удалось корректно обработать Ваш запрос. Пожалуйста, попробуйте еще раз';
                setTimeout(() => {
                  recaptchaError.innerHTML = '';
                }, 8000);
            }
            else {
                formErrorElement.style.display = 'block';
                formErrorElement.innerHTML = '<span style="font-size:18px;">Ошибка отправки сообщения! Пожалуйста, попробуйте еще раз позже.</span>';
                this.classList.remove('_sending');
            }
        }
        
    });
    
    function hasInvalidInput() {
        let phone2_error = '';

        if(phoneElement2 && phoneTest(phoneElement2)){
            phone2_error = true;
        }

      return (
        req.some(inputElement => !inputElement.validity.valid) || !checkboxElement.validity.valid || phoneTest(phoneElement) || phone2_error == true
      );
    }
    
    function formErrorToggle() {
        if (hasInvalidInput()){
            formErrorElement.style.display = 'block';
            formErrorElement.textContent = formErrorMessage;
        }else if (!hasInvalidInput() && (emailElement && !emailElement.validity.valid)){
            formErrorElement.style.display = 'block';
            formErrorElement.textContent = 'Проверьте правильность заполнения адреса эл. почты';
        }
        else{
            formErrorElement.style.display = 'none';
            formErrorElement.textContent = ''; 
        }
    }

});

// function emailTest(input) {
//     return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/i.test(input.value);
// }

function phoneTest(input) {
    return !/\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/g.test(input.value);
}

function toggleInputError(input) {
  if (!input.validity.valid) {
      
      if(input.getAttribute("name") === "check"){
          
        toggleErrorMess(input, 'Подтвердите согласие на обработку данных'); 
        
      }else if (input.value === '' && input.hasAttribute('required')){
          
        toggleErrorMess(input, 'Поле обязательно к заполнению');  
        
      }
      else{
          toggleErrorMess(input, input.validationMessage);
      }
  }else if (input.getAttribute('type') === 'tel'){
          
      if(input.value === '+7 '){
        toggleErrorMess(input, 'Поле обязательно к заполнению');  
      }else{
        if (phoneTest(input)){
          toggleErrorMess(input, 'Телефон в формате +7 (999) 999-99-99');
        }else{
          toggleErrorMess(input);  
        }
      }  
  }
  else {
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

