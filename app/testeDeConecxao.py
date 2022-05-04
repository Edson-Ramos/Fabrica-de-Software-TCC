import mysql.connector
from servico import Servicos
import EquipamentosDAO
from equipamento import Equipamento
import LubrificantesDAO
from lubrificantes import Oleo, Graxa, Spray

import ServDAO
from servico import Servicos



lubrificantes = Oleo(1, None, None)
LubrificantesDAO.listOleoId(lubrificantes)