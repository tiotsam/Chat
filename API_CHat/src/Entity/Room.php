<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\RoomRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=RoomRepository::class)
 */
#[ApiResource(
     normalizationContext: ['groups' => ['read_rooms']],
     itemOperations: [
        'PUT','DELETE','PATCH',
        'get'=> [
            'normalization_context' => ['groups' => ['read_room']],
        ],
    ],
    )]
class Room
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(["read_room",'read_rooms'])]
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(["read_room",'read_rooms'])]
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Message::class, mappedBy="room", orphanRemoval=true)
     */
    #[Groups(['read_room'])]
    private $messages;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="bannedRooms")
     * @ORM\JoinTable(name="banned_user")
     */
    #[Groups(['read_rooms'])]
    private $bannedUsers;

    public function __construct()
    {
        $this->messages = new ArrayCollection();
        $this->bannedUsers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Message[]
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages[] = $message;
            $message->setRoom($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getRoom() === $this) {
                $message->setRoom(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getBannedUsers(): Collection
    {
        return $this->bannedUsers;
    }

    public function addBannedUser(User $bannedUser): self
    {
        if (!$this->bannedUsers->contains($bannedUser)) {
            $this->bannedUsers[] = $bannedUser;
        }

        return $this;
    }

    public function removeBannedUser(User $bannedUser): self
    {
        $this->bannedUsers->removeElement($bannedUser);

        return $this;
    }
}
