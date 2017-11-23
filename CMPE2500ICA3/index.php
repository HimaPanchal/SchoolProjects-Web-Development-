<?php
// Contains our Validate() function and start_session() call
require_once 'functions.php';
require_once 'sentinel.php';
     //append username onto h1
     $title = "ica03 - Index: {$_SESSION['username']}";
?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Index</title>
    <link href='//fonts.googleapis.com/css?family=Ubuntu+Condensed|Ranchers&effect=3d' rel='stylesheet' type='text/css'>
    <link rel='stylesheet' type="text/css" href='ica03.css'>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <style>
      h1,h1 { font-family:"Ranchers", cursive;}
    </style>
  </head>
  <body>
    <div class='header'>
      <h1 class='font-effect-3d'><?php echo $title; ?></h1>
    </div>
    <div class='content'>
        <table align="center" style="border-collapse: collapse; border-color: blue; border-style: dotted; border-width: 1px">
            <tr> 
                <td><a href="settings.php">Settings</a></td>
                <td><a href="">Messages</a></td>
            </tr>
            <tr>
                <td><a href="">Tag Admin</a></td>
                <td><a href="">RT Monitor</a></td>
            </tr>
            <tr>
                    <td colspan="2" align="center"><form action="login.php" method="post">
                    <input type="submit" name="submit" value="Logout">
                    </form></td>
            </tr>
        </table>
    </div>
      <div class='footer'>© 2013</div>
  </body>
</html>