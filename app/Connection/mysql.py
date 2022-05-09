
from mysql.connector import errorcode
import mysql.connector


#connection = mysql.connector.connect(host='localhost', user='easylubt_edson', password='eu1sou2foda3', database='easylubt_easylub')

class MysqlConnect:

    def __init__(self):
        self.connection = None

    def teste(self):
        try:  
            if self.connection and self.connection.is_connected():
                db_info = self.connection.get_server_info()              
                print("Conectado ao Servidor MySQL Versao", db_info)
                
            else:         
                self.connection = mysql.connector.connect(host='localhost', user='root', password='', database='easylub')

            cursor = self.connection.cursor()
            return cursor


        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Algo esta errado com as informações do banco")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Banco de dados não existe")


    def getConnection(self):
        cursor = self.teste()    
        return (self.connection, cursor)

   # def closeConnection():
   #     if connection.is_connected():        
   #         cursor = teste() 
   #         cursor.close()
    #        connection.close()
   #     print("Conexao Encerrada!")


 