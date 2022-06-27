<?php
    set_error_handler(function($errno, $errstr, $errfile, $errline){
        throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
    });
    $message = '';
    try
    {
        $connect = new mysqli('192.168.0.202','test','test','music');
        if($connect->connect_error)
        {
            $message = 'error';
        }
    }
    catch(Throwable  $e){
        $message = 'error';
    }


?>