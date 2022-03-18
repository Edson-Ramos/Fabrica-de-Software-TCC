import mysql.connector
from mysql.connector import Error
from user import User
import UsuarioDAO
from equipamento import Equipamento
import EquipamentosDAO
import LubrificantesDAO
from lubrificantes import Oleo, Graxa, Spray
from connection import getConnection, closeConnection



spray = Spray(1, "000", "1")
LubrificantesDAO.insertSpray(spray)
