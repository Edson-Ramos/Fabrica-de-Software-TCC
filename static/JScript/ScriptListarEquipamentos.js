const rota = 'https://easylub.herokuapp.com/'

function getEquipamentos(){

    fetch(`${rota}/listar_equipamentos`)
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
    tdId.className = "lista"
    tdId.innerText = `${arquivo.id}`

    let tdNome = document.createElement("td");
    tdNome.className = "lista"
    tdNome.innerText = `${arquivo.nome}`

    let tdLinha = document.createElement("td");
    tdLinha.className = "lista"
    tdLinha.innerText = `${arquivo.linha}`

    let tdTrecho = document.createElement("td");
    tdTrecho.className = "lista"
    tdTrecho.innerText = `${arquivo.trecho}`


    tbody.appendChild(tr)
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdLinha);
    tr.appendChild(tdTrecho);
    

}
    
