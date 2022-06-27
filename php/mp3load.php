<?php
    $message = '';
    $pasw = $_COOKIE['password'];
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

    if($message !='' && !isset($_COOKIE['nameTrack']) && !isset($_COOKIE['nameGroup']) )
    {
        echo $message;
    }
    else{
        $nameTrack = $_COOKIE['nameTrack'];
        $nameGroup = $_COOKIE['nameGroup'];
        $nameAlbum = $_COOKIE['nameAlbum'];
        $path = __DIR__ ;
        // Название <input type="file">
        $input_name = 'fileMP3';   
        
        $error = $success = '';
        if (!isset($_FILES[$input_name])) {
            $error = 'Файл не загружен.';
        } else {
            $file = $_FILES[$input_name];
        
            // Проверим на ошибки загрузки.
            if (!empty($file['error']) || empty($file['tmp_name'])) {
                $error = 'Не удалось загрузить файл.';
            } elseif ($file['tmp_name'] == 'none' || !is_uploaded_file($file['tmp_name'])) {
                $error = 'Не удалось загрузить файл.';
            } else {
        
                
                    // Перемещаем файл в директорию.
                    if (move_uploaded_file($file['tmp_name'], $path . $nameTrack)) {
                        // Далее можно сохранить название файла в БД и т.п.
                        $success = '<p style="color: green">Файл «' . $nameTrack . '» успешно загружен.</p>';
                        $sql = "UPDATE tracks SET from_music='" . $path . $nameTrack ."';
                                WHERE tracks.from_music = 'suda_kiday';"
                        $result = $connect->query($sql);

                    } else {
                        $error = 'Не удалось загрузить файл.';
                    }
                
            }
        }
        
        // Вывод сообщения о результате загрузки.
        if (!empty($error)) {
            $error = '<p style="color: red">' . $error . '</p>';  
        }
        
        $data = array(
            'error'   => $error,
            'success' => $success,
        );
        
        header('Content-Type: application/json');
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        exit();
    }
?>
   