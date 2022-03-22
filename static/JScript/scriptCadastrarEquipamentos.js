
function cadastrar_equipamento() {
    let id = document.getElementById("idMaq").value;
	let nome = document.getElementById("nomeMaq").value;
	let linha = document.getElementById("linhaMaq").value;
	let trecho = document.getElementById("trechoMaq").value;
    
	let dados_equipamento = {
		id: id,
        nome: nome,		
		linha: linha,
		trecho: trecho		
    
	}

    if (id == "" || nome == "" || linha == "" || trecho == ""){
        return alert("Todos os Campos São Obrigatorios!")
    }else{
        fetch("/cadastrar_equipamentos",
    {
        method:"POST",
        body:JSON.stringify(dados_equipamento),
        headers:{
            "Content-Type": "application/json"
        }        
    })    
    .then((resposta) => {
        
        if (resposta.status == 200)
            return resposta.text()
        else 
            return "Erro Ao Cadastrar o Equipamento"          
    })
    .then((respostaTexto) => {
        alert(respostaTexto)
    })
    }
	  
    
    
}
    