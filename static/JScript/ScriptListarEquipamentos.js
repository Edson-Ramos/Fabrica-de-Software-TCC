const rota = 'http://localhost:5000/'

function getEquipamentos(){

    fetch(`${rota}/visualizarEquipamentos`)
    .then(data => {
        return data.json();
    })
.then(data => {
    for(arquivo of data.arquivos)
        listaEquipamentos(arquivo);
    })
}

var tbody = document.getElementById("tbody")

function listaEquipamentos(arquivo){     

    let tr = document.createElement("tr");    

    let tdId = document.createElement("td");
    tdId.innerText = `${arquivo.id}`

    let tdNome = document.createElement("td");
    tdNome.innerText = `${arquivo.nome}`

    let tdLinha = document.createElement("td");
    tdLinha.innerText = `${arquivo.linha}`

    let tdTrecho = document.createElement("td");
    tdTrecho.innerText = `${arquivo.trecho}`


    tbody.appendChild(tr)
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdLinha);
    tr.appendChild(tdTrecho);
    

}
    
