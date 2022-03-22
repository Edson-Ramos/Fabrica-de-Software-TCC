import flask
from flask.globals import request
from flask.templating import render_template
import UsuarioDAO
import EquipamentosDAO
import LubrificantesDAO
from equipamento import Equipamento
from user import User 
from lubrificantes import Oleo, Graxa, Spray


app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'

 

@app.route('/cadastrar_usuarios', methods = ['GET'])
def cadastrar_usuario_Get():
	return render_template('cadastrar_usuario.html')
@app.route('/cadastrar_usuarios', methods=['POST'])
def cadastrar_usuarios_Post():
	try:	
		dados = request.get_json()
		nome = dados['nome']
		sobreNome = dados['sobreNome']
		email = dados['email']
		senha = dados['senha']
		tipo = dados['tipo']
				
		usuario = User(None, nome, sobreNome, email, senha, tipo)
		UsuarioDAO.insertUser(usuario)
		return "Usuário Cadastrado Com Sucesso!"

	except:
		return flask.Response("Erro Ao Cadastrar o usuário!", status=500)


@app.route("/visualizar_usuarios", methods=['GET'])
def visualizar_usuarios_Get():
	return render_template('visualizar_usuarios.html')
@app.route("/listar", methods=['GET'])
def visualizar_Usuarios_Get_1():
	resposta = {'files' : []}

	for arquivos in UsuarioDAO.listAllUsers():
		id_Usuario = arquivos.id
		nome_Usuario = arquivos.nome
		email_Usuario = arquivos.email
		sobreNome_Usuario = arquivos.sobreNome
		senha_Usuario = arquivos.senha
		tipo_Usuario = arquivos.tipo

		file = {'id': id_Usuario,
				 'nome': nome_Usuario,
				 'sobreNome': sobreNome_Usuario,
				 'email': email_Usuario,				 
				 'senha': senha_Usuario,
     			 'tipo': tipo_Usuario}

		resposta ['files'].append(file)

	return(resposta)


@app.route('/atualizar_usuarios', methods=['GET'])
def atualizar_usuarios_Get():
	return render_template('atualizar_usuario.html')
@app.route('/atualizar_usuarios', methods=['POST'])
def atualizar_usuarios_Post():
	try:
		dados = request.get_json()
		nome = dados['nome']
		id = int(dados['id'])
		sNome = dados['sNome']
		email = dados['email']
		senha = dados['senha']
		cSenha = dados['cSenha']
		tipo = dados['tipo']
		numbers = any(map(str.isdigit, senha))
		uppercases = any(map(str.isupper, senha))

		if (senha != cSenha):
			return render_template('atualizar_usuario.html')
		if (uppercases == False):
			return render_template('atualizar_usuario.html')
		if (numbers == False):
			return render_template('atualizar_usuario.html')
		
		usuario = User(id, nome, sNome, email, senha, tipo)
		UsuarioDAO.updateUser(usuario)
		return "Usuário Atualizado Com Sucesso!"
			
	except:
		return flask.Response("Erro Ao Atualizar o Usuário", status=500)



@app.route('/deletar_usuarios', methods=['GET'])
def deletar_usuaros_Get():
	return render_template('deletar_usuarios.html')
@app.route('/deletar_usuarios', methods=['POST'])
def deletar_usuarios_Post():
	try:
		stringId = request.get_json()
		id = stringId['idUsuario']
		intId = int(id)
		idusuario = User(intId,None,None,None,None, None)
		UsuarioDAO.deleteUser(idusuario)
		return "Usuário Excluido!"
	except:
		return flask.Response("Erro ao Deletar Usuário!", status=500)
		



@app.route("/", methods=['GET'])
def login():			
	return render_template('login.html')
@app.route('/login', methods=['POST'])
def login_post():
	email = request.form['email']
	senha = request.form['password']	
	listUsuario = UsuarioDAO.listAllUsers()

	for usuario in listUsuario:
		if email == usuario.getEmail():
			if senha == usuario.getSenha():
				return render_template('cadastro_maquinas.html')
			else:
				return 	"<h1>Senha Não Confere!</h1>"

	
@app.route("/painel", methods=['GET'])
def painel():			
	return render_template('painel.html')
@app.route('/painel', methods=['GET'])
def painel_post():
	list = UsuarioDAO.listAllUsers()
	return (list)



@app.route('/cadastrar_equipamentos', methods = ['GET'])
def cadastrar_equipamentos_Get():
	return render_template('cadastrar_equipamentos.html')
@app.route('/cadastrar_equipamentos', methods=['POST'])
def cadastrar_equipamentos_Post():
	try:
		dados = request.get_json()
		id_maquina = dados["id"]
		nome_maquina = dados["nome"]	
		linha = dados["linha"]
		trecho = dados["trecho"]
	
		equipamento = Equipamento(id_maquina, nome_maquina, linha, trecho)
		EquipamentosDAO.insertEquipamentos(equipamento)
		return "Equipamento Cadastrado com Sucesso!"

	except:
		return flask.Response("Erro Ao Cadastrar o Equipamento!", status=500) 



@app.route("/visualizar_equipamentos", methods=['GET'])
def listar_equipamentos_Get():
    return render_template('visualizar_equipamentos.html')
@app.route("/listar_equipamentos", methods=['GET'])
def listar_equipamentos_Post():
    resposta = {'arquivos' : []}
    
    for dados in EquipamentosDAO.listarEquipamentos():
        id_maquina = dados.idMaq
        nome_maquina = dados.nome
        linha_maquina = dados.linha
        trecho_maquina = dados.trecho
        
        file = {'id' : id_maquina,
                'nome' : nome_maquina,
                'linha' : linha_maquina,
                'trecho' : trecho_maquina}
        
        resposta ['arquivos'].append(file)
        
    return(resposta)



@app.route('/atualizar_equipamentos', methods=['GET'])
def atualizar_equipamentos_Get():
	return render_template('atualizar_equipamentos.html')
@app.route('/atualizar_equipamentos', methods=['POST'])
def atualizar_equipamentos_Post():
	try:
		dados = request.get_json()
		idMaq = dados["idMaq"]
		idMaq = int(idMaq)
		nomeMaq = dados["nomeMaq"]
		linhaMaq = dados["linhaMaq"]
		trechoMaq = dados["trechoMaq"]	

		equipamento = Equipamento(idMaq, nomeMaq, linhaMaq, trechoMaq)
		EquipamentosDAO.atualizarEquipamentos(equipamento)
		return "Máquina Atualizar com Sucesso!"
	except:
     		return flask.Response("Erro Ao Cadastrar o Equipamento!", status=500) 


@app.route('/deletar_equipamentos', methods=['GET'])
def deletar_equipamentos_Get():
	return render_template('deletar_equipamentos.html')
@app.route('/deletar_equipamentos', methods=['POST'])
def deletar_equipamentos_Post():	
	idMaq = request.form['delete']
	idMaq = int(idMaq)
	elemento = Equipamento(idMaq,None,None,None)	

	if idMaq != True:
		EquipamentosDAO.deleteEquipamento(elemento)
		return render_template('deletar_equipamentos.html')
	else:
		return 	"<h1>Id Não Existe!</h1>"


@app.route('/cadastrar_lubrificantes', methods=['GET'])
def cadastrar_lubrificantes_Get():
    return render_template('cadastar_lubrificantes.html')

@app.route('/visualizar_lubrificantes', methods=['GET'])
def visualizar_lubrificantes_Get():
    return render_template('visualizar_lubrificantes.html')

@app.route('/atualizar_lubrificantes', methods=['GET'])
def atualizar_lubrificantes_Get():
    return render_template('atualizar_lubrificantes.html')

@app.route('/deletar_lubrificantes' , methods=['GET'])
def deletar_lubrificantes_Get():
    return render_template('deletar_lubrificantes.html')



@app.route('/cadastrar_graxa' , methods = ['GET'])
def cadastrar_graxa_Get():
    return render_template('cadastrar_graxa.html')
@app.route('/cadastrar_graxa' , methods=['POST'])
def cadastrar_graxa_Post():
    try:
        infor = request.get_json()
        id =  infor['id']
        tipo = infor['tipo']
        consis = infor['consis']
        graxa = Graxa(id, tipo, consis)
        LubrificantesDAO.insertGraxa(graxa)
        return "Graxa Cadastrada Com Sucesso!"
    except:
        return flask.Response("Erro ao Cadastrar Graxa", status=500)

@app.route('/visualizar_graxa', methods=['GET'])
def visualizar_graxa_Get():
    return render_template('visualizar_graxa.html')
@app.route("/listar_graxa", methods=['GET'])
def listar_graxa_Post():
    resposta = {'arquivos' : []}
    
    for dados in LubrificantesDAO.listGraxa():
        idGRa = dados.idGra
        tipo = dados.tipo
        consis = dados.consis
        
        file = {'id' : idGRa,
                'tipo' : tipo,
                'consis' : consis}
               
        
        resposta ['arquivos'].append(file)
        
    return(resposta)

@app.route('/atualizar_graxa', methods=['GET'])
def atualizar_graxa_Get():
    return render_template('atualizar_graxa.html')
@app.route('/atualizar_graxa', methods=['POST'])
def atualizar_graxa_Post():
	try:
		dados = request.get_json()
		idGra = dados["idGra"]
		idGra = int(idGra)
		tipo = dados["tipo"]
		consis = dados["consis"]
  
		graxa = Graxa(idGra, tipo, consis)
		print(graxa)
		LubrificantesDAO.updateGraxa(graxa)
		return "Graxa Atualizada com Sucesso!"
	except:
     		return flask.Response("Erro Ao Cadastrar o Equipamento!", status=500) 

@app.route("/deletar_graxa", methods=["GET"])
def deletar_graxa_Get():
    return render_template("deletar_graxa.html")
@app.route('/deletar_graxa', methods=['POST'])
def deletar_graxa_Post():
	try:	
		dado = request.get_json()
		idGra = dado["idGra"]
		idGra = int(idGra)
		graxa = Graxa(idGra, None, None)	
		LubrificantesDAO.deleteGraxa(graxa)
		return "Graxa Excluida com Sucesso!"
	except:
		return flask.Response("Erro ao Deletar Graxa", status=500)



@app.route('/cadastrar_oleo', methods=['GET'])
def cadastrar_oleo_Get():
    return render_template('cadastrar_oleo.html')
@app.route('/cadastrar_oleo', methods=['POST'])
def cadastrar_oleo_Post():
    try:
        infor = request.get_json()
        id = infor['id']
        tipo = infor['tipo']
        visco = infor["visco"]
        oleo = Oleo(id, tipo, visco)
        LubrificantesDAO.insertOleo(oleo)
        return "Oleo Cadastrado Com Sucesso!"
    except:
        return flask.Response("Erro ao Cadastrar Oleo", status=500)
        
@app.route('/visualizar_oleo', methods=['GET'])
def visualizar_oleo_Get():
    return render_template('visualizar_oleo.html')
@app.route("/listar_oleo", methods=['GET'])
def visualizar_oleo_Post():
    resposta = {'arquivos' : []}
    
    for dados in LubrificantesDAO.listOleo():
        idOleo = dados.idOleo
        tipo = dados.tipo
        visco = dados.visco
        
        file = {'id' : idOleo,
                'tipo' : tipo,
                'visco' : visco}
               
        
        resposta ['arquivos'].append(file)
        
    return(resposta)

@app.route('/atualizar_oleo', methods=['GET'])
def atualizar_oleo_Get():
    return render_template('atualizar_oleo.html')
@app.route('/atualizar_oleo', methods=['POST'])
def atualizar_oleo_Post():
	try:
		dados = request.get_json()
		idOleo = dados["idOleo"]
		idOleo = int(idOleo)
		tipo = dados["tipo"]
		visco = dados["visco"]		

		oleo = Oleo(idOleo, tipo, visco)
		LubrificantesDAO.updateOleo(oleo)
		return "Óleo Atualizado com Sucesso!"
	except:	
		return flask.Response("Erro Ao Atualizar o Óleo!", status=500)

@app.route('/deletar_oleo', methods=['GET'])
def deletar_oleo_Get():
    return render_template('deletar_oleo.html')
@app.route('/deletar_oleo', methods=['POST'])
def deletar_oleo_Post():
	try:	
		dado = request.get_json()
		idOleo = dado["idOleo"]
		idOleo = int(idOleo)
		oleo = Oleo(idOleo, None, None)
		LubrificantesDAO.deleteOleo(oleo)
		return "Oleo Excluido Com Sucesso!"
	except:
		return flask.Response("Erro ao Excluir Óleo", status=500)



@app.route('/cadastrar_spray' , methods=['GET'])
def cadastro_spray_Get():
    return render_template('cadastrar_spray.html')
@app.route('/cadastrar_spray', methods=['POST'])
def cadastro_spray_Post():
    try:
        infor = request.get_json()
        id = infor['id']
        tipo = infor['tipo']
        visco = infor['visco']
        spray = Spray(id, tipo, visco)
        LubrificantesDAO.insertSpray(spray)
        return "Spray Cadastrar Com Sucesso!"
    except:
        return flask.Response("Erro ao Cadastrar Spray", status=500)

@app.route('/visualizar_spray', methods=['GET'])
def visualizar_spray_Get():
    return render_template('visualizar_spray.html')
@app.route('/listar_spray' , methods=['GET'])
def visualizar_spray_Post():
        resposta = {'arquivos' : []}
        
        for dados in LubrificantesDAO.listSpray():
            idSpray = dados.idSpray
            tipo = dados.tipo
            visco = dados.visco
            
            file = {'id' : idSpray,
                    'tipo' : tipo,
                    'visco' : visco}
            resposta ['arquivos'].append(file)
            return(resposta)

@app.route('/atualizar_spray', methods=['GET'])
def atualizar_spray_Get():
    return render_template('atualizar_spray.html')
@app.route('/atualizar_spray', methods=['POST'])
def atualizar_spray_Post():
	try:
		dados = request.get_json()
		idSpray = dados["idSpray"]
		idSpray = int(idSpray)
		tipo = dados["tipo"]
		visco = dados["visco"]		

		spray = Spray(idSpray, tipo, visco)
		LubrificantesDAO.updateSpray(spray)
		return "Spray Atualizado Com Sucesso!"
	except:	
		return flask.Response("Erro Ao Atualizar Spray!", status=500)

@app.route('/deletar_spray', methods=['GET'])
def deletar_spray_Get():
    return render_template("deletar_spray.html")
@app.route('/deletar_spray', methods=['POST'])
def deletar_spray_Post():
	try:
		dados = request.get_json()
		idSpray = dados["idSpray"]
		idSpray = int(idSpray)
		
		spray = Spray(idSpray, None, None)
		LubrificantesDAO.deleteSpray(spray)
		return "Spray Deletado Com Sucesso!"
    
	except:
		return flask.Response("Erro ao Deletar Spray!", status=500)
	


if __name__=="__main__":
	app.run()