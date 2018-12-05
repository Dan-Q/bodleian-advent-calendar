<?php date_default_timezone_set('Europe/London'); ?><!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Advent Calendar</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" type="text/css" href="advent.css">
</head>
<body class="loading">
  <div class="wrapper">
    <div class="portrait-only notification">Looks better if you turn your device sideways!</div>
    <div class="calendar" data-now="<?php echo date('D M d Y H:i:s O'); ?>" data-timewarp="" data-timewarp-password=""></div>
  </div>
  <script type="text/javascript" src="advent.js"></script>
</body>
</html>
