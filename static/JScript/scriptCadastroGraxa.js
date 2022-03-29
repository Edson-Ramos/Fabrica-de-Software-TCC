function cadastro_graxa() {
    let id = document.getElementById("id").value
    let tipo = document.getElementById("tipo")
    let consis = document.getElementById("consis")
  
    if (id == "" || tipo == "" || consis == ""){
        alert("Todos os Campos São Obrigatorios !")
    }else{
        let infor = {
            id : id,
            tipo : tipo,
            consis : consis
        }
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
                return resposta.text()
            else
                return "Erro Ao Cadastrar Graxa!"
        })
        .then((respostaTexto) => {
            alert(respostaTexto)
            document.location.reload(true)
        })
    }
}