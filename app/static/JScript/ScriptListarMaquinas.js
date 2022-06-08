//const rota = 'https://easylub.herokuapp.com'
const rota = 'http://192.168.0.109:5000'


function getMaquinas(){

    fetch(`${rota}/listar_maquinas`)
    .then(data => {
        return data.json();
    })
    .then(data => {
            let tamanho = data.arquivos.length
            let perPage = 10
            const state = {
                page: 1,
                perPage,
                totalPage: Math.ceil(tamanho / perPage)
            }
            
            console.log(state.totalPage)
        })
    .then(data => {
        del();
        att();
})
}


function lista(){
    const state = {
        page:1,
        perpage:5,
        totalPage: ""
    }
    
}

//Área de Criação da pg lista máquinas  

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
    btEx.style.background = "#FF4A4A"
    let btIcon = document.createElement("img")
    btIcon.src = "/static/bootstrap/icons-1.8.1/icons/trash-fill.svg"

    //Botões de Atualizar
    var btAtt = document.createElement("button")
    btAtt.className = "btn btn-default btnAtt"
    btAtt.id = `${arquivo.idMaq}`
    btAtt.style.background = "#416EFF"
    let btAttIcon = document.createElement("img")
    btAttIcon.src = "static/bootstrap/icons-1.8.1/icons/pencil-square.svg"

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

//Área de Atualização

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
                if (response.status == 500){
                    alerta_erro_codMaq()
                }else if (response.status == 200){
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
                }   
            })
    }

})

function alerta_erro_codMaq(){
    Swal.fire({
        icon: 'error',
        title: 'Opss...',
        text: 'Campo Cód. Máquina Não Encontrado!'
    })
    document.querySelectorAll(".swal2-styled").forEach(function(btnOK){
        btnOK.addEventListener("click", (e) =>{
            location.reload(true)
        })
    })
}

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

function confimacao_att(){
    Swal.fire({
    icon: 'success',
    title: 'Registro Foi Atualizado!',
    showConfirmButton: false
    })
    setTimeout(() => {  window.location.href = "visualizar_maquinas"; }, 2000)
    
    
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
           
            atualizar_maquina()
           
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

function erro_att(){

    Swal.fire({
    icon: 'error',
    title: 'Erro Ao Atualizar Maquina',
    text: 'Tente Novamente!'
    })
    setTimeout(() => {  location.reload(); }, 2000)
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
    if (linhaMaq == "" || trechoMaq == "" || nomeMaq == ""){
        return erro_campo_empty()
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
            return confimacao_att()
        else
            return erro_att()
    })
    
    }
    
}
   
function del(){
       //pesquisa de botão de delete e captura do evento de click
 
  document.querySelectorAll(".btnEx").forEach(function (btnEx) {
        btnEx.addEventListener("click", (e) => {
            let idDel = btnEx.id
            window.localStorage.setItem("id", idDel)       
            alerta_del() 
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
          
          
              let dado_maquina = {
                  idMaq : window.localStorage.getItem("id")
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
                      return confimacao_del()
                  else
                      return erro_del()
              })     
      }else if (
          
          result.dismiss === Swal.DismissReason.cancel
      ) {
          swalWithBootstrapButtons.fire(
          'Cancelado!',
          'Operação Cancelada',
          'error'
          )
      }
      })
      
}

function confimacao_del(){
    Swal.fire({
        icon: 'success',
        title: 'Máquina Excluida!',
        showConfirmButton: false,
        timer: 1500   
    })
    setTimeout(() => {  location.reload(); }, 2000)
}

function erro_del(){
    Swal.fire({
        icon: 'error',
        title: 'Erro Ao Excluir Máquina',
        text: 'Tente Novamente!'
    })
}
function erro_campo_empty(){

    Swal.fire({
        icon: 'error',
        title: 'Opss...',
        text: 'Todos os Campos São Obrigatório!'
    })  
}