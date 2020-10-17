import { Request, response, Response} from 'express'

import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'


export default {
    async create(req:Request,res:Response){
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_wekeends
        } = req.body
    
        const orphanagesRepository = getRepository(Orphanage)
    
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_wekeends
        })
        
        await orphanagesRepository.save(orphanage)
    
    
      return res.status(201).json(orphanage)
    },

    async index(req:Request, res:Response){
        const orphanageRepository = getRepository(Orphanage)

        const orphanages = await orphanageRepository.find()

        return res.json(orphanages)
        
    },

    async show (req: Request, res: Response){
      
        const { id } = req.params
        
        const orphanageRepository = getRepository(Orphanage)

       const orphanage =  await orphanageRepository.findOneOrFail(id) 
       
       return res.json(orphanage)
    }
}

