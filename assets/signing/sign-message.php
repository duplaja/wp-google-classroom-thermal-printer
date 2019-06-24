<?php
/*
 * Echoes the signed message and exits
 */

// Sample key.  Replace with one used for CSR generation
$KEY = 'key.pem';
//$PASS = 'Somepassword';

$req = $_GET['request'];
$privateKey = openssl_get_privatekey(file_get_contents($KEY) /*, $PASS*/ );

$signature = null;
openssl_sign($req, $signature, $privateKey);


if ($signature) {
	header("Content-type: text/plain");
	echo base64_encode($signature);
	exit(0);
}

echo '<h1>Error signing message</h1>';
exit(1);

?>