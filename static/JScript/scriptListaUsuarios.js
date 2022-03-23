const rota = 'https://easylub.herokuapp.com'

function getArquivos(){
    
    fetch(`${rota}/listar`)
    .then(data => {        
        return data.json();
    })
.then(data => {    
    for(file of data.files)        
        createFile(file);
    
    })
}

var tbody = document.getElementById("tbody")

function createFile(file){
   

    let tr = document.createElement("tr")
    

    let tdId = document.createElement("td")
    tdId.className = "lista"
    tdId.innerText = `${file.id}`

    let tdNome = document.createElement("td")
    tdNome.className = "lista"
    tdNome.innerText = `${file.nome}`

    let tdSobreN = document.createElement("td")
    tdSobreN.className = "lista"
    tdSobreN.innerText = `${file.sobreNome}`

    let tdEmail = document.createElement("td")
    tdEmail.className = "lista"
    tdEmail.innerText = `${file.email}`

    let tdSenha = document.createElement("td")
    tdSenha.className = "lista"
    tdSenha.innerText = `${file.senha}`
    

    let tdTipo = document.createElement("td")
    tdTipo.className = "lista"
    

    if (file.tipo == 1){
        tdTipo.innerText = `Administrador`
        tbody.appendChild(tr)
        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdSobreN);
        tr.appendChild(tdEmail);  
        tr.appendChild(tdSenha);
        tr.appendChild(tdTipo);
    }else{
        tdTipo.innerText = `Funcionário`
        tbody.appendChild(tr)
        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdSobreN);
        tr.appendChild(tdEmail);  
        tr.appendChild(tdSenha);
        tr.appendChild(tdTipo);
    }
        
    
        if (resposta.status == 200)
            return resposta.text()
        else
            return alert("Erro Ao Deletar Usuário")
    
    .then((respostaTexto) => {
        alert(respostaTexto)
        document.location.reload(true);
    })          

    
}
