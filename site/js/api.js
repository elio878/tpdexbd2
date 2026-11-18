import { API_URL } from "./config.js";

export async function obtenirTravaux() {

    const reponse =
        await fetch(`${API_URL}/travaux`);

    return await reponse.json();
}

export async function obtenirTravail(id) {

    const reponse =
        await fetch(`${API_URL}/travaux/${id}`);

    return await reponse.json();
}

export async function enregistrerDisponibilites(
    travailId,
    matricule,
    nom,
    creneaux
) {

    await fetch(
        `${API_URL}/travaux/${travailId}/disponibilites/${matricule}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nom,
                creneaux
            })
        }
    );
}