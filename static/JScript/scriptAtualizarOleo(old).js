

function atualizar_oleo() {    
    
    let codOleo = document.getElementById("codOleo").value
    let tipo= document.getElementById("tipo").value
    let visco = document.getElementById("visco").value 
    
    
    if (codOleo == "" || tipo == "" || visco == ""){
        return alert("Todos os Campos São Obrigatorios!")
    }else{
     let dados_oleo = {
        codOleo : codOleo,
        tipo: tipo,
        visco : visco,
    }    

    fetch("/atualizar_oleo",
    {
        method: "POST",
        body:JSON.stringify(dados_oleo),
        headers:{
            "u-Type" : "application/json"
        }
    })
    .then((resposta) => {
        if (resposta.status == 200)
            return resposta.text()        
        else
            return "Erro Ao Atualizar Óleo"
    })
    .then((respostaTexto) => {
        alert(respostaTexto)
        document.location.reload(true)
    })
       
    }

    
}