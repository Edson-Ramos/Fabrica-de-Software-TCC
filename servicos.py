class Servicos:
	def __init__(self, idServico, maquina, linhaMaq, trecho, tipLub, dataAplic, freqAplic, obs):
		self.idServico = idServico
		self.maquina = maquina
		self.linhaMaq = linhaMaq
		self.trecho = trecho
		self.tipLub = tipLub
		self.dataAplic = dataAplic
		self.freqAplic = freqAplic
		self.obs = obs

	def getIdServico(self):
		return self.idServico
	def setIdServico(self, idServico):
		self.idServico = idServico

	def getMaquina(self):
		return self.maquina
	def setMaquina(self, maquina):
		self.maquina = maquina

	def getLinhaMaq(self):
		return self.linhaMaq
	def setLinhaMaq(self, linhaMaq):
		self.linhaMaq = linhaMaq

	def getTrecho(self):
		return self.trecho
	def setTrecho(self, trecho):
		self.trecho = trecho

	def getTipLub(self):
		return self.tipLub
	def setTipLub(self, tipLub):
		self.tipLub = tipLub

	def getDataAplic(self):
		return self.dataAplic
	def setDataAplic(self, dataAplic):
		self.dataAplic = dataAplic

	def getFreqAplic(self):
		return self.freqAplic
	def setFreqAplic(self, freqAplic):
		self.freqAplic = freqAplic

	def getObs(self):
		return self.obs
	def setObs(self, obs):
		self.obs = obs