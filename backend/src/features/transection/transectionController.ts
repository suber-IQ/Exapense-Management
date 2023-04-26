import moment from 'moment'
import { Request,Response } from "express";
import { TransectionModel } from "./transectionModel";
import { Transection } from "./transectionInterface";

class TransectionController{
    public async getAllTransection(req: Request, res: Response): Promise<void>{
        try {
            const { frequency,type } = req.body;
            
            const transections = await TransectionModel.find({
                userid: req.body.userid,
                date: {
                    $gt: moment().subtract(Number(frequency), 'd').toISOString()
                },
                ...(type !== "all" && { type }),
            });                
            res.status(200).json(transections);
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
            
        }
         
    }
    public async addTransection(req: Request, res: Response): Promise<void>{
        try {
            const newTransection = new TransectionModel<Transection>(req.body);
            await newTransection.save();
            res.status(201).send('Transection Created');
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            return;
        }
    }
}


export {TransectionController};