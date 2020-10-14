import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'


import '../styles/global.css'
import '../styles/pages/orphanage-map.css'

import mapMarkerImg from '../images/images.svg'

import 'leaflet/dist/leaflet.css'


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
            </Map>

        <Link to="" className="create-orphanage">
            <FiPlus size={32} color="#FFF"/>
        </Link>

        </div>
    )
    
}

export default OrphanagesMap
