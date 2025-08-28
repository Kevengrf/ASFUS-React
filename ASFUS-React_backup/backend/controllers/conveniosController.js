// backend/controllers/conveniosController.js

let convenios = [
    { id: 1, name: 'Unimed', category: 'Saúde', benefit: '30% de desconto em planos', logoUrl: 'url_logo_unimed' },
    { id: 2, name: 'CNA', category: 'Educação', benefit: '50% de desconto na matrícula', logoUrl: 'url_logo_cna' }
];
let nextId = 3;

export const getAllConvenios = (req, res) => {
    res.status(200).json(convenios);
};

export const createConvenio = (req, res) => {
    const { name, category, benefit, logoUrl } = req.body;
    const newConvenio = { id: nextId++, name, category, benefit, logoUrl };
    convenios.push(newConvenio);
    res.status(201).json(newConvenio);
};

export const updateConvenio = (req, res) => {
    const { id } = req.params;
    const { name, category, benefit, logoUrl } = req.body;
    const index = convenios.findIndex(c => c.id == id);
    if (index === -1) return res.status(404).json({ message: 'Convênio não encontrado.' });
    convenios[index] = { ...convenios[index], name, category, benefit, logoUrl };
    res.status(200).json(convenios[index]);
};

export const deleteConvenio = (req, res) => {
    const { id } = req.params;
    convenios = convenios.filter(c => c.id != id);
    res.status(204).send();
};