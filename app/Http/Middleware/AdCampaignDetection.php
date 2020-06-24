<?php

namespace App\Http\Middleware;

use App\Models\User\User;
use Closure;

class AdCampaignDetection
{
    public function handle($request, Closure $next)
    {
        if (auth()->check()) {
            $request->ad_campaign_id = 0;
            
            return $next($request);
        }

        $ad_campaign_id = (int) $request->cookie('ad_campaign_id');

        if ($ad_campaign_id > 0) {
            $request->ad_campaign_id = $ad_campaign_id;
        } else {
            $input_parameters = array_filter($request->input(), function ($value, $key) {
                return $value === null && preg_match('/^c[0-9]+$/i', $key);
            }, ARRAY_FILTER_USE_BOTH);

            reset($input_parameters);
            $ad_campaign_id = (int) substr(key($input_parameters), 1);

            if ($ad_campaign_id > 0) {
                $request->$ad_campaign_id = $ad_campaign_id;
                \Cookie::queue('ad_campaign_id', $ad_campaign_id, 60 * 24 * 30);
            } else {
                $request->ad_campaign_id = 0;
            }
        }
        
        return $next($request);
    }
}
