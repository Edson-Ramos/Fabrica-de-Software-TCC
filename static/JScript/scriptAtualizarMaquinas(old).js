

function atualizar_maquina() {    
    let idMaq = document.getElementById("idMaq").value
    let codMaq = document.getElementById("codMaq").value
    let linhaMaq = document.getElementById("linhaMaq").value
    let trechoMaq = document.getElementById("trechoMaq").value
    let nomeMaq = document.getElementById("nomeMaq").value

    let dados_maquina = {
        idMaq: idMaq,
        codMaq: codMaq,
        linha: linhaMaq,
        trecho: trechoMaq,
        nomeMaq: nomeMaq,
    }    
    if (idMaq == "" || codMaq == "" || linhaMaq == "" || trechoMaq == "" || nomeMaq == ""){
        return erro_Campo_empty()
    }else{
       fetch("/atualizar_maquinas",{
           
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
            return "Erro Ao Atualizar Máquina"
    })
    .then((respostaTexto) => {
        document.location.reload(true)
        alert(respostaTexto)
        
    }) 
    }
    
}

function erro_Campo_empty(){

    Swal.fire({
  icon: 'error',
  title: 'Opss...',
  text: 'Todos os Campos São Obrigatório!'
    })  
}