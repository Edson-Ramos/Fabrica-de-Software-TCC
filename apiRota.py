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
from flask_login import LoginManager, login_user



app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'
login_manager = LoginManager()
login_manager.init_app(app)
app.secret_key = '_5#y2L"F4Q8z\n\xec]/'

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)
# Área Usuários

@app.route("/login")
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
                login_user(email)
                return render_template('cadastrar_usuario')
            else:
                return "Email ou Senha Invalido"


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

    except User.Does:
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

@app.route('/listar_usuario_id', methods=["GET", "POST"])
def listar_usuario_id():
    resposta = {'files': []}

    idUser = request.get_json()
    idUser = idUser["idUser"]
    idUser = int(idUser)
    usuario = User(idUser, None, None, None, None)

    for user in UsuarioDAO.listUserIp(usuario):
        nome = user.nome
        email = user.email
        senha = user.senha
        tipo = user.tipo

        file = {'idUser': idUser,
                'nome': nome,
                'email': email,
                'senha': senha,
                'tipo': tipo,
                
                }
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
        dado = request.get_json()
        idUser = dado["idUser"]
        idUser = int(idUser)
        idusuario = User(idUser, None, None, None, None)
        UsuarioDAO.deleteUser(idusuario)
        
        return "Usuario Excluido!"

    except:
        return flask.Response("Erro ao Deletar Usuário!", status=500)

# Área Equipamentos

@app.route('/cadastrar_maquinas', methods=['GET'])
def cadastrar_maquina_Get():
    return render_template('cadastrar_maquina.html')


@app.route('/cadastrar_maquinas', methods=['POST'])
def cadastrar_maquina_Post():
    try:
        dados = request.get_json()
        codMaq = dados["cod"]
        linha = dados["linha"]
        trecho = dados["trecho"]
        nome = dados["nome"]

        maquina = Equipamento(None, codMaq, linha, trecho, nome)
        EquipamentosDAO.insertMaquinas(maquina)
        return "Máquina Cadastrado com Sucesso!"

    except:
        return flask.Response("Erro Ao Cadastrar a Máquina!", status=500)


@app.route("/visualizar_maquinas", methods=['GET'])
def listar_maquinas_Get():
    return render_template('visualizar_maquina.html')


@app.route("/listar_maquinas", methods=['GET'])
def listar_maquinas_Post():
    resposta = {'arquivos': []}

    for dados in EquipamentosDAO.listarMaquinas():
        id_maquina = dados.idMaq
        cod_maquina = dados.codMaq
        linha_maquina = dados.linha
        trecho_maquina = dados.trecho
        nome_maquina = dados.nome

        file = {'idMaq': id_maquina,
                'codMaq': cod_maquina,
                'linha': linha_maquina,
                'trecho': trecho_maquina,
                'nome': nome_maquina, }

        resposta['arquivos'].append(file)

    return(resposta)


@app.route('/lista_equipamento_id', methods=['POST', 'GET'])
def lista_equipamento_id_Get():
    resposta = {'arquivos': []}

    codMaq = request.get_json()
    codMaq = codMaq["codMaq"]
    equipamento = Equipamento(None, codMaq, None, None, None)

    for dados in EquipamentosDAO.listMaqCod(equipamento):
        idMaq = dados.idMaq
        codMaq = dados.codMaq
        linha = dados.linha,
        trecho = dados.trecho,
        nome = dados.nome

        file = {'idMaq': idMaq,
                'codMaq': codMaq,
                'linha': linha,
                'trecho': trecho,
                'nome': nome}
        resposta['arquivos'].append(file)
        print(resposta)
    return(resposta)


@app.route('/atualizar_maquinas', methods=['GET'])
def atualizar_maquinas_Get():
    return render_template('atualizar_maquina.html')


@app.route('/atualizar_maquinas', methods=['POST'])
def atualizar_maquinas_Post():
    try:
        dados = request.get_json()
        idMaq = dados["idMaq"]
        idMaq = int(idMaq)
        codMaq = dados["codMaq"]
        linha = dados["linha"]
        trecho = dados["trecho"]
        nomeMaq = dados["nomeMaq"]

        maquina = Equipamento(idMaq, codMaq, linha, trecho, nomeMaq)
        EquipamentosDAO.atualizarMaquinas(maquina)
        return "Máquina Atualizada com Sucesso!"
    except:
        return flask.Response("Erro Ao Atualizar Máquina!", status=500)


@app.route('/deletar_maquinas', methods=['GET'])
def deletar_maquinas_Get():
    return render_template('deletar_maquinas.html')


@app.route('/deletar_maquinas', methods=['POST'])
def deletar_maquinas_Post():
    try:
        id = request.get_json()
        idMaq = id["idMaq"]
        idMaq = int(idMaq)
        maquina = Equipamento(idMaq, None, None, None, None)
        EquipamentosDAO.deleteMaquinas(maquina)
        return "Máquina Excluida Com Sucesso!"

    except:
        return flask.Response("Erro ao Deletar a Máquina", status=500)


# Área Lubrificantes

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
        codGra = infor['codGra']
        tipo = infor['tipo']
        consis = infor['consis']
        graxa = Graxa(None, codGra, tipo, consis)
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
        idGra = dados.idGra
        codGra = dados.codGra
        tipo = dados.tipo
        consis = dados.consis

        file = {'idGra': idGra,
                'codGra': codGra,
                'tipo': tipo,
                'consis': consis}

        resposta['arquivos'].append(file)

    return(resposta)


@app.route('/listar_graxa_id', methods=['POST', 'GET'])
def lista_graxa_id_Get():
    resposta = {'arquivos': []}

    idGra = request.get_json()
    idGra = idGra["idGra"]
    lubrificantes = Graxa(idGra, None, None, None)

    for dados in LubrificantesDAO.listGraxaId(lubrificantes):
        idGra = dados.idGra,
        codGra = dados.codGra,
        tipo = dados.tipo,
        consis = dados.consis

        file = {'idGra': idGra,
                'codGra': codGra,
                'tipo': tipo,
                'consis': consis
                }
        resposta['arquivos'].append(file)
        print(resposta)
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
        codGra = dados["codGra"]
        tipo = dados["tipo"]
        consis = dados["consis"]

        graxa = Graxa(None, codGra, tipo, consis)
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
        graxa = Graxa(idGra, None, None, None)
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
        codOleo = infor['codOleo']
        tipo = infor['tipo']
        visco = infor["visco"]
        oleo = Oleo(None, codOleo, tipo, visco)
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
        codOleo = dados.codOleo
        tipo = dados.tipo
        visco = dados.visco

        file = {'idOleo': idOleo,
                'codOleo': codOleo,
                'tipo': tipo,
                'visco': visco}

        resposta['arquivos'].append(file)

    return(resposta)


@app.route('/lista_oleo_id', methods=['POST', 'GET'])
def lista_oleo_id_Get():
    resposta = {'arquivos': []}

    id = request.get_json()
    idOleo = id["idOleo"]
    idOleo = int(idOleo)
    lubrificantes = Oleo(idOleo, None, None, None)

    for dados in LubrificantesDAO.listOleoId(lubrificantes):
        idOleo = dados.idOleo,
        codOleo = dados.codOleo,
        tipo = dados.tipo,
        visco = dados.visco

        file = {'idOleo': idOleo,
                'codOleo': codOleo,
                'tipo': tipo,
                'visco': visco
                }
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
        codOleo = dados["codOleo"]
        tipo = dados["tipo"]
        visco = dados["visco"]

        oleo = Oleo(idOleo, codOleo, tipo, visco)
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
        oleo = Oleo(idOleo, None, None, None)
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
        codSpray = infor['codSpray']
        tipo = infor['tipo']
        visco = infor['visco']
        spray = Spray(None, codSpray, tipo, visco)
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
        codSpray = dados.codSpray
        tipo = dados.tipo
        visco = dados.visco

        file = {'idSpray': idSpray,
                'codSpray': codSpray,
                'tipo': tipo,
                'visco': visco}
        
        resposta['arquivos'].append(file)
    return(resposta)


@app.route('/lista_spray_id', methods=['POST', 'GET'])
def lista_spray_id_Get():
    resposta = {'arquivos': []}

    idSpray = request.get_json()
    idSpray = idSpray["idSpray"]
    idSpray = int(idSpray)
    lubrificantes = Spray(idSpray, None, None, None)

    for dados in LubrificantesDAO.listSprayId(lubrificantes):
        idSpray = dados.idSpray,
        codSpray = dados.codSpray,
        tipo = dados.tipo,
        visco = dados.visco

        file = {'idSpray': idSpray,
                'codSpray': codSpray,
                'tipo': tipo,
                'visco': visco
                }
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


# Área de Servicos

@app.route('/cadastrar_servico', methods=['GET'])
def cadastrar_servico_Get():
    return render_template('cadastrar_servico.html')


@app.route('/cadastrar_servico', methods=['POST'])
def cadastrar_servico_Post():
    try:
        dados = request.get_json()
        codMaq = dados["codMaq"]
        maq = dados["maq"]
        linha = dados["linha"]
        trecho = dados["trecho"]
        equip = dados["equip"]
        tipoLub = dados["tipoLub"]
        codLub = dados["codLub"]
        tipo = dados["tipo"]
        prop = dados["prop"]
        dataApli = dados["dataApli"]
        dataProxApli = dados["dataProxApli"]
        status = dados["status"]
        obs = dados["obs"]

        servicos = Servicos(None, codMaq, maq, linha, trecho, equip,
                            tipoLub, codLub, tipo, prop, dataApli, dataProxApli, status, obs)
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
        codMaq = servicos.codMaq
        maq = servicos.maq
        linha = servicos.linha
        trecho = servicos.trecho
        equip = servicos.equip
        tipoLub = servicos.tipoLub
        codLub = servicos.codLub
        tipo = servicos.tipo
        prop = servicos.prop
        dataApli = servicos.dataApli
        dataProxApli = servicos.dataProxApli
        status = servicos.status
        obs = servicos.obs

        file = {'idServ': idServ,
                'codMaq': codMaq,
                'maq': maq,
                'linha': linha,
                'trecho': trecho,
                'equip': equip,
                'tipoLub': tipoLub,
                'codLub' : codLub,
                'tipo': tipo,
                'prop': prop,
                'dataApli': dataApli,
                'dataProxApli': dataProxApli,
                'status': status,
                'obs': obs
                }
        resposta['files'].append(file)
    return(resposta)


@app.route('/listar_servico_id', methods=["GET", "POST"])
def listar_servico_id():
    resposta = {'files': []}

    id = request.get_json()
    idServ = id["idServ"]
    idServ = int(idServ)
    servicos = Servicos(idServ, None, None, None, None,
                        None, None, None, None, None, None, None, None, None)

    for servicos in ServDAO.listServId(servicos):
        idServ = servicos.idServ
        codMaq = servicos.codMaq
        maq = servicos.maq
        linha = servicos.linha
        trecho = servicos.trecho
        equip = servicos.equip
        tipoLub = servicos.tipoLub
        codLub = servicos.codLub
        tipo = servicos.tipo
        prop = servicos.prop
        dataApli = servicos.dataApli
        dataProxApli = servicos.dataProxApli
        status = servicos.status
        obs = servicos.obs

        dataA = dataApli.strftime("%Y-%m-%d")
        dataP = dataProxApli.strftime("%Y-%m-%d")

        file = {'idServ': idServ,
                'codMaq': codMaq,
                'maq': maq,
                'linha': linha,
                'trecho': trecho,
                'equip': equip,
                'tipoLub': tipoLub,
                'codLub': codLub,
                'tipo': tipo,
                'prop': prop,
                'dataApli': dataA,
                'dataProxApli': dataP,
                'status': status,
                'obs': obs
                }
        resposta['files'].append(file)
    return(resposta)


@app.route('/atualizar_servico', methods=['GET'])
def atualizar_servico_Get():
    return render_template('atualizar_servico.html')


@app.route('/atualizar_servico', methods=['POST'])
def atualizar_servico_Post():
    try:
        dados = request.get_json()
        idServ = dados["idServ"]
        idServ = int(idServ)
        codMaq = dados["codMaq"]
        maq = dados["maq"]
        linha = dados["linha"]
        trecho = dados["trecho"]
        equip = dados["equip"]
        tipoLub = dados["tipoLub"]
        codLub = dados["codLub"]
        tipo = dados["tipo"]
        prop = dados["prop"]
        dataApli = dados["dataApli"]
        dataProxApli = dados["dataProxApli"]
        status = dados["status"]
        obs = dados["obs"]

        servicos = Servicos(idServ, codMaq, maq, linha, trecho, equip,
                            tipoLub, codLub, tipo, prop, dataApli, dataProxApli, status, obs)
        ServDAO.updateServicos(servicos)

        return "Serviço Atualizado Com Sucesso!"

    except:
        return flask.Response("Erro ao Atualizar Serviço!", status=500)


@app.route('/deletar_servico', methods=['POST'])
def deletar_servico_Post():
    try:
        dados = request.get_json()
        idServ = dados["idServ"]
        idServ = int(idServ)
        print(idServ)

        servico = Servicos(idServ, None, None, None, None,
                           None, None, None, None, None, None, None, None, None)

        ServDAO.deleteServicos(servico)
        return "Serviço Excluido Com Sucesso!"
    except:
        return flask.Response("Erro ao Deletar Serviço!", status=500)


if __name__ == "__main__":
    app.run()
