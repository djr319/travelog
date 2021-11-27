import Express from 'express';

const app = Express();
const PORT = 5000;

// const router = require("./router");
// const cors = require('cors');

// const db = require('./models/db')

// app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is working')
})

// app.use(router);

// (async function () {
//   try {
// await db;
app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}  🚀`)
})
//   } catch (error) { console.error(error); }
// })()

