import Image from "./Image";

    interface Orphanage {
        id: number;
        name: string;
        latitude: number;
        longitude: number;
        about: string;
        instructions: string;
        opening_hours: string;
        open_on_weekends: boolean;

            images: Image[];
    };

        export default Orphanage;