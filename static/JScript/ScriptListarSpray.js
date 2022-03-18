const rota = 'http://localhost:5000'

function getGraxa(){

    fetch(`${rota}/visualizar_spray`)
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

    let tdTipo = document.createElement("td");
    tdTipo.innerText = `${arquivo.tipo}`

    let tdConsis = document.createElement("td");
    tdConsis.innerText = `${arquivo.consis}`   


    tbody.appendChild(tr)
    tr.appendChild(tdId);
    tr.appendChild(tdTipo);
    tr.appendChild(tdConsis);
}
    
