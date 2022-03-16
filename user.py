class User:
	def __init__(self, id, name, sobrenome, email, senha):
		self.id = id
		self.name = name
		self.sobrenome = sobrenome
		self.email = email	
		self.senha = senha
		
		

	def getId(self):
		return self.id
	def setId(self, id):
		self.id = id

	def getName(self):
		return self.name
	def setName(self, name):
		self.name = name

	def getSobreNome(self):
		return self.sobrenome
	def setSobreNome(self, sobrenome):
		self.sobrenome = sobrenome

	def getEmail(self):
		return self.email
	def setEmail(self, email):
		self.email = email	

	def getSenha(self):
		return self.senha
	def setSenha(self, senha):
		self.senha = senha	

	