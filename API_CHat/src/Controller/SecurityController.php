<?php

namespace App\Controller;

use App\Services\SecurityServices;
use Psr\Log\LoggerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use PhpParser\Node\Stmt\Catch_;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class SecurityController extends AbstractController
{

    private $logger;
    private $service;

    
    public function __construct(LoggerInterface $logger, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $manager, SecurityServices $service)
    {
        $this->logger = $logger;
        $this->userPasswordHasher = $userPasswordHasher;
        $this->EntityManagerInterface = $manager;
        $this->service = $service;
    }

    #[Route('/api/register', name: 'register',methods:['POST'])]
    public function index(Request $request): Response
    {
        try{
            $post = json_decode($request->getContent(),true);
            $this->service->register($post['pseudo'],$post['password']);
        }
        catch(Exception $e){
            return $this->json($e->getMessage(),500);
        }
        return $this->json('Utilisateur Enregistré');
        
    }

    

    // #[Route('/api/users', name: 'register',methods:['PUT'])]
    // public function update(Request $request): Response
    // {
    //     try{
    //         $post = json_decode($request->getContent(),true);
    //         $this->service->register($post['pseudo'],$post['password']);
    //     }
    //     catch(Exception $e){
    //         return $this->json($e->getMessage(),500);
    //     }
    //     return $this->json('Utilisateur Enregistré');
        
    // }
}
