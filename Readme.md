# Monix 2.0

[![Build and Deploy docker image](https://github.com/ClubNix/monix-2.0/actions/workflows/deploy.yaml/badge.svg?branch=master)](https://github.com/ClubNix/monix-2.0/actions/workflows/deploy.yaml)

<p align="center" width="100%">
    <img width="33%" src="https://raw.githubusercontent.com/ClubNix/monix-2.0/master/src/assets/monixcoin.svg"> 
</p>

Projet du Club *Nix permettant de gérer les stocks ainsi que de permettre aux membres d'acheter des produits contre des monix-coins.

Le projet associé au backend du projet est trouvable [ici](https://github.com/ClubNix/monix-backend)

Le projet correspond à la version 2 du projet, la première version est consultable [ici](https://github.com/ClubNix/monix)  
La version 1.5 (version intermédiaire) est également consultatble [ici](https://github.com/ClubNix/monix-1.5)

## Installation

Un docker est associé à ce projet, il est trouvable [ici](https://github.com/ClubNix/monix-2.0/pkgs/container/monix-2.0).

Pour utiliser le registry github, il est nécéssaire de [se connecter](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) avant !

Une variables d'environnement est nécéssaire à son utilisation:
- `BACKEND_URL` : Adresse du backend (par défaut, https://localhost:1337)


## Développement

Afin de développer, il vous sera nécéssaire d'utiliser ses commandes:
- `npm i` Installation Packages + hook
- `npm start` Pour lancer l'application en debug
- `npm run lint:fix` Pour régler certains problèmes de style de code automatiquement
- `npm run format` Pour formatter les fichiers avec prettier
- `npm run check` Verifie le formattage + la qualité du code (⚠️ lancé automatiquement avant chaque commit ⚠️)

Pour la qualité de code, nous utilisons ESLINT et Prettier pour le formattage.  
Le Front-End est basé sur TypeScript et React.
