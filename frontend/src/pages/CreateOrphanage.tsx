import { LeafletMouseEvent } from "leaflet";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiSave } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";

import api from "../services/api";
import mapIcon from "../utils/mapIcon";
import Sidebar from "../components/Sidebar";
import "../styles/pages/create-orphanage.css";

    export default function CreateOrphanage() {
        const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0, 0]);
        const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 });
        const [ name, setName ] = useState("");
        const [ about, setAbout ] = useState("");
        const [ instructions, setInstructions ] = useState("");
        const [ opening_hours, setOpeningHours ] = useState("");
        const [ open_on_weekends, setOpenOnWeekends ] = useState(true);
        const [ images, setImages ] = useState<File[]>([]);
        const [ previewImages, setPreviewImages ] = useState<string[]>([]);
        const navigate = useNavigate();

            useEffect(() => { navigator.geolocation.getCurrentPosition(position => { const { latitude, longitude } = position.coords; setInitialPosition([ latitude, longitude ]); }); }, []);

                function handleMapClick(event: LeafletMouseEvent) {
                    const { lat, lng } = event.latlng;
                        setPosition({ latitude: lat, longitude: lng });
                };
                async function handleSubmit(event: FormEvent) {
                    event.preventDefault();
                        const { latitude, longitude } = position;
                        const data = new FormData();

                            data.append("latitude", String(latitude));
                            data.append("longitude", String(longitude));
                            data.append("name", name);
                            data.append("about", about);
                            data.append("instructions", instructions);
                            data.append("opening_hours", opening_hours);
                            data.append("open_on_weekends", String(open_on_weekends));
                            
                                images.forEach(image => { data.append("images", image); });

                                    await api.post("/orphanages", data);

                                        alert("Cadastro realizado com sucesso!");

                                            navigate("/app");
                };
                function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
                    if(!event.target.files) {
                        return;
                    };
                        const selectedImages = Array.from(event.target.files);
                            setImages(selectedImages);
                        const selectedImagesPreview = selectedImages.map(image => { return URL.createObjectURL(image); });
                            setPreviewImages(selectedImagesPreview);
                };

                    return (
                        <div id="page-create-orphanage">
                            <Sidebar/>
                                <main>
                                    <form className="create-orphanage-form" onSubmit={ handleSubmit }>
                                        <fieldset>
                                            <legend> Dados </legend>
                                                <Map center={ initialPosition } style={{ width: '100%', height: 280 }} zoom={ 15 } onClick={ handleMapClick }>
                                                    <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                                        { position.latitude !== 0 && (
                                                            <Marker interactive={ false } icon={ mapIcon } position={[ position.latitude, position.longitude ]}/>
                                                        ) }
                                                </Map>
                                                    <div className="input-block">
                                                        <label htmlFor="name"> Nome </label>
                                                            <input id="name" value={ name } onChange={ event => setName(event.target.value) }/>
                                                    </div>
                                                    <div className="input-block">
                                                        <label htmlFor="about"> Sobre <span> Máximo de 300 caracteres </span> </label>
                                                            <textarea id="about" maxLength={ 300 } value={ about } onChange={ event => setAbout(event.target.value) }/>
                                                    </div>
                                                    <div className="input-block">
                                                        <label htmlFor="images"> Fotos </label>
                                                            <div className="images-container">
                                                                { previewImages.map(image => {
                                                                    return (
                                                                        <img key={ image } src={ image } alt={ name }/>
                                                                    );
                                                                }) }
                                                                    <label htmlFor="image[]" className="new-image">
                                                                        <FiPlus size={ 24 } color="#15B6D6"/>
                                                                            <input multiple type="file" id="image[]" onChange={ handleSelectImages }/>
                                                                    </label>
                                                            </div>
                                                    </div>
                                        </fieldset>
                                        <fieldset>
                                            <legend> Visitação </legend>
                                                <div className="input-block">
                                                    <label htmlFor="instructions"> Instruções </label>
                                                        <textarea id="instructions" value={ instructions } onChange={ event => setInstructions(event.target.value) }/>
                                                </div>
                                                <div className="input-block">
                                                    <label htmlFor="opening_hours"> Horário de funcionamento </label>
                                                        <input id="opening_hours" value={ opening_hours } onChange={ event => setOpeningHours(event.target.value) }/>
                                                </div>
                                                <div className="input-block">
                                                    <label htmlFor="open_on_weekends"> Atende final de semana? </label>
                                                        <div className="button-select">
                                                            <button type="button" className={ open_on_weekends ? 'open-on-weekends' : '' } onClick={ () => setOpenOnWeekends(true) }>
                                                                <BiSolidLike size={ 24 }/>
                                                                    Sim
                                                            </button>
                                                            <button type="button" className={ !open_on_weekends ? 'not-open-on-weekends' : '' } onClick={ () => setOpenOnWeekends(false) }>
                                                                <BiSolidDislike size={ 24 }/>
                                                                    Não
                                                            </button>
                                                        </div>
                                                </div>
                                        </fieldset>
                                            <button className="confirm-button" type="submit">
                                                <FiSave size={ 24 } color="#FFFFFF"/>
                                                    Cadastrar
                                            </button>
                                    </form>
                                </main>
                        </div>
                    );
    };