Filename=ica01Demo/index.php
<?php
require_once 'util.php'; // must work or script fail
// include_once 'util.php'; // optional include
// Global space..
$me = "Herbulon";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>ica01Demo</title>
    <link href='//fonts.googleapis.com/css?family=Ubuntu|Ubuntu+Mono|Ranchers&effect=3d' rel='stylesheet' type='text/css'>
    <style>
      body { font-size:x-large; font-family:"Ubuntu", Verdana, sans-serif; }
      h1,h1 { font-family:"Ranchers", cursive;}
      .code { font-family:"Ubuntu Mono", Consolas, monospace;}
    </style>
  </head>

  <body>
    <div>
      <header>
        <h1 class='font-effect-3d'>ica01Demo</h1>
      </header>
      <div class="content">
<?php
echo "Hi man, you are ". $me . "<br/>";
echo "Hi man, you are $me <br/>";// Double quote allows var ($) substitution
echo "Hi man, you are {$me} <br/>";// Using {} invokes var ($) substitution
echo "Your IP is " . $_SERVER['REMOTE_ADDR'] . "<br/>";
echo "Your IP is {$_SERVER['REMOTE_ADDR']} <br/>"; // var substitution
echo "_SERVER superglobal has " . count( $_SERVER) . " entries<br/>";
?>
        <hr>
<?php
// Call external function to get data, then iterate and display here.
$tmpArr = MakeArray();
$outStr = "<ol>";
foreach ($tmpArr as $value) {
  $outStr .= "<li>{$value}</li>";
}
$outStr .= "</ol>";
if( count($tmpArr) % 2 == 1 )
  echo $outStr;
else
  echo "Sorry, no output, even number of elements";
echo ShowArray($_SERVER);
echo "<hr>";
echo ShowArray($_ENV );
?>
        <hr>

        <br/>
        <br/>
      </div>
      <footer>
        <p>
          © 2015  by Λαηsεζσω
        </p>
      </footer>
    </div>
  </body>
</html>