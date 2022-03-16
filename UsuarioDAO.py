from user import User
from equipamento import Equipamento
import mysql.connector
from connection import getConnection, closeConnection

connection = getConnection()[0]
cursor = getConnection()[1]

def closeConnection():
	closeConnection()

def insertUser(user):
	try:
		sql_query = """INSERT INTO `usuario`(nome , sobreNome, email , senha ) VALUES (%s,%s,%s,%s)"""
		tuple = (user.getName(), user.getSobreNome(), user.getEmail(), user.getSenha())
		cursor.execute(sql_query, tuple)
		connection.commit()
		print("Registro foi inserido com sucesso na Base de Dados!")
	except mysql.connector.Error as error:
		connection.rollback()
		print("Falha ao Tentar Inserir um Registro no Banco de Dados!")
		raise error

def updateUser(user):
    try:
        sql_query = """UPDATE `usuario` SET nome=%s, sobreNome=%s,email=%s, senha=%s WHERE id = %s;"""
        tuple = (user.getName(), user.getSobreNome(), user.getEmail(), user.getSenha(), user.getId())
        cursor.execute(sql_query,tuple)
        connection.commit()
        print("O Registro foi atualizado com sucesso!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao atualizar registro de usuário no banco de dados!")

def listAllUsers():
    try:
        sql_query = "SELECT * FROM usuario"
        cursor.execute(sql_query)
        result = cursor.fetchall()
        retorno = []
        for us in result:
            user = User(us[0], us[1], us[2], us[3], us[4])
            retorno.append(user)
        return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao carregar a lista de usuários")
        raise error
	
def deleteUser(user):
	try:
		sql_query = """DELETE FROM `usuario` WHERE id = %s;"""%user.getId()
		id_get = user.getId()		
		cursor.execute(sql_query)		
		connection.commit()
		print("Id: ", id_get, " Excluido com Sucesso!")
		
	except mysql.connector.Error as error:
		connection.rollback()
		print("Falha ao deletar registro da base de dados!")