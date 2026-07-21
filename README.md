# Portfolio — Doucha Nikamane Jr

Site personnel bilingue (français / anglais) présentant mon parcours, mes
compétences et mes projets en administration systèmes, réseaux et sécurité.

---

## Arborescence

```
portfolio/
├── index.html                  Structure de la page (le contenu visible)
├── README.md                   Ce fichier
└── assets/
    ├── css/
    │   └── style.css           Toute la mise en forme
    ├── js/
    │   ├── icons.js            Icônes (sprite SVG intégré)
    │   ├── i18n.js             Traductions FR / EN
    │   ├── config.js           ← TES images et liens GitHub
    │   ├── network.js          Animation du hero
    │   ├── gallery.js          Galerie et visionneuse
    │   ├── theme.js            Bascule clair / sombre
    │   └── main.js             Menu, langue, défilement, animations
    └── img/                    Tes captures d'écran et ta photo
        └── LISEZ-MOI.md
```

---

## Que modifier, et où ?

| Je veux…                              | Fichier à ouvrir              |
|---------------------------------------|-------------------------------|
| Ajouter des captures d'écran          | `assets/js/config.js`         |
| Ajouter un lien GitHub à un projet    | `assets/js/config.js`         |
| Changer un texte du site              | `assets/js/i18n.js`           |
| Changer une couleur, une taille       | `assets/css/style.css`        |
| Ajouter / retirer une section         | `index.html`                  |
| Mettre ma photo                       | `index.html` + `assets/img/`  |

Dans la grande majorité des cas, **seul `config.js` est à modifier**.

---

## Reste à faire

### 1. Activer le formulaire de contact

Le formulaire n'enverra pas de messages tant qu'il n'est pas relié à un
service d'envoi. Créer un compte gratuit sur [Formspree](https://formspree.io),
créer un formulaire, récupérer l'identifiant fourni, puis dans `index.html`
remplacer `VOTRE_ID_FORMSPREE` par cet identifiant.

### 2. Compléter les descriptions de projets

Les descriptions des projets sont à relire et à préciser dans
`assets/js/i18n.js` (clés `proj1_d` à `proj8_d`, dans les deux langues).

### 3. Ajouter les captures d'écran

Voir `assets/img/LISEZ-MOI.md`.

---

## Mise en ligne

Le site est entièrement statique : aucun serveur ni base de données requis.

1. **GitHub** — créer un dépôt (privé pendant la construction) et y déposer
   l'ensemble du dossier en conservant l'arborescence.
2. **Cloudflare Pages** — Workers & Pages → Create → Pages → Connect to Git,
   sélectionner le dépôt. Aucune commande de build à renseigner : c'est un
   site statique. Le déploiement se relance automatiquement à chaque
   modification poussée sur le dépôt.

---

## Aperçu en local

Ouvrir `index.html` directement dans le navigateur fonctionne. Pour un
aperçu plus fidèle, depuis le dossier `portfolio/` :

```bash
python3 -m http.server 8000
```

puis ouvrir <http://localhost:8000>.

---

## Notes techniques

- **Icônes intégrées** : le sprite SVG est embarqué dans `icons.js` plutôt
  que chargé depuis un CDN — les icônes s'affichent donc en toutes
  circonstances, y compris hors ligne.
- **Repli sans Bootstrap** : si le CDN Bootstrap est inaccessible, le menu
  mobile reste fonctionnel grâce à un basculement de secours en jQuery.
- **Accessibilité** : contrastes vérifiés sur les deux thèmes, navigation au
  clavier possible dans la visionneuse, et animations désactivées pour les
  visiteurs ayant activé « réduire les animations » dans leur système.
- **Thème** : sombre par défaut ; au premier passage le site suit la
  préférence du système, puis mémorise le choix du visiteur.
