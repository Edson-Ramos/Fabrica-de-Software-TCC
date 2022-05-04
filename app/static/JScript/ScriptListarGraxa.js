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
    btAttIcon.src = "/static/bootstrap/icons-1.8.1/icons/pencil-square.svg"  

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
            atualizar_graxa()
            
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


function atualizar_graxa() {    
    var idGra = JSON.parse(sessionStorage.getItem('chave'))  
    let codGra = document.getElementById("codGra").value
    let tipo= document.getElementById("tipo").value
    let consis = document.getElementById("consis").value 
   
    if (codGra == "" || tipo == "" || consis == ""){
        return erro_campo_empty()
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
    setTimeout(() => {  window.location.href = "visualizar_graxa"; }, 2000)
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
           idGraxa = btnAtt.id
           sessionStorage.setItem('chave', idGraxa);   
           window.location.href = "atualizar_graxa"
          

       })
   })
}

//Área de Delete

function del(){

    //pesquisa de botão de delete e captura do evento de click
     document.querySelectorAll(".btnDel").forEach(function (btnDel) {
        btnDel.addEventListener("click", (e) => {           
            let idGraxa = btnDel.id
            window.localStorage.setItem("id", idGraxa)       
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
          
        let id_graxa = {
            idGra : window.localStorage.getItem("id")
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
                return confimacao_del()
            else
                return erro_del()
            })     
        }else if (
          
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
  title: 'Graxa Excluida!',
  showConfirmButton: false,
  timer: 1500   
})
  setTimeout(() => {  location.reload(); }, 2000)
}

function erro_del(){

  Swal.fire({
  icon: 'error',
  title: 'Erro Ao Excluir Graxa',
  text: 'Tente Novamente!'
})

}
