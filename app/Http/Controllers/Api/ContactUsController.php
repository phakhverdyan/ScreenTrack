<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Models\Administrator;
use App\Mails\Admin\EmailFromContactUsMail;
use App\Http\Controllers\Controller;

class ContactUsController extends Controller
{
   public function send_message(Request $request) {
       validator()->make($request->all(), [
           'contact_us' => 'required|array',
           'contact_us.type' => 'required|string',
           'contact_us.email' => 'required|email',
           'contact_us.name' => 'required|string',
           'contact_us.message_title' => 'required|string',
           'contact_us.message_text' => 'required|string',
       ])->validate();

       $administrators = Administrator::with('user')->get();

       foreach ($administrators as $administrator) {
           Mail::to($administrator->user->email)->queue(new EmailFromContactUsMail([
               'contact_us_type' => $request->input('contact_us.type'),
               'contact_us_email' => $request->input('contact_us.email'),
               'contact_us_name' => $request->input('contact_us.name'),
               'contact_us_message_title' => $request->input('contact_us.message_title'),
               'contact_us_message_text' => $request->input('contact_us.message_text'),
           ]));
       }
   }
}
