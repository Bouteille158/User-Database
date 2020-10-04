# QwestTV-Test

L'application est divisée en 3 parties :
- la base de données qui est hébergée sur le cloud mongoDB mais qui peut être aussi installée localement
- l'API qui permet de faire les requetes HTTP à la base de données
- l'interface ReactJS

# Prérequis

Avoir Node.JS d'installé

# Installation

1. Ouvrir cmd dans le dossier principal du projet

2. Executer les commandes suivantes :

        npm install
        node server.js
Par défaut, l'API se connecte sur la BDD cloud sur le port 8000

3. Ouvrir un cmd dans le dossier react-hooks-crud

4. Executer les commandes suivantes :

        npm install
        npm start

Par défaut, l'application React se lance sur le port 8001 et lance le navigateur par défaut pour afficher l'interface.


# Configuration

1. API (main folder)

    Pour modifier la base de données à laquelle se connecte l'API, il faut modifier l'URL dans app\config\db.config.js 

    Par défaut : 

            mongodb+srv://bouteille:LJk8rHH2pZ46HN15@qwesttv-test.yznnj.mongodb.net/QwestTV-test?retryWrites=true&w=majority

    Pour modifier le port d'écoute de l'API, il faut modifier le port dans server.js à la ligne 41 

    Par défaut : 

            8000

/!\ Il faut dans ce cas également modifier le port d'envoi de React à l'API /!\

2. React (react-hooks-crud)

    Pour modifier la connexion de React à l'API, il faut modifier l'URL dans src\http-common.js 

    Par défaut : 

            http://192.168.1.19:8000/api

    Pour modifier le port utilisé entre le navigateur et React, il faut modifier le port dans .env 

    Par défaut :

                8001

