import mysql.connector
from servico import Servicos
import EquipamentosDAO
from equipamento import Equipamento

import ServDAO
from servico import Servicos



serv = Servicos(None, 2, "maquina 2", "Linha 2", "Trecho 2", "Equipamento 2", "Tipo 2", 20220329, 20230329, "Status 2", "Teste de Obsevação")
ServDAO.insertServicos(serv)