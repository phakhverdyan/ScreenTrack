@extends('layouts.main_layout')

@push('meta')
    <title>{!! __('meta.contact_us.title') !!}</title>
    <meta name="description" content="{!! __('meta.contact_us.description') !!}">
    <meta name="keywords" content="{!! __('meta.contact_us.keywords') !!}">
@endpush

@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/contact-us.css') }}">
@endpush

@push('scripts')
<script>
    $(function () {
        var $form = $('form#contact_us');

        $("#send_message").click(function (event) {
            event.preventDefault();

            var $button = $(this);

            if ($button.hasClass('is-loading')) {
                return;
            }

            $button.addClass('is-loading disabled');

            request({
                method: 'POST',
                url: '/contact_us/send_message',
                data: $form.serialize(),
            }, function(response) {
                $button.removeClass('is-loading disabled');

                if (response.error) {
                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    $.notify(response.error);
                    return;
                }
                $form.find('.form-group').remove();
                $('#message-sent-alert').show();
                $('html, body').animate({
                    scrollTop: $('#message-sent-alert').offset().top - 200
                }, 100);

            });
        });

        $(".support-type__item").click(function (event) {
            event.preventDefault();

            $(".support-type__item").removeClass('active');
            $(this).addClass('active');

            $('input#support-type').val($(this).data('type'));
        });
    });
</script>
@endpush

@section('content')
    @include('components.navbar.main')

    <!-- page header -->
    <div class="[ page-header ] text-center">
        <div class="container">
            <div class="row">
                <div class="col-md-6 d-flex align-items-center">
                    <div class="[ page-header__page-title ]">
                        <h2 id="title">{{ __('pages/contact_us.contact_us') }}</h2>
                        <p id="sub-title">{!! __('pages/contact_us.we_are_here_to_help_any_time_with_any_question') !!}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <img src="{{ asset_no_cache('/img/contact-header-img.svg') }}" alt="">
                </div>
            </div>
        </div>
    </div>
    <!-- / page header -->
    <div class="container-fluid">
        <section class="[ support-type ]">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <div class="[ support-type__item ] " data-type="sales">
                            <img class="[ support-type__item-image ]" src="{{ asset_no_cache('/img/sales-contact.svg') }}" alt="">
                            <div class="[ support-type__item-text ]">
                                <h4>{{ __('pages/contact_us.sales') }}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="[ support-type__item ] active" data-type="general">
                            <img class="[ support-type__item-image ]" src="{{ asset_no_cache('/img/general-contact.svg') }}" alt="">
                            <div class="[ support-type__item-text ]">
                                <h4>{{ __('pages/contact_us.general') }}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="[ support-type__item ] " data-type="support">
                            <img class="[ support-type__item-image ]" src="{{ asset_no_cache('/img/support-contact.svg') }}" alt="">
                            <div class="[ support-type__item-text ]">
                                <h4>{{ __('pages/contact_us.support') }}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="[ support-type__item ] " data-type="feedback">
                            <img class="[ support-type__item-image ]" src="{{ asset_no_cache('/img/feedback-contact.svg') }}" alt="">
                            <div class="[ support-type__item-text ]">
                                <h4>{{ __('pages/contact_us.feedback') }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="[ form ]">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <p class="[ form__text-up ]" data-aos="fade-up">{{ __('pages/contact_us.screen_track_helps_people_track_their_worked_time') }}</p>

                        <form id="contact_us" action="" method="post" data-aos="fade-up">
                            <input id="support-type" type="hidden" name="contact_us[type]" value="general">

                            <div class="form-group" data-aos="fade-up">
                                <label for="name">{{ __('pages/contact_us.name') }}*</label>
                                <input name="contact_us[name]" data-name="contact_us.name" class="form-control" type="text" class="form-control" name="name" id="name"
                                       aria-describedby="nameHelpId" placeholder="{{ __('pages/contact_us.full_name') }}">
                                <small id="nameHelpId" class="form-text text-muted">{{ __('pages/contact_us.so_we_know_how_to_refer_to_you') }}</small>
                            </div>

                            <div class="form-group" data-aos="fade-up">
                                <label for="email">{{ __('pages/contact_us.email') }}*</label>
                                <input name="contact_us[email]" data-name="contact_us.email" class="form-control" type="email" class="form-control" name="email" id="email"
                                       aria-describedby="emailHelpId" placeholder="{{ __('pages/contact_us.your_email') }}">
                                <small id="emailHelpId" class="form-text text-muted">{{ __('pages/contact_us.that_we_can_use_to_reply_to_you') }}</small>
                            </div>

                            <div class="form-group" data-aos="fade-up">
                                <label for="name">{{ __('pages/contact_us.title_of_message') }}*</label>
                                <input name="contact_us[message_title]" data-name="contact_us.message_title" class="form-control" type="text" class="form-control" name="name" id="name"
                                       aria-describedby="nameHelpId" placeholder="{{ __('pages/contact_us.title_of_message') }}">
                            </div>

                            <div class="form-group" data-aos="fade-up">
                                <label for="name">{{ __('pages/contact_us.describe_message') }}*</label>
                                <textarea name="contact_us[message_text]" data-name="contact_us.message_text" class="form-control" name="" id="" cols="20" rows="12"
                                          placeholder="{{ __('pages/contact_us.message_text') }}"></textarea>
                                <small id="emailHelpId" class="form-text text-muted">{{ __('pages/contact_us.we_will_respond_to_you_within24_hours') }}</small>
                            </div>

                            <div class="form-group" data-aos="fade-up">
                                <button id="send_message" class="[ form__button ] btn btn-primary btn-submit"
                                        type="submit">{{ __('pages/contact_us.send_message') }}</button>
                                <span class="text-center">
                                    <p class="[ form__required-text ]">* {{ __('pages/contact_us.these_fields_must_be_filled_in_before_submitting') }}</p>
                                </span>
                            </div>
                            <div id="message-sent-alert" class="alert alert-primary text-center collapse" role="alert">
                                {{ __('pages/contact_us.thanks_for_reaching_out') }}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        @include('common.pages.partials.more_feature_section')
        @include('common.pages.partials.try_now_section')

	@include('components.footer.main')
@endsection
