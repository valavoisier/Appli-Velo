var Carte = {
    init: function (coordonnees, identifiant) {
        this.coordonnees = coordonnees;
        this.marqueurs = [];
        this.onClickOnMarker = undefined;

        var map = L.map(identifiant).setView(coordonnees, 15);

        /*création du calque images - ajout d'un fond de carte OSM à la variable map par addTo(map).*/
        var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            maxZoom: 20
        }).addTo(map);


        window.map = map;
    },
    // créer les marqueurs sur la carte
    creerMarqueur: function (station) {
        var texteMarker = "Station n° " + station.name + "<br/>Adresse: " + station.address + "<br/>Vélos disponibles: " + station.available_bikes + "<br/>Points d'attache libres: " + station.available_bike_stands;
        //selection de la couleur de l'icône en fonction du nombre de vélos disponibles
        var veloDispo = station.available_bikes;
        if (veloDispo === 0) {
            var icon = L.icon({
                iconSize: [60, 60],
                popupAnchor: [0, -22],
                iconUrl: '../images/velorouge.png'
            });


        } else if ((0 < veloDispo) && (veloDispo <= 5)) {
            var icon = L.icon({
                iconSize: [60, 60],
                popupAnchor: [0, -22],
                iconUrl: '../images/velojaune.png'
            })
        } else {
            var icon = L.icon({
                iconSize: [60, 60],
                popupAnchor: [0, -22],
                iconUrl: '../images/velovert.png'
            })
        }
        var _this = this; //this -> vaut instance de Carte 

        //afficher les marqueurs sur la carte
        var markerStation = L.marker([station.position.lat, station.position.lng], {
                icon: icon
            })

            .bindPopup(texteMarker) //infobulle
            .addTo(map)
            .on('click', function (event) {
                /* this -> vaut function(event) ... */

                if (_this.onClickOnMarker !== undefined) {
                    _this.onClickOnMarker(event);
                }

            });

        this.marqueurs.push(markerStation);
    }
};
