<?php
    require_once('bdconnect.php');
    if($message !='')
    {
        echo $message;
    }
    else{
        $sql = 'SELECT tracks.music_name, tracks.from_music, ispolnitel.name_group, album_single.oblojka 
        FROM popular,tracks,ispolnitel,album_single 
        WHERE popular.track = tracks.id and tracks.album_single = album_single.id and album_single.ispolnil =  ispolnitel.id;';
        $result = $connect->query($sql);
        if($result->num_rows > 0)
        {
        while($row = $result->fetch_assoc()){
            //echo "name:". $row["music_name"] ."  put:". $row["from_music"] . "  ispolnitel:" . $row["name_group"] . "  pute_obl:" . $row["oblojka"];
            echo  $row["oblojka"].'*'. $row["music_name"].'*'. $row["name_group"].';';
        }
        }
        else{
            echo "Пусто!";
        }
    }

?>