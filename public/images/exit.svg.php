<?php
	header('Content-Type: image/svg+xml');
	header('Expires: '.gmdate('D, d M Y H:i:s \G\M\T', time() + (60 * 60 * 24)));
	$color = (isset($_GET['color']) && ctype_xdigit($_GET['color']) ? $_GET['color'] : "000000");
	$background = (isset($_GET['background']) ? $_GET['background'] : "none");
?>
<svg fill="#<?= $background ?>" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="#<?= $color ?>"/>
</svg>