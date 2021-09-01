import { Request, Response, query } from 'express';

import pool from '../database';


class PlanesController {
     //lista todos los planes
    public async list(req: Request,res: Response){
        const planes = await pool.query('SELECT * FROM tb_plan order by id ASC');
        res.json(planes);
    }
     //trae un plan
    public async getPlan(req: Request,res: Response):Promise<any>{
        const { id } = req.params;
        const plan = await pool.query('SELECT * FROM tb_plan where id = ?', [id]);
         if(plan.length > 0){
              return res.json(plan[0]);
         }
         res.status(404).json({ message : 'El plan no existe'});
    }
    //crear un plan
     public async create(req: Request,res: Response): Promise<void>{
        await pool.query('INSERT INTO tb_plan set ?', [req.body]);
        res.json({
            message : 'Plan Guardado con exito'
        });
    }
    //eliminar un plan
    public async delete(req: Request,res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM tb_plan WHERE id = ?',[id]);
        res.json({ message : 'Plan fue eliminado'});
    }

    //actualizar un plan
    public async update(req: Request,res: Response):Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE tb_plan set id = ?',[req.body, id]);
        res.json({ message : 'plan fue actualizado'});
    }
    //get asignacion d eplanes usuario
    public async getAsignaciones(req: Request,res: Response):Promise<any>{
        const { id } = req.params;  
      
        const estado ='Activo';  
        const planes = await pool.query('SELECT tb_plan.*,tb_asignar_plan.id as idContrato FROM tb_asignar_plan,tb_plan where tb_asignar_plan.idCliente = ? and tb_asignar_plan.estado like ? and tb_plan.id like tb_asignar_plan.idPlan', [id,estado]);
         if(planes.length > 0){
              return res.json(planes);
         }
         return res.json({ 
            message : 'No tiene usuarios asignados al plan',
            idError : 0
      }); 
    }

    //getusuarios asignados a un plan segun identidad y plan
    public async getAsignacionesByPlan(req: Request,res: Response):Promise<any>{
        const { id } = req.params;
        const { idPlan } = req.params;
        const usuariosPlan = await pool.query('SELECT tb_usuario.* FROM tb_asignar_plan,tb_tabla_personas_nivel1,tb_usuario where tb_tabla_personas_nivel1.idAsignacionPlan = ? and tb_tabla_personas_nivel1.idClienteAgrega like ? and tb_tabla_personas_nivel1.idClienteAgregado like tb_usuario.identidad', [idPlan,id]);
        console.log(usuariosPlan);
        if(usuariosPlan.length > 0){
              return res.json(usuariosPlan);
         }
         return res.json({ 
            message : 'No tiene usuarios asignados al plan',
            idError : 0
      }); 
    }
     //getusuarios asignados a un plan segun identidad y plan
     public async getAsignacionesByPlanNivel2(req: Request,res: Response):Promise<any>{
        const { id } = req.params;
        const { idPlan } = req.params;
        const usuariosPlan = await pool.query('SELECT tb_asignar_plan.id as idAsig,tb_usuario.*,tb_tabla_personas_nivel1.idAsignacionPlan'+
        'FROM tb_asignar_plan,tb_tabla_personas_nivel1,tb_usuario'+
        'where tb_tabla_personas_nivel1.idAsignacionPlan = ? and'+ 
        'tb_tabla_personas_nivel1.idClienteAgrega like ? and'+ 
        'tb_tabla_personas_nivel1.idClienteAgregado like tb_usuario.identidad'+
        'and tb_asignar_plan.idCliente like tb_tabla_personas_nivel1.idClienteAgrega', [idPlan,id]);
       
        if(usuariosPlan.length > 0){
              return res.json(
                  {
                    success: 'true',  
                    resul:usuariosPlan,
                  }
              );
         }
         return res.json({ 
            message : 'No tiene usuarios asignados al plan',
            idError : 0
      }); 
    }
}

export const planesController = new PlanesController();