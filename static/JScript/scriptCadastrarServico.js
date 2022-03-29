
const rota = "http://localhost:5000"
const idMaq = document.querySelector("#idMaq")

idMaq.addEventListener("blur", (e) => {
        console.log(idMaq.value)
        let id_maq ={
                idMaq : idMaq.value
            }
            if(idMaq == ""){
                    return alert("Preencha Campo ID Máquina")
            }else{
                const id_Maquina =
                {
                    method: "POST",
                    body:JSON.stringify(id_maq),
                    headers:{
                        "Content-Type" : "application/json"
                    }      
                }


                fetch(`${rota}/lista_equipamento_id`, id_Maquina)
                .then(function(response) {
                response.json()
                .then(function(data) {
                    for(arquivo of data.arquivos)
                        createFile(arquivo);
                })
                })
            }

})


function createFile(arquivo) {

    let maq = document.getElementById("maq")
    maq.value = `${arquivo.nome}`

    let linha = document.getElementById("linha")
    linha.value = `${arquivo.linha}`

    let trecho = document.getElementById("trecho")
    trecho.value = `${arquivo.trecho}`
    
    
}



function cadastrar_servico(){

    let maq = document.getElementById("maq").value
    let linha = document.getElementById("linha").value
    let trecho = document.getElementById("trecho").value  
    let equip = document.getElementById("equip").value
    let tipoLub = document.getElementById("tipLub").value
    let dataApli = document.getElementById("dataAplic").value
    let dataProxApli = document.getElementById("dataProAplic").value
    let status = document.getElementById("status").value
    let obs = document.getElementById("obs").value
    
        if (equip == "Equipamento"){
            equip = ""
        }

    if (idMaq == "" || maq == "" || linha == "" || trecho == "" || equip == "" || tipoLub == "" || dataApli == "" || dataProxApli == ""|| status == "" ){
        alert("Campos São Obrigatorios!")
        document.location.reload(true)
    }else{
        let dados_servicos = {
            idMaq : idMaq.value,
            nomeMaq : maq,
            linha : linha, 
            trecho : trecho,
            equip : equip,          
            tipoLub : tipoLub,
            dataApli : dataApli,
            dataProxApli : dataProxApli,
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

