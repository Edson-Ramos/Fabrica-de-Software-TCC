import mysql.connector
from mysql.connector import Error
from user import User
import UsuarioDAO
from equipamento import Equipamento
import EquipamentosDAO
import LubrificantesDAO
from lubrificantes import Oleo, Graxa, Spray
from connection import getConnection, closeConnection



grax = Graxa(1, "Spray1", 11)
LubrificantesDAO.updateGraxa(grax)
