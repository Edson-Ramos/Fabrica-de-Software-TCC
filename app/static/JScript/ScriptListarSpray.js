funcaoElemento = listaSpray


function getSpray(){

    fetch(`${rota}/listar_spray`)
    .then(data => {
        return data.json();
    })
.then(data => {
        arquivos = data.arquivos;
        pagination.update()
    })
    .then(data => {
        exibirPage()
    })
}

function AbrirModal(){
    
}

var tbody = document.getElementById("lista")

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
    btDel.title = "Excluir"
    let btIcon = document.createElement("i")
    btIcon.className="fa-solid fa-trash"

    //Botões de Atualizar
    let btAtt = document.createElement("button")
    btAtt.className = "btn btn-default btnAtt"
    btAtt.id = `${arquivo.idSpray}`
    btAtt.title = "Atualizar"
    let btAttIcon = document.createElement("i")
    btAttIcon.className = "fa-solid fa-pen-to-square"


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

// Área de Att

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
            atualizar_spray()
            
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

function atualizar_spray() {    
    
    let idSpray = sessionStorage.getItem('chave')
    let codSpray = document.getElementById("codSpray").value.toUpperCase()
    let tipo= document.getElementById("tipo").value.toUpperCase()
    let visco = document.getElementById("visco").value.toUpperCase() 
   
    if (codSpray == "" || tipo == "" || visco == ""){
        return erro_campo_empty()
    }else{
        let dados_spray = {
            idSpray : idSpray,
            codSpray : codSpray,
            tipo: tipo,
            visco : visco,
    }
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
            return confimacao_att()    
        else
            return erro_att()
    }) 
    }
}

function confimacao_att(){
    Swal.fire({
        icon: 'success',
        title: 'Registro Foi Atualizado!',
        showConfirmButton: false
    })
    setTimeout(() => {  window.location.href = "visualizar_spray"; }, 2000)
}

function erro_att(){

    Swal.fire({
        icon: 'error',
        title: 'Erro Ao Atualizar Spray',
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
           idSpray = btnAtt.id
           sessionStorage.setItem('chave', idSpray);   
           window.location.href = "atualizar_spray"
          

       })
   })
}

//Área de Delete

function del(){

    //pesquisa de botão de delete e captura do evento de click
     document.querySelectorAll(".btnDel").forEach(function (btnDel) {
        btnDel.addEventListener("click", (e) => {           

            let idSpray = btnDel.id
            window.localStorage.setItem("id", idSpray)       
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
          
        let id_spray = {
            idSpray : window.localStorage.getItem("id")
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
    title: 'Spray Excluido!',
    showConfirmButton: false,
    timer: 1500   
  })
    setTimeout(() => {  location.reload(); }, 2000)
  }
  
  function erro_del(){
  
    Swal.fire({
    icon: 'error',
    title: 'Erro Ao Excluir Spray',
    text: 'Tente Novamente!'
  })
  
  }