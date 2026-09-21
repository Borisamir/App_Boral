<?php

namespace App\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class Middleware{



     public static function verify_jwt(){

       

       try{

           $token =$_COOKIE['jwt'] ?? null;

           if(!$token){
                 http_response_code(401);
                 throw new \Exception('Token inexistente');
            
            }

           JWT::decode(
               $token,
               new Key($_ENV['jwt'] ,'HS256' )
              );

       }catch(\Exception $e){
            
            header('Location: login');
            exit;
       }

     }

}

?>