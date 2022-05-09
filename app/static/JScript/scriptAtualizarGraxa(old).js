

function atualizar_Graxa() {    
    
    let codGra = document.getElementById("codGra").value
    let tipo= document.getElementById("tipo").value
    let consis = document.getElementById("consis").value 
   
    if (codGra == "" || tipo == "" || consis == ""){
        return alert("Todos os Campos São Obrigatorios!")
    }else{
     let dados_graxa = {
        codGra : codGra,
        tipo: tipo,
        consis: consis
    }    

    fetch("/atualizar_graxa",
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
            return "Erro Ao Atualizar Graxa"
    })
    .then((respostaTexto) => {
        document.location.reload(true)
        alert(respostaTexto)
    })
       
    }

    
}