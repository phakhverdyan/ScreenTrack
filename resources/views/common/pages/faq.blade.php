@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.faq.title') !!}</title>
    <meta name="description" content="{!! __('meta.faq.description') !!}">
    <meta name="keywords" content="{!! __('meta.faq.keywords') !!}">
@endpush

@section('content')
    @include('components.navbar.main')

    <!-- page header -->
    <div class="[ page-header ] text-center">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="[ page-header__page-title ]">
                        <h2>Frequently Asked Questions</h2>
                        <p>We're here to help - if you have other questions please let us know.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- / page header -->

    <!-- Body -->
    <div class="container-fluid">

        <!-- Questions section -->
        <section class="[ questions ]" data-aos="fade-up">
            <div class="container">
                <!-- TABS -->
                <div class="[ quesitons__tabs ]">
                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="pills-Freelancers-tab" data-toggle="pill" href="#pills-Freelancers" role="tab" aria-controls="pills-Freelancers" aria-selected="true">
                                Freelancers
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-Employers-tab" data-toggle="pill" href="#pills-Employers" role="tab" aria-controls="pills-Employers" aria-selected="false">
                                Employers
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-Affiliates-tab" data-toggle="pill" href="#pills-Affiliates" role="tab" aria-controls="pills-Affiliates" aria-selected="false">
                                Affiliates
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/help-center">
                                Help Center
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- /TABS -->
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-Freelancers" role="tabpanel" aria-labelledby="pills-Freelancers-tab">
                        <div class="[ questions__wrapper ] d-flex">
                            <div class="[ questions__sidebar ]">
                                <h3 class="font-weight-bold">Questions</h3>
                                <ul>
                                    <li><a href="#q1">Why would I use ScreenTrack?</a></li>
                                    <li><a href="#q2">How do I use it?</a></li>
                                    <li><a href="#q3">How do I get paid?</a></li>
                                    <li><a href="#q4">What is the delay for daily payouts?</a></li>
                                    <li><a href="#q5">What is this “premium payment protection”?</a></li>
                                    <li><a href="#q6">Is it really free & unlimited?</a></li>
                                    <li><a href="#q7">Where can I download the ScreenTrack app?</a></li>
                                    <li><a href="#q8">Is the ScreenTrack app free also?</a></li>
                                    <li><a href="#q9">Can I see my earnings reports?</a></li>
                                    <li><a href="#q10">Do I get paid for inviting my friends and bosses?</a></li>
                                    <li class="d-none"><a href="#q11">How do I get started with your affiliate program?</a></li>
                                </ul>
                            </div>
                            <!-- / questions sidebar-->

                            <div class="[ questions-main ] ml-lg-5 ml-md-3 ml-0">

                                <!-- question -->
                                <a class="anchor" id="q1"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Why would I use ScreenTrack?</h3>
                                    <p>
                                        It’s a free time tracker with <b>zero commission</b> payouts and payment protection.
                                        It allows you to get paid daily for every hour that you track.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q2"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>How do I use it?</h3>
                                    <p>
                                        Once you sign up, invite your employer and create a task in your project board.
                                        Then, download the app and login - you’ll just need to select your project & task from there and start tracking your time.
                                        This will calculate your daily earnings and you will receive daily payouts.
                                        Check out the <a href="{{ route('how_it_works', locale()) }}">How it works</a> section for the complete picture.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q3"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>How do I get paid?</h3>
                                    <p>
                                        Simply enter your paypal or payoneer email, our system will automatically send it to your balance and you can make daily payouts.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q4"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>What is the delay for daily payouts?</h3>
                                    <p>
                                        All earnings are first <b>in review</b> for 5 days(so that the employer has the time to check your work).
                                        The earnings then land in the escrow protection for 5 days - then they are released to your balance and you can request daily payouts.
                                        So basically there’s a 10 day lag <b>but</b> from day 10, you can request payouts daily.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q5"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>What is this “premium payment protection”?</h3>
                                    <p>
                                        To make sure that you don’t work just to see your employer leave without payout you, we automatically deduct, on a daily basis, the credit card of your employer.
                                        They have 5 days to review your work, it then goes into the escrow ( the protection mechanism ) and it’s then released to your balance 5 days later, on a daily cycle.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q6"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Is it really free & unlimited?</h3>
                                    <p>
                                        Yes, there are <b>no limits</b>, <b>no monthly fees</b>.
                                        You can create as many projects as you want, add as many users as needed into the project, track as many tasks as you want - everything is unlimited.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q7"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Where can I download the ScreenTrack app?</h3>
                                    <p>
                                        Follow this link: <a href="{{ route('download_app', locale()) }}">screentrack.com/download-app</a> then select your operating system and press Download. You will then need to log in.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q8"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Is the ScreenTrack app free also?</h3>
                                    <p>
                                        Yes, it’s absolutely free to use.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q9"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Can I see my earnings reports?</h3>
                                    <p>
                                        Yes, you can log into your account and from the top right menu, select earnings and then the appropriate tab.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q10"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Do I get paid for inviting my friends and bosses?</h3>
                                    <p>
                                        Yes, our affiliate program has two levels:
                                        <br>
                                        <b>Tier 1:</b> You will earn <b>$150</b> for every employer that you refer and <b>$100</b> for every freelancer.
                                        <br>
                                        <b>Tier 2:</b> We even pay you <b>$50</b> when they bring in users.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q11"></a>
                                <div class="[ questions-main__answer ] d-none">
                                    <h3>How do I get started with your affiliate program?</h3>
                                    <p>
                                        Go grab your affiliate link in the affiliate section:
                                        <br>
                                        <a href="{{ route('affiliate', locale()) }}">screentrack.com/affiliate</a> or from your user menu you’ll find the Affiliate section.
                                    </p>
                                </div>
                                <!-- / question -->
                            </div>
                        </div><!-- / question wrapper-->
                    </div>
                    <div class="tab-pane fade" id="pills-Employers" role="tabpanel" aria-labelledby="pills-Employers-tab">
                        <div class="[ question__wrapper ] d-flex">
                            <div class="[ questions__sidebar ]">
                                <h3 class="font-weight-bold">Questions</h3>
                                <ul>
                                    <li><a href="#q-e1">Why would I use ScreenTrack?</a></li>
                                    <li><a href="#q-e2">How much does ScreenTrack cost?</a></li>
                                    <li><a href="#q-e3">Why is ScreenTrack free?</a></li>
                                    <li><a href="#q-e4">How can I start using ScreenTrack with my team?</a></li>
                                    <li><a href="#q-e5">How can I see the freelancer’s screenshot & activity timeline?</a></li>
                                    <li><a href="#q-e6">What are the limits on the account?</a></li>
                                    <li><a href="#q-e7">How many Screenshots will I see when my freelancers are working?</a></li>
                                    <li><a href="#q-e8">Do you encrypt data?</a></li>
                                    <li><a href="#q-e9">Can I manage multiple companies and projects from one account?</a></li>
                                    <li><a href="#q-e10">How will my freelancers receive their payments?</a></li>
                                    <li><a href="#q-e11">How can I manage projects within ScreenTrack?</a></li>
                                    <li><a href="#q-e12">Will I see a timeline of the freelancer’s work?</a></li>
                                    <li><a href="#q-e13">How do I get support?</a></li>
                                </ul>
                            </div>
                            <!-- / questions sidebar-->

                            <div class="[ questions-main ] ml-lg-5 ml-md-3 ml-0">

                                <!-- question -->
                                <a class="anchor" id="q-e1"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Why would I use ScreenTrack?</h3>
                                    <p>
                                        For so many reasons, first it’s commission-free, so both you and your freelancers end up having more done. It’s an easy way to pay your freelancers and to make sure they are actually working thanks to 12 screenshots per hour and key/click activity tracking, you’ll see in real-time what’s going on. It’s also great because they can receive their money via Payoneer and Paypal on their side. You can also easily manage the project tasks directly in the kanban-like board.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-e2"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>How much does ScreenTrack cost?</h3>
                                    <p>
                                        Actually, it’s free. There’s no monthly plan costs, you can add as many projects, users & tasks as you wish. You even get 12 screenshots per hour to see the activity of your freelancers, but if you want more, you’ll be able to get premium plans.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-e3"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Why is ScreenTrack free?</h3>
                                    <p>
                                        We’re trying to make the best project management tool for freelancer teams and we have to start somewhere. Down the line, we plan on releasing premium features but everything that you have access to right now as a base, we plan on having all that stay free.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-e4"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>How can I start using ScreenTrack with my team?</h3>
                                    <p>
                                        It’s easy, just create an account - then press the invite button. There, you can set user roles and select if you wish to track them. Just make sure that they download the tracking app, they need to set the tracker to ON to track their time. This will generate 12 screenshots per hour and you can see them in your freelancer’s timeline.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-e5"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>How can I see the freelancer’s screenshot & activity timeline?</h3>
                                    <p>
                                        After inviting the freelancer to your project, once he/she started using the desktop app to track the workload, you will see screenshots and activity in their timeline. To find it, just click on their profile icon at the top of the project and select timeline, or select them from the live chat left panel and click on Timeline. If there’s work that has been done, you’ll see it, just make sure to select the right date.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-e6"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>What are the limits on the account?</h3>
                                    <p>
                                        There are no limits. ScreenTrack is unlimited. Add unlimited managers & users… track unlimited freelancers, create unlimited projects, have fun!
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-e7"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>How many Screenshots will I see when my freelancers are working?</h3>
                                    <p>
                                        For each freelancer, you’ll see 12 screenshots per hour, that way you can be sure that they are working. You can even send them messages on the platform to talk about their progress.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-e8"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Do you encrypt data?</h3>
                                    <p>
                                        We encrypt sensitive data via HTTPS and AES-256 bit encryption.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-e9"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Can I manage multiple companies and projects from one account?</h3>
                                    <p>
                                        Yes, you can manage unlimited companies and projects from one ScreenTrack account. You can switch between projects from the top bar.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-e10"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>How will my freelancers receive their payments?</h3>
                                    <p>
                                        They can attach their Payoneer and Paypal accounts, the automatic payout system will transfer the funds to them when it exists the escrow process ( which takes 5 days ) - but you have 5 days to review their work and ask for changes before it gets to the 5 day escrow.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-e11"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>How can I manage projects within ScreenTrack?</h3>
                                    <p>
                                        It’s very easy, there’s a task board - you simply create tasks and move them around the board, for example from To Do to Done.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-e12"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Will I see a timeline of the freelancer’s work?</h3>
                                    <p>
                                        Yes, there’s a visual timeline with Screenshots and activity levels for each of your freelancers.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-e13"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>How do I get support?</h3>
                                    <p>
                                        Please write to us in from the Contact Us page if you have any questions or need support. Even if we’re free, we still offer amazing 24/7 support.
                                    </p>
                                </div>
                                <!-- / question -->
                            </div>
                        </div><!-- / question wrapper-->
                    </div>
                    <div class="tab-pane fade" id="pills-Affiliates" role="tabpanel" aria-labelledby="pills-Affiliates-tab">
                        <div class="[ question__wrapper ] d-flex">
                            <div class="[ questions__sidebar ]">
                                <h3 class="font-weight-bold">Questions</h3>
                                <ul>
                                    <li><a href="#q-a1">What’s the payment structure for referring users to ScreenTrack?</a></li>
                                    <li><a href="#q-a2">What’s the difference between Tier 1 and Tier 2?</a></li>
                                    <li><a href="#q-a3">How can I earn by recommending my friends to ScreenTrack</a></li>
                                    <li><a href="#q-a4">Once I earned my commission, how long does it take to receive it?</a></li>
                                    <li><a href="#q-a5">How much can I earn monthly by referring users?</a></li>
                                    <li><a href="#q-a6">How do I unlock a commission for a referred user?</a></li>
                                    <li><a href="#q-a7">Where can I see the statistics for my referrals?</a></li>
                                    <li><a href="#q-a8">Are my affiliate statistics in real-time?</a></li>
                                    <li><a href="#q-a9">What are commission targets?</a></li>
                                    <li><a href="#q-a10">When do I get paid?</a></li>
                                    <li><a href="#q-a11">How long does it take to receive my commission?</a></li>
                                    <li><a href="#q-a12">What’s the best way of bringing in referrals quickly?</a></li>
                                    <li><a href="#q-a13">Is this a multi-level marketing pyramid scheme?</a></li>
                                    <li class="d-none"><a href="#q-a14">Why is your affiliate program NOT an illegal pyramid scheme?</a></li>
                                </ul>
                            </div>
                            <!-- / questions sidebar-->

                            <div class="[ questions-main ] ml-lg-5 ml-md-3 ml-0">

                                <!-- question -->
                                <a class="anchor" id="q-a1"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Why would I use ScreenTrack?</h3>
                                    <p>
                                        Tier 1: A direct hiring manager referral earns you $150 USD
                                                A direct freelancer referral earns you $100 USD<br>
                                        Tier 2: When your direct referral brings in someone too, you’ll indirectly earn $50 USD.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-a2"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>What’s the difference between Tier 1 and Tier 2?</h3>
                                    <p>
                                        Tiers are levels. There are two referral levels for ScreenTrack affiliates. Tier one is the first level, meaning a direct referral ( for example, you talking to your friend about ScreenTrack ). Tier two is the second level, it’s if your friend then talks about ScreenTrack to someone else, he brings him in and you get paid for that also, as a way to motivate you to bring in users that can recommend ScreenTrack also.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-a3"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>How can I earn by recommending my friends to ScreenTrack</h3>
                                    <p>
                                        It’s very easy - all you have to do is copy paste your affiliate link to your friends - who are either freelancers or your hiring managers/bosses
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-a4"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Once I earned my commission, how long does it take to receive it?</h3>
                                    <p>
                                        Once you reach your commission goal for a specific user, the unlocked commission will instantly hit your “available balance”. You can then request a payout to your Paypal or Payoneer account.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-a5"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>How much can I earn monthly by referring users?</h3>
                                    <p>
                                        It really depends on you. You can make a good living just referring users full time. For example, imagine that you refer 10 people per day from a country like India. That’s about 70 referrals per week. It’s about 315 referrals per month. Right there, it can unlock $31,500 USD in commissions, once you hit the target for every user.<br> Remember that if you refer 315 users per month each of them refers 2 users that month on average, you’ll bring in 630 indirect referrals that unlock at $50 per user. Do the math.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-a6"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>How do I unlock a commission for a referred user?</h3>
                                    <p>
                                        It’s very simple, you’ll earn 1% of the monthly transaction of the referred user until you hit $100 USD for a freelancer or $150 USD for a manager’s transactions.<br /><br />
                                        For example, let’s say someone earns $2000 USD in a month with the tracker. You’ll earn $20 USD that month. It will take you 5 Months to unlock the commission.<br /><br />
                                        <b>Important:</b> If that user brings in 2 of his friends that month, you’ll also start unlocking $50 x 2, which unlocks a little bit faster because it’s a smaller amount.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-a7"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Where can I see the statistics for my referrals?</h3>
                                    <p>
                                        You can find them by clicking on Affiliates from the top or the menu on the top-right corner.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-a8"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Are my affiliate statistics in real-time?</h3>
                                    <p>
                                        Yes, once a freelancer or a manager starts having transactions, you will see the numbers go up in real-time. You can go to your affiliates section to see the Tier 1 and Tier 2 statistics in real time, they will unlock when you get to the target amounts.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-a9"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>What are commission targets?</h3>
                                    <p>
                                        A commission target is for example, $100 USD for a freelancer. Once you hit $100 USD for a specific user, we deposit that amount into your “Available” fund pool, from which you can request a payout via Payoneer or PayPal.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-a10"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>When do I get paid?</h3>
                                    <p>
                                        Once you unlock your commission per user, there’s an automatic deposit of the commission into your “Available” funds, in your <b>Earnings</b> section.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-a11"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>How long does it take to receive my commission?</h3>
                                    <p>
                                        It depends on who you refer;. If you bring in a high earner, it’s faster and if it’s a low earner, it’s smaller. Do the math, if you bring in people from high earning countries, you’ll earn faster. If you bring in 2 users per day, it’s 60 users per month, which is $6000 USD when you unlock the target commission.<br /><br />
                                        <b>For example:</b> Say that you find a typical front-end developer from London who earns $4500 USD per month online using the tracker - you’ll get 1% of his salary, which is $45 USD, meaning that it would take you 2.2 months to unlock your $100 USD. If you think that you can refer 10 users like these from London, you’ll earn $1000 USD just for copy pasting a link 10 times. Remember that you’ll earn $50 for every person that they refer also, meaning that if they refer 10 people each down the line in one year, that’s a total of 100 users from indirect referrals, which is $5000 USD extra per year. It really pays to talk about ScreenTrack, that’s two trips to the bahamas, all-included.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-a12"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>What’s the best way of bringing in referrals quickly?</h3>
                                    <p>
                                        Follow these steps to optimize your affiliate earnings:<br />
                                        1-Make sure that you sent it to all of your contact list on skype, facebook, instagram, twitter, etc...<br />
                                        2-Add your affiliate link to your YouTube video descriptions, blog posts or articles.<br />
                                        3-You can find places where Freelancers hang like Facebook or LinkedIn groups, etc.<br />
                                        4-You can ask your friends if they know employers or friends that need ScreenTrack, your network`s friends is huge.<br />
                                        5-Be creative, put your affiliate link on your website, forum signature link, etc…<br />
                                        6-You can even pay for your link on cheap advertising networks like AdSense, Taboola, YouTube ads, Facebook ads, etc...<br />
                                        <b>Good Luck!</b>
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-a13"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Is this a multi-level marketing pyramid scheme?</h3>
                                    <p>
                                        No, like many large brands online such as Amazon, Ebay, or web hosting services, our affiliate system has two tiers: The direct referral commission and the indirect referral commission, it ends there, there are no more levels.
                                    </p>
                                </div>
                                <!-- / question -->
                                <!-- question -->
                                <a class="anchor" id="q-a14"></a>
                                <div class="[ questions-main__answer ]">
                                    <h3>Why is your affiliate program NOT an illegal pyramid scheme?</h3>
                                    <p>
                                        Pyramids are illegal and they make money from recruitment fees that are passed down the chain below. Our software has two levels of referrals and is free and there are no recruitment fees, it’s a standard affiliate program just like most online businesses.
                                    </p>
                                </div>
                                <!-- / question -->
                            </div>
                        </div><!-- / question wrapper-->
                    </div>
                </div>
            </div>
        </section>
        <!-- / Questions section -->

        @include('common.pages.partials.more_feature_section')
        @include('common.pages.partials.try_now_section')
    </div>

	@include('components.footer.main')
@endsection
