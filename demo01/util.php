Filename=demo01/util.php
<?php
function MakeArray()
{
  $num = rand( 5, 10);// value between 5 and 10
  $newArray = array();
  for( $i = 0; $i < $num; ++$i )
    $newArray[$i] = $i * 2;
  shuffle($newArray); // mix it up
  return $newArray; // return to caller
}

function ShowArray( $arr )
{
  global $Name; // please sir, may I have $Name pulled into local scope ??
  // Output Name then the list...
  $outStr = "Name : {$Name} <br/><ul>";
  foreach ($arr as $k => $v) 
  {
    $outStr .= "<li>[{$k}] : {$v}</li>";
  }
  $outStr .= "</ul>";
  return $outStr;
}
