<?php
	header('Content-Type: image/svg+xml');
	$color = (isset($_GET['color']) && ctype_xdigit($_GET['color']) ? $_GET['color'] : "000000");
	$background = (isset($_GET['background']) ? $_GET['background'] : "none");
?>
<svg fill="#<?= $color ?>" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    <path d="M0 0h24v24H0z" fill="<?= $background ?>"/>
</svg>
