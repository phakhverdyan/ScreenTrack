@extends('dashboard.layout')

@push('styles')
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.bootstrap3.min.css') }}">
    <link rel="stylesheet" href="{{ asset_no_cache('css/vendor/selectize.modified.css') }}">
@endpush

@push('scripts')
    <script src="{{ asset('js/vendor/selectize.min.js') }}"></script>
    <script src="{{ asset('js/vendor/jquery.mask.min.js') }}"></script>
    <script>
        $(function() {
            var $form = $('.edit-company__form');
            var $form_submit_button = $form.find('button[type="submit"]');
            var $form_phone_locality_select = $form.find('[name="company[locality_key]"]');
            var $form_phone_number_input = $form.find('[data-name="company.phone_number"]');
            var company = @json($company ?? null);

            $form.submit(function(event) {
                event.preventDefault();

                if ($form_submit_button.hasClass('is-loading')) {
                    return;
                }

                $form_submit_button.addClass('is-loading disabled');

                request({
                    method: 'POST',
                    url: '/companies/' + (company ? company.id + '/update' : 'create'),
                    data: $form.serialize(),
                }, function(response) {
                    $form_submit_button.removeClass('is-loading disabled');

                    if (new Validator($form, response).fails()) {
                        return;
                    }

                    if (response.error) {
                        $.notify(response.error);
                        return;
                    }

                    $.notify("{{ __('dashboard/companies.saved') }}", 'success');

                    setTimeout(function() {
                        window.location.href = '/dashboard/companies';
                    }, 1000);
                });

                return false;
            });

            $form_phone_locality_select.removeClass('custom-select').selectize({
                // sortField: 'full_address',
                valueField: 'key',
                labelField: 'full_address',
                searchField: [ 'name', 'short_address', 'full_address' ],
                placeholder: 'Company location',
                // options: [],

                render: {
                    item: function(item, escape) {
                        return (
                            '<div class="selectize-item + is-locality">' +
                                '<img src="/img/countries/flags/' + (item.country_code || '_') + '.png" alt="' + item.country_code + '" style="display: inline-block; vertical-align: middle;">' +
                                ' ' +
                                '<span class="name" style="display: inline-block; vertical-align: middle;">' + escape(item.full_address) + '</span>' +
                            '</div>'
                        );
                    },

                    option: function(item, escape) {
                        return (
                            '<div class="selectize-item + is-locality">' +
                                '<img src="/img/countries/flags/' + (item.country_code || '_') + '.png" alt="' + item.country_code + '" style="display: inline-block; vertical-align: middle;">' +
                                ' ' +
                                '<span class="name" style="display: inline-block; vertical-align: middle;">' + escape(item.full_address) + '</span>' +
                            '</div>'
                        );
                    },
                },

                load: function(string, callback) {
                    if (string.length == 0) {
                        return callback();
                    }

                    return request({
                        url: '/localities/autocomplete',

                        data: {
                            query: string,
                            locale: locale(),
                            with_country: true,
                        },
                    }, function(response) {
                        if (response.error) {
                            $.notify(response.error, 'error');
                            return callback();
                        }

                        return callback(response.data);
                    });
                },

                onInitialize: function() {
                    this.$control_input.attr('autocomplete', 'st-disabled');
                    
                    if (company && company.locality.key) {
                        this.addOption([ company.locality ]);
                        this.setValue([ company.locality.key ]);
                    }

                    if (auth.user.locality && auth.user.locality.key) {
                        this.addOption([ auth.user.locality ]);
                        this.setValue([ auth.user.locality.key ]);
                    }

                },

                onChange: function(item_id) {
                    var selectize = this;

                    if (!selectize.options[item_id]) {
                        return;
                    }

                    if (!$form_phone_number_input.prop('disabled')) {
                        $form_phone_number_input.val('');
                    }
                    
                    $form_phone_number_input.mask(selectize.options[item_id].country.phone_number_mask, {
                        translation: {
                            'X': { pattern: /\d/ },
                            '0': null,
                            '9': null,
                        },

                        placeholder: selectize.options[item_id].country.phone_number_mask,
                    });

                    $form_phone_number_input.prop('disabled', false);
                    !$form_phone_number_input.val() && $form_phone_number_input.focus();
                },
            });

            $form.find('input, textarea').eq(0).each(function() {
                $(this).focus();
                set_input_carret_at_end(this);
            });

            $('#edit-logo-modal').on('shown.bs.modal', function(){
                if ($("#company-logo").data('loaded') == 1) {
                    var url = $("#company-logo").data('original');
                    var crop_data = $("#company-logo").data('cropdata');

                    var points = [];

                    points[0] = crop_data.x;
                    points[1] = crop_data.y;
                    points[2] = crop_data.x + crop_data.width;
                    points[3] = crop_data.y + crop_data.height;

                    var croppie = $('#crop').croppie({
                        url: url,
                        viewport: { width: 200, height: 200, type: 'square' },
                        boundary: { width: 400, height: 400 },
                        points: points,
                    });

                    croppie.croppie('bind');
                    $('#upload-logo').text("{{ __('dashboard/companies.choose_another_logo') }}");
                    $('#save-logo').show();
                }
            });

            $('#load-logo').click(function (event) {
                event.preventDefault();
                $('#edit-logo-modal').modal('show');
            });
        });
    </script>
@endpush

@push('modals')
    @include('dashboard.companies.modals.edit_logo')
@endpush

@section('content')
    <div class="[ edit-profile ]">
        <h3 class="[ page-title ]">
            {{ isset($company) ? __('dashboard/companies.edit_company') : __('dashboard/companies.create_company') }}
        </h3>
        <form class="[ edit-company__form ]" action="" autocomplete="off" >
            <div class="form-group">
                <div class="form-row">
                    <div class="col-md-12">
                        <label for="user__first-name">{{ __('dashboard/companies.company_logo') }}</label>
                        @if (isset($company) && $company->image()->first())
                            <div>
                                <img id="company-logo"
                                     data-loaded="1"
                                     data-key="{{ $company->image->key  }}"
                                     data-cropdata="{{ json_encode($company->image->crop_data) }}"
                                     data-original="{{ $company->image->urls->original }}"
                                     src="{{ $company->image->urls->small }}">
                            </div>
                            <button type="text" id="load-logo" class="btn btn-primary">{{ __('dashboard/companies.change_logo') }}</button>
                        @else
                            <div id="company-no-logo">{{ __('dashboard/companies.company_don_t_have_logo_yet') }}</div>
                            <br/>
                            <img id="company-logo" data-loaded="0">
                            <input id="company-logo-input" type="hidden" name="company[image_key]" value="">
                            <button type="text" id="load-logo" class="btn btn-primary">{{ __('dashboard/companies.load_logo') }}</button>
                        @endif

                    </div>
                </div>
            </div>

            <div class="form-group">
                <div class="form-row">
                    <div class="col-md-12">
                        <label for="company__name">{{ __('dashboard/companies.company_name') }}</label>
                        <input value="{{ $company->name ?? null }}" id="company__name" name="company[name]" data-name="company.name" class="form-control" type="text"  placeholder="{{ __('dashboard/companies.company_name') }}">
                        <div class="invalid-feedback"></div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <div class="col-md-12">
                        <label for="company__website-url">{{ __('dashboard/companies.company_website') }}</label>
                        <input value="{{ $company->website ?? null }}" id="company__website-url" name="company[website]" data-name="company.website" class="form-control" type="text"  placeholder="{{ __('dashboard/companies.company_website') }}">
                        <div class="invalid-feedback"></div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <div class="col">
                        <label for="company__locality">{{ __('dashboard/companies.location') }}</label>
                        <select class="custom-select selectized" id="company__locality" name="company[locality_key]" data-name="company.locality_key"></select>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="col">
                        <label for="company__phone-number">{{ __('dashboard/companies.phone_number') }}</label>
                        <input value="{{ $company->phone_number ?? null }}" type="text" class="form-control" placeholder="{{ __('dashboard/companies.phone_number') }}" data-name="company.phone_number" id="company__phone-number" disabled>
                        <div class="invalid-feedback"></div>
                        <input type="hidden" name="company[phone_number]">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <div class="col-md-12">
                        <label for="company__description">{{ __('dashboard/companies.company_description') }}</label>
                        <textarea name="company[description]" data-name="company.description" class="form-control" id="company__description">{{
                            $company->description ?? null
                        }}</textarea>
                        <div class="invalid-feedback"></div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-row">
                    <div class="col-md-12">
                        <select class="form-control" name="company[size_key]" id="registration-form__company-size" data-name="company.size_key">
                            @foreach (\App\Models\Company\CompanySize::all() as $current_company_size)
                                <option value="{{ $current_company_size->key }}" {{ $current_company_size->key == ($company->size_key ?? 'small') ? 'selected' : '' }}>
                                    {{ $current_company_size->title }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <button class="[ save__button ] btn btn-primary form-control" type="submit">
                    {{ empty($company) ? __('dashboard/companies.create') : __('dashboard/companies.save') }}
                </button>
            </div>
        </form>
    </div>
@endsection