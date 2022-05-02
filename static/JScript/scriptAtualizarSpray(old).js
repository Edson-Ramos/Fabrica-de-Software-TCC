

function atualizar_Spray() {    
    
    let idSpray = document.getElementById("id").value
    let tipo= document.getElementById("tipo").value
    let visco = document.getElementById("visco").value 
   
    if (idSpray == "" || tipo == "" || visco == ""){
        return alert("Todos os Campos São Obrigatorios!")
    }else{
     let dados_spray = {
        idSpray : idSpray,
        tipo: tipo,
        visco : visco,
    }    

    fetch("/atualizar_spray",
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
            return "Erro Ao Atualizar Spray"
    })
    .then((respostaTexto) => {
        document.location.reload(true)
        alert(respostaTexto)
    })
       
    }

    
}