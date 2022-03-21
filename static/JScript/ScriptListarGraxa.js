const rota = 'http://localhost:5000/'

function getGraxa(){

    fetch(`${rota}/listar_graxa`)
    .then(data => {
        return data.json();
    })
.then(data => {
    for(arquivo of data.arquivos)
        listaGraxa(arquivo);
    })
}

var tbody = document.getElementById("tbody")

function listaGraxa(arquivo){     

    let tr = document.createElement("tr");    

    let tdId = document.createElement("td");
    tdId.className = "lista"
    tdId.innerText = `${arquivo.id}`

    let tdTipo = document.createElement("td");
    tdTipo.className = "lista"
    tdTipo.innerText = `${arquivo.tipo}`

    let tdConsis = document.createElement("td");
    tdConsis.className = "lista"
    tdConsis.innerText = `${arquivo.consis}`   


    tbody.appendChild(tr)
    tr.appendChild(tdId);
    tr.appendChild(tdTipo);
    tr.appendChild(tdConsis);
}
    
