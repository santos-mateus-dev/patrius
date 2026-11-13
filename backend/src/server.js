
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./database/connection');

const app = express();

app.use(cors());
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API Gestão de Patrimônio funcionando!'
    });
});

// Verificação da API e do banco
app.get('/api/health', async (req, res) => {
    try {
        await sequelize.authenticate();

        res.status(200).json({
            status: 'OK',
            api: 'Funcionando',
            banco: 'Conectado'
        });

    } catch (error) {
        console.error('Erro ao verificar banco:', error.message);

        res.status(500).json({
            status: 'ERRO',
            banco: 'Indisponível'
        });
    }
});

// Inicialização
const PORT = process.env.PORT || 3001;

async function iniciarServidor() {
    try {
        await sequelize.authenticate();

        console.log('Banco de dados conectado!');

        app.listen(PORT, () => {
            console.log(`Servidor executando na porta ${PORT}`);
        });

    } catch (error) {
        console.error('Erro ao conectar ao banco:', error.message);
        process.exit(1);
    }
}

iniciarServidor();
