// backend/server.js
import express from 'express';
import cors from 'cors';

// Importa as rotas com a nova sintaxe
import authRoutes from './routes/auth.js';
import newsRoutes from './routes/news.js';
import conveniosRoutes from './routes/convenios.js';
import eventsRoutes from './routes/events.js';
import photoRoutes from './routes/photos.js';
import associadosRoutes from './routes/associados.js';
import adminRoutes from './routes/admin.js';
import announcementsRoutes from './routes/announcements.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Integração das Rotas
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/convenios', conveniosRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/associados', associadosRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/announcements', announcementsRoutes);

app.get('/', (req, res) => {
  res.send('API do projeto ASFUS está no ar!');
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});