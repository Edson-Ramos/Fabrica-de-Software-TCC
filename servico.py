class Servicos:
	def __init__(self, idServ, maq, trecho, linha, tipoLub, dataApli, dataProxApli, freq, status, obs):
		self.idServ = idServ
		self.maq = maq
		self.trecho = trecho
		self.linha = linha
		self.tipoLub = tipoLub
		self.dataApli = dataApli
		self.dataProxApli = dataProxApli
		self.freq = freq
		self.status = status
		self.obs = obs

	def getIdServ(self):
		return self.idServ
	def setIdServ(self, idServ):
		self.idServ = idServ

	def getMaq(self):
		return self.maq
	def setMaq(self, maq):
		self.maq = maq
  
	def getTrecho(self):
		return self.trecho
	def setTrecho(self, trecho):
		self.trecho = trecho

	def getLinha(self):
		return self.linha
	def setLinha(self, linha):
		self.linha = linha
  
	def getTipoLub(self):
		return self.tipoLub
	def setTipoLub(self, tipoLub):
		self.tipoLub = tipoLub

	def getDataApli(self):
		return self.dataApli
	def setDataApli(self, dataApli):
		self.dataApli = dataApli
  
	def getDataProxApli(self):
		return self.dataProxApli
	def setDataProxApli(self, dataProxApli):
		self.dataProxApli = dataProxApli

	def getFreq(self):
		return self.freq
	def setFreq(self, freq):
		self.freq = freq
  
	def getStatus(self):
		return self.status
	def setStatus(self, status):
		self.status = status

	def getObs(self):
		return self.obs
	def setObs(self, obs):
		self.obs = obs