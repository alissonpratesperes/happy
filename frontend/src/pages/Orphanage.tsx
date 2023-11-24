import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Map, TileLayer, Marker } from "react-leaflet";
import { FiClock, FiInfo, FiNavigation } from "react-icons/fi";

import "../styles/pages/orphanage.css";
import mapIcon from "../utils/mapIcon";
import Sidebar from "../components/Sidebar";

    export default function Orphanage() {
        return (
            <div id="page-orphanage">
                <Sidebar/>
                    <main>
                        <div className="orphanage-details">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg" alt="Lar das meninas"/>
                                <div className="images">
                                    <button className="active" type="button">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg" alt="Lar das meninas"/>
                                    </button>
                                    <button type="button">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg" alt="Lar das meninas"/>
                                    </button>
                                    <button type="button">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg" alt="Lar das meninas"/>
                                    </button>
                                    <button type="button">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg" alt="Lar das meninas"/>
                                    </button>
                                    <button type="button">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg" alt="Lar das meninas"/>
                                    </button>
                                    <button type="button">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg" alt="Lar das meninas"/>
                                    </button>
                                </div>
                                <div className="orphanage-details-content">
                                    <h1> Lar das meninas </h1>
                                        <p> Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social. </p>
                                            <div className="map-container">
                                                <Map center={[ -28.9669647, -51.0436304 ]} zoom={ 16 } style={{ width: '100%', height: 280 }} dragging={ false } touchZoom={ false } zoomControl={ false } scrollWheelZoom={ false } doubleClickZoom={ false }>
                                                    <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                                        <Marker interactive={ false } icon={ mapIcon } position={[ -28.9669647, -51.0436304 ]} />
                                                </Map>
                                                    <footer>
                                                        <a href="">
                                                            <FiNavigation size={ 24 }/>
                                                                Ver rotas no Google Maps
                                                        </a>
                                                    </footer>
                                            </div>
                                                <hr/>
                                                    <h2> Instruções para visita </h2>
                                        <p> Venha como se sentir mais à vontade e traga muito amor para dar. </p>
                                            <div className="open-details">
                                                <div className="hour">
                                                    <FiClock size={ 32 } color="#15B6D6"/>
                                                        Segunda à Sexta <br/>
                                                        8h às 18h
                                                </div>
                                                <div className="open-on-weekends">
                                                    <FiInfo size={ 32 } color="#39CC83"/>
                                                        Atendemos <br/>
                                                        fim de semana
                                                </div>
                                            </div>
                                                <button type="button" className="contact-button">
                                                    <FaWhatsapp size={ 24 } color="#FFFFFF"/>
                                                        Entrar em contato
                                                </button>
                                </div>
                        </div>
                    </main>
            </div>
        );
    };