<?php
	header('Content-Type: image/svg+xml');
	header('Expires: '.gmdate('D, d M Y H:i:s \G\M\T', time() + (60 * 60 * 24)));
	$color = (isset($_GET['color']) && ctype_xdigit($_GET['color']) ? $_GET['color'] : "000000");
	$background = (isset($_GET['background']) ? $_GET['background'] : "none");
?>
<svg fill="#<?= $background ?>" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#<?= $color ?>"/>
</svg>