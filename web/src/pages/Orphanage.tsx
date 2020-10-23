import React, {useState, useEffect} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom'

import Sidebar from '../components/sidebar'

import '../styles/pages/orphanage.css';
import api from '../services/api'

import mapIcon from '../utils/mapIcon'

interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  openin_hours: string;
  open_on_wekeends: boolean;
  images: Array<{
    url: string;
  }>
}

interface OrphanageParams {
  id: string;
}


export default function Orphanage() {
  const params  = useParams<OrphanageParams>() 
  const [orphanage, setOrphanage] = useState<Orphanage>()
  
  console.log(orphanage)
  useEffect(()=>{
    api.get(`/orphanages/${params.id}`)
    .then( response => {
      setOrphanage(response.data)
    })
   .catch((error)=> console.log('Ocorreu um erro na requisição', error))
    
    },[params.id])
 
  
  if (!Orphanage){
    return <p>Carregando...</p>
  }

  console.log(orphanage)
  return (
    <div id="page-orphanage">
     <Sidebar/>

      <main>
        <div className="orphanage-details">
          <img src={orphanage?.images[0].url} alt={`Foto de ${orphanage?.name}`}/>

          <div className="images">
            <button className="active" type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage?.name}</h1>
            <p>{orphanage?.about}</p>

            <div className="map-container">
             {/*  <Map 
                center={[orphanage?.latitude, orphanage?.longitude]}
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage?.latitude, orphanage?.longitude]} />
              </Map> */}

              <footer>
                <a href="">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>Venha como se sentir mais à vontade e traga muito amor para dar.</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                8h às 18h
              </div>
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}