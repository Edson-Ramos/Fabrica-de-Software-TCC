from equipamento import Equipamento
import mysql.connector
from connection import getConnection, closeConnection


connection = getConnection()[0]
cursor = getConnection()[1]

def closeConnection():
    closeConnection()

def insertMaquinas(maquina):
	try:
		sql_query = """INSERT INTO `maquina`(idMaq, codMaq, linha, trecho, nomeMaq ) VALUES (%s,%s,%s,%s,%s)"""
		tuple = (maquina.getIdMaq(), maquina.getCodMaq(), maquina.getLinha(), maquina.getTrecho(), maquina.getNome())
		cursor.execute(sql_query, tuple)
		connection.commit()
		print("Registro foi inserido com sucesso na Base de Dados!")
	except mysql.connector.Error as error:
		connection.rollback()
		print("Falha ao Tentar Inserir um Registro no Banco de Dados!")
		raise error

def atualizarMaquinas(maquina):
    try:
        sql_query = """UPDATE `maquina` SET codMaq = %s, linha = %s, trecho = %s, nomeMaq = %s WHERE idMaq = %s;"""
        tuple = ( maquina.getCodMaq(), maquina.getLinha(), maquina.getTrecho(), maquina.getNome(), maquina.getIdMaq())
        cursor.execute(sql_query, tuple)
        connection.commit()
        print("Máquina Atualizada Com Sucesso!")

    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Atualizar Máquina!")
        raise error

def listarMaquinas():
    try:
        sql_query = "SELECT * FROM maquina"
        cursor.execute(sql_query)
        result = cursor.fetchall()
        retorno = []
        for eq in result:
            maquina = Equipamento(eq[0], eq[1], eq[2], eq[3], eq[4])
            retorno.append(maquina)
        return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Carregar Lista de Equipamentos!")
        raise error
    
def deleteMaquinas(maquina):
    try:
        sql_query = """DELETE FROM maquina WHERE idMaq = %s;"""%maquina.getIdMaq()
        id_get = maquina.getIdMaq()
        cursor.execute(sql_query)
        connection.commit()
        print("ID: ", id_get, "Excluido com Sucesso")
        
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Deletar Registro da Base de Dados")
        raise error
    
    
def listMaqCod(maquina):
    try:
        sql_query = """ SELECT * FROM maquina WHERE codMaq = "%s" """%maquina.getCodMaq()
        cursor.execute(sql_query)
        result = cursor.fetchall() 
        retorno = []
        for eq in result:
            maq = Equipamento(eq[0], eq[1], eq[2], eq[3], eq[4])
            retorno.append(maq)
            return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Carregar Registro")
        raise error