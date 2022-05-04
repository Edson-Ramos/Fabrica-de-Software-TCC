from user import User
import mysql.connector
from connection import getConnection, closeConnection

connection = getConnection()[0]
cursor = getConnection()[1]

def closeConnection():
	closeConnection()

def insertUser(user):
	try:
		sql_query = """INSERT INTO `usuarios`(nome , email , senha, tipo ) VALUES (%s,%s,%s,%s)"""
		tuple = (user.getNome(), user.getEmail(), user.getSenha(), user.getTipo())
		cursor.execute(sql_query, tuple)
		connection.commit()
		print("Registro foi inserido com sucesso na Base de Dados!")
	except mysql.connector.Error as error:
		connection.rollback()
		print("Falha ao Tentar Inserir um Registro no Banco de Dados!")
		raise error

def updateUser(user):
    try:
        sql_query = """UPDATE `usuarios` SET nome=%s, email=%s, senha=%s, tipo=%s WHERE id = %s;"""
        tuple = (user.getNome(), user.getEmail(), user.getSenha(), user.getTipo(), user.getId())
        cursor.execute(sql_query,tuple)
        connection.commit()
        print("O Registro foi atualizado com sucesso!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao atualizar registro de usuário no banco de dados!")
        raise error

def listAllUsers():
    try:
        sql_query = "SELECT * FROM usuarios"
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

def listUserEmail(usuario):
    try:
        sql_query = """SELECT * FROM usuarios WHERE email = "%s" """%usuario.getEmail()
        cursor.execute(sql_query)
        result = cursor.fetchall()
        retorno = []
        for user in result:
            usuario = User(user[0], user[1], user[2],user[3], user[4],)
            retorno.append(usuario)            
            return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Carregar Registro")
        raise error

def listUserIp(usuario):
    try:
        sql_query = " SELECT * from usuarios WHERE id = %s;"%usuario.getId()
        cursor.execute(sql_query)
        result = cursor.fetchall() 
        retorno = []
        for user in result:
            usuario = User(user[0], user[1], user[2],user[3], user[4],)
            retorno.append(usuario)            
            return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Carregar Registro")
        raise error

	
def deleteUser(user):
    try:
        sql_query = """DELETE FROM `usuarios` WHERE id = %s;"""%user.getId()
        id_get = user.getId()		
        cursor.execute(sql_query)		
        connection.commit()
        print( "Id: ", id_get, " Excluido com Sucesso!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao deletar registro da base de dados!")
        raise error