const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/getAddress/:cep', async (req, res) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${req.params.cep}/json/`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter o endereço.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});