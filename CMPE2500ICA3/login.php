<?php
// call to start_session and Validate function
// Now session has started, have encrypted password
require_once 'functions.php';

if (isset($_POST['submit']) && $_POST['submit'] == 'Logout') //logout
{
    session_unset();
    session_destroy();
    // fall through and display login page normally, not logging in.
}

// Check if login/logout processing
if (isset($_POST['submit']) && $_POST['submit'] == 'Login' && //login
    isset($_POST['user']) && strlen($_POST['user']) > 0 &&
    isset($_POST['password']) && strlen($_POST['password']) > 0)
{
    $params = array();
    $params['username'] = strip_tags($_POST['user']);
    $params['password'] = strip_tags($_POST['password']);
    $params['response'] = "";
    $params['status'] = false;
    
    // Validate
    $valid = Validate($params);
    if($valid['status']) //true so valid
    {
        $_SESSION['username'] = $valid['username'];
        header("location:index.php"); //after redirect always die! moving to dif page
        die();
    }
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Login</title>
    <link href='//fonts.googleapis.com/css?family=Ubuntu+Condensed|Ranchers&effect=3d' rel='stylesheet' type='text/css'>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="ica03.css">
    <style>
        h1,h1 { font-family:"Ranchers", cursive;}
    </style>
  </head>
  <body>
    <div class="header">
      <h1 class='font-effect-3d'>ica03 - Login</h1>
    </div>
    <div class="content">
      <form action="login.php" method="post">
          <table style="border-collapse:collapse; border-style:dashed; border-color:blue; width:40%; height:50px; border-width:1px;" align="center">
              <tr align="center"><td>UserName : <input type="text" name="user" placeholder="Supply a username"> (admin)</td></tr>
            <tr align="center"><td>Password : <input type="text" name="password" placeholder="Supply your password">(god)</td></tr>
            
            <tr align="center"><td><input type="submit" name="submit" value="Login"></td></tr>
            <tr align="center"><td><input type="submit" name="submit" value="Logout"></td></tr>
          </table>
        </form>
        <table style="border-collapse: collapse; border-color:blue;border-style:solid;border-width:1px; border-radius: 15px; width: 100%;" align="center">
            <tr><td><?php echo "Login Result : {$valid['response']}";?></td></tr>
        </table>
    </div>
      <div class='footer'>
          © 2013
      </div>
  </body>
</html>