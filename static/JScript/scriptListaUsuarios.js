//const rota = 'https://easylub.herokuapp.com'
const rota = 'http://localhost:5000'


function getArquivos() {

    fetch(`${rota}/listar`)
        .then(data => {
            return data.json();
        })
        .then(data => {
            for (file of data.files)
                createFile(file);
        })
}


function createFile(file) {


    var tbody = document.getElementById("tbody")
    let tr = document.createElement("tr")


    let tdId = document.createElement("td")
    tdId.className = "lista"
    tdId.innerText = `${file.id}`

    let tdNome = document.createElement("td")
    tdNome.className = "lista"
    tdNome.innerText = `${file.nome}`

    let tdEmail = document.createElement("td")
    tdEmail.className = "lista"
    tdEmail.innerText = `${file.email}`

    let tdSenha = document.createElement("td")
    tdSenha.className = "lista"
    tdSenha.innerText = `${file.senha}`



    // Botões de Excluir
    var btDel = document.createElement("button")
    btDel.className = "btn btn-default btn-Del"
    btDel.id = `${file.id}`
    let btIcon = document.createElement("img")
    btIcon.src = "/static/bootstrap/icons-1.8.1/icons/trash-fill.svg"

    //Botões de Atualizar
    let btAtt = document.createElement("button")
    btAtt.className = "btn btn-default btnAtt"
    btAtt.id = `${file.id}`
    let btAttIcon = document.createElement("img")
    btAttIcon.src = "/static/bootstrap/icons-1.8.1/icons/arrow-repeat.svg"


    if (file.tipo == 1) {
        var func = `Administrador`
    } else {
        var func = `Funcionário`
    }

    let tdTipo = document.createElement("td")
    tdTipo.className = "lista"
    tdTipo.innerText = func

    btDel.appendChild(btIcon)
    btAtt.appendChild(btAttIcon)
    tbody.appendChild(tr)
    tr.appendChild(tdId)
    tr.appendChild(tdNome)
    tr.appendChild(tdEmail)
    tr.appendChild(tdSenha)
    tr.appendChild(tdTipo)
    tr.appendChild(btDel)
    tr.appendChild(btAtt)

    //pesquisa de botão de delete e captura do evento de click

    document.querySelectorAll(".btn-Del").forEach(function (btnDel) {
        btnDel.addEventListener("click", (e) => {
            let idUser = btnDel.id

           var res = confirm("Tem Certeza Que Deseja Excluir Este Registro?")

            if (res == true) {

                let id_user = {
                    idUser : idUser
                }

            fetch("/deletar_usuarios", {
                    method: "POST",
                    body: JSON.stringify(id_user),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((resposta) => {
                    if (resposta.status == 200)
                        return resposta.text()
                    else
                        return alert("Erro Ao Deletar Usuario")
                })
                .then((respostaTexto) => {
                    alert(respostaTexto)

                })
            } else
                alert("Operação Cancelada")
                 document.location.reload(true);
                    
            
                

        })
    })

    //Pesquisa de botão de atualizar e captura do evento de click

    document.querySelectorAll(".btnAtt").forEach(function (btnAtt) {
        btnAtt.addEventListener("click", (e) => {
            idUser = btnAtt.id
            sessionStorage.setItem('chave', idUser);   
            window.location.href = "atualizar_usuarios"
           

        })
    })
}

function createTable(){
    var idUser = JSON.parse(sessionStorage.getItem('chave'))    

    const id_user={
        idUser : idUser
    }
    const dado_usuario = {
        method: "POST",
        body: JSON.stringify(id_user),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(`${rota}/listar_usuario_id`, dado_usuario)
        .then(function(response){
            response.json()
                .then(function(data){
                    for (dados of data.files)

                    var id = dados.idUser;
                    var nome = document.getElementById("nome")
                    nome.value = `${dados.nome}`
                    var email = document.getElementById("email")
                    email.value = `${dados.email}`
                    var senha = document.getElementById("senha")
                    senha.value = `${dados.senha}`
                    var cSenha = document.getElementById("cSenha")
                    cSenha.value = `${dados.senha}`
                    var tipo = document.querySelector("#tipos")
                    tipo = `${dados.tipo}`

                    if (tipo == "1"){
                        const select = document.querySelector('#tipos')
                        select.querySelectorAll('option')[1].selected = 'selected'
                    }else if (tipo == "2"){
                        const select = document.querySelector('#tipos')
                        select.querySelectorAll('option')[2].selected = 'selected'
                    }
                        
                })
        })
}

function atualizar_equipamento(){

    var idUser = JSON.parse(sessionStorage.getItem('chave')) 
    let nome = document.getElementById("nome").value
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value
    let cSenha = document.getElementById("cSenha").value
    let select = document.getElementById("tipos")
    let tipo = select.options[select.selectedIndex].value


    let dados_usuario = {
        nome : nome,
        id : idUser,
        email : email,
        senha : senha,
        tipo : tipo
    }    

    fetch("/atualizar_usuarios",
    {
        method: "POST",
        body:JSON.stringify(dados_usuario),
        headers:{
            "Content-Type" : "application/json"
        }
    })
    .then((resposta) => {
        if (resposta.status == 200)
            return resposta.text()        
        else
            return "Erro Ao Atualizar Usuário"
    })
    .then((respostaTexto) => {
         window.location.href = "visualizar_usuarios"
        alert(respostaTexto)
    })
}