<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private $userPasswordHasher;

    public function __construct(UserPasswordHasherInterface $userPasswordHasher)
    {
      $this->userPasswordHasher = $userPasswordHasher;  
    }

    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        $userA = new User;
        $userA->setPseudo('admin');
        $userA->setRoles(['ROLE_ADMIN']);
        $userA->setPassword($this->userPasswordHasher->hashPassword($userA,plainPassword:'adminPass'));
        $manager->persist($userA);

        $user = new User;
        $user->setPseudo('toto');
        $user->setRoles(['ROLE_USER']);
        $user->setPassword($this->userPasswordHasher->hashPassword($user,plainPassword:'totoPass'));
        $manager->persist($user);


        $manager->flush();
    }
}
