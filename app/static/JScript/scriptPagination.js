var arquivos, funcaoElemento;


var pagination = {
        page: 0,
        perpage: 10,
        totalPage: 0,
        update: ()=>{pagination.totalPage = Math.ceil(arquivos.length / pagination.perpage)}

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