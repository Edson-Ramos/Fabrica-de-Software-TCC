
class Equipamento:

    def __init__(self, idMaq, nome, linha, trecho):
        self.idMaq = idMaq
        self.nome = nome
        self.linha = linha
        self.trecho = trecho


    def getIdMaq(self):
        return self.idMaq
    def setIdMaq(self, idMaq):
        self.idMaq = idMaq
		

    def getNome(self):
        return self.nome
    def setNome(self, nome):
        self.nome = nome

    def getLinha(self):
        return self.linha
    def setLinha(self, linha):
        self.linha = linha

    def getTrecho(self):
        return self.trecho
    def setTrecho(self, trecho):
        self.trecho = trecho
