

function atualizar_equipamento() {    
    let idMaq = document.getElementById("idMaq").value
    let nomeMaq = document.getElementById("nomeMaq").value
    let linhaMaq = document.getElementById("linhaMaq").value
    let trechoMaq = document.getElementById("trechoMaq").value

    let dados_maquina = {
        idMaq: idMaq,
        nome: nomeMaq,
        linha: linhaMaq,
        trecho: trechoMaq
    }    
    if (idMaq == "" || nomeMaq == "" || linhaMaq == "" || trechoMaq == ""){
        return alert("Todos os Campos São Obrigatorios!")
    }else{
       fetch("/atualizar_equipamentos",
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
            return "Erro Ao Atualizar Equipamento"
    })
    .then((respostaTexto) => {
        alert(respostaTexto)
    }) 
    }
    
}