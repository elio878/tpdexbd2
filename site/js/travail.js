import { obtenirTravail } from "./api.js";

const travailId =
    document
        .querySelector("#app")
        .dataset
        .travailId;

const travail =
    await obtenirTravail(travailId);

let html = `
    <h1>${travail.titre}</h1>

    <p>${travail.description}</p>

    <h2>Créneaux disponibles</h2>

    <ul>
`;

for (const creneau of travail.creneaux)
{
    html += `
        <li>
            ${creneau.debut}
            -
            ${creneau.fin}
        </li>
    `;
}

html += "</ul>";

document.querySelector("#app").innerHTML =
    html;