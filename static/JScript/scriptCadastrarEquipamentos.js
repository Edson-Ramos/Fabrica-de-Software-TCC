
function cadastrar_equipamento() {
	let nome = document.getElementById("nome_equipamento").value;
	let id = document.getElementById("id_equipamento").value;
	let linha = document.getElementById("linha").value;
	let local = document.getElementById("local").value;
    
	let dados_equipamento = {
		id: id,
        nome: nome,		
		linha: linha,
		trecho: local		
    
	}
	fetch("/cadastro_maquinas",
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
    