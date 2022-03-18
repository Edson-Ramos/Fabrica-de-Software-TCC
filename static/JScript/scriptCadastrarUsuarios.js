

function cadastrar_usuario() {    
    let nome = document.getElementById("nome").value;
    let sobreNome = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("password").value
    let cSenha = document.getElementById("confpassword").value;

    let dados_usuarios = {
       nome : nome,
       sobreNome : sobreNome,
       email : email,
       senha : senha,
       cSenha : cSenha   
       
    }
    if(nome == "" || sobreNome == "" || email == "" || senha == "" || cSenha == ""){
        return alert("Todos os Campos São Obrigatorios!")
    }else{
       if (senha == cSenha) {
                fetch("/cadastro",
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
            return alert("ERROr: Senhas Diferentes!") 
            }
    
}
    