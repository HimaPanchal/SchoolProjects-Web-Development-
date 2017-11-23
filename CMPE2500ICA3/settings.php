<?php
require_once 'functions.php';
require_once 'sentinel.php';

if(isset($_SESSION['username']))
{
    $title = "ica03 - Settings: {$_SESSION['username']}";
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Settings</title>
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
      <!-- Make form -->
            <fieldset style="border-style: groove">
                <legend style="font-style: italic; font-size: small;">Add User:</legend>
            <table style="border-collapse:collapse; border-style:dashed; border-color:blue; width:40%; height:50px; border-width:1px;" align="center">
                <tr align="center"><td>UserName : <input type="text" name="user" placeholder="Supply a username"></td></tr>
                <tr align="center"><td>Password : <input type="text" name="password" placeholder="Supply your password"></td></tr>
                <tr align="center"><td><input type="submit" name="adduser" value="Add User"></td></tr>
            </table>
            </fieldset>
          <table style="border-collapse: collapse; border-color:blue;border-style:dashed;border-width:1px;" align="center">
              <tr>
                  <th style="padding-left: 15px; padding-right: 15px; border-collapse: collapse; border-color:darkgreen; border-style: solid; border-width: 1px; background-color: lightgreen;">Op</th> 
                  <th style="padding-left: 15px; padding-right: 15px; border-collapse: collapse; border-color:darkgreen; border-style: solid; border-width: 1px;">userID</th>
                  <th style="padding-left: 15px; padding-right: 15px; border-collapse: collapse; border-color:darkgreen; border-style: solid; border-width: 1px; background-color: lightgreen;">Username</th>
                  <th style="padding-left: 15px; padding-right: 15px; border-collapse: collapse; border-color:darkgreen; border-style: solid; border-width: 1px;">Encrypted Password</th>                  
              </tr>
              <?php echo GenTable(); ?>
          </table>
      
      <table style="border-collapse:collapse; border-style:solid; border-color:blue; width:100%; height:30px; border-width:1px; border-radius: 15px;">
        <tr>
            <td><?php    
            echo $pageStatus;
            ?></td>
        </tr>
      </table>
    </div>
      <div class='footer'>© 2013</div>
  </body>
</html>