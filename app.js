const express = require('express');
const app = express();
const porta = 3000;
const bodyParser = require('body-parser');

//Configurar os arquivos ejs
app.set('view engine', 'ejs');
app.set('view', __dirname + '/views');


//configurar os arquivos da pasta public
app.use(express.static('/public'));

//configurar o body para processar os dados do forms
app.use(bodyParser.urlencoded({ extends: true }));

//dados para teste
const posts = [
    {
        id: 1,
        titulo: 'Título do post 1',
        conteudo: 'Conteudo do post 1',
    }, 
    {
        id: 2,
        titulo: 'Título do post 2',
        conteudo: 'Conteudo do post 2',
    }
]

//rota a principal
app.get('/', (req, res) => {
    res.render('index', {posts: posts});
});

//rota para exibir o um post individual
app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    const post = posts.find(post => post.id === parseInt(id));
    res.render('post', {post: post});
});

//rota de adicionar
app.get('/add', (req, res) => {
    res.render('add');
});


//rota para processar os dados do formulario de adiçao
app.post('/add', (req, res) => {
    const { titulo, conteudo } = req.body;
    const post = posts.length + 1;
    posts.push({ id,titulo, conteudo});
    res.redirect('/');
});


//subir o servidor
app.listen(3000, () => {
    console.log(`Servidor rodando no http://localhost:${port}`);
});