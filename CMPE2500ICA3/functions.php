<?php
require_once 'db.php';
session_start(); // will hold our "validation" data
//append $userTable with db table

function Validate($params) {
    global $mysqli, $mysqli_response, $mysqli_status;
    $user = $mysqli->real_escape_string($params['username']);
    
    $query = " select password from prj_users ";
    $query .= " where username like '$user' ";
    
    if ($result = mysqliQuery($query)) //if not false, good to go
    { 
        $row = $result->fetch_assoc();
        
            if ( isset($row['password']) ) // check for user 
        {
            $params['status'] = password_verify($params['password'], $row['password']); // true if pw correct
        
        if ($params['status'] == false)
        {
                $params['response'] = "Incorrect password";
        }
        else
            $params['response'] = "Login successful!";
        }
        else
        {
            $params['response'] = "User not found";
        }
    }
    return $params;
}
function GenTable() {
    global $mysqli, $mysqli_response, $mysqli_status;
    $constraint = $mysqli->real_escape_string($constraint);
    $query = "select userID, username, password from prj_users ";
    
    $outStr = "";
    if ($result = mysqliQuery($query))
    {
        while ($row = $result->fetch_assoc())
        {
            $outStr .= "<tr>";
            $outStr .= "<td></td><td>{$row['userID']}</td><td>{$row['username']}</td><td>{$row['password']}</td>"; // put all 4 stuffs in here in td's
            $outStr .= "</tr>";
        }
    }
    else
    {
        $outStr = "<tr><td>Error populating table</td></tr>";
    }
    return $outStr;
}
?>