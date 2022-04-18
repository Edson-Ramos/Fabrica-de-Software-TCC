from lubrificantes import Oleo, Graxa, Spray
import mysql.connector
from connection import getConnection, closeConnection

connection = getConnection()[0]
cursor = getConnection()[1]

def closeConnection():
	closeConnection()

def insertGraxa(lubrificantes):
	try:
		sql_query = """INSERT INTO `graxa`(idGra, codGra, tipo, consis) VALUES (%s,%s,%s,%s)"""
		tuple = (lubrificantes.getIdGra(), lubrificantes.getCodGra(), lubrificantes.getTipo(), lubrificantes.getConsis())
		cursor.execute(sql_query, tuple)
		connection.commit()
		print("Registro foi inserido com sucesso na Base de Dados!")
	except mysql.connector.Error as error:
		connection.rollback()
		print("Falha ao Tentar Inserir um Registro no Banco de Dados!")
		raise error

def updateGraxa(lubrificantes):
    try:
        sql_query = """UPDATE `graxa` SET codGra=%s, tipo=%s, consis=%s WHERE idGra = %s;"""
        tuple = (lubrificantes.getCodGra(), lubrificantes.getTipo(), lubrificantes.getConsis(), lubrificantes.getIdGra())
        cursor.execute(sql_query,tuple)
        connection.commit()
        print("O Registro foi atualizado com sucesso!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Atualizar Registro no banco de dados!")
        raise error

def listGraxa():
    try:
        sql_query = "SELECT * FROM graxa"
        cursor.execute(sql_query)
        result = cursor.fetchall()
        retorno = []
        for us in result:
            graxa = Graxa(us[0], us[1], us[2], us[3])
            retorno.append(graxa)
        return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao carregar o Lubrificantes")
        raise error
	
def deleteGraxa(lubrificantes):
    try:
        sql_query = """DELETE FROM `graxa` WHERE idGra = %s;"""%lubrificantes.getIdGra()
        id_get = lubrificantes.getIdGra()		
        cursor.execute(sql_query)		
        connection.commit()
        print("Id: ", id_get, " Excluido com Sucesso!")
        
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao deletar registro da base de dados!")
        raise error
    
def listGraxaId(lubrificantes):
    try:
        sql_query = """ SELECT * FROM graxa WHERE idGra = %s;"""%lubrificantes.getIdGra()
        cursor.execute(sql_query)
        result = cursor.fetchall() 
        retorno = []
        for eq in result:
            lub = Graxa(eq[0], eq[1], eq[2], eq[3])
            retorno.append(lub)
            return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Carregar Registro")
        raise error   
    
    
    
def insertOleo(lubrificantes):
    try:
        sql_query = """INSERT INTO `oleo`(idOleo ,codOleo, tipo, visco) VALUES (%s,%s,%s,%s)"""
        tuple = (lubrificantes.getIdOleo(), lubrificantes.getCodOleo(), lubrificantes.getTipo(), lubrificantes.getVisco())
        cursor.execute(sql_query, tuple)
        connection.commit()
        print("Registro foi inserido com sucesso na Base de Dados!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Tentar Inserir um Registro no Banco de Dados!")
        raise error

def updateOleo(lubrificantes):
    try:
        sql_query = """UPDATE `oleo` SET codOleo=%s, tipo=%s, visco=%s WHERE idOleo = %s;"""
        tuple = (lubrificantes.getTipo(), lubrificantes.getCodOleo(), lubrificantes.getVisco(), lubrificantes.getIdOleo())
        cursor.execute(sql_query,tuple)
        connection.commit()
        print("O Registro foi atualizado com sucesso!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao atualizar registro no banco de dados!")
        raise error

def listOleo():
    try:
        sql_query = "SELECT * FROM oleo"
        cursor.execute(sql_query)
        result = cursor.fetchall()
        retorno = []
        for us in result:
            oleo = Oleo(us[0], us[1], us[2], us[3])
            retorno.append(oleo)
        return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao carregar os Lubrificantes")
        raise error

def listOleoId(lubrificantes):
    try:
        sql_query = """ SELECT * FROM oleo WHERE idOleo = "%s";"""%lubrificantes.getIdOleo()
        cursor.execute(sql_query)
        result = cursor.fetchall() 
        retorno = []
        for eq in result:
            lub = Oleo(eq[0], eq[1], eq[2], eq[3])
            retorno.append(lub)
            return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Carregar Registro")
        raise error   
    
	
def deleteOleo(lubrificantes):
    try:
        sql_query = """DELETE FROM `oleo` WHERE idOleo = %s;"""%lubrificantes.getIdOleo()
        id_get = lubrificantes.getIdOleo()		
        cursor.execute(sql_query)		
        connection.commit()
        print("Id: ", id_get, " Excluido com Sucesso!")
        
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao deletar registro da base de dados!")
        raise error
    
  
  
  
    
def insertSpray(lubrificantes):
    try:
        sql_query = """INSERT INTO `spray`(idSpray, codSpray, tipo, visco) VALUES (%s,%s,%s,%s)"""
        tuple = (lubrificantes.getIdSpray(), lubrificantes.getCodSpray(), lubrificantes.getTipo(), lubrificantes.getVisco())
        cursor.execute(sql_query, tuple)
        connection.commit()
        print("Registro foi inserido com sucesso na Base de Dados!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Tentar Inserir um Registro no Banco de Dados!")
        raise error

def updateSpray(lubrificantes):
    try:
        sql_query = """UPDATE `spray` SET codSpray=%s, tipo=%s, visco=%s WHERE idSpray = %s;"""
        tuple = (lubrificantes.getCodSpray(), lubrificantes.getTipo(), lubrificantes.getVisco(), lubrificantes.getIdSpray())
        cursor.execute(sql_query,tuple)
        connection.commit()
        print("O Registro foi atualizado com sucesso!")
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao atualizar registro no banco de dados!")
        raise error

def listSpray():
    try:
        sql_query = "SELECT * FROM spray"
        cursor.execute(sql_query)
        result = cursor.fetchall()
        retorno = []
        for us in result:
            spray = Spray(us[0], us[1], us[2], us[3])
            retorno.append(spray)
        return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao carregar os Lubrificantes")
        raise error

def listSprayId(lubrificantes):
    try:
        sql_query = """ SELECT * FROM spray WHERE idSpray = %s;"""%lubrificantes.getIdSpray()
        cursor.execute(sql_query)
        result = cursor.fetchall() 
        retorno = []
        for eq in result:
            lub = Spray(eq[0], eq[1], eq[2], eq[3])
            retorno.append(lub)
            return retorno
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao Carregar Registro")
        raise error   
    

def deleteSpray(lubrificantes):
    try:
        sql_query = """DELETE FROM `spray` WHERE idSpray = %s;"""%lubrificantes.getIdSpray()
        id_get = lubrificantes.getIdSpray()		
        cursor.execute(sql_query)		
        connection.commit()
        print("Id: ", id_get, " Excluido com Sucesso!")
        
    except mysql.connector.Error as error:
        connection.rollback()
        print("Falha ao deletar registro da base de dados!")
        raise error