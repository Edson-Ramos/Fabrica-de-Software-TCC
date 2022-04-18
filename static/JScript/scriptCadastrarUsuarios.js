
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
    if(nome == "" || email == "" || senha == "" || cSenha == "" || tipo == ""){
        
        return alert("Todos os Campos São Obrigatorios!")
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
                    return resposta.text()
                else
                    return "Erro Ao Cadastrar Usuário"
            })
            .then((repostaTexto) => {
                alert(repostaTexto)
                document.location.reload(true);
            })
        }else
            return alert("ERROR: Senhas Diferentes!")
            
            }
    
}
    