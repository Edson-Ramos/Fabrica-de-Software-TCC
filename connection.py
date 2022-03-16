
import mysql.connector


try:
	connection = mysql.connector.connect(host='127.0.0.1', user='root', password='', database='easylub')
	if connection.is_connected():
		db_info = connection.get_server_info()
		print("Conectado ao Servidor MySQL Versão ", db_info)
	cursor = connection.cursor()
except mysql.connector.Error as error:
	print("Erro ao Conectar Com o Banco de Dados")

def getConnection():
	return (connection, cursor)

def closeConnection():
	if connection.is_connected():
		cursor.close()
		connection.close()
	print("Conexao Encerrada!")
