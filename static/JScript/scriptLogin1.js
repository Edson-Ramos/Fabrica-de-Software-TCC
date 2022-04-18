class Validator{

  constructor (){
      this.validations = [
      'data-required',      
      'data-only-letters',
      'data-email-validate',     
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
  
  
  //Valida Emails  
   
  emailvalidate(input){
  // email@email.com => email@email.com.br
    	let re = /\S+@\S+\.\S+/;
		let email = input.value;
		let errorMessage = 'Insira um E-mail Valido Ex. email@email.com';

      if(!re.test(email)){
          this.printMessage(input, errorMessage);
      }else{
		//login(email1, senha);
	  }
  }
   //Verificar se o input e requerido
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



let form = document.getElementById("login-form");
let submit = document.getElementById("btn-login","btn-delete");
let validator = new Validator();
let email1 = document.getElementById("email").value;
let senha = document.getElementById("password").value;

 submit.addEventListener('click', function(e){  
	if (document.getElementById('email').value == "" || document.getElementById('password').value == ""){
		e.preventDefault();

  validator.validate(form); 
}
});

submit.addEventListener('click', function(e){ 
	if (document.getElementById('delete').value ==""){
		e.preventDefault();

  validator.validate(form); 
}
});
 



 

