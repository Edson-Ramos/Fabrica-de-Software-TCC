

function atualizar_oleo() {    
    
    let idOleo = document.getElementById("id").value
    let tipo= document.getElementById("tipo").value
    let visco = document.getElementById("visco").value 
    
    
    if (idOleo == "" || tipo == "" || visco == ""){
        return alert("Todos os Campos São Obrigatorios!")
    }else{
     let dados_oleo = {
        idOleo : idOleo,
        tipo: tipo,
        visco : visco,
    }    

    fetch("/atualizar_oleo",
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
            return "Erro Ao Atualizar Óleo"
    })
    .then((respostaTexto) => {
        document.location.reload(true)
        alert(respostaTexto)
    })
       
    }

    
}