import { Request,  Response} from 'express'

import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'
import OrphanageView from '../views/orphanage_views'
import * as Yup from 'yup'


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
            
            const requestImages = req.files as Express.Multer.File[]
            const images = requestImages.map(image => {
                return { path: image.filename }
            })

            const data = {
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_wekeends,
                images
            }

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                latitude: Yup.number().required(),
                about: Yup.string().required().max(300),
                instructions: Yup.string().required(),
                opening_hours: Yup.string().required(),
                open_on_wekeends: Yup.boolean().required(),
                images: Yup.array(
                    Yup.object().shape({
                        path: Yup.string().required()
                    })
                )

            })
            
            await schema.validate(data, {
                abortEarly: false
            })

            const orphanage = orphanagesRepository.create(data)
            
            await orphanagesRepository.save(orphanage)
        
        
          return res.status(201).json(orphanage)
      
        
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


