<!DOCTYPE HTML>
<html lang="de">
<head>
	<title>tasky</title>
	<meta name="viewport" content="minimal-ui, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	<link rel="manifest" href="manifest.json">

	<link rel="stylesheet" href="./vendor/font-awesome/css/font-awesome.min.css"/>
	<link rel="stylesheet" href="./vendor/jquery-mobile/jquery.mobile-1.4.5.min.css"/>
	<link rel="stylesheet" href="./vendor/waves/waves.min.css"/>
	<link rel="stylesheet" href="./vendor/wow/animate.css"/>
	<link rel="stylesheet" href="./vendor/nativedroid2/css/nativedroid2.css"/>
	<link rel="stylesheet" href="./vendor/nativedroid2/css/nativedroid2.color.blue-grey.css"/>
	<link rel="stylesheet" href="./resources/css/style.css"/>

	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes"/>
	<meta name="apple-mobile-web-app-status-bar-style" content="black"/>

	<style>
		/* Prevent FOUC */
		body {
			opacity: 0;
		}
	</style>

</head>
<body class="clr-accent-lime">

<!-- LOGIN page-->
<?php require_once('./fragments/page.login.html'); ?>

<!-- REGISTER page-->
<?php require_once('./fragments/page.register.html'); ?>

<!-- HOME page-->
<?php require_once('./fragments/page.home.html'); ?>

<!-- CREATE TASK page -->
<?php require_once('./fragments/page.task.add.html'); ?>

<script src="./vendor/jquery/jquery-3.1.1.min.js"></script>
<script src="./vendor/jquery/jquery-migrate-3.0.0.js"></script>
<script src="./vendor/jquery-ui/jquery-ui.min.js"></script>
<script src="./vendor/jquery-validate/jquery.validate.min.js"></script>
<script src="./vendor/jquery-mobile/jquery.mobile-1.4.5.min.js"></script>
<script src="./vendor/idb/lib/idb.js"></script>
<script src="./vendor/waves/waves.min.js"></script>
<script src="./vendor/wow/wow.min.js"></script>
<script src="./vendor/nativedroid2/js/nativedroid2.js"></script>
<script src="./vendor/fingerprint2js/fingerprint2.js"></script>
<script src="./config/nd2settings.js"></script>
<script src="./resources/js/pushFunctions.js"></script>
<script src="./resources/js/indexedDB.js"></script>
<script src="./resources/js/app.js"></script>
<script src="./resources/js/validation.js"></script>
<script src="./resources/js/home.js"></script>
</body>
</html>
