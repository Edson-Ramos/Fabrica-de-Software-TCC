from servicos import Servicos
import mysql.connector
from connection import getConnection, closeConnection

connection = getConnection()[0]
cursor = getConnection()[1]


def closeConnection():
	closeConnection()


def insertServicos(servicos):
	try:
		sql_query = """INSERT INTO `servico`(idServ , maq, trecho , linha, tipLub, dataApli, dataProxApli, freq, obs) VALUES (%s,%s,%s,%s, %s,%s,%s,%s)"""
		tuple = (servicos.getIdServico(), servicos.getMaquina(), servicos.getLinhaMaq(), servicos.getTrecho(
		), servicos.getTipLub(), servicos.getDataAplic(), servicos.getFreqAplic(), servicos.getObs())
        

		print("Registro foi inserido com sucesso na Base de Dados!")
	except mysql.connector.Error as error:
		connection.rollback()
		print("Falha ao Tentar Inserir um Registro no Banco de Dados!")
		raise error

def updateServicos(servicos):
    try:
        sql_query = """UPDATE `servicos` SET idServ=%s, maq=%s, trecho=%s, linha=%s, tipLub=%s, dataApli=%s, dataProxApli=%s, freq=%s, obs=%s WHERE idServ=%s;"""
        tuple = (servicos.getIdServico(), servicos.getMaquina(), servicos.getLinhaMaq(), servicos.getTrecho(), servicos.getTipLub(), servicos.getDataAplic(), servicos.getFreqAplic(), servicos.getObs())

        cursor.execute(sql_query,tuple)
        connection.commit()
        print("O Registro foi atualizado com sucesso!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao atualizar registro de usuário no banco de dados!")

def listAllServicos():
    try:
        sql_query = "SELECT * FROM servicos"
        cursor.execute(sql_query)
        result = cursor.fetchall()
        retorno = []
        for us in result:
            servicos = Servicos(us[0], us[1], us[2], us[3], us[4])
            retorno.append(servicos)
        return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao carregar a lista de serviços cadastrados")
        raise error
	
def deleteServicos(servicos):
	try:
		sql_query = """DELETE FROM `servicos` WHERE id = %s;"""%user.getId()
		id_get = servicos.getId()		
		cursor.execute(sql_query)		
		connection.commit()
		print("Id: ", id_get, " Excluido com Sucesso!")
		
	except mysql.connector.Error as error:
		connection.rollback()
		print("Falha ao deletar registro da base de dados!")