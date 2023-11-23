import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import "../styles/components/sidebar.css";
import mapMarkerImg from "../assets/images/map-marker.svg";

    export default function Sidebar() {
        const navigate = useNavigate();

            function goBack() {
                navigate("/app");
            };

                return (
                    <aside className="app-sidebar">
                        <img src={ mapMarkerImg } alt="Happy"/>
                            <footer>
                                <button type="button" onClick={ goBack }>
                                    <FiArrowLeft size={ 24 } color="#FFFFFF"/>
                                </button>
                            </footer>
                    </aside>
                );
    };