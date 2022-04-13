import express from 'express';
import db from './config/db.js';
import livros from './models/Livro.js'

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => console.log('Conexão com mongodb está ativa!'));

const app = express();

app.use(express.json());

/*const livros = [
    {id: 1, titulo: 'Senhor dos Aneis'},
    {id: 2, titulo: 'O Hobbit'}
];*/

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
});

app.get('/livros', (req, res) => {
    livros.find((err, livros) => {
        if (err) console.log(err);
        else res.status(200).json(livros);
    });
});

app.get('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});

app.post('/livros', (req, res) => {
    const body = req.body;
    livros.push(body)
    res.status(201).json(body);
});

app.put('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(204).end();
});

app.delete('/livros/:id', (req, res) => {
    const {id} = req.params;
    const index = buscaLivro(id);
    livros.splice(index, 1);
    res.status(204).end();
});

function buscaLivro(id) {
    return livros.findIndex(livro => livro.id == id);
}

export default app;