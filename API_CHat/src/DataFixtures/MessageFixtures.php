<?php

namespace App\DataFixtures;

use App\Entity\Message;
use App\Repository\UserRepository;
use App\Repository\RoomRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class MessageFixtures extends Fixture implements DependentFixtureInterface
{
    public function __construct(UserRepository $userRepository,RoomRepository $roomRep )
    {
        $this->userRepository = $userRepository;
        $this->roomRep = $roomRep;
    }

    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        $msg = new Message();
        
        $user = $this->userRepository->findOneBy(array('pseudo'=>'toto'));
        $room = $this->roomRep->findOneBy(array('name'=>'Général'));

        $msg->setContent('Coucou');
        $msg->setRoom($room);
        $msg->setAuthor($user);

        $manager->persist($msg);
        $manager->flush();
    }

    public function getDependencies(){

        return [UserFixtures::class,RoomFixtures::class];

    }
}
