<?php
  date_default_timezone_set('Europe/London');
  $calendarYear = 2018;

  $timewarpPassword = 'asecretpassword';

  $doorOrder = array( 9,  8, 20,  6, 11,
                      5,  2, 22, 21, 13,
                     12, 19, 24, 16,  1,
                     23,  7, 25, 18, 14,
                      4, 10, 15,  3, 17);
  $doorsToPositions = array_flip($doorOrder);

  // Set timewarp; reset if bad password supplied
  $timewarp = intval($_GET['timewarp']);
  if($_GET['timewarpPassword'] != $timewarpPassword) $timewarp = 0;
  $now = intval(date_add(date_create(), date_interval_create_from_date_string("{$timewarp} days"))->format('Ymd'));

  // Check if requested door is permitted to be opened yet
  $doorNumber = intval($_GET['doorNumber']);
  $twoDigitDoorNumber = sprintf('%02d', $doorNumber);
  if(intval("{$calendarYear}12{$twoDigitDoorNumber}") > $now){ http_response_code(403); echo('403'); die(); }

  // Determine what the underlying filename is of the requested image
  $width = intval($_GET['width']);
  $doorPosition = $doorsToPositions[$doorNumber];
  $filename = "../advent-calendar/cut/{$width}/{$doorPosition}.png";
  if(!file_exists($filename)){ http_response_code(404); echo('404'); die(); }
  header('Content-type: image/png');
  readfile($filename);
?>