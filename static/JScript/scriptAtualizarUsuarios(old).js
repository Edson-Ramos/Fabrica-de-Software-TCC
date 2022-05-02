
/*
function atualizar_equipamento() {    
    let nome = document.getElementById("nome").value
    let id = document.getElementById("id").value   
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value
    let cSenha = document.getElementById("cSenha").value
    let select = document.getElementById("tipos")
    let tipo = select.options[select.selectedIndex].value


    let dados_usuario = {
        nome : nome,
        id : id,
        email : email,
        senha : senha,
        tipo : tipo
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
    
}*/

function createTable(){
    var idUser = JSON.parse(sessionStorage.getItem('chave'))
    console.log(idUser)

    const id_user={
        idUser : idUser
    }
    const dado_usuario = {
        method: "POST",
        body: JSON.stringify(id_user),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(`${rota}/lista_usuario_id`, dado_usuario)
        .then(function(response){
            response.json()
                .then(function(data){
                    for (dados of data.files)

                    var id = dados.idUser;
                    var nome = document.getElementById("#nome")
                    nome.value = `${data.nome}`
                    var email = document.getElementById("#email")
                    email.value = `${data.email}`
                    var senha = document.getElementById("#senha")
                    senha.value = `${data.senha}`
                    var cSenha = document.getElementById("#cSenha")
                    cSenha.value = `${data.senha}`
                    var tipo = document.getElementById("#tipo")
                    tipo.value = `${data.tipo}`


                })
        })
}