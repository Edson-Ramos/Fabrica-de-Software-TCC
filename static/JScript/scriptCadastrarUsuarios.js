
function cadastrar_usuario() {   
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("password").value
    let cSenha = document.getElementById("confpassword").value;
    let select = document.getElementById("tipos")
    let tipo = select.options[select.selectedIndex].value
    

    let dados_usuarios = {
       nome : nome,
       email : email,
       senha : senha,
       cSenha : cSenha,
       tipo : tipo  
       
    }
    if(nome == "" || email == "" || senha == "" || cSenha == "" || tipo == "Selecione o Tipo de Usuário"){
        
        return erro_Campo_empty()
    }else{
       if (senha == cSenha) {
                fetch("/cadastrar_usuario",
            {
                method: "POST",
                body:JSON.stringify(dados_usuarios),
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            .then((resposta) => {
                if (resposta.status == 200)
                    return confimacao()
                else
                    return erro()
            })
        }else
            return erro_senha()
            
            }
    
}
function confimacao(){
    Swal.fire({
    icon: 'success',
    title: 'Usuário Cadastrado Com Sucesso!',
    showConfirmButton: false,
    timer: 1500   
})
setTimeout(() => {  location.reload(); }, 2000)
}

function erro(){

    Swal.fire({
  icon: 'error',
  title: 'Erro Ao Cadastrar Usuário',
  text: 'Verifique os Campos Digitados!'
})

}

function erro_senha(){

    Swal.fire({
  icon: 'error',
  title: 'Senha Diferentes',
  text: 'Digite sua Senha Novamente!'
})

}

function erro_Campo_empty(){

    Swal.fire({
  icon: 'error',
  title: 'Opss...',
  text: 'Todos os Campos São Obrigatório!'
    })  
}