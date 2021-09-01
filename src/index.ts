import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import empresasRoutes from './routes/empresasRoutes';
import departamentosRoutes from './routes/departamentosRoutes';
import planesRoutes from './routes/planesRoutes';
import solicitudesRoutes from './routes/solicitudesRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import authRoutes from './routes/authRoutes';
import nivelesRoutes from './routes/nivelesRoutes';

class Server {
    public app : Application;
    
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
      this.app.set('port', process.env.PORT || 3000);
      this.app.use(morgan('dev')); //ver peticiones de clientes
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true}));
    }
    
    routes(): void{
       this.app.use('/',indexRoutes);
       this.app.use('/api/empresas',empresasRoutes);
       this.app.use('/api/niveles',nivelesRoutes);
       this.app.use('/api/departamentos',departamentosRoutes);
       this.app.use('/api/planes',planesRoutes);
       this.app.use('/api/solicitudes',solicitudesRoutes);
       this.app.use('/api/usuarios',usuariosRoutes);
       this.app.use('/api/auth',authRoutes);
    }

    start ():void{
        this.app.listen(this.app.get('port'), () =>{
            console.log("Servidor desde " + this.app.get('port'));
        });
    }


}

const server = new Server();
server.start();