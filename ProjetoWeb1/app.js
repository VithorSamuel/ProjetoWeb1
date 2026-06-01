const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

app.use(express.json());

const cadastroRoutes = require('./src/backend/routes/cadastroRoutes');
app.use(express.urlencoded({extended: true}));
app.use(cadastroRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
});

app.get('/cadastro.html', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'cadastro.html'))
});

app.get('/main.html', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'main.html'))
});


app.listen(PORT, () =>{

    console.log(`rodando na ${PORT}`);

});