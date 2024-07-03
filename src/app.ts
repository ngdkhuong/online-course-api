// nén dữ liệu trước khi gửi cho client
import compression from 'compression';
import express, { Application } from 'express';

class App {
    public app: Application;
    public port: string | number;
    public allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];

    constructor() {
        this.app = express();
        // this.port = PORT || 3000;
    }

    public listen() {
        this.app.listen(this.port);
    }

    public getServer() {
        return this.app;
    }
}

export default App;
