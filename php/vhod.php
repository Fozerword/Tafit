<?php
      require_once('bdconnect.php');
      $logine = "$_POST[login]";
      $password = "$_POST[password]";
      $ctx ='';
      $cookiePS='';
      set_error_handler(function($errno, $errstr, $errfile, $errline){                     //
         throw new ErrorException($errstr, 0, $errno, $errfile, $errline);                 //
      });
      if(isset($_COOKIE['password']))
      {
         $cookiePS = (string)$_COOKIE["password"];
      }
      if($cookiePS != $password)
      {
         $ctxU = hash_init('md5');
         hash_update($ctxU, $password); 
         $ctx = hash_final($ctxU);
      }else{
         $ctx  = "$_POST[password]";
      }
      if(isset($logine) and isset($ctxU));
      {  
         if($logine == 'admin')//----------------------------------------------------------------//
         {                                                                                       //                                                                                  //
            try{                                                                                 //   
               $connect->close();                                                                //
               $conn = new mysqli("192.168.0.202","admin","$ctx","music");                       //          
               if(mysqli_connect_error())                                                        // a       
               {                                                                                 // d
                  die('error' . mysql_error());                                                  // m                   
               }                                                                                 // i
               else{                                                                             // n
                  if($cookiePS != $password){                                                    // 
                     setcookie("login", $logine , time() + 600, "/");                            //    
                     setcookie("password", $ctx , time() + 600, "/");                            //
                  }                                                                              //
                  echo 'админка';                                                                //
               }                                                                                 //
            }                                                                                    //
            catch(Throwable  $e){                                                                //
               die('error');                                                                     //
            }                                                                                    //
         }//-------------------------------------------------------------------------------------//
         else{
            $sql = "SELECT username, user_password
            FROM users 
            WHERE username = '$logine' and user_password = '$ctx';";
            $result = $connect->query($sql);
            if($result->num_rows != '')//---------------------------------вход по нику
            {
               while($rowe = $result->fetch_assoc()){

                  if($cookiePS != $password){
                     setcookie("login", $logine , time() + 600, "/");
                     setcookie("password", $ctx , time() + 600, "/");
                  }
                     echo $rowe["username"];
                  
               }
            }
            else{//-----------------------------------------------------вход по почте
                  $sql = "SELECT user_email, user_password, username
                  FROM users 
                  WHERE user_email = '$logine' and user_password = '45854';";
                  $results = $connect->query($sql);
                  if($results->num_rows != '')
                  {//-------------------------------------------проверка куки
                     while($rowe = $results->fetch_assoc()){
                        if($cookiePS != $password){
                           setcookie("login", $logine , time() + 600, "/");
                           setcookie("password", $ctx , time() + 600, "/");
                        }
                           echo $rowe["username"];
                     }
                  }
                  else{
                     echo 'error';
                  }
            }
            
         }
      }
   ?>