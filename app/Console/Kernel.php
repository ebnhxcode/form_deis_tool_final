<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        // Commands\Inspire::class,
        //Commands\UnlockFormDeis::class,
        'App\Console\Commands\UnlockFormDeis',
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')
        //          ->hourly();
        #$schedule->command('unlock:formdeis')->hourly();
        $schedule->command('unlock:formdeis')->cron('30 * * * *') ;
        #$schedule->command('unlock:formdeis')->cron('30 * * * *') ;
    }
}
