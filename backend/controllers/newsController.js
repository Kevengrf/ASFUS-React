// backend/controllers/newsController.js

let news = [
  { id: 1, title: 'Abertura de Novas Turmas', content: 'Novas turmas para os cursos de verão estão abertas.', createdAt: new Date() },
  { id: 2, title: 'Festa de Fim de Ano', content: 'Nossa festa de fim de ano será no dia 20 de Dezembro.', createdAt: new Date() }
];
let nextId = 3;

export const getAllNews = (req, res) => {
  res.status(200).json(news);
};

export const createNews = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Título e conteúdo são obrigatórios.' });
  }
  const newNotice = { id: nextId++, title, content, createdAt: new Date() };
  news.push(newNotice);
  res.status(201).json(newNotice);
};

export const updateNews = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const noticeIndex = news.findIndex(n => n.id == id);
  if (noticeIndex === -1) {
    return res.status(404).json({ message: 'Notícia não encontrada.' });
  }
  news[noticeIndex] = { ...news[noticeIndex], title, content };
  res.status(200).json(news[noticeIndex]);
};

export const deleteNews = (req, res) => {
  const { id } = req.params;
  const noticeIndex = news.findIndex(n => n.id == id);
  if (noticeIndex === -1) {
    return res.status(404).json({ message: 'Notícia não encontrada.' });
  }
  news = news.filter(n => n.id != id);
  res.status(204).send();
};