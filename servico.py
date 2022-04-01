class Servicos:
	def __init__(self, idServ, idMaq, maq, linha, trecho, equip, tipoLub, tipo, prop, dataApli, dataProxApli, status, obs):
		self.idServ = idServ
		self.idMaq = idMaq
		self.maq = maq
		self.linha = linha
		self.trecho = trecho
		self.equip = equip
		self.tipoLub = tipoLub
		self.tipo = tipo
		self.prop = prop
		self.dataApli = dataApli
		self.dataProxApli = dataProxApli
		self.status = status
		self.obs = obs
  
	def getIdServ(self):
		return self.idServ
	def setIdServ(self, idServ):
		self.idServ = idServ

	def getIdMaq(self):
		return self.idMaq
	def setIdMaq(self, idMaq):
		self.idMaq = idMaq

	def getMaq(self):
		return self.maq
	def setMaq(self, maq):
		self.maq = maq

	def getLinha(self):
		return self.linha
	def setLinha(self, linha):
		self.linha = linha
  
	def getTrecho(self):
		return self.trecho
	def setTrecho(self, trecho):
		self.trecho = trecho

	def getEquip(self):
		return self.equip
	def setEquip(self, equip):
		self.freq = equip
  
	def getTipoLub(self):
		return self.tipoLub
	def setTipoLub(self, tipoLub):
		self.tipoLub = tipoLub
  
	def getTipo(self):
		return self.tipo
	def setTipo(self, tipo):
		self.tipo = tipo
  
	def getProp(self):
		return self.prop
	def setProp(self, prop):
		self.prop = prop

	def getDataApli(self):
		return self.dataApli
	def setDataApli(self, dataApli):
		self.dataApli = dataApli
  
	def getDataProxApli(self):
		return self.dataProxApli
	def setDataProxApli(self, dataProxApli):
		self.dataProxApli = dataProxApli
  
	def getStatus(self):
		return self.status
	def setStatus(self, status):
		self.status = status

	def getObs(self):
		return self.obs
	def setObs(self, obs):
		self.obs = obs