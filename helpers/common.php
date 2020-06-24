<?php

if (!function_exists('get_localized_attribute')) {
	function get_localized_attribute($root, $attribute_name)
	{
		if ($root->getOriginal($attribute_name)) {
			return $root->getOriginal($attribute_name);
		}

		if ($root->relevant_translation) {
			return $root->relevant_translation[$attribute_name];
		}

		return $root->getOriginal($attribute_name . '_en');
	}
}

if (!function_exists('all_translations')) {
	function all_translations($path_string)
	{
		return collect(config('app.available_locales'))->mapWithKeys(function ($current_locale) use ($path_string) {
			return [$current_locale => __($path_string, [], $current_locale)];
		});
	}
}

if (!function_exists('asset_no_cache')) {
	function asset_no_cache($path, $secure = null)
	{
		$parsed_url = parse_url($path);
		$new_path = $parsed_url['path'];

		if (isset($parsed_url['query']) && $parsed_url['query']) {
			$new_path .= '?';
			$new_path .= $parsed_url['query'];
			$new_path .= '&' . time();
		} else {
			$new_path .= '?' . time();
		}

		return asset($new_path, $secure);
	}
}

if (!function_exists('custom_validation_messages')) {
	function custom_validation_messages($place_name)
	{
		$fallback_validation = __('validation', [], config('app.fallback_locale'));
		$custom_validation_messages = [];

		if (isset($fallback_validation['places']) && is_array($fallback_validation['places'])) {
			if (isset($fallback_validation['places'][$place_name])) {
				$custom_validation_messages = $fallback_validation['places'][$place_name];
			}
		}

		if (app()->getLocale() != config('app.fallback_locale')) {
			$current_validation = __('validation', [], app()->getLocale());

			if (isset($current_validation['places']) && is_array($current_validation['places'])) {
				if (isset($current_validation['places'][$place_name])) {
					$custom_validation_messages = array_merge($custom_validation_messages, $current_validation['places'][$place_name]);
				}
			}
		}

		return $custom_validation_messages;
	}
}

if (!function_exists('get_next_period_date')) {
	function get_next_period_date($base_date, $previous_date, $period)
	{
		$some_day_of_next_date_month = (new \DateTime)->setDate(
			$previous_date->format('Y'),
			$previous_date->format('m'),
			1
		)->modify($period == 'year' ? '+1 year' : '+1 month');

		$next_date = (new \DateTime)->setDate(
			$some_day_of_next_date_month->format('Y'),
			$some_day_of_next_date_month->format('m'),
			$base_date->format('d')
		);

		while ($next_date->format('m') != $some_day_of_next_date_month->format('m')) {
			$next_date = $next_date->modify('-1 day');
		}

		return $next_date;
	}
}

if (!function_exists('get_client_language_array')) {
    function get_client_language_array($locale = null)
    {
        $locale = $locale ?: app()->getLocale();
        $data = [];
        $default_path = resource_path('lang/en/client');
        $extra_path = null;

        if ($locale != 'en') {
            $extra_path = resource_path('lang/' . $locale . '/client');
        }

    	foreach (\File::allFiles($default_path) as $file) {
    		$relative_path = substr($file->getPath(), strlen($default_path));
			$relative_path_parts = collect(preg_split("/[\/\\\]/", $relative_path))->slice(1)->toArray();
			$data_place = &$data;

			foreach ($relative_path_parts as $relative_path_part) {
				$data_place[$relative_path_part] = $data_place[$relative_path_part] ?? [];
				$data_place = &$data_place[$relative_path_part];
			}

			$file_name = basename($file->getBasename(), '.php');
			$data_place[$file_name] = $data_place[$file_name] ?? [];
			$data_place = &$data_place[$file_name];
    		$data_place = array_merge($data_place, include($file->getRealPath()));

    		if (!$extra_path) {
    			continue;
    		}

    		if (!File::exists($extra_path . '/' . $relative_path . '/' . $file->getBasename())) {
	            continue;
	        }

            $merge = function(&$a, $b) use (&$merge) {
                foreach ($b as $child => $value) {
                    if (isset($a[$child]) && is_array($a[$child]) && is_array($value)) {
                        $merge($a[$child], $value);
                        continue;
                    }

                    $a[$child] = $value;
                }
            };

            $merge($data_place, include($extra_path . '/' . $relative_path . '/' . $file->getBasename()));
    	}

        return $data;
    }
}

if (!function_exists('extract_fee_from_string')) {
	function extract_fee_from_string($string)
	{
		return [
			'percentage' => collect(explode('+', $string))->filter(function ($current_fee) {
				return $current_fee[strlen($current_fee) - 1] == '%';
			})->map(function ($current_fee) {
				return floatval($current_fee);
			})->sum(),

			'fixed' => collect(explode('+', $string))->filter(function ($current_fee) {
				return $current_fee[strlen($current_fee) - 1] != '%';
			})->map(function ($current_fee) {
				return floatval($current_fee);
			})->sum(),
		];
	}
}

// ---------------------------------------------------------------------- //
// - environment helpers
// ---------------------------------------------------------------------- //

// if (!function_exists('is_dev')) {
// 	function is_dev($string) {
// 		return app()->environment('local');
// 	}
// }

// if (!function_exists('is_pro')) {
// 	function is_pro($string) {
// 		return app()->environment('production');
// 	}
// }

// ---------------------------------------------------------------------- //

function ipinfo($property = null, $default = null)
{
	static $ipinfo = null;

	if (!$ipinfo) {
		$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'];
		// $ip = '94.180.169.20';
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, 'http://ip-api.com/json/' . $ip . '?fields=16510975&lang=' . locale());
		curl_setopt($ch, CURLOPT_FAILONERROR, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT_MS, 250);
		$ipinfo = json_decode(curl_exec($ch));
		$ipinfo = $ipinfo ?? (object) [];
		curl_close($ch);

		$ipinfo = [
			'ip' => $ip,
			'country_code' => $ipinfo->countryCode ?? null,
			'country_name' => $ipinfo->country ?? null,
			'region_name' => $ipinfo->regionName ?? null,
			'city_name' => $ipinfo->city ?? null,
			'latitude' => $ipinfo->lat ?? null,
			'longitude' => $ipinfo->lon ?? null,
			'zip' => $ipinfo->zip ?? null,
			'timezone' => $ipinfo->timezone ?? null,
		];
	}

	return $property ? ($ipinfo->{$property} ?? $default) : $ipinfo;
}

// ---------------------------------------------------------------------- //

function time_interval_to_string($time_interval, $options = [])
{
	$options['string_rounding'] = $options['string_rounding'] ?? 'minutes';
	$options['string_cutting'] = $options['string_cutting'] ?? null;
	$options['format'] = $options['format'] ?? [];

	$time_interval = (int) $time_interval;
	$seconds_in_minute = 60;
    $seconds_in_hour  = 60 * 60;
    $seconds_in_day    = 24 * 60 * 60;

    if (in_array($options['string_cutting'], ['days'])) {
		$days = floor($time_interval / $seconds_in_day);
		$remaining_seconds = $time_interval % $seconds_in_day;
	} else {
		$days = 0;
		$remaining_seconds = $time_interval;
	}

	$hours = floor($remaining_seconds / $seconds_in_hour);
	$remaining_seconds = $remaining_seconds % $seconds_in_hour;
	$minutes = floor($remaining_seconds / $seconds_in_minute);
	$remaining_seconds = $remaining_seconds % $seconds_in_minute;
	$seconds = ceil($remaining_seconds);

	$format = array_merge([
		'days' => '%dd',
		'hours' => '%dh',
		'minutes' => '%02dm',
		'seconds' => '%02ds',
	], $options['format']);

	$string = '';

	if ($days > 0) {
		$string .= sprintf($format['days'], $days);
	}

	if ($options['string_rounding'] != 'days' && $format['hours']) {
		if ($hours > 0 || in_array($options['string_cutting'], ['days', 'hours'])) {
			$string .= sprintf($format['hours'], $hours);
		}

		if ($options['string_rounding'] != 'hours' && $format['minutes']) {
			if ($minutes > 0 || in_array($options['string_cutting'], ['days', 'hours', 'minutes'])) {
				$string .= sprintf($format['minutes'], $minutes);
			}

			if ($options['string_rounding'] != 'minutes' && $format['seconds']) {
				if ($seconds > 0 || in_array($options['string_cutting'], ['days', 'hours', 'minutes', 'seconds'])) {
					$string .= sprintf($format['seconds'], $seconds);
				}
			}
		}
	}

	return trim($string);
}

function attribute_array_to_string($attributes)
{
	if (!$attributes) {
		return '';
	}

	$string = '';

	foreach ($attributes as $attribute_name => $attribute_value) {
		$string .= ' ' . $attribute_name . '="' . $attribute_value . '"';
	}

	return $string;
}

function locale($locale = null)
{
	if ($locale) {
		return app()->setLocale($locale);
	}

	return app()->getLocale();
}

// ---------------------------------------------------------------------- //

function google_autocomplete_get_place_by_id($place_id, $locale = null)
{
	$locale = $locale ?? locale();
	$client = new \GuzzleHttp\Client;

    $response = $client->get('https://maps.googleapis.com/maps/api/place/details/json', [
        'query' => [
        	'placeid' => $place_id,
            'key' => env('GOOGLE_MAPS_API_KEY','AIzaSyD3mcG8oAZzzlCSGZt5B4u5h5LmBX1SgjE'),
            'language' => $locale,
        ],
    ]);

    $body = json_decode($response->getBody());
    $dom_document = new \DOMDocument;
	$dom_document->loadHTML('<' . '?xml encoding="utf-8" ?' . '>' . $body->result->adr_address);
	$spans = $dom_document->getElementsByTagName('span');
	$span_string_parts = [];
	$country_short_name = null;

	foreach ($spans as $span) {
		if ($span->getAttribute('class') != 'country-name') {
			continue;
		}

		$country_short_name = $span->nodeValue;
	}

	foreach ($spans as $span) {
		if (in_array($span->getAttribute('class'), ['country-name', 'postal-code'])) {
			continue;
		}

		$span_string_parts[] = $span->nodeValue;
	}

	$short_address = implode(', ', $span_string_parts);

    $place = [
    	'id' => $body->result->place_id,
     	'name' => $body->result->name,
    	'short_address' => $short_address,
    	'full_address' => $body->result->formatted_address,
    	'latitude' => $body->result->geometry->location->lat,
    	'longitude' => $body->result->geometry->location->lng,
    	'utc_offset' => $body->result->utc_offset,
    	'administrative_area_level_2' => null,
    	'administrative_area_level_1' => null,
    	'postal_code' => null,
    	'country_code' => null,
    	'country_name' => null,
    	'country_short_name' => $country_short_name,
    	'type' => $body->result->types[0],
    ];

    foreach ($body->result->address_components as $address_component) {
    	if ($address_component->types[0] == 'administrative_area_level_2') {
    		$place['administrative_area_level_2'] = $address_component->long_name;
    		continue;
    	}

    	if ($address_component->types[0] == 'administrative_area_level_1') {
    		$place['administrative_area_level_1'] = $address_component->long_name;
    		continue;
    	}

    	if ($address_component->types[0] == 'country') {
    		$place['country_code'] = $address_component->short_name;
    		$place['country_name'] = $address_component->long_name;
    		continue;
    	}

    	if ($address_component->types[0] == 'postal_code') {
    		$place['postal_code'] = $address_component->long_name;
    		continue;
    	}
    }

    if (!$place['country_code']) {
    	return null;
    }

    return (object) $place;
}

function realtime($event_name, $event_data = [])
{
	$curl = curl_init(config('realtime.url') . '/event/' . $event_name);
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($event_data));
	curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
	curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 1); // 1 second to wait the connection
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	$result = curl_exec($curl);
	curl_close($curl);

	if (!$response = json_decode($result)) {
		return null;
	}

	if (isset($response->error)) {
		// throw new \Exception($response->error);
		return null;
	}

	return (array) $response->data;
}

function gmp_base_convert($number, $from_base, $to_base)
{
    return gmp_strval(gmp_init($number, $from_base), $to_base);
}

function arrays_have_same_values($a, $b)
{
    sort($a);
    sort($b);

    return $a === $b;
}

/*
 * upload base64 images parsed from HTML
 * also check actual images in HTML and remove unused
 */
function upload_inner_images($html, $dir_for_images)
{
    info($dir_for_images);

    $dom = new \DomDocument();

    libxml_use_internal_errors(true);
    $html = mb_convert_encoding($html, 'HTML-ENTITIES', 'utf-8');
    $dom->loadHtml($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();

    $images = $dom->getElementsByTagName('img');

    $actual_images_names = [];

    foreach ($images as $k => $img) {

        $src = $img->getAttribute('src');

        $srcPrefix = substr($src, 0, 4);

        if (in_array($srcPrefix, ['http'])) {
            continue;
        }

        if ($srcPrefix == 'data') {
            list($type, $data) = explode(';', $src);
            list(, $data)      = explode(',', $data);
            $data = base64_decode($data);

            $image_name = uniqid() . '.png';

            $actual_images_names[] = $image_name;

            $path = $dir_for_images.'/'.$image_name;

            \Storage::disk('public')->put($path, $data);

            $img->removeAttribute('src');
            $img->setAttribute('src', $path);

        } else {
            $pathInfo = pathinfo($src);
            $actual_images_names[] = $pathInfo['basename'];

        }
    }

    foreach (\Storage::disk('public')->files($dir_for_images) as $file_from_dir) {
        if (! in_array(pathinfo($file_from_dir)['basename'], $actual_images_names)) {
            \Storage::disk('public')->delete($file_from_dir);
        }
    }

    $html = $dom->saveHTML($dom->documentElement);

    return $html;
}

function remove_img_tags($html)
{
    return preg_replace("/<img[^>]+\>/i", "", $html);
}
