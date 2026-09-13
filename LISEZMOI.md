# streamTiti — ton lecteur M3U perso

## Ce que contient ce dossier
- `index.html` — l'appli (interface + lecteur vidéo, lit les flux `.m3u8`/HLS et vidéo directe)
- `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png` — pour que ce soit une vraie "appli" installable (PWA)

## Comment ça marche
- Tu ajoutes une playlist M3U : soit un fichier `.m3u`/`.m3u8` que tu as sur ton téléphone, soit un lien direct.
- L'appli parse la playlist, affiche les chaînes en grille avec logos, tu tapes dessus pour lire.
- Tes playlists sont sauvegardées sur l'appareil (pas de compte, pas de cloud).

## Étape 1 — Héberger l'appli (nécessaire pour en faire un .apk)
Un `.apk` doit pointer vers une appli déjà en ligne (même une appli "installable" doit être servie via une URL https). Le plus simple et gratuit : **GitHub Pages**.

1. Crée un compte GitHub (gratuit) si tu n'en as pas.
2. Crée un nouveau repo, par exemple `streamtiti`.
3. Mets-y les 5 fichiers de ce dossier (upload via l'interface web GitHub, glisser-déposer).
4. Dans **Settings → Pages**, choisis la branche `main` et le dossier `/root`, puis Save.
5. GitHub te donne une URL du type `https://tonpseudo.github.io/streamtiti/`. Ouvre-la : ton appli tourne déjà dans le navigateur.

## Étape 2 — Générer le .apk
1. Va sur **https://www.pwabuilder.com** (outil gratuit, officiel, maintenu par Microsoft).
2. Colle ton URL GitHub Pages, clique "Start".
3. Il analyse ton appli (manifest, icônes, service worker — déjà prêts ici).
4. Va dans l'onglet **Android**, clique **Generate Package**.
5. Il te génère un `.apk` (ou `.aab`) téléchargeable directement — c'est ton lien.
6. Transfère le `.apk` sur ton téléphone (ou télécharge-le directement depuis le tél), active "Sources inconnues" dans les réglages Android si demandé, installe.

## Alternative plus rapide (sans APK)
Sur Android, tu peux aussi juste ouvrir l'URL GitHub Pages dans Chrome, menu ⋮ → **"Ajouter à l'écran d'accueil"**. Ça installe une icône qui se comporte exactement comme une appli (plein écran, pas de barre d'adresse), sans passer par PWABuilder. C'est le chemin le plus simple si tu veux juste l'icône sur ton écran d'accueil rapidement.

## Nouvelles fonctionnalités

### Onglet Rechercher
Une barre en bas de l'appli permet de basculer entre **Chaînes** (dossiers par langue), **Rechercher** et **Enregistrements**. L'onglet Rechercher fouille dans toutes tes chaînes/playlists en une fois, toutes langues confondues — pratique pour retrouver un film, une série ou une chaîne sans naviguer dossier par dossier.

### Enregistrement / Replay (DVR local)
Pendant la lecture, un bouton **●REC** permet de démarrer/arrêter un enregistrement du flux en cours. L'enregistrement est sauvegardé directement sur ton téléphone (stockage local du navigateur) et apparaît dans l'onglet **Enregistrements**, où tu peux le relire, le télécharger en `.webm`, ou le supprimer.

**Limites à connaître :**
- Ça enregistre ce que tu es en train de regarder, en temps réel — impossible d'enregistrer un programme qui n'a pas encore commencé ou déjà fini (il n'y a pas de vrai "replay" chaîne par chaîne, sauf si le diffuseur propose lui-même ce service, comme France·tv ou 6play).
- L'enregistrement s'arrête si tu fermes l'appli ou le lecteur.
- Le stockage se fait sur l'appareil : de grosses vidéos peuvent vite remplir l'espace disponible.
- Le format de sortie est `.webm`, lisible par la plupart des lecteurs (VLC, etc.).
- Enregistrer du contenu protégé par le droit d'auteur pour un usage personnel peut être toléré dans certains pays (copie privée) mais pas dans d'autres — à toi de vérifier ce qui s'applique chez toi, et de ne pas redistribuer ces enregistrements.

## Notes
- Cette appli est un lecteur générique de playlists M3U : elle ne fournit aucun contenu, tu dois avoir tes propres liens/fichiers M3U légaux.
- Le lecteur utilise hls.js pour les flux `.m3u8` — compatible avec la grande majorité des IPTV/M3U basés sur HLS.
