import express from "express";
import connexion from "./database/db.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({
        message: "API Dex fonctionne"
    });
});

app.get("/api/test-db", async (req, res) => {
    try {
        const [resultat] = await connexion.query(
            "SELECT NOW() AS dateServeur"
        );

        res.json(resultat);
    } catch (erreur) {
        console.error(erreur);

        res.status(500).json({
            erreurs: ["Erreur de connexion à la base"]
        });
    }
});

app.get("/api/cours", async (req, res) => {
    try {
        const [cours] = await connexion.query(
            "SELECT * FROM cours"
        );

        res.json(cours);
    } catch (erreur) {
        console.error(erreur);

        res.status(500).json({
            erreurs: ["Erreur serveur"]
        });
    }
});

app.get("/api/travaux", async (req, res) => {
    try {
        const [travaux] = await connexion.query(
            "SELECT * FROM travaux WHERE ouvert = 1"
        );

        res.json(travaux);
    } catch (erreur) {
        console.error(erreur);

        res.status(500).json({
            erreurs: ["Erreur serveur"]
        });
    }
});

app.get("/api/travaux/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const [travaux] = await connexion.query(
            "SELECT * FROM travaux WHERE id = ?",
            [id]
        );

        if (travaux.length === 0) {
            return res.status(404).json({
                erreurs: ["Travail introuvable"]
            });
        }

        const [creneaux] = await connexion.query(
            "SELECT * FROM creneaux WHERE travail_id = ?",
            [id]
        );

        res.json({
            ...travaux[0],
            creneaux
        });

    } catch (erreur) {
        console.error(erreur);

        res.status(500).json({
            erreurs: ["Erreur serveur"]
        });
    }
});

app.get("/api/travaux/:id/disponibilites", async (req, res) => {
    try {

        const [resultats] = await connexion.query(
            `
            SELECT
                creneau_id,
                COUNT(*) AS nombre,
                GROUP_CONCAT(nom SEPARATOR ', ') AS etudiants
            FROM disponibilites
            WHERE travail_id = ?
            GROUP BY creneau_id
            `,
            [req.params.id]
        );

        res.json(resultats);

    } catch (erreur) {

        console.error(erreur);

        res.status(500).json({
            erreurs: ["Erreur serveur"]
        });

    }
});

app.put("/api/travaux/:id/disponibilites/:matricule", async (req, res) => {
    try {

        const travailId = req.params.id;
        const matricule = req.params.matricule;

        const { nom, creneaux } = req.body;

        await connexion.query(
            `
            DELETE FROM disponibilites
            WHERE travail_id = ?
            AND matricule = ?
            `,
            [travailId, matricule]
        );

        for (const creneauId of creneaux) {

            await connexion.query(
                `
                INSERT INTO disponibilites
                (
                    travail_id,
                    creneau_id,
                    matricule,
                    nom
                )
                VALUES (?, ?, ?, ?)
                `,
                [
                    travailId,
                    creneauId,
                    matricule,
                    nom
                ]
            );
        }

        res.status(204).send();

    } catch (erreur) {

        console.error(erreur);

        res.status(500).json({
            erreurs: ["Erreur serveur"]
        });

    }
});

app.listen(3000, () => {
    console.log(
        "Serveur lancé sur http://localhost:3000"
    );
});