import mysql.connector
from mysql.connector import Error
from user import User
import UsuarioDAO
from equipamento import Equipamento
import EquipamentosDAO
from connection import getConnection, closeConnection



equipamento = User(8,None,None,None,None)

UsuarioDAO.deleteUser(equipamento)