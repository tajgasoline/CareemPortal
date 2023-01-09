<?php

    error_reporting(1);
    // // live
    // $serverName = "192.168.0.45";//serverName\instanceName
    // $userId = "sa";
    // $userPassword = "P@ssguard11";
    // $database = "TAJ_DynamicsAX";

    // UAT
     $serverName = "MSDTESTSRV";
    $userId = "sa";
    $userPassword = "P@ssguard11";
    $database = "TAJ_DynamicsAX";


    $connectionInfo = array("UID" => $userId,
                            "PWD" => $userPassword,
                            "Database"=> $database,
                            "TrustServerCertificate"=>True);
    $MainConnect = sqlsrv_connect($serverName,$connectionInfo);
    if(!$MainConnect){
        // print_r(sqlsrv_errors(), true);
        echo "<script>alert('Oops connection Problem')</script>";
    }

?>