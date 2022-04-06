function cadastro_graxa() {
    let codGra = document.getElementById("codGra").value
    let tipo = document.getElementById("tipo").value
    let consis = document.getElementById("consis").value
  
    if (codGra == "" || tipo == "" || consis == ""){
        alert("Todos os Campos São Obrigatorios !")
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