
import mysql.connector



try:
	connection = mysql.connector.connect(host='us-cdbr-east-05.cleardb.net', user='b7f10ac575aafb', password='59ccfaa1', database='heroku_36b6e4d18a8ca91')
	#connection = mysql.connector.connect(host='localhost', user='root', password='', database='easylub')
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
