//const rota = 'https://easylub.herokuapp.com'
const rota = 'http://localhost:5000'


function getOleo(){

fetch(`${rota}/listar_oleo`)
    .then(data => {
        return data.json();
    })
.then(data => {
    for(arquivo of data.arquivos)
        listaOleo(arquivo);
    })
    .then(data => {
        del();
        att();
    })
}

var tbody = document.getElementById("tbody")

function listaOleo(arquivo){     

    let tr = document.createElement("tr"); 
    let idOleo = arquivo.idOleo

    let tdCodOleo = document.createElement("td");
    tdCodOleo.className = "lista"
    tdCodOleo.innerText = `${arquivo.codOleo}`

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
    btAttIcon.src = "static/bootstrap/icons-1.8.1/icons/pencil-square.svg"  

    btDel.appendChild(btIcon)
    btAtt.appendChild(btAttIcon)
    tbody.appendChild(tr)
    tr.appendChild(tdCodOleo)
    tr.appendChild(tdTipo)
    tr.appendChild(tdVisco)
    tr.appendChild(btDel)
    tr.appendChild(btAtt)
}
    
function createTable(){
    var idOleo = JSON.parse(sessionStorage.getItem('chave'))    

    const id_oleo={
        idOleo : idOleo
    }
    const dado_oleo = {
        method: "POST",
        body: JSON.stringify(id_oleo),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(`${rota}/lista_oleo_id`, dado_oleo)
        .then(function(response){
            response.json()
                .then(function(data){
                    for (dados of data.arquivos)

                    var id = dados.idOleo;
                    var cod = document.getElementById("codOleo")
                    cod.value = `${dados.codOleo}`
                    var linha = document.getElementById("tipo")
                    linha.value = `${dados.tipo}`
                    var visco = document.getElementById("visco")
                    visco.value = `${dados.visco}`    
                })
        })
}


function atualizar_oleo() {    
    var idOleo = JSON.parse(sessionStorage.getItem('chave')) 
    let codOleo = document.getElementById("codOleo").value
    let tipo= document.getElementById("tipo").value
    let visco = document.getElementById("visco").value 
    
    
    if (codOleo == "" || tipo == "" || visco == ""){
        return alert("Todos os Campos São Obrigatorios!")
    }else{
     let dados_oleo = {
        idOleo : idOleo,
        codOleo : codOleo,
        tipo: tipo,
        visco : visco,
    }    

    fetch("/atualizar_oleo",
    {
        method: "POST",
        body:JSON.stringify(dados_oleo),
        headers:{
            "Content-Type" : "application/json"
        }
    })
    .then((resposta) => {
        if (resposta.status == 200)
            return resposta.text()        
        else
            return "Erro Ao Atualizar Óleo"
    })
    .then((respostaTexto) => {
        document.location.href ="visualizar_oleo"
        alert(respostaTexto)
        
    })
       
    }

    
}


function del(){

    //pesquisa de botão de delete e captura do evento de click
     document.querySelectorAll(".btnDel").forEach(function (btnDel) {
        btnDel.addEventListener("click", (e) => {           

            var res = window.confirm("Deseja Excluir Este Registro?")
            

            if (res) {
                let idOleo = btnDel.id
                let id_oleo = {
                    idOleo : idOleo
                }

                fetch("/deletar_oleo", {
                    method: "POST",
                    body: JSON.stringify(id_oleo),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((resposta) => {
                    if (resposta.status == 200)
                        return resposta.text()
                    else
                        return alert("Erro Ao Deletar Lubrificante")
                })
                .then((respostaTexto) => {
                    alert(respostaTexto)
                    document.location.reload(true);
                })
            } else {
                 alert("Operação Cancelada")
                return document.location.reload(true);
            }              
               
        })
    })
}

function att(){
        
     //Pesquisa de botão de atualizar e captura do evento de click

    document.querySelectorAll(".btnAtt").forEach(function (btnAtt) {
        btnAtt.addEventListener("click", (e) => {
            idOleo = btnAtt.id
            sessionStorage.setItem('chave', idOleo);   
            window.location.href = "atualizar_oleo"
           

        })
    })
}