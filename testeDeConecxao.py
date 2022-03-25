import mysql.connector
from servico import Servicos
import ServDAO






serv = Servicos(1, "Maquina", "Linha", "Trecho", "Tipo", "2022-03-22", "2022-06-15",
                    "Frequencia", "Status", "Observação")
ServDAO.insertServicos(serv)

