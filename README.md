# Projet 3 OpenClassrooms : Concevez une carte interactive de location de vélos
Développement d'une page de type "Single page Application" simulant la réservation de vélos dans la ville d'Amiens basée sur l'API en temps réél JCDecaux .
Cette application est réalisée en JavaScript articulé autour de la Programmation Orientée Objet, JQuery (diaporama) et avec le framework Bootstrap. 
Elle utilise plusieurs API pour offrir des fonctionnalités interactives et immersives.
## Principales fonctionnalités :
### Diaporama interactif
Le diaporama explique le fonctionnement de l'application aux utilisateurs.
Réalisé en JQuery le diaporama défile automatiquement toutes les 5 secondes, 
avec la possibilité de contrôler le défilement via boutons ou clavier.
### Carte interactive 
Affiche les stations disponibles grâce à des marqueurs colorés verts, oranges, rouges (avec disponibilité en temps réel via l'API JCDecaux). 
Un clic sur un marqueur ouvre un panneau avec les détails de la station.
### Réservation avec signature numérique 
L'utilisateur remplit un formulaire et appose une signature (via l'API Canvas).
Une confirmation de réservation s'affiche avec un décompte de 20 minutes, après quoi la réservation est annulée.
### Stockage des informations 
Les identifiants de l'utilisateur et les paramètres de réservation sont enregistrés avec l'API WebStorage.
## Technologies utilisées :
HTML, CSS, JavaScript, jQuery, Bootstrap,
Librairie AXIOS

API JCDecaux, API Leaflet,
API Canvas, API WebStorage
