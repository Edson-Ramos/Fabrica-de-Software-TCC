
function cadastrar_maquina() {
    let cod = document.getElementById("codMaq").value;
	let linha = document.getElementById("linhaMaq").value;
	let trecho = document.getElementById("trechoMaq").value;
	let nome = document.getElementById("nomeMaq").value;
    
	let dados_maquina = {
		cod: cod,		
		linha: linha,
		trecho: trecho,
        nome: nome		
    
	}

    if (cod == "" || nome == "" || linha == "" || trecho == ""){
        return alert("Todos os Campos São Obrigatorios!")
    }else{
        fetch("/cadastrar_maquinas",
        {
            method:"POST",
            body:JSON.stringify(dados_maquina),
            headers:{
                "Content-Type": "application/json"
            }        
        })    
        .then((resposta) => {
            
            if (resposta.status == 200)
                return resposta.text()
            else 
                return "Erro Ao Cadastrar Máquina"          
        })
        .then((respostaTexto) => {
            document.location.reload(true)
            alert(respostaTexto)
        })
    }
	  
    
    
}
    