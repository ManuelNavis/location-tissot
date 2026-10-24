# Site de L’Oasis de Volny

Site statique de L’Oasis de Volny, prévu pour GitHub Pages. Il n’a pas de serveur de réservation : le formulaire prépare un e-mail sur l’appareil du visiteur et ne transmet ni ne conserve les données sur le site.

## Avant publication

1. Ouvrir `config.js` et renseigner `contactEmail` avec l’adresse publique du propriétaire. Cette adresse sera visible dans le code du dépôt et dans le site : ne pas y mettre une adresse confidentielle.
2. Tester les photos, la carte, l’affichage sur téléphone et une demande de réservation avec une adresse de test.
3. Vérifier l’exactitude des équipements, du nombre de chambres, de l’adresse et des informations de disponibilité.
4. Publier via GitHub Pages en HTTPS. Ne jamais ajouter de mot de passe, clé API, pièce d’identité ou donnée privée dans ce dépôt.

## Sécurité et limites

- Les images et scripts du site sont hébergés avec le site. Le site ne charge plus de scripts publicitaires ou de bibliothèques JavaScript tierces.
- Une politique CSP de base, une politique de référent et des attributs de liens externes limitent certaines exécutions et fuites de navigation.
- La carte OpenStreetMap reste un contenu tiers : son fournisseur peut recevoir la connexion du visiteur lorsque la carte est affichée.
- Une balise CSP ne remplace pas des en-têtes HTTP. GitHub Pages ne permet pas de configurer librement tous les en-têtes de sécurité, notamment `frame-ancestors`. Pour un formulaire qui enregistre réellement des demandes, il faudra un service serveur adapté, avec contrôle d’accès, protection anti-abus, durée de conservation et information RGPD.
- La disponibilité n’est pas synchronisée avec un calendrier de réservation ; les dates du formulaire sont une demande, pas une confirmation.
