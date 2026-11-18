import {
    obtenirTravail,
    enregistrerDisponibilites
}
from "./api.js";

const travailId =
    document
        .querySelector("#app")
        .dataset
        .travailId;

const travail =
    await obtenirTravail(
        travailId
    );

let html = `
    <h1>${travail.titre}</h1>

    <p>${travail.description}</p>

    <h2>Étudiant</h2>

    <p>Matricule</p>

    <input
        id="matricule">

    <p>Nom</p>

    <input
        id="nom">

    <h2>
        Créneaux disponibles
    </h2>
`;

for (const creneau of travail.creneaux)
{
    html += `
        <div>

            <label>

                <input
                    type="checkbox"
                    value="${creneau.id}">

                ${creneau.debut}
                -
                ${creneau.fin}

            </label>

        </div>
    `;
}

html += `
    <br>

    <button
        id="sauver">

        Enregistrer

    </button>
`;

document.querySelector("#app").innerHTML =
    html;

document.querySelector("#matricule").value =
    localStorage.getItem(
        "matricule"
    ) ?? "";

document.querySelector("#nom").value =
    localStorage.getItem(
        "nom"
    ) ?? "";

document
    .querySelector("#sauver")
    .addEventListener(
        "click",
        async () =>
        {
            const matricule =
                document.querySelector(
                    "#matricule"
                ).value;

            const nom =
                document.querySelector(
                    "#nom"
                ).value;

            const creneaux =
                [
                    ...document.querySelectorAll(
                        "input[type='checkbox']:checked"
                    )
                ]
                .map(
                    checkbox => checkbox.value
                );

            localStorage.setItem(
                "matricule",
                matricule
            );

            localStorage.setItem(
                "nom",
                nom
            );

            await enregistrerDisponibilites(
                travailId,
                matricule,
                nom,
                creneaux
            );

            alert(
                "Disponibilités enregistrées"
            );
        }
    );