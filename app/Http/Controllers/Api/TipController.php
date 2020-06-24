<?php

namespace App\Http\Controllers\Api;

use App\Models\Tip;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class TipController extends Controller
{
    public function got_it($tip_id)
    {
        $tip = Tip::findOrFail($tip_id);
        
        $query = DB::table(Tip::USER_PIVOT_TABLE);
        $query->where('user_id', '=', auth()->user()->id);
        $query->where('tip_id', '=', $tip->id);

        if (!$query->exists()) {
            DB::table(Tip::USER_PIVOT_TABLE)->insert([
                'user_id' => auth()->user()->id,
                'tip_id' => $tip->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return response()->resource();
    }
    
    public function skip_all()
    {
        $tips = Tip::get();
        
        foreach ($tips as $tip) {
            $query = DB::table(Tip::USER_PIVOT_TABLE);
            $query->where('user_id', '=', auth()->user()->id);
            $query->where('tip_id', '=', $tip->id);
    
            if (!$query->exists()) {
                DB::table(Tip::USER_PIVOT_TABLE)->insert([
                    'user_id' => auth()->user()->id,
                    'tip_id' => $tip->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
        
        return response()->resource();
    }
}
