var email_valido;
var senha_valida;


function alerta_erro(){
    Swal.fire({
        icon: 'error',
        title: 'Algo deu Errado!',
        text: 'Verifique Seu Email e Senha'
    })
    document.querySelectorAll(".swal2-styled").forEach(function(btnOK){
        btnOK.addEventListener("click", (e) =>{
            location.reload(true)
        })
    })
    
    
    
} 

function load(){

    (async () => {

        const { value: email } = await Swal.fire({
            title: 'Email',
            input: 'email',
            inputLabel: 'Digite Seu Seu Email',
            inputPlaceholder: 'Seu Email'
            })

        if (email) {
        email_valido = email
        pass()
        }

    })()

}

function pass(){

    (async () => {

    const { value: password } = await Swal.fire({
        title: 'Senha',
        input: 'password',
        inputLabel: 'Digite Sua Senha',
        inputPlaceholder: 'Sua Senha',
        inputAttributes: {
        maxlength: 10,
        autocapitalize: 'off',
        autocorrect: 'off'
        }
        })

        if (password) {
        senha_valida = password
        login()
        }
    })()

}

function login(){
	let dado_login={
        email : email_valido,
        password : senha_valida
    }

    fetch("/login",
     {
         method : "POST",
         body : JSON.stringify(dado_login),
         headers : {
             "Content-Type" : "application/json"
         }
     }).then(function (response) {
             if (response.status != 200)
             {
                  
               return  alerta_erro() 
             } 
            else
                return response.json()
        
    })
    .then((data) =>{
        let token = data.access_token;
        localStorage.setItem("token", token);
        return window.location.href = "cadastrar_usuarios"
    })
}
