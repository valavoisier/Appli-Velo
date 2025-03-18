var ModaleReservation = {
    init: function (selectorModaleReservation) {
        ////////////////////////////////////////// 
        // initialisations variables elements html 
        //////////////////////////////////// 
        // element principal
        this.element = document.querySelector(selectorModaleReservation);

        // ici, on cherche les ENFANTS de elementsPrincipal qui correspondent au selecteur
        this.htmlElements = {
            min: this.element.querySelector("#minutes"),
            sec: this.element.querySelector("#secondes"),
            stop: this.element.querySelector("#stop"),
            stationResa: this.element.querySelector("#stationResa")

        };
    },
    setBarrelaterale: function (instanceDeLaBarrelaterale) {
        this.instanceDeLaBarrelaterale = instanceDeLaBarrelaterale;
    },
    hide: function () {
        this.element.classList.remove('visible');
        this.element.classList.add('invisible');
    },
    show: function () {
        this.element.classList.add('visible');
        this.element.classList.remove('invisible');
    },
    lancerReservation: function (station /* infos de la station */ , prenom /* prenom de la personne */ , nom) {
        let dateResa = new Date().getTime();
        let nomStation = station.name;

        //mise en place session storage
        sessionStorage.setItem("dateResa", dateResa);

        // Enregistre la session storage du nom de la station dans son attribut
        sessionStorage.setItem("nomStation", station.name);
        //insert le nom de la station et le nom et prenom du loueur 
        this.htmlElements.stationResa.innerHTML = "Vélo réservé à la station " + station.name + " par " + prenom + " " + nom;

        const timer = () => {

            let dureeResa = 1200;

            let newDateResa = new Date().getTime();
            let tempsPasse = Math.round((newDateResa - dateResa) / 1000);
            let decompte = dureeResa - tempsPasse;
            let minDecompte = Math.floor(decompte / 60);
            let secDecompte = decompte - minDecompte * 60;
            this.htmlElements.sec.textContent = secDecompte + " s";
            this.htmlElements.min.textContent = minDecompte + " min : ";

            //  console.log(secElt);
            // console.log(secDecompte);
            //////////////////////////////////////////
            /* if (minDecompte < 10) { // Si il reste moins de 10 minutes
                 // Ajoute un 0 devant les minutes
                 minElt = "0" + minDecompte;
             } else {
                 // Sinon les minutes s'affichent normalement
                 minElt = minDecompte;
             }

             if (secDecompte < 10) { // Si il reste moins de 10 secondes
                 // Ajoute un 0 devant les secondes
                 secElt = "0" + secDecompte;
             } else {
                 // Sinon les secondes s'affichent normalement
                 secElt = secDecompte;
             };*/
            /////////////////////////////////////////////////
        }

        timer();
        // Affichage du message de confirmation et decompte 20 min
        var decompteTemps = setInterval(timer, 1000);


        //évènements sur bouton annuler la réservation

        this.htmlElements.stop.addEventListener("click", () => {
            this.hideBarrelaterale();
            this.resetTimer(decompteTemps);
        });
    },
    hideBarrelaterale: function () {
        this.instanceDeLaBarrelaterale.hide();
        this.instanceDeLaBarrelaterale.resaMasquable.hide();
        this.instanceDeLaBarrelaterale.formulaireMasquable.show();

    },
    resetTimer: function (decompteTemps) {
        clearInterval(decompteTemps);
        this.htmlElements.sec.textContent = " ";
        this.htmlElements.min.textContent = " ";
        this.htmlElements.stationResa.innerHTML = " ";
        sessionStorage.clear();


    }
};


/*
/ Enregistrer des données dans sessionStorage
sessionStorage.setItem('clé', 'valeur');

// Récupérer des données depuis sessionStorage
var data = sessionStorage.getItem('clé');

// Supprimer des données de sessionStorage
sessionStorage.removeItem('clé');

// Supprimer toutes les données de sessionStorage
sessionStorage.clear();

//utiliser key et length
*/
/*
// Événements lors de la validation du Canvas
document.getElementById("reserver").addEventListener("click", function () {
    localStorage.setItem("signature", signature.canvas.toDataURL()); //Méthode qui convertit le contenu du canvas en données texte utilisable dans une image
    // signature.resetCanvas(); // Efface le Canvas A revoir!

    // Affichage du message de confirmation
    document.getElementById("messageConfirmationLocationmessageResaFin").style.display = "block";
    // Insert le nom de la station
    document.getElementById("messageResaFin").querySelector.innerHTML = "votre réservation " + this.nomStation;
});
}
*/
