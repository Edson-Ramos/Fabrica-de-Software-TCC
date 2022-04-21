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
.then(data => {
    del();
    att();
})
}



function listaMaquinas(){     
   
    var tbody = document.getElementById("tbody")

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
    var btEx = document.createElement("button")
    btEx.className = "btn btn-default btnEx"
    btEx.id = `${arquivo.idMaq}`
    let btIcon = document.createElement("img")
    btIcon.src = "/static/bootstrap/icons-1.8.1/icons/trash-fill.svg"

    //Botões de Atualizar
    var btAtt = document.createElement("button")
    btAtt.className = "btn btn-default btnAtt"
    btAtt.id = `${arquivo.idMaq}`
    let btAttIcon = document.createElement("img")
    btAttIcon.src = "/static/bootstrap/icons-1.8.1/icons/arrow-repeat.svg"

    btEx.appendChild(btIcon)
    btAtt.appendChild(btAttIcon)
    tbody.appendChild(tr)
    tr.appendChild(tdCod)
    tr.appendChild(tdLinha)
    tr.appendChild(tdTrecho)
    tr.appendChild(tdNome)
    tr.appendChild(btEx)
    tr.appendChild(btAtt) 
}
const codMaq = document.querySelector("#codMaq")
codMaq.addEventListener("blur", (e) => {

    let cod_maq = {
        codMaq: codMaq.value
    }
    if (codMaq == "") {
        return alert("Preencha Campo ID Máquina")
    } else {
        const cod_Maquina = {
            method: "POST",
            body: JSON.stringify(cod_maq),
            headers: {
                "Content-Type": "application/json"
            }
        }


        fetch(`${rota}/lista_equipamento_cod`, cod_Maquina)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        for (arquivo of data.arquivos)
                            var id = dados.idMaq;
                    var nome = document.getElementById("codMaq")
                    nome.value = `${arquivo.codMaq}`
                    var email = document.getElementById("linhaMaq")
                    email.value = `${arquivo.linha}`
                    var senha = document.getElementById("trechoMaq")
                    senha.value = `${arquivo.trecho}`
                    var cSenha = document.getElementById("nomeMaq")
                    cSenha.value = `${arquivo.nome}` 
                    })
            })
    }

})

function createTable(){
    var idMaq = JSON.parse(sessionStorage.getItem('chave'))    

    const id_maq={
        idMaq : idMaq
    }
    const dado_usuario = {
        method: "POST",
        body: JSON.stringify(id_maq),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(`${rota}/lista_equipamento_id`, dado_usuario)
        .then(function(response){
            response.json()
                .then(function(data){
                    for (dados of data.files)

                    var id = dados.idMaq;
                    var nome = document.getElementById("codMaq")
                    nome.value = `${dados.codMaq}`
                    var email = document.getElementById("linhaMaq")
                    email.value = `${dados.linha}`
                    var senha = document.getElementById("trechoMaq")
                    senha.value = `${dados.trecho}`
                    var cSenha = document.getElementById("nomeMaq")
                    cSenha.value = `${dados.nome}`    
                })
        })
}



function atualizar_maquina() {    
    let idMaq = JSON.parse(sessionStorage.getItem('chave')) 
    let codMaq = document.getElementById("codMaq").value
    let linhaMaq = document.getElementById("linhaMaq").value
    let trechoMaq = document.getElementById("trechoMaq").value
    let nomeMaq = document.getElementById("nomeMaq").value

    let dados_maquina = {
        idMaq: idMaq,
        codMaq: codMaq,
        linha: linhaMaq,
        trecho: trechoMaq,
        nomeMaq: nomeMaq,
    }    
    if (idMaq == "" || codMaq == "" || linhaMaq == "" || trechoMaq == "" || nomeMaq == ""){
        return alert("Todos os Campos São Obrigatorios!")
    }else{
       fetch("/atualizar_maquinas",
    {
        method: "POST",
        body:JSON.stringify(dados_maquina),
        headers:{
            "Content-Type" : "application/json"
        }
    })
    .then((resposta) => {
        if (resposta.status == 200)
            return resposta.text()
        else
            return "Erro Ao Atualizar Máquina"
    })
    .then((respostaTexto) => {
        window.location.href = "visualizar_maquinas"
        alert(respostaTexto)
        
    }) 
    }
    
}
   
function del(){
       //pesquisa de botão de delete e captura do evento de click
 
  document.querySelectorAll(".btnEx").forEach(function (btnEx) {
        btnEx.addEventListener("click", (e) => {
            idDel = btnEx.id
            var confirm = window.confirm(`Deseja Realmente Excluir Máquina` )

            if (confirm)
            {
                let dado_maquina = {
                        idMaq : idDel
                    }

                fetch("/deletar_maquinas", {
                        method: "POST",
                        body: JSON.stringify(dado_maquina),
                        headers: {
                                "Content-Type": "application/json"
                        }
                    })
                    .then((resposta) => {
                        if (resposta.status == 200)
                            return resposta.text()
                        else
                            return "Erro Ao Deletar Máquina"
                    })
                    .then((respostaTexto) => {
                        window.location.href = "visualizar_maquinas"
                        alert(respostaTexto)
                        
                    }) 
            } else
                window.alert("Operação Cancelada!")
                document.location.reload(true)
                 

        })
    })
}

function att(){
        

     //Pesquisa de botão de atualizar e captura do evento de click

    document.querySelectorAll(".btnAtt").forEach(function (btnAtt) {
        btnAtt.addEventListener("click", (e) => {
            idMaq = btnAtt.id
            sessionStorage.setItem('chave', idMaq);   
            window.location.href = "atualizar_maquinas"
           

        })
    })
}