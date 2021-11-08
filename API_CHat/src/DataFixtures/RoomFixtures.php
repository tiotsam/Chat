<?php

namespace App\DataFixtures;

use App\Entity\Room;
use App\Repository\UserRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class RoomFixtures extends Fixture implements DependentFixtureInterface
{
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        $room = new Room;
        $room->setName('Général');
        $manager->persist($room);

        $room1 = new Room;
        $room1->setName('Région');
        $manager->persist($room1);

        $room2 = new Room;
        $room2->setName('Jeux');
    
        $user = $this->userRepository->findOneBy(array('pseudo'=>'toto'));

        $room2->addBannedUser($user);
        $manager->persist($room2);

        $room3 = new Room;
        $room3->setName('Séries');
        $manager->persist($room3);

        $room4 = new Room;
        $room4->setName('Film');
        $manager->persist($room4);

        $manager->flush();
    }

    public function getDependencies(){

        return [UserFixtures::class];

    }
}
