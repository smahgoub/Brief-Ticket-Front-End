// Emplacement de la base URL
const baseUrl = 'http://localhost:8080';

// Pour la partie statistique, on initialise des compteurs
let lineCounter = 1;
let lastHelpRequestName = 0;

// Récupérer la liste des tickets déjà en DB
fetch(baseUrl + '/api/tickets').then(function (response) {
    response.json().then(function (tickets) {

            for (let i = 0; i < tickets.length; i++) {

                // Création de la case Position
                const ligneTicket = document.createElement("tr");
                const td1 = document.createElement("td");
                td1.textContent = "#" + lineCounter;
                ligneTicket.appendChild(td1);

                // Création de la case ID Ticket
                const td2 = document.createElement("td");
                td2.textContent = tickets[i].id;
                ligneTicket.appendChild(td2);

                // Création de la case prénom (en allant cherher l'id de l'apprenant dans l'API)
                const td3 = document.createElement("td");
                fetch(baseUrl + '/api/learners/' + tickets[i].learnerIdx).then(function (response) {
                    response.json().then(function (learner) {
                        td3.textContent = learner.firstName;
                    });
                });
                ligneTicket.appendChild(td3);

                // Création de la case Description
                const td4 = document.createElement("td");
                td4.textContent = tickets[i].description;
                ligneTicket.appendChild(td4);

                // Création du bouton "Je passe mon tour"
                const td5 = document.createElement("td");
                const button = document.createElement("button");
                button.textContent = "Je passe mon tour";
                td5.appendChild(button);
                ligneTicket.appendChild(td5);

                // On ajoute les lignes au tableau
                document.getElementById("table-body").appendChild(ligneTicket);

                lineCounter++;
            }
        }
    )
});

// Quand on envoie le prénom contenu dans le formulaire
document.getElementById("help-form").addEventListener("submit", function (event) {
    event.preventDefault();

// Je récupère le nom de la personne qui veut de l'aide
    const learnerIdx = document.getElementById("menu").value;
    const description = document.getElementById("input-desc").value;

    // Si la personne n'est pas déjà ds la liste
    if (learnerIdx !== lastHelpRequestName) {

        // Je m'occupe de créer une nouvelle ligne dans le tableau
        const ligne = document.createElement("tr");

        // Création de la case Position
        const td1 = document.createElement("td");
        td1.textContent = "#" + lineCounter;
        ligne.appendChild(td1);

        // Création de la case ID Ticket (en allant cherher l'id ticket dans l'API)
        const td2 = document.createElement("td");
        ligne.appendChild(td2);

        // Création de la case prénom (en allant cherher l'id de l'apprenant dans l'API)
        const td3 = document.createElement("td");
        fetch(baseUrl + '/api/learners/' + learnerIdx).then(function (response) {
            response.json().then(function (learner) {
                td3.textContent = learner.firstName;
            });
        });
        ligne.appendChild(td3);

        // Création de la case Description
        const td4 = document.createElement("td");
        td4.textContent = description;
        ligne.appendChild(td4);

        // Création du bouton "Je passe mon tour"
        const td5 = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = "Je passe mon tour";

        // Détail de requête HTTP nécessaire à la créaton d'un ticket
        requestDetails = {
            // On choisit la méthode
            method: "POST",

            // On définit le corps de la requête
            body: JSON.stringify({
                date: new Date(),
                description: description,
                learnerIdx: learnerIdx,
                solved: false
            }),
            // On dit qu'on envoit du JSON (le crops de la requêtre transporte bien du JSON)
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }

        // Création d'un ticket
        fetch(baseUrl + '/api/tickets', requestDetails).then(function (response) {
            response.json().then(function (ticket) {
                td2.textContent = ticket.id;
            })
        });

        // Une fois l'apprenant dans le tableau,click pour définir la fonction
        button.addEventListener("click", function () {
            if (button.parentElement.parentElement.className === "line-through") {
                button.parentElement.parentElement.className = "";
                button.textContent = "Je passe mon tour";
            } else {
                button.parentElement.parentElement.className = "line-through";
                button.textContent = "Je veux mon tour";
            }
        });

        td5.appendChild(button);
        ligne.appendChild(td5);

        const table = document.getElementById("table-body");
        table.appendChild(ligne);

        // J'incrémente mon compteur de personnes qui ont besoin d'aide
        lineCounter++;

        // Je met à jour le lastHelpRequestName
        lastHelpRequestName = learnerIdx;

        // A la fin, on vide le champ input pour pouvoir mettre un nouveau nom.
        document.getElementById("input-name").value = "";
    } else {
        alert("Tu es déjà dans la liste mon coco.");
    }
});

// Action sur le boutton "Au Suivant"
document.getElementById("button-next").addEventListener("click", function () {
    const tableBody = document.getElementById("table-body");
    const ticketId = tableBody.firstElementChild.children[1].textContent;

    // Détail de requête HTTP nécessaire à la suppression d'un ticket
    requestDetails = {
        // On choisit la méthode
        method: "PUT",

        // On définit le corps de la requête à envoyer
        body: JSON.stringify({
            id: ticketId,
            solved: true
        }),
        // On dit qu'on envoie du JSON (le crops de la requêtre transporte bien du JSON)
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    // Suppression d'un ticket
    fetch(baseUrl + '/api/tickets/' + ticketId, requestDetails).then(function (response) {
        response.json().then(function (ticket) {
            if (tableBody.firstElementChild !== null) {
                tableBody.removeChild(tableBody.firstElementChild);
            }
        })
    });
});
