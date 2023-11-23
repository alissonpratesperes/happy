import React from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapIcon from "../utils/mapIcon";
import "../styles/pages/orphanages-map.css";
import mapMarkerImg from "../assets/images/map-marker.svg";

    function OrphanagesMap() {
        return (
            <div id="page-map">
                <aside>
                    <header>
                        <img src={ mapMarkerImg } alt="Happy"/>
                            <h2> Escolha um orfanato no mapa </h2>
                                <p> Muitas crianças estão esperando a sua visita :) </p>
                    </header>
                        <footer>
                            <strong> São Marcos </strong>
                                <span> Rio Grande do Sul </span>
                        </footer>
                </aside>
                    <Map center={[ -28.9669647, -51.0436304 ]} zoom={ 15 } style={{ width: '100%', height: '100%' }}>
                        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                            <Marker icon={ mapIcon } position={[ -28.9669647, -51.0436304 ]}>
                                <Popup closeButton={ false } minWidth={ 240 } maxWidth={ 240 } className="map-popup">
                                    São Marquinhos
                                        <Link to="/orphanages/1">
                                            <FiArrowRight size={ 20 } color="#FFFFFF"/>  
                                        </Link>
                                </Popup>
                            </Marker>
                    </Map>
                        <Link to="/orphanages/create" className="create-orphanage">
                            <FiPlus size={ 32 } color="#FFFFFF"/>
                        </Link>
            </div>
        );
    };

        export default OrphanagesMap;