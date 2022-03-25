

function cadastrar_servico() {
    
    let idServ = document.getElementById("idServ").value
    let nomeMaq = document.getElementById("maq").value
    let trecho = document.getElementById("trecho").value
    let linha = document.getElementById("linha").value    
    let tipoLub = document.getElementById("tipLub").value
    let dataApli = document.getElementById("dataAplic").value
    let dataProxApli = document.getElementById("dataProAplic").value
    let freq = document.getElementById("freqAplic").value
    let status = document.getElementById("status").value
    let obs = document.getElementById("obs").value
    
    if (freqAplic == "Frequencia de aplicação"){
        freqAplic = ""
    }else if (idServ == "" || nomeMaq == "" || linha == "" || trecho == "" || tipoLub == "" || dataAplic == "" || dataProxAplic == ""|| freqAplic == "" || status == "" ){
        alert("Campos São Obrigatorios!")
        document.location.reload(true)
    }else{
        let dados_servicos = {
            idServ : idServ,
            nomeMaq : nomeMaq,
            trecho : trecho,
            linha : linha,            
            tipoLub : tipoLub,
            dataApli : dataApli,
            dataProxApli : dataProxApli,
            freq : freq,
            status : status,
            obs : obs,
        }
        fetch("/cadastrar_servico",
        {
            method: "POST",
            body:JSON.stringify(dados_servicos),
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then((resposta) => {
                if (resposta.status == 200)
                    return resposta.text()
                else
                    return "Erro Ao Cadastrar Serviço"
            })
            .then((repostaTexto) => {
                alert(repostaTexto)
                document.location.reload(true);
            })
    }

}