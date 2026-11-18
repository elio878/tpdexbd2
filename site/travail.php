<?php

$titre = "Travail";

require "includes/entete.php";

?>

<div id="app"
     data-travail-id="<?= htmlspecialchars($id) ?>">
</div>

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script type="module" src="js/travail.js"></script>

<?php

require "includes/pied.php";

?>