<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationSuccessResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\EventDispatcher\Event;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTEncodedEvent;

class UpdateUserListener
{
    /**
     * @param UpdateUserListener $event
     */
    public function onAuthenticationSuccessResponse(UpdateUserListener $event, JWTEncodedEvent $eventJWT)
    {
        $data = $event->getData();
        $user = $event->getUser();
        
        $token = $eventJWT->getJWTString();

        if (!$user instanceof UserInterface) {
            return;
        }

        $data['data'] = array(
            'roles' => $user->getRoles(),
            'username' => $user->getUserIdentifier(),
            'user_id' => $user->getId(),
            'jwt'=> $token->getJWTString()
        );

        $event->setData($data);
    }
}


?>