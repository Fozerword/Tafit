<?php
    require_once('bdconnect.php');
    if($message !='')
    {
        echo $message;
    }
    else{
        if(isset($_POST["name"]))
        {
            $sql = 'SELECT album_single.name
            FROM ispolnitel,album_single
            WHERE ispolnitel.name_group = "' .$_POST["name"]. '" and ispolnitel.id = album_single.ispolnil;';
            $result = $connect->query($sql);
            if($result->num_rows > 0)
            {
                while($row = $result->fetch_assoc()){
                    //echo "name:". $row["music_name"] ."  put:". $row["from_music"] . "  ispolnitel:" . $row["name_group"] . "  pute_obl:" . $row["oblojka"];
                    echo  $row["name"]. ';';
                }
            }
            else{
                echo "Пусто!";
            }
        }
        else{
            $sql = 'SELECT ispolnitel.name_group
            FROM ispolnitel ;';
            $result = $connect->query($sql);
            if($result->num_rows > 0)
            {
                while($row = $result->fetch_assoc()){
                    //echo "name:". $row["music_name"] ."  put:". $row["from_music"] . "  ispolnitel:" . $row["name_group"] . "  pute_obl:" . $row["oblojka"];
                    echo  $row["name_group"]. ';';
                }
            }
            else{
                echo "Пусто!";
            }
        }
    }
?>