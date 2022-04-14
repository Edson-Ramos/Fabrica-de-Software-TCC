from servico import Servicos
import mysql.connector
from connection import getConnection, closeConnection


connection = getConnection()[0]
cursor = getConnection()[1]


def closeConnection():
    closeConnection()


def insertServicos(servicos):
    try:
        sql_query = """INSERT INTO `servicos`(idServ, codMaq, maq, linha, trecho, equip, tipoLub, codLub, tipo, prop, dataApli, dataProxApli, status, obs) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
        tuple = (servicos.getIdServ(), servicos.getCodMaq(), servicos.getMaq(), servicos.getLinha(), servicos.getTrecho(), servicos.getEquip(), servicos.getTipoLub(),servicos.getCodLub(), servicos.getTipo(), servicos.getProp(),
                 servicos.getDataApli(), servicos.getDataProxApli(), servicos.getStatus(), servicos.getObs())
        cursor.execute(sql_query, tuple)
        connection.commit()
        print("Registro foi inserido com sucesso na Base de Dados!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Tentar Inserir um Registro no Banco de Dados!")
        raise error


def updateServicos(servicos):
    try:
        sql_query = """UPDATE `servicos` SET codMaq=%s, maq=%s, linha=%s, trecho=%s, equip =%s, tipoLub=%s, codLub = %s, tipo=%s, prop=%s, dataApli=%s, dataProxApli=%s, status=%s, obs=%s WHERE idServ=%s;"""
        tuple = (servicos.getCodMaq(), servicos.getMaq(), servicos.getLinha(), servicos.getTrecho(), servicos.getEquip(), servicos.getTipoLub(),servicos.getCodLub(), servicos.getTipo(), servicos.getProp(),
                 servicos.getDataApli(), servicos.getDataProxApli(), servicos.getStatus(), servicos.getObs(), servicos.getIdServ())
        cursor.execute(sql_query, tuple)
        connection.commit()
        print("O Registro foi atualizado com sucesso!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao atualizar registro de usuário no banco de dados!")
        raise error

def listAllServicos():
    try:
        sql_query = "SELECT idServ, codMaq, maq, linha, trecho ,equip ,tipoLub, codLub ,tipo ,prop, DATE_FORMAT(dataApli, '%d/%m/%Y' ), DATE_FORMAT(dataProxApli, '%d/%m/%Y'),status ,obs from servicos"
        cursor.execute(sql_query)
        result = cursor.fetchall()
        retorno = []
        for serv in result:
            servicos = Servicos(serv[0], serv[1], serv[2], serv[3], serv[4], serv[5],
                                serv[6], serv[7], serv[8], serv[9], serv[10], serv[11], serv[12], serv[13])
            retorno.append(servicos)
        return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao carregar a lista de serviços cadastrados")
        raise error

def listServId(servicos):
    try:
        sql_query = " SELECT * from servicos WHERE idServ = %s;"%servicos.getIdServ()
        cursor.execute(sql_query)
        result = cursor.fetchall() 
        retorno = []
        for serv in result:
            servicos = Servicos(serv[0], serv[1], serv[2], serv[3], serv[4], serv[5],
                                serv[6], serv[7], serv[8], serv[9], serv[10], serv[11], serv[12], serv[13])
            retorno.append(servicos)            
            return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Carregar Registro")
        raise error

def deleteServicos(servicos):
    try:
        sql_query = """DELETE FROM `servicos` WHERE idServ = %s;""" % servicos.getIdServ()
        cursor.execute(sql_query)
        connection.commit()
        print(" Excluido com Sucesso!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao deletar registro da base de dados!")
        raise error
