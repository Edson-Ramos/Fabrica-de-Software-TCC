//const rota = 'https://easylub.herokuapp.com'
const rota = 'http://localhost:5000'

function getGraxa(){

    fetch(`${rota}/listar_graxa`)
    .then(data => {
        return data.json();
    })
.then(data => {
    for(arquivo of data.arquivos)
        listaGraxa(arquivo);
    })
    .then(data => {
        del();
        att();
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
    btDel.id = `${arquivo.idGra}`
    let btIcon = document.createElement("img")
    btIcon.src = "/static/bootstrap/icons-1.8.1/icons/trash-fill.svg"

    //Botões de Atualizar
    let btAtt = document.createElement("button")
    btAtt.className = "btn btn-default btnAtt"
    btAtt.id = `${arquivo.idGra}`
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

function createTable(){
    var idGra = JSON.parse(sessionStorage.getItem('chave'))    

    const id_graxa={
        idGra : idGra
    }
    const dado_graxa = {
        method: "POST",
        body: JSON.stringify(id_graxa),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(`${rota}/listar_graxa_id`, dado_graxa)
        .then(function(response){
            response.json()
                .then(function(data){
                    for (dados of data.arquivos)

                    var id = dados.idOleo;
                    var cod = document.getElementById("codGra")
                    cod.value = `${dados.codGra}`
                    var linha = document.getElementById("tipo")
                    linha.value = `${dados.tipo}`
                    var consis = document.getElementById("consis")
                    consis.value = `${dados.consis}`    
                })
        })
}

function atualizar_Graxa() {    
    var idGra = JSON.parse(sessionStorage.getItem('chave'))  
    let codGra = document.getElementById("codGra").value
    let tipo= document.getElementById("tipo").value
    let consis = document.getElementById("consis").value 
   
    if (codGra == "" || tipo == "" || consis == ""){
        return alert("Todos os Campos São Obrigatorios!")
    }else{
     let dados_graxa = {
        idGra : idGra,
        codGra : codGra,
        tipo: tipo,
        consis: consis
    }    

    fetch("/atualizar_graxa",
    {
        method: "POST",
        body:JSON.stringify(dados_graxa),
        headers:{
            "Content-Type" : "application/json"
        }
    })
    .then((resposta) => {
        if (resposta.status == 200)
            return resposta.text()     
        else
            return "Erro Ao Atualizar Graxa"
    })
    .then((respostaTexto) => {
        document.location.href ="visualizar_graxa"
        alert(respostaTexto)
    })
       
    }

    
}
    
function del(){

    //pesquisa de botão de delete e captura do evento de click
     document.querySelectorAll(".btnDel").forEach(function (btnDel) {
        btnDel.addEventListener("click", (e) => {           
            let idGraxa = btnDel.id
            var res = window.confirm("Deseja Excluir Este Registro?")
            

            if (res) {
                
                let id_graxa = {
                    idGra : idGraxa
                }

                fetch("/deletar_graxa", {
                    method: "POST",
                    body: JSON.stringify(id_graxa),
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
            idGraxa = btnAtt.id
            sessionStorage.setItem('chave', idGraxa);   
            window.location.href = "atualizar_graxa"
           

        })
    })
}