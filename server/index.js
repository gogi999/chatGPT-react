import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import {
  Configuration,
  OpenAIApi,
} from 'openai';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
    organization: process.env.ORGANIZATION,
    apiKey: process.env.API_KEY
});
const openai = new OpenAIApi(configuration);

app.listen('3080', () => console.log('Listening on port 3080...'));

app.get('/', (req, res) => {
    res.send('Hi there!');
});

app.post('/', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${message}`,
            max_tokens: 100,
            temperature: .5,
        });

        res.status(201).json({ message: response.data.choices[0].text });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});
