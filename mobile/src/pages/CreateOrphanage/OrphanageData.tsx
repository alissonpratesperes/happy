import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { View, Text, TextInput, Image, TouchableOpacity, Switch, StyleSheet } from "react-native";

import api from "../../services/api";
import OrphanageParams from "../../interfaces/OrphanageParams";

    export default function OrphanageData() {
        const route = useRoute();
        const params = route.params as OrphanageParams;
        const [ name, setName ] = useState("");
        const [ about, setAbout ] = useState("");
        const [ instructions, setInstructions ] = useState("");
        const [ opening_hours, setOpeningHours ] = useState("");
        const [ open_on_weekends, setOpenOnWeekends ] = useState(true);
        const [ previewImages, setPreviewImages ] = useState<string[]>([]);
        const navigation = useNavigation<any>();

            async function handleSelectImages() {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if(status !== "granted") {
                        alert("É necessária a permissão de acesso às fotos do dispositivo.");
                            return;
                    };
                const result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    quality: 1,
                    mediaTypes: ImagePicker.MediaTypeOptions.Images
                });
                    if (!result.canceled && result.assets && result.assets.length > 0) {
                        const uri = result.assets[0].uri;
                            setPreviewImages([
                                ...previewImages,
                                    uri 
                            ]);
                    };
            };
            async function handleCreateOrphanage() {
                const { latitude, longitude } = params.position;
                const data = new FormData();

                    data.append("latitude", String(latitude));
                    data.append("longitude", String(longitude));
                    data.append("name", name);
                    data.append("about", about);
                    data.append("instructions", instructions);
                    data.append("opening_hours", opening_hours);
                    data.append("open_on_weekends", String(open_on_weekends));

                        previewImages.forEach((image, index) => { data.append("images", {
                            name: `image_${ index }.jpg`,
                                type: "image/jpg",
                                    uri: image
                        } as any); });

                            await api.post("/orphanages", data);

                                navigation.navigate("OrphanagesMap");
            };

                return (
                    <ScrollView style={ styles.container }>
                        <View style={ styles.containerWrapper }>
                            <Text style={ styles.title }>Dados</Text>
                                        <View style={ styles.separator }/>
                            <Text style={ styles.label }>Nome</Text>
                                <TextInput style={ styles.input } value={ name } onChangeText={ setName }/>
                                        <View style={ styles.labelContainer }>
                                            <Text style={ styles.label }>Sobre</Text>
                                            <Text style={ styles.comment }>Máximo de 300 caracteres</Text>
                                        </View>
                                <TextInput style={[ styles.input, styles.inputTextArea ]} multiline value={ about } onChangeText={ setAbout }/>
                            <Text style={ styles.label }>Fotos</Text>
                                        <View style={ styles.uploadedImagesContainer }>
                                            { previewImages.map(image => {
                                                return (
                                                    <Image key={ image } source={{ uri: image }} style={ styles.uploadedImage }/>
                                                );
                                            }) }
                                        </View>
                                    <TouchableOpacity style={ styles.imagesInput } onPress={ handleSelectImages }>
                                        <Feather name="plus" size={ 24 } color="#15B6D6"/>
                                    </TouchableOpacity>
                            <Text style={[ styles.title, styles.secondInputContainer ]}>Visitação</Text>
                                        <View style={ styles.separator }/>
                            <Text style={ styles.label }>Instruções</Text>
                                <TextInput style={[ styles.input, styles.inputTextArea ]} multiline value={ instructions } onChangeText={ setInstructions }/>
                            <Text style={ styles.label }>Horário de funcionamento</Text>
                                <TextInput style={ styles.input } value={ opening_hours } onChangeText={ setOpeningHours }/>
                                        <View style={ styles.switchContainer }>
                                            <Text style={ styles.label }>Atende final de semana?</Text>
                                                <Switch thumbColor="#FFFFFF" trackColor={{ false: "#CCCCCC", true: "#39CC83" }} value={ open_on_weekends } onValueChange={ setOpenOnWeekends }/>
                                        </View>
                                            <RectButton style={ styles.nextButton } onPress={ handleCreateOrphanage }>
                                                <Feather name="save" size={ 24 } color="#FFFFFF"/>
                                                    <Text style={ styles.nextButtonText }>Cadastrar</Text>
                                            </RectButton>
                        </View>
                    </ScrollView>
                );
    };

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                padding: 20
            },
            containerWrapper: {
                borderRadius: 20,
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: "#D3E2E5",
                marginBottom: 40,
                overflow: "hidden",
                padding: 24
            },
            title: {
                color: "#5c8599",
                fontSize: 27,
                fontFamily: "Nunito_700Bold",
                paddingBottom: 24,
                borderBottomWidth: 1,
                borderBottomColor: "#D3E2E6"
            },
            separator: {
                height: 1,
                width: "100%",
                backgroundColor: "#D3E2E6",
                marginBottom: 40
            },
            label: {
                color: "#8FA7B3",
                fontFamily: "Nunito_600SemiBold",
                marginBottom: 8,
                fontSize: 18
            },
            input: {
                backgroundColor: "#F5F8FA",
                borderWidth: 1.5,
                borderColor: "#D3E2E5",
                borderRadius: 20,
                height: 60,
                paddingVertical: 18,
                paddingHorizontal: 24,
                marginBottom: 24,
                textAlignVertical: "top"
            },
            inputTextArea: {
                height: 110,
                paddingTop: 18,
                paddingBottom: 18
            },
            labelContainer: {
                flexDirection: "row",
                alignItems: "center"
            },
            comment: {
                marginLeft: 24,
                marginBottom: 8,
                fontSize: 14,
                color: "#8FA7B3"
            },
            uploadedImagesContainer: {
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 32
            },
            uploadedImage: {
                width: 64,
                height: 64,
                borderRadius: 20,
                marginTop: 8
            },
            imagesInput: {
                backgroundColor: "#FFFFFF",
                borderStyle: "dashed",
                borderColor: '#96D2F0',
                borderWidth: 1.5,
                borderRadius: 20,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24
            },
            switchContainer: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            },
            nextButton: {
                backgroundColor: "#3CDC8C",
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: 60,
                marginTop: 40,
            },
            nextButtonText: {
                fontFamily: "Nunito_800ExtraBold",
                fontSize: 18,
                color: "#FFFFFF",
                marginLeft: 10
            },
            secondInputContainer: {
                marginTop: 40
            }
        });