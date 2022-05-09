
class Equipamento:

    def __init__(self, idMaq, codMaq, linha, trecho, nome):
        self.idMaq = idMaq
        self.codMaq = codMaq
        self.linha = linha
        self.trecho = trecho
        self.nome = nome


    def getIdMaq(self):
        return self.idMaq
    def setIdMaq(self, idMaq):
        self.idMaq = idMaq
        
    def getCodMaq(self):
        return self.codMaq
    def setCodMaq(self, codMaq):
        self.codMaq = codMaq

    def getLinha(self):
        return self.linha
    def setLinha(self, linha):
        self.linha = linha

    def getTrecho(self):
        return self.trecho
    def setTrecho(self, trecho):
        self.trecho = trecho
		
    def getNome(self):
        return self.nome
    def setNome(self, nome):
        self.nome = nome
