function getSpray(){

    fetch(`https://easylub.herokuapp.com/listar_spray`)
    .then(data => {
        return data.json();
    })
.then(data => {
    for(arquivo of data.arquivos)
      listaSpray(arquivo);
    })
}

var tbody = document.getElementById("tbody")

function listaSpray(arquivo){     

    let tr = document.createElement("tr");    

    let tdId = document.createElement("td");
    tdId.className = "lista"
    tdId.innerText = `${arquivo.id}`

    let tdTipo = document.createElement("td");
    tdTipo.className = "lista"
    tdTipo.innerText = `${arquivo.tipo}`

    let tdVisco = document.createElement("td");
    tdVisco.className = "lista"
    tdVisco.innerText = `${arquivo.visco}`   


    tbody.appendChild(tr)
    tr.appendChild(tdId);
    tr.appendChild(tdTipo);
    tr.appendChild(tdVisco);
}
    
