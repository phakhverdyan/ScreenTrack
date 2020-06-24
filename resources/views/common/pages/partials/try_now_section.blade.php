@if (!auth()->check())
    <!-- try now block -->
    <section class="[ try-now ]" data-aos="fade-up">
        <div class="container">
            <div class="text-center">
                <h2 class="try-now__text">{!! __('sections/try_now.try_now') !!}</h2>
                <form class="[ registration-form ] form-inline d-inline-flex mt-5 { is-closed is-large is-white }">
                    <p class="is-not-available is-hidden">{!! __('sections/try_now.email_taken') !!}</p>
                    <p class="is-invalid is-hidden">{!! __('sections/try_now.must_be_email') !!}</p>
                    <input class="[ registration-form__input ] form-control" type="text" name="user[email]" placeholder="{!! __('sections/try_now.email_placeholder') !!}">
                    <button type="submit" class="[ registration-form__button ] btn btn-primary my-2 my-sm-0 btn-custom">{!! __('sections/try_now.sign_up_now') !!}</button>
                </form>
            </div>
        </div>
    </section>
    <!-- / try now block -->
@endif
