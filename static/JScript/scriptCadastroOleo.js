function cadastro_oleo(){
    codOleo = document.getElementById("codOleo").value
    tipo = document.getElementById("tipo").value
    visco = document.getElementById("visco").value
    
// precisa verificar o campo visco e id vai ser do tipo int ou string
    if (codOleo == "" || tipo == "" || visco == ""){
        return alert("Todos os Campos São Obrigatorios!")
    }else{
        let infor = {
            codOleo: codOleo,
            tipo: tipo,
            visco: visco
        }
        fetch("/cadastrar_oleo",
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
                return resposta.text()
            else
                return "Erro Ao Cadastrar Oleo !"
        })
        .then((respostaTexto) =>{
            alert(respostaTexto)
            document.location.reload(true)
        })

    }
}