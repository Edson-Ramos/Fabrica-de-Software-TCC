class Servicos:
	def __init__(self, idServ, codMaq, maq, linha, trecho, equip, tipoLub, cod, tipo, prop, dataApli, dataProxApli, status, obs, nome_tec, uri_img):
		self.idServ = idServ
		self.codMaq = codMaq
		self.maq = maq
		self.linha = linha
		self.trecho = trecho
		self.equip = equip
		self.tipoLub = tipoLub
		self.codLub = cod
		self.tipo = tipo
		self.prop = prop
		self.dataApli = dataApli
		self.dataProxApli = dataProxApli
		self.status = status
		self.obs = obs
		self.nome_tec = nome_tec
		self.uri_img = uri_img
  
	def getIdServ(self):
		return self.idServ
	def setIdServ(self, idServ):
		self.idServ = idServ

	def getCodMaq(self):
		return self.codMaq
	def setCodMaq(self, codMaq):
		self.codMaq = codMaq

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
  
	def getCodLub(self):
		return self.codLub
	def setCodLub(self, codLub):
		self.codLub = codLub
  
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

	def getUri(self):
		return self.uri_img
	def setUri(self, uri_img):
		self.uri_img = uri_img

	def getNome_tec(self):
		return self.nome_tec
	def setNome_tec(self, nome_tec):
		self.nome_tec = nome_tec