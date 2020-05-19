<?php

namespace App\Exports;

use App\Player;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class PlayerExport implements FromView
{
    public function view(): View
    {
        return view('player', [
            'players' => Player::with('user')->get()
        ]);
    }
}
