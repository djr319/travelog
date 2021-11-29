import express, { Application } from 'express';
import cors from 'cors';
import router from './router';

const app: Application = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use(router);

(async function (): Promise<void> {
  try {
    app.listen(PORT, (): void => {
      console.log(`Server is UP at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();

