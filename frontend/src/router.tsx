import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import ShowOrphanage from "./pages/ShowOrphanage";
import OrphanagesMap from "./pages/OrphanagesMap";
import CreateOrphanage from "./pages/CreateOrphanage";

    function Router() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={ Landing }/>
                    <Route path="/app" Component={ OrphanagesMap }/>
                    <Route path="/orphanages/:id" Component={ ShowOrphanage }/>
                    <Route path="/orphanages/create" Component={ CreateOrphanage }/>
                </Routes>
            </BrowserRouter>
        );
    };

        export default Router;