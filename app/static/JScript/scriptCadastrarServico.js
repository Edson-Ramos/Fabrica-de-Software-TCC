//const rota = "https://easylub.herokuapp.com"
const rota = "http://localhost:5000"
const codMaq = document.querySelector("#codMaq")
const oleo = document.querySelector("#oleo")
const graxa = document.querySelector("#graxa")
const spray = document.querySelector("#spray")
const select = document.querySelector("#sel")

var codLub=""
var tipo =""
var prop =""

// Captura o input digitado codMaq da maquina quanto mudo de foco.

codMaq.addEventListener("blur", (e) => {

    let cod_maq = {
        codMaq: codMaq.value
    }
    if (codMaq.value == "") {
        return alerta_empyt_codMaq()
    } else {
        const cod_Maquina = {
            method: "POST",
            body: JSON.stringify(cod_maq),
            headers: {
                "Content-Type": "application/json"
            }
        }


        fetch(`${rota}/lista_equipamento_cod`, cod_Maquina)
            .then(function (response) {
                if (response.status == 500){
                    alerta_erro_codMaq()
                }else if(response.status == 200){
                   response.json()
                    .then(function (data) {
                        for (arquivo of data.arquivos)
                            createFile(arquivo);
                    }) 
                }
                
            })
    }
})

function alerta_erro_codMaq(){
    Swal.fire({
        icon: 'error',
        title: 'Opss...',
        text: 'Campo Cód. Máquina Não Encontrado!'
    })
    document.querySelectorAll(".swal2-styled").forEach(function(btnOK){
        btnOK.addEventListener("click", (e) =>{
            location.reload(true)
        })
    })
}



function alerta_empyt_codMaq(){
    Swal.fire({
        icon: 'error',
        title: 'Opss...',
        text: 'Campo Cód. Máquina Não Poder Ser Vazio!'
    })
}

function createFile(arquivo) {

    let maq = document.getElementById("maq")
    maq.value = `${arquivo.nome}`

    let linha = document.getElementById("linha")
    linha.value = `${arquivo.linha}`

    let trecho = document.getElementById("trecho")
    trecho.value = `${arquivo.trecho}`


}



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
                select.options[select.options.length] = new Option(`Cód: ${arquivo.codOleo} - Tipo: ${arquivo.tipo} - Viscosidade: ${arquivo.visco}`, `${arquivo.idOleo}`)
        })
    select.addEventListener("blur", (e) => {
        let id_oleo = {
            idOleo: select.value
        }

        const inf_oleo = {
            method: "POST",
            body: JSON.stringify(id_oleo),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(`${rota}/lista_oleo_id`, inf_oleo)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        for (arquivo of data.arquivos)
                            codLub = `${arquivo.codOleo}`
                            tipo = `${arquivo.tipo}`
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
                select.options[select.options.length] = new Option(`Cód: ${arquivo.codGra} - Tipo: ${arquivo.tipo} - Consistência: ${arquivo.consis}`, `${arquivo.idGra}`)
        })
    select.addEventListener("blur", (e) => {

        let id_graxa = {
            idGra: select.value
        }

        const inf_graxa = {
            method: "POST",
            body: JSON.stringify(id_graxa),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(`${rota}/listar_graxa_id`, inf_graxa)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        for (arquivo of data.arquivos)
                            codLub = `${arquivo.codGra}`
                            tipo = `${arquivo.tipo}`
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
                select.options[select.options.length] = new Option(`Cód: ${arquivo.codSpray} - Tipo: ${arquivo.tipo} - Viscosidade: ${arquivo.visco}`, `${arquivo.idSpray}`)
        })

    select.addEventListener("blur", (e) => {
        let id_spray = {
            idSpray: select.value
        }

        const inf_spray = {
            method: "POST",
            body: JSON.stringify(id_spray),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(`${rota}/lista_spray_id`, inf_spray)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        for (arquivo of data.arquivos)
                            codLub = `${arquivo.codSpray}`
                            tipo = `${arquivo.tipo}`
                            prop = arquivo.visco

                    })
            })
    })
})







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


    if (status[0].checked) {
        status = "Aguardando"
    } else if (status[1].checked) {
        status = "Em Execução"
    } else if (status[2].checked) {
        status = "Atrasado"
    } else if (status[3].checked) {
        status = "Concluido"
    }

    if (tipoLub[0].checked) {
        tipoLub = "Óleo"
    } else if (tipoLub[1].checked) {
        tipoLub = "Graxa"
    } else if (tipoLub[2].checked) {
        tipoLub = "Spray"
    }
    

    if (equip.value == "Selecione o Equipamento") {
        equip = ""
    }

    if (codMaq.value == "" || maq.value =="" || linha.value == "" || trecho.value == "" || equip.value == "" || tipoLub == "" || codLub == "" || tipo == "" || prop == "" || dataApli.value == "" || dataProxApli.value == "" || status == "") {
        
        return erro_Campo_empty()
    } else {

        const dados_servicos = {
            codMaq: codMaq.value,
            maq: maq.value,
            linha: linha.value,
            trecho: trecho.value,
            equip: equip.value,
            tipoLub: tipoLub,
            codLub: codLub ,
            tipo: tipo,
            prop: prop,
            dataApli: dataApli.value,
            dataProxApli: dataProxApli.value,
            status: status,
            obs: obs.value,
        }

        fetch("/cadastrar_servico", {
            method: "POST",
            body: JSON.stringify(dados_servicos),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((resposta) => {
            if (resposta.status == 200)
                return success()
            else
                return erro()
        })
    }
}

function success(){
    Swal.fire({
    icon: 'success',
    title: 'Serviço Cadastrado Com Sucesso!',
    showConfirmButton: false,
    timer: 1500   
    })
    setTimeout(() => {  location.reload(); }, 2000)
}

function erro(){

    Swal.fire({
    icon: 'error',
    title: 'Erro Ao Cadastrar Serviço',
    text: 'Verifique os Campos Digitados!'
    })
}

function erro_Campo_empty(){

    Swal.fire({
  icon: 'error',
  title: 'Opss...',
  text: 'Todos os Campos São Obrigatório!'
    })  
}