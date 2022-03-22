

function delete_equipamento() {
    
    let idEquipamento = document.getElementById("del").value
   
    let dados_equipamento = {
        idEquipamento: idEquipamento 
     }
    
    if (idEquipamento == "")
    {
        return alert("Campo ID é Obrigatorio!")
        
    }else{
        fetch("/deletar_equipamentos",
            {
                method: "POST",
                body:JSON.stringify(dados_equipamento),
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            .then((resposta) => {
                if (resposta.status == 200)
                    return resposta.text()
                else
                    return alert("Erro Ao Deletar Equipamento")
            })
            .then((respostaTexto) => {
                alert(respostaTexto)
                document.location.reload(true);
            })          
        }
}