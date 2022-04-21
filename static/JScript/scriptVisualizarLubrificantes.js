function list_lubificantes(){
    let select = document.getElementById("tipos")
    let valor = select.options[select.selectedIndex].value
   
    
    if (valor == "default"){
        return alert("Selecione um Tipo de Lubrificante!")

    }else if (valor == "oleo"){
        return window.location.href ="visualizar_oleo"

    }else if (valor == "graxa"){
        return window.location.href = "visualizar_graxa"

    }else if (valor == "spray"){
        return window.location.href = "visualizar_spray"
    }
         
}