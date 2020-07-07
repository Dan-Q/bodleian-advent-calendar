# Bodleian Advent Calendar

For the last few years, I've helped the Bodleian Libraries to produced a digital advent calendar for their website with different
things behind the doors. In 2018 we replaced our existing approach with a new one which gradually, over the course of the run-up
to Christmas, reveals a single large picture we'd commissioned for that purpose. You can see it at
https://www.bodleian.ox.ac.uk/advent2018. I wrote a blog post about it at https://danq.me/2018/12/05/advent2018/.

If you'd like one of your own, this project gives your the skeleton to do so. You'll need:

* Webserver running PHP
* Imagemagick
* Bash

## Features

* Uses server time, not client, to determine whether doors eligible to be opened yet
* Preloads what's behind doors that can be opened, for speed
* Remembers state in cookie and "pre-opens" doors that you opened last time
* Responsive with optimised images from 320px wide all the way up to 4K fullscreen (and "works" even beyond)
* CSS-animated opening doors
* Result image is delivered in chunks only where eligible, so there's no way to "peep ahead" to doors not-yet-available
* Debug mode lets you open any door you like (protected by a password, checked server-side)
* Open source; adapt for your own use and publish if you give credit

## Setting up

1. Create your image at exactly 3840px × 2160px in `advent-calendar/original.jpg`.
2. In the advent-calendar directory, run `./cut.sh` to cut up the image into optimised pre-sized segments.
3. (Optional) Change the timezone in `public/index.php`/`public/door.php`, if necessary.
4. (Optional) Edit `public/advent.js` and `public/door.php` to specify the door order; be sure to change both places and note that
   the latter uses a slightly different syntax ("25" for bottom half of door 24) to the former.
5. Change the password in `public/door.php` (defaults to "asecretpassword"); this is used to unlock debug mode.
6. Host the public folder, e.g. in development mode, locally, by running `php -S 0.0.0.0:3000` in the public folder.

## Using

Click/tap to open a door.

'c' on keyboard to close all doors.

't' on keyboard 5 times in succession to trigger debug mode. Provide the number of days "in the future" to travel (e.g. 30, to make
it as if it were "next month") and the password you selected in step #5 above (default: "asecretpassword"). If you get the password
wrong you'll find that the image behind each door isn't loaded.

## License

Licensed under GPLv3. Credit Dan Q and Bodleian Libraries. And have a Merry Christmas. Sample images and table background obtained
from pexels.com under a CC0 license.
