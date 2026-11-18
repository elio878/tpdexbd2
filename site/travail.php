<?php

$id = $_GET["id"] ?? "";

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Travail</title>
</head>
<body>

<div
    id="app"
    data-travail-id="<?= htmlspecialchars($id) ?>">
</div>

<script type="module" src="js/travail.js"></script>

</body>
</html>