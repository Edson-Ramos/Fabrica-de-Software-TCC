const rota = 'https://easylub.herokuapp.com'
//const rota = 'http://localhost:5000'

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

    let tdCodGra = document.createElement("td");
    tdCodGra.className = "lista"
    tdCodGra.innerText = `${arquivo.codGra}`

    let tdTipo = document.createElement("td");
    tdTipo.className = "lista"
    tdTipo.innerText = `${arquivo.tipo}`

    let tdConsis = document.createElement("td");
    tdConsis.className = "lista"
    tdConsis.innerText = `${arquivo.consis}`   


     // Botões de Excluir
    var btDel = document.createElement("button")
    btDel.className = "btn btn-default btnDel"
    btDel.id = `${arquivo.idOleo}`
    let btIcon = document.createElement("img")
    btIcon.src = "/static/bootstrap/icons-1.8.1/icons/trash-fill.svg"

    //Botões de Atualizar
    let btAtt = document.createElement("button")
    btAtt.className = "btn btn-default btnAtt"
    btAtt.id = `${arquivo.idOleo}`
    let btAttIcon = document.createElement("img")
    btAttIcon.src = "/static/bootstrap/icons-1.8.1/icons/arrow-repeat.svg"  

    btDel.appendChild(btIcon)
    btAtt.appendChild(btAttIcon)
    tbody.appendChild(tr)
    tr.appendChild(tdCodGra)
    tr.appendChild(tdTipo)
    tr.appendChild(tdConsis)
    tr.appendChild(btDel)
    tr.appendChild(btAtt)
}
    
