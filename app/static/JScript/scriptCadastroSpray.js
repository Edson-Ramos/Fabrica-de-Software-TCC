function cadastro_spray(){
    codSpray = document.getElementById("codSpray").value.toUpperCase()
    tipo = document.getElementById("tipo").value.toUpperCase()
    visco = document.getElementById("visco").value.toUpperCase()
   
// precisa verificar o campo visco e id vai ser do tipo int ou string
    if (codSpray == "" || tipo == "" || visco == ""){
        return erro_campo_empty()
    }else{
        let infor = {
            codSpray: codSpray,
            tipo: tipo,
            visco: visco
        }
        fetch("/cadastrar_spray",
        {
            method: "POST",
            body : JSON.stringify(infor),
            headers: 
            {
                "Content-Type" : "application/json"
            }
        })
        .then((resposta) =>{
            if(resposta.status== 200)
                return success()
            else
                return erro()
        })

    }
}
function success(){
    Swal.fire({
        icon: 'success',
        title: 'Spray Cadastrado Com Sucesso!',
        showConfirmButton: false,
        timer: 1500   
    })
    setTimeout(() => {  location.reload(); }, 2000)
}

function erro(){
    Swal.fire({
        icon: 'error',
        title: 'Erro Ao Cadastrar Spray',
        text: 'Verifique os Campos Digitados!'
    })
}

function erro_campo_empty(){
    Swal.fire({
        icon: 'error',
        title: 'Opss...',
        text: 'Todos os Campos São Obrigatório!'
    })  
}