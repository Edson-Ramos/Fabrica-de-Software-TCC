

function delete_spray() {
    
    let idSpray = document.getElementById("del").value
   
    let dados_spray = {
        idSpray: idSpray
     }
    
    if (idSpray == "")
    {
        return alert("Campo ID é Obrigatorio!")
        
    }else{
        fetch("/deletar_spray",
            {
                method: "POST",
                body:JSON.stringify(dados_spray),
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            .then((resposta) => {
                if (resposta.status == 200)
                    return resposta.text()
                else
                    return alert("Erro Ao Deletar Spray")
            })
            .then((repostaTexto) => {
                alert(repostaTexto)
                document.location.reload(true);
            })          
        }
}