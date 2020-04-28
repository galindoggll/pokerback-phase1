<?php

namespace App\Imports;

use App\Detail;
use App\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithStartRow;

class DetailsImport implements ToCollection, WithHeadingRow, WithStartRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $collection)
    {

        foreach ($collection as $row) {
            if (!empty($row['player_id']) && !empty($row['winnings'])) {
                Detail::updateOrCreate(
                    ['player_id' => $row['player_id']],
                    [
                        'player_id' => $row['player_id'],
                        'region' => $row['countryregion'],
                        'nickname' => $row['nickname'],
                        'memoname' => $row['memoname'],
                        'winnings' => $row['winnings'],
                        'rake' => $row['rake'],
                    ]);
            }
        }
    }

    public function headingRow(): int
    {
        return 3;
    }

    public function batchSize(): int
    {
        return 1000;
    }

    public function startRow(): int
    {
        return 6;
    }
}
