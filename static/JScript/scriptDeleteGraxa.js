

function delete_graxa() {
    
    let idGra = document.getElementById("del").value
   
    let dados_graxa = {
        idGra: idGra 
     }
    
    if (idGra == "")
    {
        return alert("Campo Id é Obrigatorio!")
        
    }else{
        fetch("/deletar_graxa",
            {
                method: "POST",
                body:JSON.stringify(dados_graxa),
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            .then((resposta) => {
                if (resposta.status == 200)
                    return resposta.text()
                else
                    return alert("Erro Ao Deletar Graxa")
            })
            .then((repostaTexto) => {
                alert(repostaTexto)
                document.location.reload(true);
            })          
        }
}