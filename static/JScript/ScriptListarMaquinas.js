//const rota = 'https://easylub.herokuapp.com'
const rota = 'http://localhost:5000'

function getMaquinas(){

    fetch(`${rota}/listar_maquinas`)
    .then(data => {
        return data.json();
    })
.then(data => {
    for(arquivo of data.arquivos)
        listaMaquinas(arquivo);
    })
}

var tbody = document.getElementById("tbody")

function listaMaquinas(arquivo){     

    let tr = document.createElement("tr");    

    let tdId = document.createElement("td");
    tdId.className = "lista"
    tdId.innerText = `${arquivo.idMaq}`

    let tdCod = document.createElement("td");
    tdCod.className = "lista"
    tdCod.innerText = `${arquivo.codMaq}`

    let tdLinha = document.createElement("td");
    tdLinha.className = "lista"
    tdLinha.innerText = `${arquivo.linha}`

    let tdTrecho = document.createElement("td");
    tdTrecho.className = "lista"
    tdTrecho.innerText = `${arquivo.trecho}`

    let tdNome = document.createElement("td");
    tdNome.className = "lista"
    tdNome.innerText = `${arquivo.nome}`

    
    // Botões de Excluir
    var btDel = document.createElement("button")
    btDel.className = "btn btn-default btnDel"
    btDel.id = `${arquivo.idMaq}`
    let btIcon = document.createElement("img")
    btIcon.src = "/static/bootstrap/icons-1.8.1/icons/trash-fill.svg"

    //Botões de Atualizar
    let btAtt = document.createElement("button")
    btAtt.className = "btn btn-default btnAtt"
    btAtt.id = `${arquivo.idMaq}`
    btAtt.onclick = "teste()"
    let btAttIcon = document.createElement("img")
    btAttIcon.src = "/static/bootstrap/icons-1.8.1/icons/arrow-repeat.svg"

    btDel.appendChild(btIcon)
    btAtt.appendChild(btAttIcon)
    tbody.appendChild(tr)
    tr.appendChild(tdId)
    tr.appendChild(tdCod)
    tr.appendChild(tdLinha)
    tr.appendChild(tdTrecho)
    tr.appendChild(tdNome)
    tr.appendChild(btDel)
    tr.appendChild(btAtt)
    

}
    
