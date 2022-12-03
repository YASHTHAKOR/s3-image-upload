import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import {getSignedUrl} from './aws';

const index: Application = express()
const port = 3000;


index.use(cors())
index.use(express.json());
index.use(express.urlencoded({ extended: true }));

index.post('/image/s3/upload', async (req: Request, res: Response) => {
    try {
        const url = await getSignedUrl(req.body.key, req.body.path);
        res.send(url);
    } catch (Err) {
        res.status(500).send(Err);
    }
})

index.get('/health', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({message: `Wallet service up and running`})
})


try {
    index.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
} catch (error: any) {
    console.log(`Error occurred: ${error.message}`)
}