//const rota = 'https://easylub.herokuapp.com'
const rota = 'http://localhost:5000'

const codMaq = document.querySelector("#codMaq")
const oleo = document.querySelector("#oleo")
const graxa = document.querySelector("#graxa")
const spray = document.querySelector("#spray")
const select = document.querySelector("#sel")
var idLub =""



function getServicos() {

    fetch(`${rota}/listar_servico`)
        .then(data => {
            return data.json();
        })
        .then(data => {
            for (file of data.files)
                createFile(file);
        })
        .then(data => {
            del()
            att()
        })
}


function createFile(file) {

    var tbody = document.getElementById("tbody")
    let tr = document.createElement("tr")


    let tdIdSer = `${file.idServ}`
   
    let tdCodMaq = document.createElement("td")
    tdCodMaq.className = "lista"
    tdCodMaq.innerText = `${file.codMaq}`

    let tdMaq = document.createElement("td")
    tdMaq.className = "lista"
    tdMaq.innerText = `${file.maq}`

    let tdLinha = document.createElement("td")
    tdLinha.className = "lista"
    tdLinha.innerText = `${file.linha}`

    let tdTrecho = document.createElement("td")
    tdTrecho.className = "lista"
    tdTrecho.innerText = `${file.trecho}`

    let tdEquip = document.createElement("td")
    tdEquip.className = "lista"
    tdEquip.innerText = `${file.equip}`

    let tdTipoLub = document.createElement("td")
    tdTipoLub.className = "lista"
    tdTipoLub.innerText = `${file.tipoLub}`

    let tdTipo = document.createElement("td")
    tdTipo.className = "lista"
    tdTipo.innerText = `${file.tipo}`

    let tdProp = document.createElement("td")
    tdProp.className = "lista"
    tdProp.innerText = `${file.prop}`

    let tdDataApli = document.createElement("td")
    tdDataApli.className = "lista"
    tdDataApli.innerText = `${file.dataApli}`

    let tdDataProxApli = document.createElement("td")
    tdDataProxApli.className = "lista"
    tdDataProxApli.innerText = `${file.dataProxApli}`


    let tdStatus = document.createElement("td")
    tdStatus.className = "lista"
    tdStatus.innerText = `${file.status}`

    let tdObs = document.createElement("td")
    tdObs.className = "lista"
    tdObs.innerText = `${file.obs}`

    // Botões de Excluir
    var btDel = document.createElement("button")
    btDel.className = "btn btn-default btnDel"
    btDel.id = `${file.idServ}`
    btDel.title = "Excluir"
    let btIcon = document.createElement("img")
    btIcon.src = "/static/bootstrap/icons-1.8.1/icons/trash-fill.svg"

    //Botões de Atualizar
    let btAtt = document.createElement("button")
    btAtt.className = "btn btn-default btnAtt"
    btAtt.id = `${file.idServ}`
    btAtt.title = "Atualizar"
    let btAttIcon = document.createElement("img")
    btAttIcon.src = "/static/bootstrap/icons-1.8.1/icons/arrow-repeat.svg"




    btDel.appendChild(btIcon)
    btAtt.appendChild(btAttIcon)
    tbody.appendChild(tr)
    tr.appendChild(tdCodMaq)
    tr.appendChild(tdMaq)
    tr.appendChild(tdLinha)
    tr.appendChild(tdTrecho)
    tr.appendChild(tdEquip)
    tr.appendChild(tdTipoLub)
    tr.appendChild(tdTipo)
    tr.appendChild(tdProp)
    tr.appendChild(tdDataApli)
    tr.appendChild(tdDataProxApli)
    tr.appendChild(tdStatus)
    tr.appendChild(tdObs)
    tr.appendChild(btDel)
    tr.appendChild(btAtt)
}

 
function createTable() {
    

    var idServ = JSON.parse(sessionStorage.getItem('chave'))
   
    
    const id_serv = {
        idServ : idServ
    }

    const dado_Servico = {
        method: "POST",
        body: JSON.stringify(id_serv),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(`${rota}/listar_servico_id`, dado_Servico)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    for (arquivo of data.files)
                
                    
                    var codMaq = document.getElementById("codMaq")
                    codMaq.value = `${arquivo.codMaq}`


                    let maq = document.getElementById("maq")
                    maq.value = `${arquivo.maq}`
                    let linha = document.getElementById("linha")
                    linha.value = `${arquivo.linha}`
                    let trecho = document.getElementById("trecho")
                    trecho.value = `${arquivo.trecho}`
                    var equip = document.getElementById("equip")
                    equip = `${arquivo.equip}`
                        
                        if (equip == "Redutor"){
                            const select = document.querySelector('#equip')
                            select.querySelectorAll('option')[1].selected = 'selected'
                        }else if (equip == "Mancal"){
                            const select = document.querySelector('#equip')
                            select.querySelectorAll('option')[2].selected = 'selected'
                        }else if (equip == "Correntes" ){
                            const select = document.querySelector('#equip')
                            select.querySelectorAll('option')[3].selected = 'selected'
                        }
                    let tipoLub = document.getElementsByName("tipoLub")
                    tipoLub.value = `${arquivo.tipoLub}`
                    
                    if (tipoLub.value == "Óleo"){
                        tipoLub[0].checked = true
                    }else if (tipoLub.value == "Graxa"){
                        tipoLub[1].checked = true
                    }else if (tipoLub.value == "Spray"){
                        tipoLub[2].checked = true
                    }
                    let select = document.querySelector("#sel")
                    prop = arquivo.prop
                    let tipo = arquivo.tipo
                    let codLub = arquivo.codLub
                       if (prop != "" && tipo != "" && codLub !=""){
                        select.options.length = 0
                        select.options[select.options.length] = new Option(`Cód: ${codLub} - Tipo: ${tipo} - Viscosidade: ${prop}`, `${arquivo.id}`)
                    }
                    let dataApli = document.getElementById("dataAplic")
                    dataApli.value = `${arquivo.dataApli}`
                    let dataProxApli = document.getElementById("dataProAplic")
                    dataProxApli.value = `${arquivo.dataProxApli}`
                    let status = document.getElementsByName("status")
                    status.value = `${arquivo.status}`

                    if (status.value == "Aguardando"){
                        status[0].checked = true
                    }else if (status.value == "Em Execução"){
                        status[1].checked = true
                    }else if (status.value == "Atrasado"){
                        status[2].checked = true
                    }else if (status.value == "Concluido"){
                        status[3].checked = true
                    }
                    let obs = document.getElementById("obs")
                    obs.value = `${arquivo.obs}`
                     })
        })

        codMaq.addEventListener("blur", (e) => {

    let cod_maq = {
        codMaq: codMaq.value
    }
    if (codMaq == "") {
        return alert("Preencha Campo Código da Máquina")
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
                response.json()
                    .then(function (data) {
                        for (arquivo of data.arquivos)
                            createMaq(arquivo);
                    })
            })
    }

})

function createMaq(arquivo) {

    let maq = document.getElementById("maq")
    maq.value = `${arquivo.nome}`

    let linha = document.getElementById("linha")
    linha.value = `${arquivo.linha}`

    let trecho = document.getElementById("trecho")
    trecho.value = `${arquivo.trecho}`


}

oleo.addEventListener("click", (e) => {

    select.options.length = 0
    
    fetch(`${rota}/listar_oleo`)
        .then(data => {
            return data.json();
        })
        .then(data => {
            for (arquivo of data.arquivos)
                select.options[select.options.length] = new Option(`Tipo: ${arquivo.tipo} - Viscosidade: ${arquivo.visco}`, `${idLub = arquivo.idOleo}`)
        })

    select.addEventListener("blur", (e) => {

        let id_lub = {
            idOleo: idLub
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
                    codLub = `${arquivo.codOleo}`
                        tipo = `${arquivo.tipo}` 
                        prop = arquivo.visco
                    

                })
            })
        
    })

})

graxa.addEventListener("click", (e) => {

    select.options.length = 0
    

    fetch(`${rota}/listar_graxa`)
        .then(data => {
            return data.json();
        })
        .then(data => {
            for (arquivo of data.arquivos)
                select.options[select.options.length ++] = new Option(`Tipo: ${arquivo.tipo} - Consistência: ${arquivo.consis}`, `${idLub = arquivo.idGra}`)
        }) 
    select.addEventListener("blur", (e) => {

        let id_lub = {
            idGra: idLub
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
                    codLub = `${arquivo.codGra}`
                        tipo = `${arquivo.tipo}` 
                        prop = arquivo.consis

                })
            })
    })
})

spray.addEventListener("click", (e) => {

    select.options.length = 0
    

    fetch(`${rota}/listar_spray`)
        .then(data => {
            return data.json();
        })
        .then(data => {
            for (arquivo of data.arquivos)
                select.options[select.options.length] = new Option(`Tipo: ${arquivo.tipo} - Viscosidade: ${arquivo.visco}`, `${idLub = arquivo.idSpray}`)
        })
    select.addEventListener("blur", (e) => {
      
        let id_lub = {
            idSpray: idLub
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
                        codLub = `${arquivo.codSpray}`
                        tipo = `${arquivo.tipo}`
                        prop = arquivo.visco

                })
            })
    })
    
})
}



function atualizar_servico() {

    let idServ = JSON.parse(sessionStorage.getItem('chave'))
    let codMaq = document.getElementById("codMaq")
    let maq = document.getElementById("maq")
    let linha = document.getElementById("linha")
    let trecho = document.getElementById("trecho")
    let equip = document.getElementById("equip")
    let tipoLub = document.getElementsByName("tipoLub")
    let dataApli = document.getElementById("dataAplic")
    let dataProxApli = document.getElementById("dataProAplic")
    let status = document.getElementsByName("status")
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

    if (codMaq.value == "" || equip.value == "" || tipoLub == "" || dataApli.value == "" || dataProxApli.value == "" || status == "") {
        alert("Campos São Obrigatorios!")
        document.location.reload(true)
    }else{

         const dados_servicos = {
            idServ : idServ,
            codMaq : codMaq.value,
            maq : maq.value,
            linha : linha.value,
            trecho : trecho.value,
            equip : equip.value,
            tipoLub : tipoLub,
            codLub : codLub,
            tipo : tipo,
            prop : prop,
            dataApli : dataApli.value,
            dataProxApli : dataProxApli.value,
            status : status,
            obs : obs.value,
        }
           fetch("/atualizar_servico",
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
                        return "Erro Ao Atualizar Serviço"
                })
                .then((repostaTexto) => {
                    alert(repostaTexto)
                    window.location.href = "visualizar_servico"
                    
                })
    }



}

function del(){

    //pesquisa de botão de delete e captura do evento de click

    document.querySelectorAll(".btnDel").forEach(function (btnDel) {
        btnDel.addEventListener("click", (e) => {
            let idServ = btnDel.id

            var confirm = window.confirm("Tem Certeza Que Deseja Excluir Este Registro?")

            if (confirm) {

                let dado_servico = {
                    idServ: idServ
                }

            fetch("/deletar_servico", {
                    method: "POST",
                    body: JSON.stringify(dado_servico),
                    headers: {
                            "Content-Type": "application/json"
                    }
                })
                .then((resposta) => {
                    if (resposta.status == 200)
                        return resposta.text()
                    else
                        return alert("Erro Ao Deletar Serviço")
                })
                .then((respostaTexto) => {
                    alert(respostaTexto)
                    document.location.reload(true);
                })
            } else
                alert("Operação Cancelada")
                 document.location.reload(true);

        })
    })
}

function att(){
         //Pesquisa de botão de atualizar e captura do evento de click

    document.querySelectorAll(".btnAtt").forEach(function (btnAtt) {
        btnAtt.addEventListener("click", (e) => {
            idServ = btnAtt.id
            sessionStorage.setItem('chave', idServ );   
            window.location.href = "atualizar_servico"
           

        })
    })
}