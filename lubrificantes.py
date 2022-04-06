
class Oleo:
    def __init__(self, idOleo, codOleo, tipo, visco):
        self.idOleo = idOleo
        self.codOleo = codOleo
        self.tipo = tipo
        self.visco = visco

    def getIdOleo(self):
        return self.idOleo
    def setIdOleo(self, idOleo):
        self.idOleo = idOleo
        
    def getCodOleo(self):
        return self.codOleo
    def setCodOleo(self, codOleo):
        self.codOleo = codOleo

    def getTipo(self):
        return self.tipo
    def setTipo(self, tipo):
        self.tipo = tipo

    def getVisco(self):
        return self.visco
    def setVisco(self, visco):
        self.visco = visco



class Graxa:
    def __init__(self, idGra, codGra, tipo, consis):
        self.idGra = idGra
        self.codGra = codGra
        self.tipo = tipo
        self.consis = consis
        

    def getIdGra(self):
        return self.idGra
    def setIdGra(self, idGra):
        self.idGra = idGra
        
    def getCodGra(self):
        return self.codGra
    def setCodGra(self, codGra):
        self.codGra = codGra
        
    def getTipo(self):
        return self.tipo
    def setTipo(self, tipo):
        self.tipo = tipo

    def getConsis(self):
        return self.consis
    def setConsis(self, consis):
        self.consis = consis


class Spray:
    def __init__(self, idSpray, codSpray, tipo, visco):
        self.idSpray = idSpray
        self.codSpray = codSpray
        self.tipo = tipo
        self.visco = visco

    def getIdSpray(self):
        return self.idSpray
    def setIdSpray(self, idSpray):
        self.idSpray = idSpray
        
    def getCodSpray(self):
        return self.codSpray
    def setCodSpray(self, codSpray):
        self.codSpray = codSpray

    def getTipo(self):
        return self.tipo
    def setTipo(self, tipo):
        self.tipo = tipo

    def getVisco(self):
        return self.visco
    def setVisco(self, visco):
        self.visco = visco


