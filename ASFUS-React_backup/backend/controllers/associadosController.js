// backend/controllers/associadosController.js

// Mock data - in production this would come from a database
const associados = [
  {
    id: 2,
    email: 'associado@asfus.com.br',
    nome: 'Carlos Associado',
    cpf: '123.456.789-00',
    dataNascimento: '1990-01-15',
    telefone: '(31) 99999-8888',
    dependentes: [
      { id: 10, nome: 'Filho do Carlos', parentesco: 'Filho(a)', dataNascimento: '2015-05-20' }
    ]
  }
];

export const getAllAssociados = (req, res) => {
  try {
    res.json(associados);
  } catch (error) {
    console.error('Erro ao buscar associados:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const getAssociado = (req, res) => {
  try {
    const { id } = req.params;
    const associado = associados.find(a => a.id === parseInt(id));
    
    if (!associado) {
      return res.status(404).json({ message: 'Associado não encontrado.' });
    }
    
    res.json(associado);
  } catch (error) {
    console.error('Erro ao buscar associado:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const getDependentes = (req, res) => {
  try {
    const { id } = req.params;
    const associado = associados.find(a => a.id === parseInt(id));

    if (!associado) {
      return res.status(404).json({ message: 'Associado não encontrado.' });
    }

    res.json(associado.dependentes);
  } catch (error) {
    console.error('Erro ao buscar dependentes:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const addDependente = (req, res) => {
  try {
    const { id } = req.params;
    const { nome, dataNascimento, parentesco } = req.body;
    
    const associado = associados.find(a => a.id === parseInt(id));
    if (!associado) {
      return res.status(404).json({ message: 'Associado não encontrado.' });
    }
    
    const newDependente = {
      id: Date.now(), // Simple ID generation
      nome,
      dataNascimento,
      parentesco
    };
    
    associado.dependentes.push(newDependente);
    res.status(201).json(newDependente);
  } catch (error) {
    console.error('Erro ao adicionar dependente:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const updateDependente = (req, res) => {
  try {
    const { id, dependenteId } = req.params;
    const { nome, dataNascimento, parentesco } = req.body;

    const associado = associados.find(a => a.id === parseInt(id));
    if (!associado) {
      return res.status(404).json({ message: 'Associado não encontrado.' });
    }

    const dependente = associado.dependentes.find(d => d.id === parseInt(dependenteId));
    if (!dependente) {
      return res.status(404).json({ message: 'Dependente não encontrado.' });
    }

    dependente.nome = nome || dependente.nome;
    dependente.dataNascimento = dataNascimento || dependente.dataNascimento;
    dependente.parentesco = parentesco || dependente.parentesco;

    res.json(dependente);
  } catch (error) {
    console.error('Erro ao atualizar dependente:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const removeDependente = (req, res) => {
  try {
    const { id, dependenteId } = req.params;
    
    const associado = associados.find(a => a.id === parseInt(id));
    if (!associado) {
      return res.status(404).json({ message: 'Associado não encontrado.' });
    }
    
    const dependenteIndex = associado.dependentes.findIndex(d => d.id === parseInt(dependenteId));
    if (dependenteIndex === -1) {
      return res.status(404).json({ message: 'Dependente não encontrado.' });
    }
    
    associado.dependentes.splice(dependenteIndex, 1);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao remover dependente:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const createAssociado = (req, res) => {
  try {
    const { nome, email, cpf, telefone } = req.body;
    const newAssociado = {
      id: Date.now(), // Simple ID generation
      nome,
      email,
      cpf,
      telefone,
      dependentes: []
    };
    associados.push(newAssociado);
    res.status(201).json(newAssociado);
  } catch (error) {
    console.error('Erro ao criar associado:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const updateAssociado = (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, cpf, telefone } = req.body;
    const associado = associados.find(a => a.id === parseInt(id));
    if (!associado) {
      return res.status(404).json({ message: 'Associado não encontrado.' });
    }
    associado.nome = nome || associado.nome;
    associado.email = email || associado.email;
    associado.cpf = cpf || associado.cpf;
    associado.telefone = telefone || associado.telefone;
    res.json(associado);
  } catch (error) {
    console.error('Erro ao atualizar associado:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const deleteAssociado = (req, res) => {
  try {
    const { id } = req.params;
    const index = associados.findIndex(a => a.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ message: 'Associado não encontrado.' });
    }
    associados.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar associado:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};