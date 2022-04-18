class Validator{

  constructor (){
      this.validations = [
      'data-required',      
      'data-only-letters',
      'data-email-validate',     
      ]
   }
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
    cleanValidations(validations){
     validations.forEach(el =>el.remove());
    }  
}

  
function logar(){
   let email = document.getElementById("email").value
   let password = document.getElementById("password").value

    let dado_login={
        email : email,
        password : password
    }
    
 if (email == "" || password == ""){
     alert("Campo Email e Senha São Obrigatorios")
 }else{
     fetch("/login",
     {
         method : "POST",
         body : JSON.stringify(dado_login),
         headers : {
             "Content-Type" : "application/json"
         }
     }).then(function (response) {
             if (response.status == 200)
                return response.json();
            else
                return alert("Email ou Senha Errados")
        
    })
    .then((data) =>{
        let token = data.access_token;
        localStorage.setItem("token", token);
        return window.location.href = "cadastrar_usuarios"
    })
 }

}