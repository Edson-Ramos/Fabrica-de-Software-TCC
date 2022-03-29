var listar = function(){

	
	console.log(list)

}
function cadastro(email, name, lastname, pass, confpass){   

	$.ajax({
		type: "POST", 
		url: "http://localhost:5000/cadastro",
		contentType: "application/json",
		data: JSON.stringify({
			login: email,
			nome : name,
			lastname: lastname, 
			senha: pass,
			confpass: confpass            
		}),
		sucess: function(result){			
				alert(result)
			
		}
	})
}