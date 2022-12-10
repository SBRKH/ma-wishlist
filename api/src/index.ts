import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { connect } from './database/database';
import { AuthController } from './controller/AuthController';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/auth', AuthController);

connect();

app.get('/', (req, res) => {
	res.send("Hello");
});

app.listen(3001, () => console.log('Listening on port 3001'));