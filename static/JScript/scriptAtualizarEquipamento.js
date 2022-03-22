

function atualizar_equipamento() {    
    let idMaq = document.getElementById("idMaq");
    let nomeMaq = document.getElementById("nomeMaq");
    let linhaMaq = document.getElementById("linhaMaq");
    let trechoMaq = document.getElementById("trechoMaq");

    let dados_maquina = {
        idMaq: idMaq.value,
        nome: nomeMaq.value,
        linha: linhaMaq.value,
        trecho: trechoMaq.value
    }    

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