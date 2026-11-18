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

    <h2>Identification</h2>

    <p>
        Matricule
    </p>

    <input
        id="matricule">

    <p>
        Nom
    </p>

    <input
        id="nom">

    <h2>
        Créneaux disponibles
    </h2>

    <form>

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
            id="btnSauver"
            type="button">

            Enregistrer

        </button>

    </form>
`;

document.querySelector("#app").innerHTML =
    html;

document
    .querySelector("#btnSauver")
    .addEventListener(
        "click",
        () =>
        {
            localStorage.setItem(
                "matricule",
                document.querySelector(
                    "#matricule"
                ).value
            );

            localStorage.setItem(
                "nom",
                document.querySelector(
                    "#nom"
                ).value
            );

            alert(
                "Informations sauvegardées"
            );
        }
    );

document.querySelector("#matricule").value =
    localStorage.getItem(
        "matricule"
    ) ?? "";

document.querySelector("#nom").value =
    localStorage.getItem(
        "nom"
    ) ?? "";