class User:
	def __init__(self, id, nome, sobreNome, email, senha, tipo):
		self.id = id
		self.nome = nome
		self.sobreNome = sobreNome
		self.email = email	
		self.senha = senha
		self.tipo = tipo
		
		

	def getId(self):
		return self.id
	def setId(self, id):
		self.id = id

	def getNome(self):
		return self.nome
	def setNome(self, nome):
		self.nome = nome

	def getSobreNome(self):
		return self.sobreNome
	def setSobreNome(self, sobreNome):
		self.sobreNome = sobreNome

	def getEmail(self):
		return self.email
	def setEmail(self, email):
		self.email = email	

	def getSenha(self):
		return self.senha
	def setSenha(self, senha):
		self.senha = senha
  
	def getTipo(self):
		return self.tipo
	def setTipo(self, tipo):
		self.tipo = tipo

	