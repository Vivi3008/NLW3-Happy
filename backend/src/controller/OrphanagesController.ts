import { Request,  Response} from 'express'

import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'
import OrphanageView from '../views/orphanage_views'


export default {
    async create(req:Request,res:Response){
        try {
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
            
            const requestImages = req.files as Express.Multer.File[]
            const images = requestImages.map(image => {
                return { path: image.filename}
            })

            const orphanage = orphanagesRepository.create({
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_wekeends,
                images
            })
            
            await orphanagesRepository.save(orphanage)
        
        
          return res.status(201).json(orphanage)
        } catch (error) {
            return res.status(400).send(`Erro no cadastro: ${error}`)
        }
        
    },

    async index(req:Request, res:Response){
        const orphanageRepository = getRepository(Orphanage)

        const orphanages = await orphanageRepository.find({
            relations: ['images']
        })

        return res.json(OrphanageView.renderMany(orphanages))
        
    },

    async show (req: Request, res: Response){
      
        const { id } = req.params
        
        const orphanageRepository = getRepository(Orphanage)

        try {
            const orphanage =  await orphanageRepository.findOneOrFail(id, {
                relations : ['images']
            }) 
       
            return res.json(OrphanageView.render(orphanage))
            
        } catch (error) {
            return res.send(`ID inexistente! Erro: ${error}`)
        }
       
    }
}


