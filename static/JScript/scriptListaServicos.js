const rota = 'https://easylub.herokuapp.com'



function getServicos() {

    fetch(`${rota}/listar_servico`)
    .then(data => {
            return data.json();
        })
    .then(data => {
        for (file of data.files)
            createFile(file);
    })
}
var tbody = document.getElementById("tbody")

function createFile(file) {


    let tr = document.createElement("tr")


    let tdId = document.createElement("td")
    tdId.className = "lista"
    tdId.innerText = `${file.idServ}`

    let tdIdMaq = document.createElement("td")
    tdIdMaq.className = "lista"
    tdIdMaq.innerText = `${file.idMaq}`

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

    let tdTipo = document.createElement("td")
    tdTipo.className = "lista"
    tdTipo.innerText = `${file.tipoLub}`


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



        tbody.appendChild(tr)
        tr.appendChild(tdId)
        tr.appendChild(tdMaq)
        tr.appendChild(tdLinha)
        tr.appendChild(tdTrecho)
        tr.appendChild(tdEquip)
        tr.appendChild(tdTipo)
        tr.appendChild(tdDataApli)
        tr.appendChild(tdDataProxApli)
        tr.appendChild(tdStatus)
        tr.appendChild(tdObs)
    
}

