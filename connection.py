
import mysql.connector



try:
	connection = mysql.connector.connect(host='mysql://b7f10ac575aafb:59ccfaa1@us-cdbr-east-05.cleardb.net/heroku_36b6e4d18a8ca91?reconnect=true', user='b7f10ac575aafb', password='59ccfaa1', database='heroku_36b6e4d18a8ca91')
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
