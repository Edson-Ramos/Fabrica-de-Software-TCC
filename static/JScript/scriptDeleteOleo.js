

function delete_oleo() {
    
    let idOleo = document.getElementById("del").value
   
    let dados_oleo = {
        idOleo: idOleo 
     }
    
    if (idOleo == "")
    {
        return alert("Campo Id é Obrigatorio!")
        
    }else{
        fetch("/deletar_oleo",
            {
                method: "POST",
                body:JSON.stringify(dados_oleo),
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            .then((resposta) => {
                if (resposta.status == 200)
                    return resposta.text()
                else
                    return alert("Erro Ao Deletar Óleo")
            })
            .then((respostaTexto) => {
                alert(respostaTexto)
                document.location.reload(true);
            })          
        }
}