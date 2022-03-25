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

    let tdMaq = document.createElement("td")
    tdMaq.className = "lista"
    tdMaq.innerText = `${file.maq}`

    let tdTrecho = document.createElement("td")
    tdTrecho.className = "lista"
    tdTrecho.innerText = `${file.trecho}`

    let tdLinha = document.createElement("td")
    tdLinha.className = "lista"
    tdLinha.innerText = `${file.linha}`

    let tdTipo = document.createElement("td")
    tdTipo.className = "lista"
    tdTipo.innerText = `${file.tipoLub}`


    let tdDataApli = document.createElement("td")
    tdDataApli.className = "lista"
    tdDataApli.innerText = `${file.dataApli}`

    let tdDataProxApli = document.createElement("td")
    tdDataProxApli.className = "lista"
    tdDataProxApli.innerText = `${file.dataProxApli}`

    let tdFreq = document.createElement("td")
    tdFreq.className = "lista"
    tdFreq.innerText = `${file.freq}`

    let tdStatus = document.createElement("td")
    tdStatus.className = "lista"
    tdStatus.innerText = `${file.status}`

    let tdObs = document.createElement("td")
    tdObs.className = "lista"
    tdObs.innerText = `${file.obs}`



        tbody.appendChild(tr)
        tr.appendChild(tdId)
        tr.appendChild(tdMaq)
        tr.appendChild(tdTrecho)
        tr.appendChild(tdLinha)
        tr.appendChild(tdTipo)
        tr.appendChild(tdDataApli)
        tr.appendChild(tdDataProxApli)
        tr.appendChild(tdFreq)
        tr.appendChild(tdStatus)
        tr.appendChild(tdObs)
    
}

