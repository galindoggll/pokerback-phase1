<?php

namespace App\Http\Controllers\Api;

use App\Detail;
use App\Http\Controllers\Controller;
use App\Imports\PlayerDataImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class DetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return mixed
     */
    public function index()
    {
        return Detail::loadAll();
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $detail = Detail::getDetail($id);
    }



    public function import(Request $request)
    {
        Excel::import(new PlayerDataImport, $request->file('file'));
    }
}
