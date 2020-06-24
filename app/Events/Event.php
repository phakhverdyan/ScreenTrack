<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class Event
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(array $options)
    {
    	foreach ($options as $option_key => $option_value) {
    	    $this->{$option_key} = $option_value;
    	}

    	if (method_exists($this, 'handle')) {
    		$this->handle();
    	}
    }
}
