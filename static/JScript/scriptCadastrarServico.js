const rota = "https://easylub.herokuapp.com"
//const rota = "http://localhost:5000"
const idMaq = document.querySelector("#idMaq")
const oleo = document.querySelector("#oleo")
const graxa = document.querySelector("#graxa")
const spray = document.querySelector("#spray")
const select = document.querySelector("#sel")

var tipo = ""
var prop = ""



/*
    Evento para identificar o click no radios e se for oleo vai fazer uma busca na tabela Oleo.
    Cria e preenche um select para cada informação da tabela oleo
*/
oleo.addEventListener("click", (e) => {

    select.options.length = 0
    
    fetch(`${rota}/listar_oleo`)
        .then(data => {
            return data.json();
        })
        .then(data => {
            for (arquivo of data.arquivos)
                select.options[select.options.length] = new Option(`Tipo: ${arquivo.tipo} - Viscosidade: ${arquivo.visco}`, `${arquivo.id}`)
        })

    select.addEventListener("blur", (e) => {

        let id_lub = {
            idOleo: select.value
        }

        const id_lubrificante = {
                method: "POST",
                body: JSON.stringify(id_lub),
                headers: 
                {
                    "Content-Type" : "application/json"
                }
        }

        fetch(`${rota}/lista_oleo_id`, id_lubrificante)
            .then(function (response){
                response.json()
                .then(function (data){
                    for (arquivo of data.arquivos)
                        tipo = String(arquivo.tipo) 
                        prop = arquivo.visco
                    

                })
            })
        
    })

})

/*
    Evento para identificar o click no radios e se for graxa vai fazer uma busca na tabela graxa.
    Cria e preenche um select para cada informação da tabela graxa
*/
graxa.addEventListener("click", (e) => {

    select.options.length = 0
    

    fetch(`${rota}/listar_graxa`)
        .then(data => {
            return data.json();
        })
        .then(data => {
            for (arquivo of data.arquivos)
                select.options[select.options.length] = new Option(`Tipo: ${arquivo.tipo} - Consistência: ${arquivo.consis}`, `${arquivo.id}`)
        }) 
    select.addEventListener("blur", (e) => {

        let id_lub = {
            idGra: select.value
        }

        const id_lubrificante = {
                method: "POST",
                body: JSON.stringify(id_lub),
                headers: 
                {
                    "Content-Type" : "application/json"
                }
        }

       fetch(`${rota}/listar_graxa_id`, id_lubrificante)
            .then(function (response){
                response.json()
                .then(function (data){
                    for (arquivo of data.arquivos)
                        tipo = String(arquivo.tipo) 
                        prop = arquivo.consis

                })
            })
    })
})


/*
    Evento para identificar o click no radios e se for spray vai fazer uma busca na tabela spray.
    Cria e preenche um select para cada informação da tabela spray
*/
spray.addEventListener("click", (e) => {

    select.options.length = 0
    

    fetch(`${rota}/listar_spray`)
        .then(data => {
            return data.json();
        })
        .then(data => {
            for (arquivo of data.arquivos)
                select.options[select.options.length] = new Option(`Tipo: ${arquivo.tipo} - Viscosidade: ${arquivo.visco}`, `${arquivo.id}`)
        })
    select.addEventListener("blur", (e) => {
      
        let id_lub = {
            idSpray: select.value
        }

        const id_lubrificante = {
                method: "POST",
                body: JSON.stringify(id_lub),
                headers: 
                {
                    "Content-Type" : "application/json"
                }
        }

        fetch(`${rota}/lista_spray_id`, id_lubrificante)
            .then(function (response){
                response.json()
                .then(function (data){
                    for (arquivo of data.arquivos)
                        tipo = String(arquivo.tipo) 
                        prop = arquivo.visco

                })
            })
    })
    
})


// Captura o input digitado id da maquina quanto mudo de foco.
idMaq.addEventListener("blur", (e) => {

    let id_maq = {
        idMaq: idMaq.value
    }
    if (idMaq == "") {
        return alert("Preencha Campo ID Máquina")
    } else {
        const id_Maquina = {
            method: "POST",
            body: JSON.stringify(id_maq),
            headers: {
                "Content-Type": "application/json"
            }
        }


        fetch(`${rota}/lista_equipamento_id`, id_Maquina)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        for (arquivo of data.arquivos)
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



function cadastrar_servico() {

    let maq = document.getElementById("maq")
    let linha = document.getElementById("linha")
    let trecho = document.getElementById("trecho")
    let equip = document.getElementById("equip")
    let dataApli = document.getElementById("dataAplic")
    let dataProxApli = document.getElementById("dataProAplic")
    let status = document.getElementsByName("status")
    let tipoLub = document.getElementsByName("tipoLub")
    let obs = document.getElementById("obs")

   
   if (status [0].checked){
       status = "Aguardando"
   }else if (status [1].checked){
       status = "Em Execução"
   }else if (status [2].checked){
       status = "Atrasado"
   }else if (status [3].checked){
       status = "Concluido"
   }

   if(tipoLub[0].checked){
       tipoLub = "Óleo"
   }else if (tipoLub[1].checked){
       tipoLub = "Graxa"
   }else if (tipoLub[2].checked){
       tipoLub = "Spray"
   }

    if (equip == "Selecione o Equipamento") {
        equip = ""
    }

    if (idMaq.value == "" || equip.value == "" || tipoLub == "" || dataApli.value == "" || dataProxApli.value == "" || status == "") {
        alert("Campos São Obrigatorios!")
        document.location.reload(true)
    }else{
;
         const dados_servicos = {
            idMaq : idMaq.value,
            maq : maq.value,
            linha : linha.value,
            trecho : trecho.value,
            equip : equip.value,
            tipoLub : tipoLub,
            tipo : "tipo",
            prop : prop,
            dataApli : dataApli.value,
            dataProxApli : dataProxApli.value,
            status : status,
            obs : obs.value,
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