// backend/controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'your-secret-key-change-in-production';

const users = [
  { 
    id: 1, 
    email: 'admin@asfus.com.br', 
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // 'adminpassword' hashed
    role: 'admin', 
    nome: 'Admin Mestre' 
  },
  { 
    id: 2, 
    email: 'associado@asfus.com.br', 
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // 'associadopassword' hashed
    role: 'associado', 
    nome: 'Carlos Associado', 
    cpf: '123.456.789-00', 
    dataNascimento: '1990-01-15', 
    telefone: '(31) 99999-8888', 
    dependentes: [{ id: 10, nome: 'Filho do Carlos', parentesco: 'Filho(a)', dataNascimento: '2015-05-20' }] 
  }
];
let nextUserId = 3;

const generateToken = (user) => {
  const payload = { 
    id: user.id, 
    nome: user.nome, 
    isAdmin: user.role === 'admin',
    role: user.role
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.role === 'associado');
    
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha de associado inválidos.' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Email ou senha de associado inválidos.' });
    }
    
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.role === 'admin');
    
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha de administrador inválidos.' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Email ou senha de administrador inválidos.' });
    }
    
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error('Erro no login de admin:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const register = async (req, res) => {
  try {
    const { nome, email, senha, cpf, dataNascimento, telefone, dependentes } = req.body;
    
    const existingUser = users.find(u => u.email === email || u.cpf === cpf);
    if (existingUser) {
      return res.status(400).json({ message: 'Email ou CPF já cadastrado.' });
    }
    
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = { 
      id: nextUserId++, 
      email, 
      password: hashedPassword, 
      role: 'associado', 
      nome, 
      cpf, 
      dataNascimento, 
      telefone, 
      dependentes: dependentes || [] 
    };
    
    users.push(newUser);
    res.status(201).json({ message: 'Pré-cadastro realizado com sucesso! Aguarde aprovação.' });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const getPendingUsers = (req, res) => {
  try {
    // Mock data for pending users
    const pendingUsers = [
      {
        id: 3,
        nome: 'João Silva',
        email: 'joao@example.com',
        cpf: '987.654.321-00',
        dataNascimento: '1985-03-20',
        telefone: '(31) 88888-7777'
      }
    ];
    
    res.json(pendingUsers);
  } catch (error) {
    console.error('Erro ao buscar usuários pendentes:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const approveUser = (req, res) => {
  try {
    const { userId: _userId } = req.params; // Prefix with _ to indicate intentionally unused
    const { approve } = req.body;
    
    // In a real app, this would update the user status in the database
    if (approve) {
      res.json({ message: 'Usuário aprovado com sucesso!' });
    } else {
      res.json({ message: 'Usuário rejeitado.' });
    }
  } catch (error) {
    console.error('Erro ao processar aprovação:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};