import { FaWhatsapp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import { FiClock, FiInfo, FiNavigation } from "react-icons/fi";

import api from "../services/api";
import mapIcon from "../utils/mapIcon";
import Sidebar from "../components/Sidebar";
import "../styles/pages/show-orphanage.css";
import Orphanage from "../interfaces/Orphanage";

    export default function ShowOrphanage() {
        const params = useParams<{ id: string; }>();
        const [ orphanage, setOrphanage ] = useState<Orphanage>(); 
        const [ activeImageIndex, setActiveImageIndex ] = useState(0);

            useEffect(() => { api.get(`orphanages/${ params.id }`).then(response => { setOrphanage(response.data); }); }, [ params.id ]);

                if(!orphanage) {
                    return (
                        <p> Carregando... </p>
                    );
                };

                    return (
                        <div id="page-orphanage">
                            <Sidebar/>
                                <main>
                                    <div className="orphanage-details">
                                        <img src={ orphanage.images[ activeImageIndex ].url } alt={ orphanage.name }/>
                                            <div className="images">
                                                { orphanage.images.map((image, index) => {
                                                    return (
                                                        <button key={ image.id } className={ activeImageIndex === index ? 'active' : '' } type="button" onClick={ () => { setActiveImageIndex(index) } }>
                                                            <img src={ image.url } alt={ orphanage.name }/>
                                                        </button>
                                                    );
                                                }) }
                                            </div>
                                            <div className="orphanage-details-content">
                                                <h1> { orphanage.name } </h1>
                                                    <p> { orphanage.about } </p>
                                                        <div className="map-container">
                                                            <Map center={[ orphanage.latitude, orphanage.longitude ]} zoom={ 16 } style={{ width: '100%', height: 280 }} dragging={ false } touchZoom={ false } zoomControl={ false } scrollWheelZoom={ false } doubleClickZoom={ false }>
                                                                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                                                    <Marker interactive={ false } icon={ mapIcon } position={[ orphanage.latitude, orphanage.longitude ]} />
                                                            </Map>
                                                                <footer>
                                                                    <a href={ `https://www.google.com/maps/dir/?api=1&destination=${ orphanage.latitude },${ orphanage.longitude }` } target="_blank" rel="noopener noreferrer">
                                                                        <FiNavigation size={ 24 }/>
                                                                            Ver rotas no Google Maps
                                                                    </a>
                                                                </footer>
                                                        </div>
                                                            <hr/>
                                                                <h2> Instruções para visita </h2>
                                                    <p> { orphanage.instructions } </p>
                                                        <div className="open-details">
                                                            <div className="hour">
                                                                <FiClock size={ 32 } color="#15B6D6"/>
                                                                    Segunda a Sexta <br/> { orphanage.opening_hours }
                                                            </div>
                                                                { orphanage.open_on_weekends ? (
                                                                    <div className="open-on-weekends">
                                                                        <FiInfo size={ 32 } color="#39CC83"/>
                                                                            Atendemos <br/> fim de semana
                                                                    </div>
                                                                ) : (
                                                                    <div className="open-on-weekends dont-open">
                                                                        <FiInfo size={ 32 } color="#FF669D"/>
                                                                            Não atendemos <br/> fim de semana
                                                                    </div>
                                                                ) }
                                                        </div>
                                            </div>
                                    </div>
                                </main>
                        </div>
                    );
    };