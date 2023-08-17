const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mainRoutes = require('./routes/mainRoutes');

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3100;

app.use('/api', mainRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});