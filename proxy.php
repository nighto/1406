<?php
$url = 'http://200.222.65.84:8080/pcrj_ws_mobile/WsMobile.asmx/MeusProtocolos?__xmlMeusProtocolos='.urlencode($_GET["__xmlMeusProtocolos"]);
echo file_get_contents($url);
 ?>