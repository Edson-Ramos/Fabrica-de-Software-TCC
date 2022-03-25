import mysql.connector
from servicos import Servicos
import ServicosDAO






serv = Servicos(1, "Maquina", "Linha", "Trecho", "Tipo", "2022-03-22", "2022-06-15",
                    "Frequencia", "Status", "Observação")
ServicosDAO.insertServicos(serv)

