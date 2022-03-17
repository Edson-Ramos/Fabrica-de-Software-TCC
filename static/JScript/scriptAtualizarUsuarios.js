

function atualizar_equipamento() {    
    let nome = document.getElementById("nome").value
    let id = document.getElementById("id").value
    let sNome= document.getElementById("sNome").value
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value
    let cSenha = document.getElementById("cSenha").value

    let dados_usuario = {
        nome : nome,
        id : id,
        sNome: sNome,
        email : email,
        senha : senha,
        cSenha : cSenha
    }    

    fetch("/atualizar_usuarios",
    {
        method: "POST",
        body:JSON.stringify(dados_usuario),
        headers:{
            "Content-Type" : "application/json"
        }
    })
    .then((resposta) => {
        if (resposta.status == 200)
            return resposta.text()        
        else
            return "Erro Ao Atualizar Usuário"
    })
    .then((respostaTexto) => {
        document.location.reload(true)
        alert(respostaTexto)
    })
    
}