// backend/controllers/announcementsController.js

// Mock data for announcements
let announcements = [
  {
    id: 1,
    title: 'Manutenção da Piscina',
    content: 'A piscina estará em manutenção nos dias 15 e 16 de agosto.',
    priority: 'high',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Festa de Aniversário da ASFUS',
    content: 'Comemore conosco o aniversário da associação no próximo sábado!',
    priority: 'normal',
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

export const getAnnouncements = (req, res) => {
  try {
    res.json(announcements);
  } catch (error) {
    console.error('Erro ao buscar anúncios:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const addAnnouncement = (req, res) => {
  try {
    const { title, content, priority } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Título e conteúdo são obrigatórios.' });
    }
    
    const newAnnouncement = {
      id: nextId++,
      title,
      content,
      priority: priority || 'normal',
      createdAt: new Date().toISOString()
    };
    
    announcements.push(newAnnouncement);
    res.status(201).json(newAnnouncement);
  } catch (error) {
    console.error('Erro ao adicionar anúncio:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const updateAnnouncement = (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, priority } = req.body;
    
    const announcementIndex = announcements.findIndex(a => a.id === parseInt(id));
    if (announcementIndex === -1) {
      return res.status(404).json({ message: 'Anúncio não encontrado.' });
    }
    
    announcements[announcementIndex] = {
      ...announcements[announcementIndex],
      title: title || announcements[announcementIndex].title,
      content: content || announcements[announcementIndex].content,
      priority: priority || announcements[announcementIndex].priority
    };
    
    res.json(announcements[announcementIndex]);
  } catch (error) {
    console.error('Erro ao atualizar anúncio:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const deleteAnnouncement = (req, res) => {
  try {
    const { id } = req.params;
    
    const announcementIndex = announcements.findIndex(a => a.id === parseInt(id));
    if (announcementIndex === -1) {
      return res.status(404).json({ message: 'Anúncio não encontrado.' });
    }
    
    announcements.splice(announcementIndex, 1);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir anúncio:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
