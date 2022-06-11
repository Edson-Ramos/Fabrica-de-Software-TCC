var arquivos, funcaoElemento, arquivosFiltrados = [], arquivosFil;



function pesquisar(){
    let filtro = document.getElementById("pesquisa").value    
    let tp_pesquisa = document.getElementById("tipo_pesquisa").value
    for (let pos = 0; pos < arquivos.length ;pos++){        
        arquivosFiltrados[pos] = arquivos[pos]
    }
    if(tp_pesquisa == "Tipo de Pesquisa"){
        alert("Selecione o tipo de Pesquisa")
    }else if(tp_pesquisa == "codMaq"){
        if(filtro != ""){
            filtro = filtro.toUpperCase()
            const filtrados = arquivosFiltrados.filter(function (elemento){
            return elemento.codMaq.includes(filtro)
            })
            arquivosFil = filtrados
            limparLista()
            exibirPageFiltro()            
        }
        else
            exibirPage()    
    }else if(tp_pesquisa == "trecho"){        
        if(filtro != ""){
            filtro = filtro.toUpperCase()
            const filtrados = arquivosFiltrados.filter(function (elemento){
            return elemento.trecho.includes(filtro)
            })
            arquivosFil = filtrados
            limparLista()
            exibirPageFiltro()            
        }
        else
            exibirPage()
    }else if(tp_pesquisa == "status"){        
        if(filtro != ""){
            filtro = filtro[0].toUpperCase() + filtro.substr(1)
            const filtrados = arquivosFiltrados.filter(function (elemento){
            return elemento.status.includes(filtro)
            })
            arquivosFil = filtrados
            limparLista()
            exibirPageFiltro()            
        }
        else
            exibirPage()
    }else if(tp_pesquisa == "linha"){        
        if(filtro != ""){
            filtro = filtro.toUpperCase()
            const filtrados = arquivosFiltrados.filter(function (elemento){
            return elemento.linha.includes(filtro)
            })
            arquivosFil = filtrados
            limparLista()
            exibirPageFiltro()            
        }
        else
            exibirPage()
    }else if(tp_pesquisa == "nome"){        
        if(filtro != ""){
            filtro = filtro[0].toUpperCase() + filtro.substr(1)
            const filtrados = arquivosFiltrados.filter(function (elemento){
            return elemento.nome.includes(filtro)
            })
            arquivosFil = filtrados
            limparLista()
            exibirPageFiltro()            
        }
        else
            exibirPage()
    }else if(tp_pesquisa == "tipo"){        
        if(filtro != ""){
            filtro = filtro[0].toUpperCase() + filtro.substr(1)
            const filtrados = arquivosFiltrados.filter(function (elemento){
            return elemento.tipo.includes(filtro)
            })
            arquivosFil = filtrados
            limparLista()
            exibirPageFiltro()            
        }
        else
            exibirPage()
    }else if(tp_pesquisa == "codOleo"){        
        if(filtro != ""){
            filtro = filtro.toUpperCase()
            const filtrados = arquivosFiltrados.filter(function (elemento){
            return elemento.codOleo.includes(filtro)
            })
            arquivosFil = filtrados
            limparLista()
            exibirPageFiltro()            
        }
        else
            exibirPage()
    }else if(tp_pesquisa == "codGra"){        
        if(filtro != ""){
            filtro = filtro.toUpperCase()
            const filtrados = arquivosFiltrados.filter(function (elemento){
            return elemento.codGra.includes(filtro)
            })
            arquivosFil = filtrados
            limparLista()
            exibirPageFiltro()            
        }
        else
            exibirPage()
    }else if(tp_pesquisa == "codSpray"){        
        if(filtro != ""){
            filtro = filtro.toUpperCase()
            const filtrados = arquivosFiltrados.filter(function (elemento){
            return elemento.codSpray.includes(filtro)
            })
            arquivosFil = filtrados
            limparLista()
            exibirPageFiltro()            
        }
        else
            exibirPage()
    }
           
}

var pagination = {
        page: 0,
        perpage: 10,
        totalPage: 0,
        update: ()=>{pagination.totalPage = Math.ceil(arquivos.length / pagination.perpage)}

    } 


function exibirPageFiltro(){
    limparLista()
    var positionInit = pagination.page * pagination.perpage
    var positionFinal = positionInit + pagination.perpage -1
    for (let pos = positionInit; pos <= positionFinal && pos < arquivosFil.length; pos++){
        funcaoElemento(arquivosFil[pos])
    }
    del();
    att();
    AbrirModal()
    attBotao()
}

function exibirPage(){
    limparLista()
    var positionInit = pagination.page * pagination.perpage
    var positionFinal = positionInit + pagination.perpage -1
    for (let pos = positionInit; pos <= positionFinal && pos < arquivos.length; pos++){
        funcaoElemento(arquivos[pos])
    }
    del();
    att();
    AbrirModal()
    attBotao()
}

function limparLista(){
    document.getElementById("lista").innerHTML=""
}

function moverPage(page){
    if (page >= 0 && page < pagination.totalPage){
        pagination.page = page
        exibirPage()
          
    }
    
}
function attBotao(){
    document.getElementById("current").innerHTML=pagination.page + 1

    if(pagination.page + 1 <= pagination.totalPage -1 ){
        document.getElementById("next1").innerHTML = pagination.page + 2
        document.getElementById("next1").style.display = "block"        
    }else{
        document.getElementById("next1").style.display = "none"
    }

    if(pagination.page +2 <= pagination.totalPage -1 && pagination.page == 0){
            document.getElementById("next2").innerHTML=pagination.page + 3
            document.getElementById("next2").style.display = "block"
    }else{
        document.getElementById("next2").style.display = "none"
        }

    if(pagination.page - 1 >= 0 ){
        document.getElementById("prev1").innerHTML = pagination.page
        document.getElementById("prev1").style.display = "block"
    }else{
        document.getElementById("prev1").style.display = "none"
    }

    if(pagination.page -2 >= 0 && pagination.page == pagination.totalPage -1){
            document.getElementById("prev2").innerHTML=pagination.page -1
            document.getElementById("prev2").style.display = "block"
    }else{
        document.getElementById("prev2").style.display = "none"
        }



}