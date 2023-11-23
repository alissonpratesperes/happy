import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";

import mapMarkerImg from "../assets/images/map-marker.svg";
import "../styles/pages/orphanages-map.css";
import "leaflet/dist/leaflet.css";

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
                    <MapContainer center={[ -28.9669647, -51.0436304 ]} zoom={ 15 } style={{ width: '100%', height: '100%' }}>
                        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    </MapContainer>
                        <Link to="" className="create-orphanage">
                            <FiPlus size={ 32 } color="#FFFFFF"/>
                        </Link>
            </div>
        );
    };

        export default OrphanagesMap;