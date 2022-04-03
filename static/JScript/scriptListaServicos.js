const rota = 'https://easylub.herokuapp.com'
//const rota = 'http://localhost:5000'




function getServicos() {

    fetch(`${rota}/listar_servico`)
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
    tdId.innerText = `${file.idServ}`

    let tdIdMaq = document.createElement("td")
    tdIdMaq.className = "lista"
    tdIdMaq.innerText = `${file.idMaq}`

    let tdMaq = document.createElement("td")
    tdMaq.className = "lista"
    tdMaq.innerText = `${file.maq}`

    let tdLinha = document.createElement("td")
    tdLinha.className = "lista"
    tdLinha.innerText = `${file.linha}`

    let tdTrecho = document.createElement("td")
    tdTrecho.className = "lista"
    tdTrecho.innerText = `${file.trecho}`

    let tdEquip = document.createElement("td")
    tdEquip.className = "lista"
    tdEquip.innerText = `${file.equip}`

    let tdTipoLub = document.createElement("td")
    tdTipoLub.className = "lista"
    tdTipoLub.innerText = `${file.tipoLub}`
    
    let tdTipo = document.createElement("td")
    tdTipo.className = "lista"
    tdTipo.innerText = `${file.tipo}`

    let tdProp = document.createElement("td")
    tdProp.className = "lista"
    tdProp.innerText = `${file.prop}`

    let tdDataApli = document.createElement("td")
    tdDataApli.className = "lista"
    tdDataApli.innerText = `${file.dataApli}`

    let tdDataProxApli = document.createElement("td")
    tdDataProxApli.className = "lista"
    tdDataProxApli.innerText = `${file.dataProxApli}`


    let tdStatus = document.createElement("td")
    tdStatus.className = "lista"
    tdStatus.innerText = `${file.status}`

    let tdObs = document.createElement("td")
    tdObs.className = "lista"
    tdObs.innerText = `${file.obs}`

    var btDel = document.createElement("button")
    btDel.className = "btn btn-default btnDel"
    btDel.id = `${file.idServ}`
    let btIcon = document.createElement("img")
    btIcon.src = "/static/bootstrap/icons-1.8.1/icons/trash-fill.svg"

    let btAtt = document.createElement("button")
    btAtt.className = "btn btn-default"
    let btAttIcon = document.createElement("img")
    btAttIcon.src = "/static/bootstrap/icons-1.8.1/icons/arrow-repeat.svg"

    let btVisul = document.createElement("button")
    btVisul.className = "btn btn-default"
    let btVisulIcon = document.createElement("img")
    btVisulIcon.src = "/static/bootstrap/icons-1.8.1/icons/eye.svg"

    


        btDel.appendChild(btIcon)
        btAtt.appendChild(btAttIcon)
        btVisul.appendChild(btVisulIcon)
        tbody.appendChild(tr)
        tr.appendChild(tdId)
        tr.appendChild(tdMaq)
        tr.appendChild(tdLinha)
        tr.appendChild(tdTrecho)
        tr.appendChild(tdEquip)
        tr.appendChild(tdTipoLub)
        tr.appendChild(tdTipo)
        tr.appendChild(tdProp)
        tr.appendChild(tdDataApli)
        tr.appendChild(tdDataProxApli)
        tr.appendChild(tdStatus)
        tr.appendChild(tdObs)
        tr.appendChild(btDel)
        tr.appendChild(btAtt)
        tr.appendChild(btVisul)

     document.querySelectorAll(".btnDel").forEach(function(button){
    
        button.addEventListener("click",(e) =>{
            const idServ = button.id
            
           var confirm = window.confirm("Tem Certeza Que Deseja Excluir Este Registro?")
           
            if(confirm){
                
                let dado_servico = {
                    idServ : idServ
                }
                
                fetch("/deletar_servico",
                {
                    method : "POST",
                    body:JSON.stringify(dado_servico),
                    headers: 
                    {
                        "Content-Type" : "application/json"
                    }
                })
                .then((resposta) => {
                if (resposta.status == 200)
                    return resposta.text()
                else
                    return alert("Erro Ao Deletar Serviço")
                })
                .then((respostaTexto) => {
                    alert(respostaTexto)
                    
                })            
            }else
                alert("Operação Cancelada")
                document.location.reload(true);
            
        })
    })
}
    
   
    
        





    
    


 
