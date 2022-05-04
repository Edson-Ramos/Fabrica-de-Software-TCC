function cadastro_graxa() {
    let codGra = document.getElementById("codGra").value
    let tipo = document.getElementById("tipo").value
    let consis = document.getElementById("consis").value
  
    if (codGra == "" || tipo == "" || consis == ""){
        return erro_campo_empty()
    }else{
        let infor = {
            codGra : codGra,
            tipo : tipo,
            consis : consis
        }
        console.log(infor)
        fetch("/cadastrar_graxa", 
        {
            method: "POST",
            body: JSON.stringify(infor),
            headers: 
            {
                "Content-Type" : "application/json"
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
        title: 'Graxa Cadastrada Com Sucesso!',
        showConfirmButton: false,
        timer: 1500   
    })
    setTimeout(() => {  location.reload(); }, 2000)
}

function erro(){
    Swal.fire({
        icon: 'error',
        title: 'Erro Ao Cadastrar Graxa',
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