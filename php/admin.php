<?php

    $message = '';
    $pasw = $_COOKIE['password'];
    setcookie('nameTrack',$_POST['nameTrack'],time()+10000, '/');
    setcookie('nameGroup',$_POST['nameGroup'],time()+10000, '/');
    set_error_handler(function($errno, $errstr, $errfile, $errline){                     //
        throw new ErrorException($errstr, 0, $errno, $errfile, $errline);                 //
    });
    try
    {
        $connect = new mysqli('192.168.0.202',"admin","$pasw",'music');
        if($connect->connect_error)
        {
            $message = 'error';
        }
    }
    catch(Throwable  $e){
        $message = 'error';
    }

    if($message !='')
    {
        echo $message;
    }
    else{
        if(isset($_POST['nameTrack']) && isset($_POST['nameGroup']))
        {
            $keyI='';
            $keyA='';
            $sql = "SELECT ispolnitel.id
            FROM ispolnitel
            WHERE ispolnitel.name_group = '" . $_POST['nameGroup']. "' ;";
            $result = $connect->query($sql);
            if($result->num_rows > 0)
            {   //------------------------------------------исполнитель есть
                while($row = $result->fetch_assoc())
                {
                    $keyI = $row['id'];
                }

                if($_POST['nameAlbum']==''){//---------------------------------это сингл
                    $sql = "INSERT INTO album_single (name,oblojka,ispolnil,vipusk)  
                    VALUES ('" . $_POST['nameTrack'] . "','oblojka'," . $keyI . ",2022);";
                    setcookie('nameAlbum',$_POST['nameTrack'],time()+10000, '/');
                    $result = $connect->query($sql);
                    $sql = "SELECT album_single.id
                    FROM ispolnitel, album_single
                    WHERE ispolnitel.name_group = '" . $_POST['nameGroup'] . "' and album_single.name = '" . $_POST['nameTrack'] . "' and album_single.ispolnil = ispolnitel.id; ";
                    $result = $connect->query($sql);
                    if($result->num_rows > 0)
                    {
                        while($rowe = $result->fetch_assoc()){
                            $keyA = $rowe["id"];

                        }
                    }
                }
                else{
                     //------------------------------------------------------------------альбомль есть
                    setcookie('nameAlbum',$_POST['nameAlbum'],time()+10000, '/');
                    $sql = "SELECT album_single.id
                    FROM ispolnitel, album_single
                    WHERE ispolnitel.name_group= '". $_POST['nameGroup']. "' and album_single.name = '" .$_POST['nameAlbum'] . "' and album_single.ispolnil = ispolnitel.id; ";
                    $result = $connect->query($sql);
                    if($result->num_rows > 0)
                    {
                        while($rowe = $result->fetch_assoc()){
                            $keyA = $rowe["id"];
                        }
                    }
                    else{//--------------------------------------------------алобом не найден но мы его создадим
                        $sql = "INSERT INTO album_single (name,oblojka,ispolnil,vipusk)  
                            VALUES ('" . $_POST['nameAlbum'] . "','oblojka'," . $keyI . ",2022);";
                            $result = $connect->query($sql);
                            $sql = "SELECT album_single.id
                            FROM ispolnitel, album_single
                            WHERE ispolnitel.name_group = '" . $_POST['nameGroup'] . "' and album_single.name = '" . $_POST['nameAlbum'] . "' and album_single.ispolnil = ispolnitel.id; ";
                            $result = $connect->query($sql);
                            if($result->num_rows > 0)
                            {
                                while($rowe = $result->fetch_assoc()){
                                    $keyA = $rowe["id"];
                                }
                            }
                    }
                }
            }
            else{//-------------------------------------------------создаем исполнителя
                $sql = "INSERT INTO ispolnitel (name_group,oblojka,avatarka)  
                    VALUES ('" . $_POST['nameGroup'] . "','oblojka','ava');";
                    $result = $connect->query($sql);

                    $sql = "SELECT ispolnitel.id
                    FROM ispolnitel
                    WHERE ispolnitel.name_group = '" . $_POST['nameGroup'] . "';";
                    $result = $connect->query($sql);
                    if($result->num_rows > 0)
                    {
                        while($rowe = $result->fetch_assoc()){
                            $keyI = $rowe["id"];
                        }
                    }
                    if($_POST['nameAlbum']==''){//---------------------------------------------это сингл
                        $sql = "INSERT INTO album_single (name,oblojka,ispolnil,vipusk)  
                        VALUES ('" . $_POST['nameTrack'] . "','oblojka'," . $keyI . ",2022);";
                        $result = $connect->query($sql);
                        $sql = "SELECT album_single.id
                        FROM ispolnitel, album_single
                        WHERE ispolnitel.name_group = '" . $_POST['nameGroup'] . "' and album_single.name = '" . $_POST['nameTrack'] . "' and album_single.ispolnil = ispolnitel.id; ";
                        $result = $connect->query($sql);
                        if($result->num_rows > 0)
                        {
                            while($rowe = $result->fetch_assoc()){
                                $keyA = $rowe["id"];
                            }
                        }
                    }
                    else{
                         //------------------------------------------------------------------альбомль есть
                        $sql = "SELECT album_single.id
                        FROM ispolnitel, album_single
                        WHERE ispolnitel.name_group= '". $_POST['nameGroup']. "' and album_single.name = '" .$_POST['nameAlbum'] . "' and album_single.ispolnil = ispolnitel.id; ";
                        $result = $connect->query($sql);
                        if($result->num_rows > 0)
                        {
                            while($rowe = $result->fetch_assoc()){
                                $keyA = $rowe["album_single.id"];
                            }
                        }
                        else{//---------------------------------------албом не найден но мы его создадим
                            $sql = "INSERT INTO album_single (name,oblojka,ispolnil,vipusk)  
                            VALUES ('" . $_POST['nameAlbum'] . "','oblojka'," . $keyI . ",2022);";
                            $result = $connect->query($sql);
                            $sql = "SELECT album_single.id
                            FROM ispolnitel, album_single
                            WHERE ispolnitel.name_group = '" . $_POST['nameGroup'] . "' and album_single.name = '" . $_POST['nameAlbum'] . "' and album_single.ispolnil = ispolnitel.id; ";
                            $result = $connect->query($sql);
                            if($result->num_rows > 0)
                            {
                                while($rowe = $result->fetch_assoc()){
                                    $keyA = $rowe["id"];
                                }
                            }
                        }
                    }
            }
            if($keyI != '' && $keyA != '')
            {
                $sql = "INSERT INTO tracks (music_name,album_single,from_music)  
                VALUES ('". $_POST['nameTrack'] . "'," . $keyA .",'suda_kiday');";
                $result = $connect->query($sql);
            }
        }
    }
    

?>