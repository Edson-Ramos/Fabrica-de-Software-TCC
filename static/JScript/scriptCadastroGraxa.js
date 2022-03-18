function cadastro_graxa() {
    let id = document.getElementById("id").value
    let selectTipo = document.getElementById("tipos")
    let selectConsis = document.getElementById("consistencia")
    let tipo = selectTipo.options[selectTipo.selectedIndex].value
    let consis = selectConsis.options[selectConsis.selectedIndex].value

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