import flask
from flask.globals import request
from flask.templating import render_template
import UsuarioDAO
import EquipamentosDAO
import LubrificantesDAO
import ServDAO
from equipamento import Equipamento
from user import User
from lubrificantes import Oleo, Graxa, Spray
from servico import Servicos


app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'


#Área Usuários 

@app.route('/cadastrar_usuarios', methods=['GET'])
def cadastrar_usuario_Get():
    return render_template('cadastrar_usuario.html')
@app.route('/cadastrar_usuarios', methods=['POST'])
def cadastrar_usuarios_Post():
    try:
        dados = request.get_json()
        nome = dados['nome']
        email = dados['email']
        senha = dados['senha']
        tipo = dados['tipo']

        usuario = User(None, nome, email, senha, tipo)
        UsuarioDAO.insertUser(usuario)
        return "Usuário Cadastrado Com Sucesso!"

    except:
        return flask.Response("Erro Ao Cadastrar o usuário!", status=500)




@app.route("/visualizar_usuarios", methods=['GET'])
def visualizar_usuarios_Get():
    return render_template('visualizar_usuarios.html')
@app.route("/listar", methods=['GET'])
def visualizar_Usuarios_Get_1():

    resposta = {'files': []}

    for arquivos in UsuarioDAO.listAllUsers():
        id_Usuario = arquivos.id
        nome_Usuario = arquivos.nome
        email_Usuario = arquivos.email
        senha_Usuario = arquivos.senha
        tipo_Usuario = arquivos.tipo

        file = {'id': id_Usuario,
                'nome': nome_Usuario,
                'email': email_Usuario,
                'senha': senha_Usuario,
                'tipo': tipo_Usuario}

        resposta['files'].append(file)

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
        email = dados['email']
        senha = dados['senha']
        tipo = dados['tipo']
        usuario = User(id, nome, email, senha, tipo)
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
        idusuario = User(intId, None, None, None, None)

        if id != True:
            UsuarioDAO.deleteUser(idusuario)
        return "Usuario Excluido!"

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
                return "<h1>Senha Não Confere!</h1>"


#Área Equipamentos

@app.route('/cadastrar_equipamentos', methods=['GET'])
def cadastrar_equipamentos_Get():
    return render_template('cadastrar_equipamentos.html')
@app.route('/cadastrar_equipamentos', methods=['POST'])
def cadastrar_equipamentos_Post():
    try:
        dados = request.get_json()
        idMaq = dados["id"]
        nome = dados["nome"]
        linha = dados["linha"]
        trecho = dados["trecho"]

        equipamento = Equipamento(idMaq, nome, linha, trecho)
        EquipamentosDAO.insertEquipamentos(equipamento)
        return "Equipamento Cadastrado com Sucesso!"

    except:
        return flask.Response("Erro Ao Cadastrar o Equipamento!", status=500)



@app.route("/visualizar_equipamentos", methods=['GET'])
def listar_equipamentos_Get():
    return render_template('visualizar_equipamentos.html')
@app.route("/listar_equipamentos", methods=['GET'])
def listar_equipamentos_Post():
    resposta = {'arquivos': []}

    for dados in EquipamentosDAO.listarEquipamentos():
        id_maquina = dados.idMaq
        nome_maquina = dados.nome
        linha_maquina = dados.linha
        trecho_maquina = dados.trecho

        file = {'id': id_maquina,
                'nome': nome_maquina,
                'linha': linha_maquina,
                'trecho': trecho_maquina}

        resposta['arquivos'].append(file)

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
        nome = dados["nome"]
        linha = dados["linha"]
        trecho = dados["trecho"]

        equipamento = Equipamento(idMaq, nome, linha, trecho)
        EquipamentosDAO.atualizarEquipamentos(equipamento)
        return "Equipamento Atualizar com Sucesso!"
    except:
        return flask.Response("Erro Ao Cadastrar o Equipamento!", status=500)



@app.route('/deletar_equipamentos', methods=['GET'])
def deletar_equipamentos_Get():
    return render_template('deletar_equipamentos.html')
@app.route('/deletar_equipamentos', methods=['POST'])
def deletar_equipamentos_Post():
    try:
        id = request.get_json()
        idMaq = id["idEquipamento"]
        idMaq = int(idMaq)
        equipamento = Equipamento(idMaq, None, None, None)

        if idMaq != True:
            EquipamentosDAO.deleteEquipamento(equipamento)
        return "Equipamento Excluido!"

    except:
        return flask.Response("Erro ao Deletar o Equipamento", status=500)




#Área Lubrificantes

@app.route('/cadastrar_lubrificantes', methods=['GET'])
def cadastrar_lubrificantes_Get():
    return render_template('cadastar_lubrificantes.html')
@app.route('/visualizar_lubrificantes', methods=['GET'])
def visualizar_lubrificantes_Get():
    return render_template('visualizar_lubrificantes.html')



@app.route('/atualizar_lubrificantes', methods=['GET'])
def atualizar_lubrificantes_Get():
    return render_template('atualizar_lubrificantes.html')
@app.route('/deletar_lubrificantes', methods=['GET'])
def deletar_lubrificantes_Get():
    return render_template('deletar_lubrificantes.html')



@app.route('/cadastrar_graxa', methods=['GET'])
def cadastrar_graxa_Get():
    return render_template('cadastrar_graxa.html')
@app.route('/cadastrar_graxa', methods=['POST'])
def cadastrar_graxa_Post():
    try:
        infor = request.get_json()
        id = infor['id']
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
    resposta = {'arquivos': []}

    for dados in LubrificantesDAO.listGraxa():
        idGRa = dados.idGra
        tipo = dados.tipo
        consis = dados.consis

        file = {'id': idGRa,
                'tipo': tipo,
                'consis': consis}

        resposta['arquivos'].append(file)

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
    resposta = {'arquivos': []}

    for dados in LubrificantesDAO.listOleo():
        idOleo = dados.idOleo
        tipo = dados.tipo
        visco = dados.visco

        file = {'id': idOleo,
                'tipo': tipo,
                'visco': visco}

        resposta['arquivos'].append(file)

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




@app.route('/cadastrar_spray', methods=['GET'])
def cadastro_spray_Get():
    return render_template('cadastrar_spray.html')
@app.route('/cadastrar_spray', methods=['POST'])
def cadastro_spray_Post():
    try:
        infor = request.get_json()
        idSpray = infor['id']
        tipo = infor['tipo']
        visco = infor['visco']
        spray = Spray(idSpray, tipo, visco)
        LubrificantesDAO.insertSpray(spray)
        return "Spray Cadastrar Com Sucesso!"
    except:
        return flask.Response("Erro ao Cadastrar Spray", status=500)




@app.route('/visualizar_spray', methods=['GET'])
def visualizar_spray_Get():
    return render_template('visualizar_spray.html')
@app.route('/listar_spray', methods=['GET'])
def visualizar_spray_Post():
    resposta = {'arquivos': []}

    for dados in LubrificantesDAO.listSpray():
        idSpray = dados.idSpray
        tipo = dados.tipo
        visco = dados.visco

        file = {'id': idSpray,
                'tipo': tipo,
                'visco': visco}
        resposta['arquivos'].append(file)
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



#Área de Servicos

@app.route('/cadastrar_servico', methods=['GET'])
def cadastrar_servico_Get():
    return render_template('cadastrar_servico.html')
@app.route('/cadastrar_servico', methods=['POST'])
def cadastrar_servico_Post():
    try:
        dados = request.get_json()
        idServ = dados["idServ"]
        Maq = dados["nomeMaq"]        
        trecho = dados["trecho"]
        linha = dados["linha"]
        tipoLub = dados["tipoLub"]
        dataApli = dados["dataApli"]
        dataProxAplic = dados["dataProxAplic"]
        freq = dados["freq"]
        status = dados["status"]
        obs = dados["obs"]
        
        servicos = Servicos(idServ, Maq, trecho, linha, 
                            tipoLub, dataApli, dataProxAplic, freq, status, obs)
        ServDAO.insertServicos(servicos)
        return "Serviço Cadastrado Com Sucesso!"

    except:
        return flask.Response("Erro ao cadastrar serviço!", status=500)




@app.route("/visualizar_servico", methods=['GET'])
def visualizar_servicos_Get():
    return render_template('visualizar_servico.html')
@app.route("/listar_servico", methods=['GET'])
def visualizar_servicos_Get_1():
    resposta = {'files': []}

    for servicos in ServDAO.listAllServicos():
        idServ = servicos.idServ
        maq = servicos.maq
        trecho = servicos.trecho
        linha = servicos.linha
        tipoLub = servicos.tipoLub
        dataApli = servicos.dataApli
        dataProxApli = servicos.dataProxApli
        freq = servicos.freq
        status = servicos.status
        obs = servicos.obs

        file = {'idServ': idServ,
                'maq': maq,
                'trecho': trecho,
                'linha': linha,
                'tipoLub': tipoLub,
                'dataApli': dataApli,
                'dataProxApli' : dataProxApli,
                'freq': freq,
                'status' : status,
                'obs': obs
                }
        resposta['files'].append(file)
    return(resposta)


if __name__ == "__main__":
    app.run()
