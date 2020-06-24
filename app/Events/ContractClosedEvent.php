<?php

namespace App\Events;

use App\Models\Contract;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class ContractClosedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $contract;

    public function __construct(Contract $contract)
    {
        $this->contract = $contract;
    }
}
