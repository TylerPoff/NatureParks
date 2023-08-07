import express from 'express';
import cors from 'cors';
import parks from './api/parks.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', parks);
app.use('*', (req, res) => {
    res.status(404).json({error: 'not found'});
});

export default app;