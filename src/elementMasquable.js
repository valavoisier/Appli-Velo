var ElementMasquable = {
    init: function (elementHtmlConcerne) {
        ////////////////////////////////////////// 
        // initialisations variables elements html 
        //////////////////////////////////// 
        // element principal
        this.element = elementHtmlConcerne;

        // ici, on cherche les ENFANTS de elementsPrincipal qui correspondent au selecteur
        this.htmlElements = {
            //min: this.element.querySelector("#minutes"),

        };
    },
    ////////////////////////////////////////// 
    // méthodes 
    //////////////////////////////////// 
    hide: function () {
        this.element.classList.remove('visible');
        this.element.classList.add('invisible');
    },
    show: function () {
        this.element.classList.add('visible');
        this.element.classList.remove('invisible');
    }

};
