import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import api from "../services/api";
import mapIcon from "../utils/mapIcon";
import "../styles/pages/orphanages-map.css";
import Orphanage from "../interfaces/Orphanage";
import mapMarkerImg from "../assets/images/map-marker.svg";

    function OrphanagesMap() {
        const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0, 0]);
        const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);

            useEffect(() => { navigator.geolocation.getCurrentPosition(position => { const { latitude, longitude } = position.coords; setInitialPosition([ latitude, longitude ]); }); }, []);
            useEffect(() => { api.get("/orphanages").then(response => { setOrphanages(response.data); }); }, []);

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
                            <Map center={ initialPosition } zoom={ 15 } style={{ width: '100%', height: '100%' }}>
                                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                    { orphanages.map(orphanage => {
                                        return (
                                            <Marker icon={ mapIcon } position={[ orphanage.latitude, orphanage.longitude ]} key={ orphanage.id }>
                                                <Popup closeButton={ false } minWidth={ 240 } maxWidth={ 240 } className="map-popup">
                                                    { orphanage.name }
                                                        <Link to={ `/orphanages/${ orphanage.id }` }>
                                                            <FiArrowRight size={ 24 } color="#FFFFFF"/>  
                                                        </Link>
                                                </Popup>
                                            </Marker>
                                        );
                                    }) }
                            </Map>
                                <Link to="/orphanages/create" className="create-orphanage">
                                    <FiPlus size={ 32 } color="#FFFFFF"/>
                                </Link>
                    </div>
                );
    };

        export default OrphanagesMap;