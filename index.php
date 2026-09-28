<?php 

require __DIR__ . '/vendor/autoload.php';

use App\Controller\Controller_View;
use Pecee\SimpleRouter\SimpleRouter;
use Dotenv\Dotenv;
header("X-Frame-Options: DENY");
header("Referrer-Policy: strict-origin-when-cross-origin");
//header("Strict-Transport-Security: max-age=31536000; includeSubDomains");

$dotenv = Dotenv::createImmutable(__DIR__ . '');

$dotenv->load();




SimpleRouter::get('/',[Controller_View::class,'index']);
SimpleRouter::get('/login' , [Controller_View::class,'login']);


SimpleRouter::start();




?>