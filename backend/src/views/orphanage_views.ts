import Orphanage from '../models/Orphanage'
import imagesView from './image_views'


export default {
    render(orphanage: Orphanage){
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_wekeends: orphanage.open_on_wekeends,
            images: imagesView.renderMany(orphanage.images)
        }
    },

    renderMany(orphanages: Orphanage[]){
        return orphanages.map(orphanage => this.render(orphanage))
    }
        
}
