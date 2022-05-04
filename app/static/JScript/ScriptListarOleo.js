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
            atualizar_oleo()
            
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

function atualizar_oleo() {    
    var idOleo = JSON.parse(sessionStorage.getItem('chave')) 
    let codOleo = document.getElementById("codOleo").value
    let tipo= document.getElementById("tipo").value
    let visco = document.getElementById("visco").value 
    
    
    if (codOleo == "" || tipo == "" || visco == ""){
        return erro_campo_empty()
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
    setTimeout(() => {  window.location.href = "visualizar_oleo"; }, 2000)
}

function erro_att(){

    Swal.fire({
        icon: 'error',
        title: 'Erro Ao Atualizar Óleo',
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
           idOleo = btnAtt.id
           sessionStorage.setItem('chave', idOleo);   
           window.location.href = "atualizar_oleo"
          

       })
   })
}


//Área de Delete


function del(){

    //pesquisa de botão de delete e captura do evento de click
     document.querySelectorAll(".btnDel").forEach(function (btnDel) {
        btnDel.addEventListener("click", (e) => {           

            let idOleo = btnDel.id
            window.localStorage.setItem("id", idOleo)       
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
          
        let id_oleo = {
            idOleo : window.localStorage.getItem("id")
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
  title: 'Óleo Excluido!',
  showConfirmButton: false,
  timer: 1500   
})
  setTimeout(() => {  location.reload(); }, 2000)
}

function erro_del(){

  Swal.fire({
  icon: 'error',
  title: 'Erro Ao Excluir Óleo',
  text: 'Tente Novamente!'
})

}

