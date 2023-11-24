import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Orphanage from "./pages/Orphanage";
import OrphanagesMap from "./pages/OrphanagesMap";
import CreateOrphanage from "./pages/CreateOrphanage";

    function Router() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={ Landing }/>
                    <Route path="/app" Component={ OrphanagesMap }/>
                    <Route path="/orphanages/:id" Component={ Orphanage }/>
                    <Route path="/orphanages/create" Component={ CreateOrphanage }/>
                </Routes>
            </BrowserRouter>
        );
    };

        export default Router;