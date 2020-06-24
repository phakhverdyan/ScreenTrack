<?php

namespace App\Listeners;

use App\Events\ContractClosedEvent;
use App\Mail\Contract\ContractClosedForEmployeeMail;
use App\Mail\Contract\ContractClosedForEmployerMail;
use App\Models\Contract;
use Illuminate\Support\Facades\Mail;

class ContractClosedListener
{
    public function handle(ContractClosedEvent $event)
    {
        $this->notifyEmployer($event->contract);
        $this->notifyEmployee($event->contract);
    }

    private function notifyEmployer(Contract $contract) {
        Mail::to($contract->employer_user->email)->queue(new ContractClosedForEmployerMail([
            'contract_title' => $contract->title,
            'contract_hourly_rate' => $contract->hourly_rate,
            'employee_full_name' => $contract->employee_user->full_name,
        ]));
    }

    private function notifyEmployee(Contract $contract) {
        Mail::to($contract->employee_user->email)->queue(new ContractClosedForEmployeeMail([
            'contract_title' => $contract->title,
            'contract_hourly_rate' => $contract->hourly_rate,
            'employer_full_name' => $contract->employer_user->full_name,
        ]));
    }
}
