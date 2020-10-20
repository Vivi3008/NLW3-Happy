import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight} from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'


import '../styles/global.css'
import '../styles/pages/orphanage-map.css'

import mapMarkerImg from '../images/images.svg'

import 'leaflet/dist/leaflet.css'

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [170, 2]
})

function OrphanagesMap(){
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão
                    esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Goiânia</strong>
                    <span>Goiás</span>
                </footer>
            </aside>

            <Map
                center={[-16.6638757,-49.334863,]}
                zoom={15}
                style={{ width: '100%', height :'100%'}}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

            <Marker 
              icon = {mapIcon}
              position = {[-16.6638757,-49.334863,]}
            >
               <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                   Lar das meninas
                   <Link to="/orphanage/1">
                       <FiArrowRight size={32} color="#FFF"/>
                   </Link>
                </Popup> 
            </Marker>
            
            </Map>

        <Link to="/orphanage/create" className="create-orphanage">
            <FiPlus size={32} color="#FFF"/>
        </Link>

        </div>
    )
    
}

export default OrphanagesMap
