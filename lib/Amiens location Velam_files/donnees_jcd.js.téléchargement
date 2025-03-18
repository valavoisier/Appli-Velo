//récupération des données en temps réel de jc decaux de la ville d'amiens
var url = "https://api.jcdecaux.com/vls/v1/stations?apiKey=2289e4f55887800b8b6a4f0566d3238d73ad3fa4&contract=Amiens";
/*requête  http - GET effectuée avec AXIOS qui transforme directement les réponses en JSON 
GET C'est la méthode la plus courante pour demander une ressource, récupérer le contenu d'un fichier. Une requête GET est sans effet sur la ressource, il doit être possible de répéter la requête sans effet.*/
var tableauStations = [];

axios.get(url).then(function (reponseRequete) {
    tableauStations = reponseRequete.data
    /*récupérer les éléments des stations en parcourant le tableau avec la boucle for et récupérer tous les items [i] du tableau avec la propriété length*/
    for (var i = 0; i < tableauStations.length; i++) {
        var stationCourante = tableauStations[i];

        //affiche les marqueurs des stations sur la carte
        carteAmiens.creerMarqueur(stationCourante);



    }

})
//trouver les coordonnées géographiques pour chacune des stations
function trouverStationParCoordonnees(lat, lng) {
    var station;

    for (var i = 0; i < tableauStations.length; i++) {
        var stationCourante = tableauStations[i];
        if (stationCourante.position.lat === lat) {
            if (stationCourante.position.lng === lng) {
                //stationCourante est la bonne station
                station = stationCourante;
            }
        }
    }
    return station;
}
