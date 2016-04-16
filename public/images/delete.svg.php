<?php
	header('Content-Type: image/svg+xml');
	header('Expires: '.gmdate('D, d M Y H:i:s \G\M\T', time() + (60 * 60 * 24)));
	$color = (isset($_GET['color']) && ctype_xdigit($_GET['color']) ? $_GET['color'] : "000000");
	$background = (isset($_GET['background']) ? $_GET['background'] : "none");
?>
<svg fill="#<?= $background ?>" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill='#<?= $color ?>'/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>