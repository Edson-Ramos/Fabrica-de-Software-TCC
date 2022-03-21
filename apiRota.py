import flask
from flask.globals import request
from flask.templating import render_template



app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'

 

@app.route('/cadastrar_usuarios', methods = ['GET'])
def cadastrar_usuario_Get():
	return render_template('cadastrar_usuario.html')

@app.route("/visualizar_usuarios", methods=['GET'])
def visualizar_usuarios_Get():
	return render_template('visualizar_usuarios.html')


@app.route('/atualizar_usuarios', methods=['GET'])
def atualizar_usuarios_Get():
	return render_template('atualizar_usuario.html')


@app.route('/deletar_usuarios', methods=['GET'])
def deletar_usuaros_Get():
	return render_template('deletar_usuarios.html')




@app.route("/", methods=['GET'])
def login():			
	return render_template('login.html')

	
@app.route("/painel", methods=['GET'])
def painel():			
	return render_template('painel.html')


@app.route('/cadastrar_equipamentos', methods = ['GET'])
def cadastrar_equipamentos_Get():
	return render_template('cadastrar_equipamentos.html')

@app.route("/visualizar_equipamentos", methods=['GET'])
def listar_equipamentos_Get():
    return render_template('visualizar_equipamentos.html')




@app.route('/atualizar_equipamentos', methods=['GET'])
def atualizar_equipamentos_Get():
	return render_template('atualizar_equipamentos.html')


@app.route('/deletar_equipamentos', methods=['GET'])
def deletar_equipamentos_Get():
	return render_template('deletar_equipamentos.html')

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


@app.route('/visualizar_graxa', methods=['GET'])
def visualizar_graxa_Get():
    return render_template('visualizar_graxa.html')


@app.route('/atualizar_graxa', methods=['GET'])
def atualizar_graxa_Get():
    return render_template('atualizar_graxa.html')


@app.route("/deletar_graxa", methods=["GET"])
def deletar_graxa_Get():
    return render_template("deletar_graxa.html")


@app.route('/cadastrar_oleo', methods=['GET'])
def cadastrar_oleo_Get():
    return render_template('cadastrar_oleo.html')

        
@app.route('/visualizar_oleo', methods=['GET'])
def visualizar_oleo_Get():
    return render_template('visualizar_oleo.html')

@app.route('/atualizar_oleo', methods=['GET'])
def atualizar_oleo_Get():
    return render_template('atualizar_oleo.html')

@app.route('/deletar_oleo', methods=['GET'])
def deletar_oleo_Get():
    return render_template('deletar_oleo.html')

@app.route('/cadastrar_spray' , methods=['GET'])
def cadastro_spray_Get():
    return render_template('cadastrar_spray.html')

@app.route('/visualizar_spray', methods=['GET'])
def visualizar_spray_Get():
    return render_template('visualizar_spray.html')

@app.route('/atualizar_spray', methods=['GET'])
def atualizar_spray_Get():
    return render_template('atualizar_spray.html')

@app.route('/deletar_spray', methods=['GET'])
def deletar_spray_Get():
    return render_template("deletar_spray.html")

if __name__=="__main__":
	app.run()