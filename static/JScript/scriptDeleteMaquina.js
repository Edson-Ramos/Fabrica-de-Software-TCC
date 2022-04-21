

function delete_maquina() {

   var confirm = window.confirm("Tem Certeza Que Deseja Excluir Este Registro?")

   if (confirm) {
      let idMaq= document.getElementById("del").value
   
    let dados_maquina = {
        idMaq: idMaq 
    }

    if (idMaq == "")
    {
        return alert("Campo ID é Obrigatorio!")
        
    }else{
        fetch("/deletar_maquinas",
        {
            method: "POST",
            body:JSON.stringify(dados_maquina),
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then((resposta) => {
        
            if (resposta.status == 200)
                return resposta.text()            
            else 
                return "Erro Ao Deletar Máquina"          
        })
        .then((respostaTexto) => {
            document.location.reload(true)
            alert(respostaTexto)
        })         
    } 
   }else{
       alert("Registro Não Foi Excluido!")
       document.location.reload(true)
   }
        
    
    
}