<?php 


namespace App\Controller;

use function Helpers\view;

use App\Middleware\Middleware;

class Controller_View{


    public function login(){

        view('login');

    }

    public function index(){

        Middleware::verify_jwt();

    
        view('index');

    }




}




?>