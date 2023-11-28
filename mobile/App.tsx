import React from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";

import Routes from "./src/routes";

    export default function App() {
        const [ fontsLoaded ] = useFonts({ Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold });

            if(!fontsLoaded) {
                return null;
            }

                return (
                    <>
                        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
                            <Routes/> 
                    </>
                );
    };