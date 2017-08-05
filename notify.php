<?php 

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
     
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         
     
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
     
    }


$servername = "localhost";
$username = "id1923973_zaion_user01";
$password = "Zaion1250";
$dbname = "id1923973_01_curso";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn2 = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
    
    //echo ">>." . PHP_EOL;


    $actualizar=[];
    $strQuery = "select  b.codigo,a.id_notificacion,a.titulo,a.descripcion from admin_notifi a,admin_usu_disp b where a.id_usu=b.id_usu and  a.enviado=0";
    if ($conn->multi_query($strQuery)){
        if ($result=$conn->store_result()){
            while($row=$result->fetch_assoc()){
                $codigo[0]=$row["codigo"];
                $mensaje=$row["descripcion"];
                // $pushStatus = sendPushNotificationToGCM($row['id_notificacion'],$codigo, $mensaje, $row["titulo"],1);
                $response = sendMessage();
                $return["allresponses"] = $response;
                $return = json_encode( $return);
                
                print("\n\nJSON received:\n");
                print($return);
                print("\n");

                echo '############################################################################';
                if($pushStatus==1){
                    array_push($actualizar,$row['id_notificacion']);

                } 
                
            }
            $result->free();
        }
    }
    foreach ($actualizar as $valor){
        $strQuery = "update  admin_notifi set enviado=1 where id_notificacion=".$valor;
        echo $strQuery;
        //$conn->multi_query($strQuery);
    }
  



    function sendMessage(){
        $content = array(
            "en" => 'English Message'
            );
        
        $fields = array(
            'app_id' => "8b216f71-d16c-4510-9829-aabe8defa406",
            'include_player_ids' => array("4b445762-999b-42d1-a076-4fbc52784cf3"),
            'data' => array("foo" => "bar"),
            'contents' => $content
        );
        
        $fields = json_encode($fields);
        print("\nJSON sent:\n");
        print($fields);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
                                                   'Authorization: Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

        $response = curl_exec($ch);
        curl_close($ch);
        
        return $response;
    }
    
   


?>