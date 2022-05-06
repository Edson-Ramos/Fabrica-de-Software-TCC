
import mysql.connector

connection = mysql.connector.connect(host='localhost', user='root', password='', database='easylub')

if connection.is_connected():
    db_info = connection.get_server_info()
    print("Conectado ao Servidor MySQL Versão ", db_info)
    cursor = connection.cursor()


def getConnection():
    return (connection, cursor)


def closeConnection():
    if connection.is_connected():
        cursor.close()
        connection.close()
    print("Conexao Encerrada!")
