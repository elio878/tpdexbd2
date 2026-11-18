import { API_URL } from "./config.js";

export async function obtenirCours() {
    const reponse =
        await fetch(`${API_URL}/cours`);

    return await reponse.json();
}

export async function obtenirTravaux() {
    const reponse =
        await fetch(`${API_URL}/travaux`);

    return await reponse.json();
}