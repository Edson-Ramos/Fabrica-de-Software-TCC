
function cadastrar_maquina() {
    let cod = document.getElementById("codMaq").value.toUpperCase()
	let linha = document.getElementById("linhaMaq").value.toUpperCase()
	let trecho = document.getElementById("trechoMaq").value.toUpperCase()
	let nome = document.getElementById("nomeMaq").value.toUpperCase()

    
	let dados_maquina = {
		cod: cod,		
		linha: linha,
		trecho: trecho,
        nome: nome		
    
	}

    if (cod == "" || nome == "" || linha == "" || trecho == ""){
        return erro_Campo_empty()
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
                return success()
            else 
                return erro()          
        })
    }
}

function success(){
    Swal.fire({
    icon: 'success',
    title: 'Máquina Cadastrada Com Sucesso!',
    showConfirmButton: false,
    timer: 1500     
    })
    setTimeout(() => {  location.reload(); }, 2000)
}
function erro(){

    Swal.fire({
    icon: 'error',
    title: 'Erro Ao Cadastrar Máquina',
    text: 'Verifique os Campos Digitados!'
    })
}
function erro_Campo_empty(){

    Swal.fire({
    icon: 'error',
    title: 'Opss...',
    text: 'Todos os Campos São Obrigatório!'
    })  
}