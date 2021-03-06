funcaoElemento = createFile

function getArquivos() {

    fetch(`${rota}/listar`)
        .then(data => {
            return data.json();
        })
        .then(data => {
           arquivos = data.arquivos
           pagination.update()
        })
        .then(data => {
            exibirPage()
        })
}
function AbrirModal(){
    
}


function createFile(file) {


    var tbody = document.getElementById("lista")
    let tr = document.createElement("tr")


    

    let tdNome = document.createElement("td")
    tdNome.className = "lista"
    tdNome.innerText = `${file.nome}`

    let tdEmail = document.createElement("td")
    tdEmail.className = "lista"
    tdEmail.innerText = `${file.email}`

    // Botões de Excluir
    var btDel = document.createElement("button")
    btDel.className = "btn btn-default btnDel"
    btDel.id = `${file.id}`
    btDel.title = "Excluir"
    let btIcon = document.createElement("i")
    btIcon.className="fa-solid fa-trash"

    //Botões de Atualizar
    let btAtt = document.createElement("button")
    btAtt.className = "btn btn-default btnAtt"
    btAtt.id = `${file.id}`
    btAtt.title = "Atualizar"
    let btAttIcon = document.createElement("i")
    btAttIcon.className = "fa-solid fa-pen-to-square"


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
    tr.appendChild(tdNome)
    tr.appendChild(tdEmail)
    tr.appendChild(tdTipo)
    tr.appendChild(btDel)
    tr.appendChild(btAtt)
}



    
function createTable(){
    var idUser = sessionStorage.getItem('chave')
    

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
                    for (dados of data.arquivos)

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

function alerta_att(){

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
        title: 'Atualização!',
        text: "Tem Certeza Que Deseja Atualizar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: ' Sim ',
        cancelButtonText: ' Não ',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
            atualizar_usuario()
            )
        } else if (
            
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
            'Cancelado!',
            'Registro Não Foi Atualizado',
            'error'
            )
        }
        })
}

function atualizar_usuario(){

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
        if (resposta.status == 200){
            confimacao_att()
        }            
        else{
            erro_att()
        }
    })
}

function confimacao_att(){
    Swal.fire({
    icon: 'success',
    title: 'Registro Foi Atualizado!',
    showConfirmButton: false
    })
    setTimeout(() => {  window.location.href = "visualizar_usuarios"; }, 2000)
    
    
}

function erro_att(){

    Swal.fire({
    icon: 'error',
    title: 'Erro Ao Atualizar Usuário',
    text: 'Tente Novamente!'
})
setTimeout(() => {  location.reload(); }, 2000)
}

function erro_campo_empty(){

    Swal.fire({
        icon: 'error',
        title: 'Opss...',
        text: 'Todos os Campos São Obrigatório!'
    })  
}

function att(){
        
    //Pesquisa de botão de atualizar e captura do evento de click

    document.querySelectorAll(".btnAtt").forEach(function (btnAtt) {
        btnAtt.addEventListener("click", (e) => {
            idUser = btnAtt.id
            sessionStorage.setItem('chave', idUser);   
            window.location.href = "atualizar_usuarios"
           

        })
    })
}

//Área Delete

function del(){

    //pesquisa de botão de delete e captura do evento de click
     document.querySelectorAll(".btnDel").forEach(function (exc) {
        exc.addEventListener("click", (e) => {
                let idUser = exc.id
                window.localStorage.setItem("id", idUser)       
                alerta_del()
        })
    })
}

function alerta_del(){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
        buttonsStyling: false
    })

        swalWithBootstrapButtons.fire({
            title: 'Delete!',
            text: "Deseja Excluir Este Registro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: ' Sim ',
            cancelButtonText: ' Não ',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
            
                let id_user = {
                    idUser : window.localStorage.getItem("id")
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
                        return confimacao_del()
                    else
                        return erro_del()
                })     
        }else if(
            
            result.dismiss === Swal.DismissReason.cancel
        ){
            swalWithBootstrapButtons.fire(
                'Cancelado!',
                'Operação Cancelada',
                'error'
            )}
    }) 
}

function confimacao_del(){
    Swal.fire({
    icon: 'success',
    title: 'Usuário Excluido!',
    showConfirmButton: false,
    timer: 1500   
})
    setTimeout(() => {  location.reload(); }, 2000)
}

function erro_del(){

    Swal.fire({
    icon: 'error',
    title: 'Erro Ao Excluir Usuário',
    text: 'Tente Novamente!'
})

}