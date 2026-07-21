# Dossier des images

C'est ici que tu déposes les captures d'écran de tes projets, ainsi que ta photo.

## Captures d'écran des projets

1. Dépose tes fichiers dans ce dossier (`assets/img/`).
2. Ouvre `assets/js/config.js` et indique leurs chemins.

Exemple — si tu déposes `labo-1.png` et `labo-2.png` :

```js
proj1: ["assets/img/labo-1.png", "assets/img/labo-2.png"],
```

## Ta photo de profil

Dépose ta photo ici (par exemple `photo.jpg`), puis dans `index.html`
cherche le commentaire « Pour ajouter ta photo » et remplace la ligne
qui suit par :

```html
<img src="assets/img/photo.jpg" alt="Doucha Nikamane Jr">
```

## Bonnes pratiques

- **Noms de fichiers** : simples, en minuscules, sans espaces ni accents
  (`gestion-hotel-1.png` plutôt que `Capture écran hôtel (1).png`).
- **Format** : `.png` pour les captures d'interface, `.jpg` pour les photos.
- **Poids** : vise moins de 300 Ko par image pour que le site reste rapide.
  Un outil de compression en ligne (Squoosh, TinyPNG) suffit largement.
- **Dimensions** : une largeur de 1200 px est amplement suffisante.

## Correspondance des projets

| Clé      | Projet                                |
|----------|---------------------------------------|
| `proj1`  | Laboratoire d'intrusion de systèmes   |
| `proj2`  | Infrastructure réseau LDAP & Samba    |
| `proj3`  | SAS de communication d'entreprise     |
| `proj4`  | PyÉcole                               |
| `proj5`  | Portfolio personnel                   |
| `proj6`  | Gestion hôtelière                     |
| `proj7`  | Gestion de l'état civil               |
| `proj8`  | Test de débit                         |
