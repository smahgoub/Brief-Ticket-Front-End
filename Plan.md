# Petit plan d'action pour le brief ticket front
## Remarque avant de démarrer
Le front ne correspond pas forcément au backend (par exemple un ticket côté front contient juste le nom d'un apprenant, côté backend on a plus d'infos). 
On laisse le backend tel quel, on a toute latitude pour adapter le front.

## Comment découper le travail
### Récupérer la liste des ticket
Qui : Le code JS.
Quand : Lorsque je charge ma page.
Pourquoi : Pour avoir toujours les derniers tickets de la base de données lorsque je charge ma page
Comment : En envoyant une requête HTTP à mon API (un GET sur http://localhost:8080/api/tickets)

> Remarque : On ne récupère pas le nom des apprenants car on a seulement l'id de l'apprenant dans le ticket. Comment faire ?
- Solution 1 (la plus light) : on affiche l'id au lieu du ticket
- Solution 2 : quand je récupère la liste des tickets et que je remplis mon tableau, alors je fait un GET sur http://localhost:8080/api/learners/id_du_learner pour avoir le firstname
- Solution 3 : je récupère la liste des apprenants lors du chargement de ma page et je range ça dans un tableau pour pouvoir retrouver les informations à l'intérieur
### Poster un nouveau ticket
Qui : le code JS.
Quand : Lorsque je clique sur "j'ai besoin d'aide".
Comment : En modifiant le listener sur l'événement `submit` pour y ajouter un fetch avec mon nouveau ticket à sauvegarder dans l'API.
> Remarque : Je n'ai pas la description du ticket dans l'interface graphique, je n'ai pas la correspondance entre Prénom du learner et son id, comment faire ?
- Solution 1 : je mets de valeurs "en dur" dans le code JS pour tester
- Solution 2 : je change l'interface graphique pour avoir un champ id learner et un champ description dans le formulaire
- Solution 3 (la plus stylée) : je récupère la liste des learners pour en faire une liste déroulante au chargement de la page et j'ajoute un champ description dans le formulaire
### Résoudre un ticket
...
