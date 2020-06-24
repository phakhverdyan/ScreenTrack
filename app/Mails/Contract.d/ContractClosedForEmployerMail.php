<?php

namespace App\Mail\Contract;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\User;

class ContractClosedForEmployerMail extends Mailable
{
    use Queueable, SerializesModels;

    public $contract_title;
    public $contract_hourly_rate;
    public $employee_full_name;

    public function __construct($options)
    {
        foreach ($options as $option_key => $option_value) {
            $this->{$option_key} = $option_value;
        }
    }

    public function build()
    {
        return $this->view('emails.contract.closed_for_employer')
            ->subject("Contract where you're employer was closed");
    }
}
