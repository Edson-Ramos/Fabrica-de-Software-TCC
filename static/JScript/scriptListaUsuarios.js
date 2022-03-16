const rota = 'http://localhost:5000'

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
    tdId.innerText = `${file.id}`

    let tdNome = document.createElement("td")
    tdNome.innerText = `${file.nome}`

    let tdSobreN = document.createElement("td")
    tdSobreN.innerText = `${file.sobreNome}`

    let tdEmail = document.createElement("td")
    tdEmail.innerText = `${file.email}`

    let tdSenha = document.createElement("td")
    tdSenha.innerText = `${file.senha}`

    tbody.appendChild(tr)
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdSobreN);
    tr.appendChild(tdEmail);  
    tr.appendChild(tdSenha);
}
