/*l'initialisation se fait par un objet, le main qui construit tous les objets nécessaires au démarrage de l'application*/

var carteAmiens;
var barrelaterale;

$(document).ready(function () {

    //latitude et longitude ville d'amiens
    var amiens = [49.894067, 2.2957529999999906];
    carteAmiens = Object.create(Carte);
    carteAmiens.init(amiens, "map");

    var modaleReservation = Object.create(ModaleReservation);
    modaleReservation.init("#compteur", barrelaterale);

    barrelaterale = Object.create(Barrelaterale);
    barrelaterale.init("#barrelaterale", modaleReservation, carteAmiens);

    modaleReservation.setBarrelaterale(barrelaterale);

    carteAmiens.onClickOnMarker = function (event /*marker*/ ) {
        var infos = trouverStationParCoordonnees(event.latlng.lat, event.latlng.lng);
        console.log(carteAmiens);
        carteAmiens.stationSelectionnee = infos;
        barrelaterale.show(infos);
    }

    var signature = Object.create(CanvasManager);
    signature.init('#canvas', modaleReservation, barrelaterale);
    
    barrelaterale.instanceDeLaSignature = signature;
});

