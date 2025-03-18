var Barrelaterale = {
    init: function (selector, instanceDelaModaleDeReservation, laCarte) {
        this.selector = selector;
        this.instanceDeLaCarte = laCarte;
        this.instanceDeLaSignature = undefined;

        // Ici, on utilise selector pour récupérer les éléments enfants de la barrelaterale même si plusieurs éléments avec plusieurs barrelaterale

        ////////////////////////////////////////// 
        // initialisations variables elements html 
        //////////////////////////////////// 

        // element principal
        const elementPrincipal = document.querySelector(selector);
        this.elementPrincipal = elementPrincipal;
        this.selectorBarrelateraleHtmlElement = elementPrincipal;


        // ici, on cherche les ENFANTS de elementPrincipal qui correspondent au selecteur
        this.htmlElements = {
            prenom: elementPrincipal.querySelector("#prenom"),
            nom: elementPrincipal.querySelector("#nom"),
            missNom: elementPrincipal.querySelector("#missNom"),
            missPrenom: elementPrincipal.querySelector("#missPrenom"),
            resa: elementPrincipal.querySelector("#resa"),
            formValid: elementPrincipal.querySelector("#boutonFormValid"),
            blockSignature: elementPrincipal.querySelector("#blockSignature"),
            infosStation: elementPrincipal.querySelector("#infosStation"),
            formulaire: elementPrincipal.querySelector("#formulaire"),
            boutonOpenresa: elementPrincipal.querySelector(".openresa"),
            boutonReserver: elementPrincipal.querySelector('#reserver'),
            nomStation: elementPrincipal.querySelector('#nomstation'),
            pointattache: elementPrincipal.querySelector('#pointattache'),
            adressestation: elementPrincipal.querySelector('#adressestation'),
            velodisponible: elementPrincipal.querySelector('#velodisponible'),
            status: elementPrincipal.querySelector('#status'),
            croixButton: elementPrincipal.querySelector('.close'),
            impossibleResa: elementPrincipal.querySelector('#impossible')
        };


        /////////////////////////////////////// 
        // initialisations classes enfants
        //////////////////////////////////// 

        this.formulaireMasquable = Object.create(ElementMasquable);
        this.formulaireMasquable.init(this.htmlElements.formulaire);

        this.impossibleResaMasquable = Object.create(ElementMasquable);
        this.impossibleResaMasquable.init(this.htmlElements.impossibleResa);

        this.resaMasquable = Object.create(ElementMasquable);
        this.resaMasquable.init(this.htmlElements.resa);

        this.blockSignatureMasquable = Object.create(ElementMasquable);
        this.blockSignatureMasquable.init(this.htmlElements.blockSignature);
        /////////////////////////////////////// 
        // initialisations evenements 
        //////////////////////////////////// 

        this.htmlElements.boutonOpenresa.onclick = (event) => {
            this.openResa(event);
        };
        this.htmlElements.formValid.onclick = (event) => {
            if (this.siFormValid(event)) {
                this.blockSignatureMasquable.show();
                this.formulaireMasquable.hide();
            }
        };

        //masquer les infos au clic de la croix
        this.htmlElements.croixButton.addEventListener('click', () => {
            this.hide();
        });


        //evenement ouverture ModalReservation/ reservation en cours
        this.htmlElements.boutonReserver.addEventListener('click', () => {
            if (this.instanceDeLaSignature.isValid()) {
                //preparer les infos a envoyer
                var stationSelectionnee = this.stationTrouvee;
                var prenom = this.htmlElements.prenom.value;
                var nom = this.htmlElements.nom.value;
                instanceDelaModaleDeReservation.show();
                instanceDelaModaleDeReservation.lancerReservation(stationSelectionnee, prenom, nom);

                // Faire défiler la page jusqu'à la div du décompte
                document.getElementById('chrono').scrollIntoView({ behavior: 'smooth' });
                // Réinitialiser la barre de réservation
                this.resetResaBar();
                
                // Masquer la barre de réservation
                this.hide();
            } else {
                alert("Veuillez entrer votre signature");
            }


        });

        /////////////////////////////////////// 
        // initialisations etat
        //////////////////////////////////// 
        this.hide();
        this.blockSignatureMasquable.hide();
        this.resaMasquable.hide();
    },
    /////////////////////////////////////// 
    // méthodes
    //////////////////////////////////// 
    openResa: function () {

        //bloquer reservation si aucun vélo disponible
        var veloDispo = this.instanceDeLaCarte.stationSelectionnee.available_bikes;


        if (veloDispo === 0) {
            this.impossibleResaMasquable.show();

            setTimeout(() => {
                console.log(this);
                this.impossibleResaMasquable.hide();
            }, 2000)

            this.htmlElements.impossibleResa.textContent = "Aucun vélo n'est disponible à cette station, veuillez séléctionner une autre station.";
            this.htmlElements.impossibleResa.style.color = "red";

        } else {
            this.resaMasquable.show();
            this.blockSignatureMasquable.hide();
            this.instanceDeLaSignature.resetCanvas();
            this.htmlElements.nom.value = "";
            this.htmlElements.prenom.value = "";
        }

    },
    siFormValid: function (event) {
        const caracteresValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
        var hasError = false;
        //si le champ est vide
        if (this.htmlElements.nom.validity.valueMissing) {
            event.preventDefault;
            this.htmlElements.missNom.textContent = "Nom manquant";
            this.htmlElements.missNom.style.color = "red";
            hasError = true;
            //si le format de données est incorrect
        } else if (caracteresValid.test(this.htmlElements.nom.value) == false) {
            event.preventDefault;
            this.htmlElements.missNom.textContent = "Format incorrect";

            this.htmlElements.missNom.style.color = "orange";
            hasError = true;
        } else {
            this.htmlElements.missNom.textContent = " ";
        }
        //si le champ est vide
        if (this.htmlElements.prenom.validity.valueMissing) {
            event.preventDefault;
            this.htmlElements.missPrenom.textContent = "Prénom manquant";
            this.htmlElements.missPrenom.style.color = "red";
            hasError = true;

        } else if (caracteresValid.test(this.htmlElements.prenom.value) == false) {
            event.preventDefault;
            this.htmlElements.missPrenom.textContent = "Format incorrect";
            this.htmlElements.missPrenom.style.color = "orange";
            hasError = true;
        } else {
            this.htmlElements.missPrenom.textContent = " ";
        }
        if (hasError) {
            return false;
        } else {
            return true;
        }

    },


    // affiche la barrelaterale et remplit les infos de la station
    // affiche la barrelaterale, et si on joint des infos sur une station, on les affiche
    show: function (stationTrouvee) {
        this.selectorBarrelateraleHtmlElement.classList.add("visible");
        this.selectorBarrelateraleHtmlElement.classList.remove("invisible");
        if (stationTrouvee) {
            this.stationTrouvee = stationTrouvee;
            this.remplirInfo(stationTrouvee);

        }
        console.log("voir");
    },

    hide: function () {
        this.selectorBarrelateraleHtmlElement.classList.remove("visible");
        this.selectorBarrelateraleHtmlElement.classList.add("invisible");

    },


    //méthode remplissage barrelaterale infos station
    remplirInfo: function (station) {
        this.htmlElements.nomStation.innerHTML = station.name;
        this.htmlElements.adressestation.innerHTML = station.address;
        this.htmlElements.velodisponible.innerHTML = station.available_bikes;
        this.htmlElements.pointattache.innerHTML = station.available_bike_stands;
        this.htmlElements.status.innerHTML = station.status;


    },
};
