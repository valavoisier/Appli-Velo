/* signature numérique dans un canvas.js
projet velam*/


window.CanvasManager = {
    init: function (selector, instanceDelaModaleDeReservation, instanceDeLaBarrelaterale) {
        this.instanceDelaModaleDeReservation = instanceDelaModaleDeReservation;
        this.instanceDeLaBarrelaterale = instanceDeLaBarrelaterale;
        this.canvas = document.querySelector(selector);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 250;
        this.canvas.height = 150;
        /* this.canvas.setAttribute('width', '300');
         this.canvas.setAttribute('height', '150');*/
        this.painting = false;
        this.compteurPoints = 0;
        this.initEvent();
    },
    initEvent: function () {
        //evenements tactiles (initialiserles observateurs d'événements pour l'élément <canvas> afin de pouvoir gérer ceux-ci lorsqu'ils se produisent)
        this.canvas.addEventListener('touchstart', this.startDraw.bind(this), false);
        this.canvas.addEventListener('touchmove', this.movePositionTouch.bind(this), false);
        this.canvas.addEventListener('touchend', this.stopDraw.bind(this), false);
        //evenements souris
        this.canvas.addEventListener('mousemove', (e) => {
            this.movePosition(e.offsetX, e.offsetY);
        });
        this.canvas.addEventListener('mousedown', this.startDraw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDraw.bind(this));

        //ctx
        const ctx = this.ctx;
        const canvas = this.canvas;
        //bouton effacer canvas
        var reset = document.getElementById("reset");
        reset.addEventListener('click', () => {
            this.resetCanvas();
        });

        //responsive
        window.addEventListener('resize', this.resizeEvent.bind(this));
        this.resizeEvent();
    },
    resetCanvas() {
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.compteurPoints = 0;
    },

    /*    movePosition(e) {
            this.drawLineTo(e.offsetX, e.offsetY);
            if (this.painting) {
                this.compteurPoints++
            };

            console.log(this.compteurPoints);
        },*/
    movePosition(offsetX, offsetY) {
        this.drawLineTo(offsetX, offsetY);
        if (this.painting) {
            this.compteurPoints++
        };

        console.log(this.compteurPoints, offsetX, offsetY);
    },

    movePositionTouch(evt) {
        evt.preventDefault();
        console.log(evt);

        var rect = evt.target.getBoundingClientRect();
        var offsetX = evt.targetTouches[0].pageX - rect.left;
        var offsetY = evt.targetTouches[0].pageY - rect.top - window.scrollY;

        this.movePosition(offsetX, offsetY);
        /*var el = document.getElementsByTagName("canvas")[0];
        var ctx = el.getContext("2d");
        var touches = evt.changedTouches;

        ctx.lineWidth = 4;

        for (var i = 0; i < touches.length; i++) {
            var color = colorForTouch(touches[i]);
            var idx = ongoingTouchIndexById(touches[i].identifier);

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            ctx.closePath();
            ctx.stroke();
            ongoingTouches.splice(idx, 1, touches[i]); // mettre à jour la liste des touchers
        }*/
        //TODO retrouver x et y
        /* let x = Math.random() * 100;
         let y = Math.random() * 100;
         console.log(x);
         console.log(y);*/

        //essai 1
        /* rect = this.canvas.getBoundingClientRect();
         let x = e.clientX - rect.left;
         let y = e.clientY - rect.top;*/
        //essai 2
        /*let x = clientX;
        let y = clientY;*/
        //essai 3
        /* console.log('event touch', e);
         let x = e.offsetX;
         let y = e.offsetY;

         this.drawLineTo(x, y);
         console.log(x);
         console.log(y);*/
    },
    drawLineTo: function (x, y) {
        console.log(this.painting, x, y);
        if (!this.painting) return;

        this.ctx.strokeStyle = "#000000";


        //épaisseur et type trait
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
        //position
        this.ctx.lineTo(x, y); //créer ligne  - position coordonnées souris au clic X_horizontal, Y_vertical
        this.ctx.stroke(); //dessine le chemin sur le canvas
        this.ctx.beginPath(); //commence chemin
        this.ctx.moveTo(x, y); // déplacement - position
    },
    //commencer le dessin
    startDraw: function (e) {
        this.painting = true;
        //this.draw(e);

    },
    //arrêter le dessin
    stopDraw: function () {
        this.painting = false;
        this.ctx.beginPath();
    },
    isValid: function () {
        if (this.compteurPoints >= 30) {
            return true;
        } else {
            return false;
        }
    },

    resizeEvent(event) {
        console.log("resizeEvent", event)
        //https://stackoverflow.com/questions/2588181/canvas-is-stretched-when-using-css-but-normal-with-width-height-properties
        //assigner la propriete "width" de l'évenement a la largeur en pixel spécifiee en css
        //Il 
        //canvasel.setAttribute('width', $('#canvas').getBoundingClientRect().width)
        //$('#canvas').getBoundingClientRect().width;
        //$('#canvas').getBoundingClientRect().height;
        //
        //canvasel.width = w;
        //canvasel.height = h;
    }
    /*
        // Méthode qui récupére les coordonnées de l'Élément de pointage (souris, doigt...)
        getMousePos: function (event) {
            rect = this.canvas.getBoundingClientRect(); // Renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage

            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        },
    */

};
