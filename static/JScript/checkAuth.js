function validaction(){
    fetch("/checkAuth", 
    {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+ localStorage.getItem("token")
        }       
    })
    .then(function(response){
        if(response.status != 200){
            window.location.href = "/";
        }
    })
}