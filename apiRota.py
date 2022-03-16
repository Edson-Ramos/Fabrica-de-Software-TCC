from logging import exception
import flask
from flask.globals import request
from flask.templating import render_template
from equipamento import Equipamento
from user import User
import UsuarioDAO
import EquipamentosDAO


app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'

 

@app.route('/cadastro', methods = ['GET'])
def cadastro():
	return render_template('cadastrar_usuario.html')

@app.route('/cadastro', methods=['POST'])
def cadastro_post():
	try:	
		nome = request.form['name']
		sobreNome = request.form['lastname']
		email = request.form['email']
		senha = request.form['password']
		confSenha = request.form['confpassword']
		numbers = any(map(str.isdigit, senha))
		uppercases = any(map(str.isupper, senha))

		if (senha != confSenha):
			return render_template('cadastro.html')
		if (uppercases == False):
			return render_template('cadastro.html')
		if (numbers == False):
			return render_template('cadastro.html')

		usuario = User(None, nome, sobreNome, email, senha)
		UsuarioDAO.insertUser(usuario)
		return "Usuário Cadastrado Com Sucesso!"

	except:
		return flask.Response("Erro Ao Cadastrar o usuário!", status=500)

@app.route("/login", methods=['GET'])
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



@app.route('/delete', methods=['GET'])
def delete():
	return render_template('deletar_usuarios.html')

@app.route('/delete', methods=['POST'])
def delete_post():
	id = request.form['delete']
	intId = int(id)
	teste = User(intId,None,None,None,None)
	
	
	if id != True:
		UsuarioDAO.deleteUser(teste)
		return render_template('deletar_usuarios.html')
	else:
		return 	"<h1>Id Não Existe!</h1>"



@app.route('/update', methods=['GET'])
def update():
	return render_template('atualizar_usuario.html')

@app.route('/update', methods=['POST'])
def update_post():
	id = request.form['id']
	idInt = int(id)
	nome = request.form['name']
	sobreNome = request.form['lastname']
	email = request.form['email']
	senha = request.form['password']
	confSenha = request.form['confpassword']

	if senha != confSenha:
		return "<h1>Senhas Não Confere!</h1>"

	usuario = User(idInt, nome, sobreNome, email, senha)
	UsuarioDAO.updateUser(usuario)
	return render_template('painel.html')


@app.route('/cadastroMaquinas', methods = ['GET'])
def cadastro_maquinas():
	return render_template('cadastro_maquinas.html')

@app.route('/cadastro_maquinas', methods=['POST'])
def cadastro_maquina_post():
	try:
		dados = request.get_json()
		id_maquina = dados["id"]
		nome_maquina = dados["nome"]	
		linha = dados["linha"]
		trecho = dados["trecho"]
		print(dados)

		equipamento = Equipamento(id_maquina, nome_maquina, linha, trecho)
		EquipamentosDAO.insertEquipamentos(equipamento)
		return "Equipamento Cadastrado com Sucesso!"

	except:
		return flask.Response("Erro Ao Cadastrar o Equipamento!", status=500) 


@app.route("/listarUsuarios", methods=['GET'])
def listar_usuarios():
	return render_template('visualizar_funcionarios.html')

@app.route("/listar", methods=['GET'])
def listar_Usuarios_Get():
	resposta = {'files' : []}

	for arquivos in UsuarioDAO.listAllUsers():
		id_Usuario = arquivos.id
		nome_Usuario = arquivos.name
		email_Usuario = arquivos.email
		sobreNome_Usuario = arquivos.sobrenome
		senha_Usuario = arquivos.senha

		file = {'id': id_Usuario,
				 'nome': nome_Usuario,
				 'sobreNome': sobreNome_Usuario,
				 'email': email_Usuario,				 
				 'senha': senha_Usuario}

		resposta ['files'].append(file)

	return(resposta)


@app.route("/visualizar_equipamentos", methods=['GET'])
def listar_equipamentos():
    return render_template('visualizar_equipamentos.html')

@app.route("/visualizarEquipamentos", methods=['GET'])
def listar_equipamentos_Get():
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
def atualizar_equipamentos():
	return render_template('atualizar_equipamentos.html')

@app.route('/atualizar_equipamentos', methods=['POST'])
def atualizar_equipamentos_post():
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
def deletar_equipamentos():
	return render_template('deletar_equipamentos.html')

@app.route('/deletar_equipamentos', methods=['POST'])
def deletar_equipamentos_post():	
	idMaq = request.form['delete']
	idMaq = int(idMaq)
	elemento = Equipamento(idMaq,None,None,None)	

	if idMaq != True:
		EquipamentosDAO.deleteEquipamento(elemento)
		return render_template('deletar_equipamentos.html')
	else:
		return 	"<h1>Id Não Existe!</h1>"




if __name__=="__main__":
	app.run()