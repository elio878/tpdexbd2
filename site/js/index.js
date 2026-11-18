import { obtenirTravaux } from "./api.js";

const { createApp } = Vue;

createApp({
    data() {
        return {
            travaux: []
        };
    },

    async mounted() {
        this.travaux = await obtenirTravaux();
    },

    template: `
        <div>

            <h1>Travaux ouverts</h1>

            <ul>

                <li
                    v-for="travail in travaux"
                    :key="travail.id">

                    <a
                        :href="'travail.php?id=' + travail.id">

                        {{ travail.titre }}

                    </a>

                </li>

            </ul>

        </div>
    `
}).mount("#app");