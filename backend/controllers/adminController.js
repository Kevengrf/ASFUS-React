// backend/controllers/adminController.js

// Mock data for pending registrations
let pendingRegistrations = [
  {
    id: 3,
    nome: 'João Silva',
    email: 'joao@example.com',
    cpf: '987.654.321-00',
    dataNascimento: '1985-03-20',
    telefone: '(31) 88888-7777',
    status: 'pending'
  }
];

export const getPreCadastros = (req, res) => {
  try {
    res.json(pendingRegistrations);
  } catch (error) {
    console.error('Erro ao buscar pré-cadastros:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const approvePreCadastro = (req, res) => {
  try {
    const { associadoId, action } = req.params;
    
    const registrationIndex = pendingRegistrations.findIndex(r => r.id === parseInt(associadoId));
    if (registrationIndex === -1) {
      return res.status(404).json({ message: 'Pré-cadastro não encontrado.' });
    }
    
    if (action === 'approve') {
      // In a real app, this would move the user to approved status
      pendingRegistrations.splice(registrationIndex, 1);
      res.json({ message: 'Pré-cadastro aprovado com sucesso!' });
    } else if (action === 'reject') {
      // In a real app, this would mark as rejected
      pendingRegistrations.splice(registrationIndex, 1);
      res.json({ message: 'Pré-cadastro rejeitado.' });
    } else {
      res.status(400).json({ message: 'Ação inválida. Use "approve" ou "reject".' });
    }
  } catch (error) {
    console.error('Erro ao processar pré-cadastro:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
