import { Request, Response, query } from 'express';

import pool from '../database';


class EmpresasController {

    public async list(req: Request,res: Response){
        const empresas = await pool.query('SELECT * FROM dir_empresa order by razonSocial DESC');
        res.json(empresas);
    }

    public async getEmpresa(req: Request,res: Response):Promise<any>{
        const { id } = req.params;
        const empresa = await pool.query('SELECT * FROM dir_empresa where id = ?', [id]);
         if(empresa.length > 0){
              return res.json(empresa[0]);
         }
         res.status(404).json({ message : 'La empresa no existe'});
    }
    //crear una empresa
     public async create(req: Request,res: Response): Promise<void>{
        await pool.query('INSERT INTO dir_empresa set ?', [req.body]);
        res.json({
            message : 'Empresa Guardada'
        });
    }
    //eliminar una empresa
    public async delete(req: Request,res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM dir_empresa WHERE id = ?',[id]);
        res.json({ message : 'Empresa fue eliminado'});
    }

    //actualizar una empresa
    public async update(req: Request,res: Response):Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE dir_empresa set id = ?',[req.body, id]);
        res.json({ message : 'Empresa fue actualizado'});
    }
}

export const empresasController = new EmpresasController();