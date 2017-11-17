<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\FormDeis;
use Carbon\Carbon;

class UnlockFormDeis extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'unlock:formdeis';
    #*/1 * * * * php /var/www/html/form_deis_tool/artisan unlock:formdeis >> /dev/null 2>&1
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $form_deis = FormDeis::where('estado_form_deis', 'ocupado')->orderBy('id','desc')->get();

        foreach($form_deis as $key => $fd){
            #$date = "2016-09-16 11:00:00";
            #dd( $fd->updated_at->diff(Carbon::now())->format('%y year, %m months, %d days, %h hours and %i minutes') );
            #dd( $fd->updated_at->diffForHumans(Carbon::now()) );
            /*
            $date = $fd->updated_at->toDateTimeString();

            $datework = Carbon::createFromDate($date);
            dd($datework);
            $now = Carbon::now();
            $testdate = $datework->diffInDays($now);
            dd($testdate);
            */

            $diff = $fd->updated_at->diff(Carbon::now())->format('%y:%m:%d:%h:%i');
            $diff = explode(':', $diff);
            if ($diff[0] > 0 || $diff[1] > 0 || $diff[2] > 0 || $diff[3] > 0 || $diff[4] > 30) {
                $fd->estado_form_deis = 'disponible';
                $fd->save();
                #echo $fd->estado_form_deis;
            }


        }
    }
}
