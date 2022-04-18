//const rota = 'https://easylub.herokuapp.com'
const rota = 'http://localhost:5000'


function getSpray(){

    fetch(`${rota}/listar_spray`)
    .then(data => {
        return data.json();
    })
.then(data => {
    for(arquivo of data.arquivos)
      listaSpray(arquivo);
    })
    .then(data => {
        del();
        att();
    })
}

var tbody = document.getElementById("tbody")

function listaSpray(arquivo){     

    let tr = document.createElement("tr");    

    let idSpray = arquivo.idSpray

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
    btDel.id = `${arquivo.idSpray}`
    let btIcon = document.createElement("img")
    btIcon.src = "/static/bootstrap/icons-1.8.1/icons/trash-fill.svg"

    //Botões de Atualizar
    let btAtt = document.createElement("button")
    btAtt.className = "btn btn-default btnAtt"
    btAtt.id = `${arquivo.idSpray}`
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
    
function createTable(){
    var idSpray = JSON.parse(sessionStorage.getItem('chave'))    

    const id_spray={
        idSpray : idSpray
    }
    const dado_spray = {
        method: "POST",
        body: JSON.stringify(id_spray),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(`${rota}/lista_spray_id`, dado_spray)
        .then(function(response){
            response.json()
                .then(function(data){
                    for (dados of data.arquivos)

                    var id = dados.idOleo;
                    var cod = document.getElementById("codSpray")
                    cod.value = `${dados.codSpray}`
                    var linha = document.getElementById("tipo")
                    linha.value = `${dados.tipo}`
                    var visco = document.getElementById("visco")
                    visco.value = `${dados.visco}`    
                })
        })
}

function atualizar_Spray() {    
    
    let idSpray = sessionStorage.getItem('chave')
    let codSpray = document.getElementById("codSpray").value
    let tipo= document.getElementById("tipo").value
    let visco = document.getElementById("visco").value 
   
    if (codSpray == "" || tipo == "" || visco == ""){
        return alert("Todos os Campos São Obrigatorios!")
    }else{
     let dados_spray = {
        idSpray : idSpray,
        codSpray : codSpray,
        tipo: tipo,
        visco : visco,
    }    
    console.log( dados_spray)
    fetch("/atualizar_spray",
    {
        method: "POST",
        body:JSON.stringify(dados_spray),
        headers:{
            "Content-Type" : "application/json"
        }
    })
    .then((resposta) => {
        if (resposta.status == 200)
            return resposta.text()     
        else
            return "Erro Ao Atualizar Spray"
    })
    .then((respostaTexto) => {
        document.location.href = "visualizar_spray"
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
                let idSpray = btnDel.id
                let id_spray = {
                    idSpray : idSpray
                }

                fetch("/deletar_spray", {
                    method: "POST",
                    body: JSON.stringify(id_spray),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((resposta) => {
                    if (resposta.status == 200)
                        return resposta.text()
                    else
                        return resposta.text()
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
            idSpray = btnAtt.id
            sessionStorage.setItem('chave', idSpray);   
            window.location.href = "atualizar_spray"
           

        })
    })
}