import express from "express";
import connexion from "./database/db.js";

const app = express();

app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({
        message: "API Dex fonctionne"
    });
});

app.get("/api/test-db", async (req, res) => {
    try {
        const [resultat] =
            await connexion.query(
                "SELECT NOW() AS dateServeur"
            );

        res.json(resultat);
    }
    catch (erreur) {
        console.error(erreur);

        res.status(500).json({
            erreurs: [
                "Erreur de connexion à la base"
            ]
        });
    }
});
//ok
app.get("/api/cours", async (req, res) => {
    try {
        const [cours] = await connexion.query(
            "SELECT * FROM cours"
        );

        res.json(cours);
    } catch (erreur) {
        console.error(erreur);

        res.status(500).json({
            erreurs: ["Erreur du serveur"]
        });
    }
});

app.listen(3000, () => {
    console.log(
        "Serveur lancé sur http://localhost:3000"
    );
});