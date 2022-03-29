from equipamento import Equipamento
import mysql.connector
from connection import getConnection, closeConnection


connection = getConnection()[0]
cursor = getConnection()[1]

def closeConnection():
    closeConnection()

def insertEquipamentos(equipamento):
	try:
		sql_query = """INSERT INTO `maquina`(idMaq, nome, linha, trecho ) VALUES (%s,%s,%s,%s)"""
		tuple = (equipamento.getIdMaq(), equipamento.getNome(), equipamento.getLinha(), equipamento.getTrecho())
		cursor.execute(sql_query, tuple)
		connection.commit()
		print("Registro foi inserido com sucesso na Base de Dados!")
	except mysql.connector.Error as error:
		connection.rollback()
		print("Falha ao Tentar Inserir um Registro no Banco de Dados!")
		raise error

def atualizarEquipamentos(equipamento):
    try:
        sql_query = """UPDATE `maquina` SET nome = %s, linha = %s, trecho = %s WHERE idMaq = %s;"""
        tuple = (equipamento.getNome(), equipamento.getLinha(), equipamento.getTrecho(), equipamento.getIdMaq())
        cursor.execute(sql_query, tuple)
        connection.commit()
        print("Equipamento foi Atualizado Com Sucesso!")

    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Atualizar o Equipamento!")
        raise error

def listarEquipamentos():
    try:
        sql_query = "SELECT * FROM maquina"
        cursor.execute(sql_query)
        result = cursor.fetchall()
        retorno = []
        for eq in result:
            equipamento = Equipamento(eq[0], eq[1], eq[2], eq[3])
            retorno.append(equipamento)
        return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Carregar Lista de Equipamentos!")
        raise error
    
def deleteEquipamento(equipamento):
    try:
        sql_query = """DELETE FROM maquina WHERE idMaq = %s;"""%equipamento.getIdMaq()
        id_get = equipamento.getIdMaq()
        cursor.execute(sql_query)
        connection.commit()
        print("ID: ", id_get, "Excluido com Sucesso")
        
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Deletar Registro da Base de Dados")
        raise error
    
    
def listMaqId(equipamento):
    try:
        sql_query = """ SELECT * FROM maquina WHERE idMaq = %s;"""%equipamento.getIdMaq()
        cursor.execute(sql_query)
        result = cursor.fetchall() 
        retorno = []
        for eq in result:
            maq = Equipamento(eq[0], eq[1], eq[2], eq[3])
            retorno.append(maq)
            return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Carregar Registro")
        raise error