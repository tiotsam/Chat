<?php


namespace App\Services;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SecurityServices {

    public function __construct( UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $manager,UserRepository $userRep)
    {
        $this->userPasswordHasher = $userPasswordHasher;
        $this->manager = $manager;
        $this->userRep = $userRep;
    }

    public function register( $pseudo , $pass ){

        $user = new User;


        if($this->userRep->findOneBy(['pseudo' => $pseudo])){
            throw new Exception('Le pseudo : '.$pseudo.' existe déjà');
        }else{
            $user->setPseudo($pseudo);
            $user->setRoles(['ROLE_USER']);
            $user->setPassword($this->userPasswordHasher->hashPassword($user,plainPassword:$pass));
            
            $this->manager->persist($user);
            $this->manager->flush();
        }
    }
}