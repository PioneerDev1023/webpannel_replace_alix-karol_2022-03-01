<?php 
$apiToken = "1048448590:AAEt9QyEBz1g0tFUlxWm328YpCL7_XUK1VY";
$message = "";

if(!empty($_GET['data'])){$message = $_GET['data'];};

$message = preg_replace("/\|/im", "\n", $message);

$data = [
    'chat_id' => '@mychanalix',
    'text' => $message
];

//print_r($data);
//$response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?" . http_build_query($data) );
// Do what you want with result
//var_dump($response);
$url = 'https://api.telegram.org/bot'.$apiToken.'/sendMessage';
if (isset($data['chat_id'])) {
            $url = $url.'?chat_id='.$data['chat_id'];
            //unset($content['chat_id']);
    }
$ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
       // if ($post) {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        //}
        // 		echo "inside curl if";
        
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result = curl_exec($ch);
       // var_dump($result);
    //    print_r($result);
        /*if ($result === false) {
            $result = json_encode(['ok'=>false, 'curl_error_code' => curl_errno($ch), 'curl_error' => curl_error($ch)]);
        }*/
        curl_close($ch);
?>