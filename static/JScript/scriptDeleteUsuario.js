

function delete_usuario() {
    
    let idUsuario = document.getElementById("del").value
   
    let dados_usuario = {
        idUsuario: idUsuario 
     }
    
    if (idUsuario == "")
    {
        return alert("Campo Id é Obrigatorio!")
        
    }else{
        fetch("/deletar_usuarios",
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
                    return alert("Erro Ao Deletar Usuário")
            })
            .then((respostaTexto) => {
                alert(respostaTexto)
                document.location.reload(true);
            })          
        }
}