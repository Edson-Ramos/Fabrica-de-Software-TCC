from servicos import Servicos
import mysql.connector
from connection import getConnection, closeConnection

connection = getConnection()[0]
cursor = getConnection()[1]

def closeConnection():
	closeConnection()


def insertServicos(servicos):
    try:
        sql_query = """INSERT INTO `servicos`(idServ, maq, trecho, linha, tipoLub, dataApli, dataProxApli, freq, status, obs) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
        tuple = (servicos.getIdServ(), servicos.getMaq(), servicos.getTrecho(), servicos.getLinha(), servicos.getTipoLub(), servicos.getDataApli(), servicos.getDataProxApli(), servicos.getFreq(), servicos.getStatus(), servicos.getObs())
        cursor.execute(sql_query, tuple)
        connection.commit()
        print("Registro foi inserido com sucesso na Base de Dados!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Tentar Inserir um Registro no Banco de Dados!")
        raise error

def updateServicos(servicos):
    try:
        sql_query = """UPDATE `servicos` SET idServ=%s, maq=%s, trecho=%s, linha=%s, tipLub=%s, dataApli=%s, dataProxApli=%s, freq=%s, obs=%s WHERE idServ=%s;"""
        tuple = (servicos.getMaq(), servicos.getTrecho(), servicos.getLinha(), servicos.LocLub(), servicos.getTipoLub(), servicos.getDataApli(), servicos.getDataProxApli(), servicos.getFreq(), servicos.getStatus(), servicos.getObs(), servicos.getIdServ())
        cursor.execute(sql_query,tuple)
        connection.commit()
        print("O Registro foi atualizado com sucesso!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao atualizar registro de usuário no banco de dados!")
        raise error

def listAllServicos():
    try:
        sql_query = "SELECT * FROM servicos"
        cursor.execute(sql_query)
        result = cursor.fetchall()
        retorno = []
        for serv in result:
            servicos = Servicos(serv[0], serv[1], serv[2], serv[3], serv[4], serv[5], serv[6], serv[7], serv[8], serv[9])
            retorno.append(servicos)
        return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao carregar a lista de serviços cadastrados")
        raise error
	
def deleteServicos(servicos):
	try:
		sql_query = """DELETE FROM `servicos` WHERE id = %s;"""%servicos.getId()
		id_get = servicos.getId()		
		cursor.execute(sql_query)		
		connection.commit()
		print("Id: ", id_get, " Excluido com Sucesso!")
	except mysql.connector.Error as error:
		connection.rollback()
		print("Falha ao deletar registro da base de dados!")