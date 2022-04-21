class Validator{

    constructor (){
        this.validations = [
        'data-required',
        'data-min-length',
        'data-max-length',
        'data-only-letters',
        'data-email-validate',       
        'data-equal',
        'data-password-validate',
        ]
    }
     //inicia a Validação de todos os campos
    validate(form){

    //resgata todas validações
        let currentValidations = document.querySelectorAll('form .error-validation');        
        if(currentValidations.length){
                this.cleanValidations(currentValidations);
        }
        
     //pega os inputs
        let inputs = document.getElementsByTagName('input');
    

     //Transforma uma HTMLCollection -> array
        let inputsArray = [...inputs];

     //Loop nos inputs e validações mediante ao que for encontrado
        inputsArray.forEach(function(input){
            
     //Loop em todas as validações existentes
        for(let i = 0; this.validations.length > i; i++){

     //Verifica se a validação atual existe no input
        if (input.getAttribute(this.validations[i]) != null){

     //Limpando todas strings para virar um metodo
        let method = this.validations[i].replace('data-', '').replace('-', '');

     //valor de input
        let value = input.getAttribute(this.validations[i]);

     //invocar o metodo
        this[method](input, value);
                
            }
        }               
        }, this);
    }

    

    //Verifica se um input tem um numero minimo de caracteres
    minlength(input, minValue){
        let inputLength = input.value.length;
        let errorMessage = 'O Campo Precisa Ter Pelo Menos '+ minValue +' Caracteres';
        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        }

    }

    // verificar se um input passou do limite de caracteres
    maxlength(input,maxValue){
        let inputLength = input.value.length;
        let errorMessage = 'O Campo Precisa Ter Menos que '+ maxValue +' Caracteres';
        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);
        }
    }

    //Valida Emails

    emailvalidate(input){
    // email@email.com => email@email.com.br
        let re = /\S+@\S+\.\S+/;
        let email = input.value;
        let errorMessage = 'Insira um E-mail Valido Ex. email@email.com';

        if(!re.test(email)){
            this.printMessage(input, errorMessage);
        }
    }
    // validade se o campo tem apenas letras
    onlyletters(input){
        let re = /^[A-Za-z]+$/;
        let inputValue = input.value;
        let errorMessage = 'Este Campo Não Aceita Número Nem Caracteres Especiais';

        if(!re.test(inputValue)){
            this.printMessage(input, errorMessage);
        }
    }

    //Verifica se dois campos são iguais

    equal(input, inputName){
        let inputToCompare = document.getElementsByName(inputName)[0];
        let errorMessage = 'Este Campo Esta Diferente do ' + inputName;

        if(input.value != inputToCompare.value){
            this.printMessage(input, errorMessage);
        }
    }

    //Valida Campo Senha
    passwordvalidate(input){
        let charArr = input.value.split("");
        let uppercases = 0;
        let numbers = 0;        

        for(let i = 0; charArr.length > i; i++){
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
                uppercases++;
            }else if(!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }     
            
        if(uppercases === 0) {
            let errorMessageL = 'A senha Precisa Conter ao menos um Letra Maiuscula!';            
            window.alert(errorMessageL)
        }else if(numbers === 0){
            let errorMessageN = 'A Senha Precisa Conter ao Menos Um Número!';
            window.alert(errorMessageN)
        }
    }
    

    //Verificar se o unput e requerido
    required(input){
        let inputValue = input.value;
        if(inputValue == ''){
            let errorMessage = ' Este Campo é Obrigatorio';
            this.printMessage(input, errorMessage);
            }
    }

    // Método para imprimir msg de erro na tela
    printMessage(input, msg){
        // Quantidade de Erros
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null){
            let template = document.querySelector('.error-validation').cloneNode(true);
            template.textContent = msg;
            let inputParent = input.parentNode;
            template.classList.remove('template');
            inputParent.appendChild(template);
            }
            
        }

    //Limpa as Validações da tela
   cleanValidations(validations){
       validations.forEach(el =>el.remove());

    }
}


let form = document.getElementById("register-form", "login-form");
let submit = document.getElementById("btn-submit", "btn-login");
let validator = new Validator();

//evento que dispara as validacoes

submit.addEventListener('click', function(e){  
	if (document.getElementById('email').value == "" || document.getElementById('password').value ==""){
		e.preventDefault();
	}
	
    validator.validate(form);
	
	

});




