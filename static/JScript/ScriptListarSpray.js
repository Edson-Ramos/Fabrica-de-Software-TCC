const rota = 'https://easylub.herokuapp.com'
//const rota = 'http://localhost:5000'


function getSpray(){

    fetch(`${rota}/listar_spray`)
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

    let tdIdSpray = arquivo.idSpray

    let tdCodSpray  = document.createElement("td");
    tdCodSpray.className = "lista"
    tdCodSpray.innerText = `${arquivo.codSpray}`

    let tdTipo = document.createElement("td");
    tdTipo.className = "lista"
    tdTipo.innerText = `${arquivo.tipo}`

    let tdVisco = document.createElement("td");
    tdVisco.className = "lista"
    tdVisco.innerText = `${arquivo.visco}` 


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
    tr.appendChild(tdCodSpray)
    tr.appendChild(tdTipo)
    tr.appendChild(tdVisco)
    tr.appendChild(btDel)
    tr.appendChild(btAtt)
}
    
