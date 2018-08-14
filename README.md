# tlly

A command-line tool for keeping tallies.

## Installation

`npm install -g tlly`

## Thanks, Gleb!

Your simple words "Do a project" made me finally _do a project_ I'd procrastinated on for year. This is something I'll use every day.

Now please say "Clean out the garage!" My wife will thank you.

## About tlly

### My Life with Tallies

I've always kept tallies. I've done this for both practical and obsessive reasons.

Practical: if I keep track of how many times I've exercised or meditated, I find willpower. Simply making tick-marks on a piece of paper increases my stamina. Sure, this is silly. But what's life without magical thinking?

Obsessive: I like to count. I count all the times my cat has taken bites out of the sofa (47), the number times I've forgotten my wallet (16), the days that have elapsed since I promised I'd clean out the garage (129), and so on.

Pointless and a little off-kilter? Yup. Good thing I also tally home many times I've taken my meds! (I kid, I kid.)

### Thanks, Jerry!

Jerry Seinfeld (Yes, _that_ Jerry Seinfeld) invented a super-simple productivity system. Each day that he worked on his act, he made an X through that day's calendar entry--with the goal of never breaking the chain of Xes.

Seinfeld's method has become my willpower superpower! Instead of a calendar, I just increase a count. First day of meditation = 1, second day = 2, third day = 3... I think of it as my score.

But if, after ten days (with a score of 10), I get lazy and skip a day of meditation, my score goes back to zero. The prospect of which fills me with such existential dread, I meditate even if I have the flu or have to yank myself away from binge-watching reruns of "Sex in the City".

For years, I've wanted a simple command-line tool for keeping tallies. Not GTD. Not a todo app. Something much mure simpler--something I can use almost without thinking. I searched, found nothing suitable, heard Gleb's say "Do a project," and built it myself.

## Configuration

By default, tallies are stored in `.tllydb.json` in your home directory. If you'd like to store them elsewhere (such as in your Dropbox folder), edit `[your home directory]/.tlly-config.json`, setting `dbLocation` to whatever directory you want. (Please use the full path.)

## Usage

`tlly --help` displays the text of "War and Peace." Just kidding. It displays help.

`tlly exercise 5` adds 5 to your exercise tally, creating the tally if it doesn't exist.

`tlly exercise` adds 1 to the exercise tally.

`tlly` adds 1 to the most recent tally.

`tlly -c exercise` displays the current total for exercise.

`tlly -c` displays the current totals for all of your tallies.

`tlly -t exercise` displays all the changes to exercise, sorted by timestamp.

`tlly -t` displays all changes to all tallies, sorted by timestamp.

`tlly --delete exercise` deletes the exercise tally. If you then do `tlly exercise`, you start over at 1.

`tlly -s exercise` displays how many contiguous days leading up to today you've exercised. ("s" is for Seinfeld!)

`tlly -s` displays the number contiguous days leading up to today for all tallies.

`tlly exercise 2018-06-31` timestamps a tally with a specified date (ISO format).

## Testing Contiguous Tallies

When you're first playing with tlly, you may want to try out Seinfeld mode, but it's not much fun until you'll done something for a few days and then, perhaps, skipped a day.

So run `tlly --demo`, which will add \_exercise \_mediation to your tallies, setting both to 9, as if you'd been exercising and meditating for 9 days. (The underscores are to keep them from messing up existing tallies with the names "exercise" and "meditation".)

If you then run `tlly -c` you'll see 9 for both.

But if you run `tlly -s` you'll see that \_meditation has been reset to zero. To see why, run `tlly -t`. As you'll see, you skipped a couple of days of meditating.

How un-Zen of you!

## Example

```
$ tlly --demo
Added tally _exercise
Added tally _meditation
$ tlly -c
_exercise: 9
_meditation: 9
$ tlly -s
_exercise: 9
_meditation: 0
tlly -t
_exercise: 1 (Sat, 04 Aug 2018 23:50:26 GMT)
_exercise: 1 (Sun, 05 Aug 2018 23:50:26 GMT)
_exercise: 1 (Mon, 06 Aug 2018 23:50:26 GMT)
_exercise: 1 (Tue, 07 Aug 2018 23:50:26 GMT)
_exercise: 1 (Wed, 08 Aug 2018 23:50:26 GMT)
_exercise: 1 (Thu, 09 Aug 2018 23:50:26 GMT)
_exercise: 1 (Fri, 10 Aug 2018 23:50:26 GMT)
_exercise: 1 (Sat, 11 Aug 2018 23:50:26 GMT)
_exercise: 1 (Sun, 12 Aug 2018 23:50:26 GMT)

_meditation: 1 (Thu, 02 Aug 2018 23:50:26 GMT)
_meditation: 1 (Fri, 03 Aug 2018 23:50:26 GMT)
_meditation: 1 (Sat, 04 Aug 2018 23:50:26 GMT)
_meditation: 1 (Sun, 05 Aug 2018 23:50:26 GMT)
_meditation: 1 (Mon, 06 Aug 2018 23:50:26 GMT)
_meditation: 1 (Tue, 07 Aug 2018 23:50:26 GMT)
_meditation: 1 (Wed, 08 Aug 2018 23:50:26 GMT)
_meditation: 1 (Thu, 09 Aug 2018 23:50:26 GMT)
_meditation: 1 (Fri, 10 Aug 2018 23:50:26 GMT)
$ tlly _exercise 100
_exercise: 109
$ tlly _exercise
_exercise: 110
$ tlly
_exercise: 111
$ tlly
_exercise: 112
$ tlly _meditation
_meditation: 10
$ tlly
_meditation: 11
$ tlly insomnia
insomnia: 1
$ tlly
insomnia: 2
$ tlly --delete _exercise
$ tlly -c
_meditation: 11
insomnia: 2
```

## Build

`npm run build`

## Test

`npm test`

## Tech

This app uses lowdb, because most of my work involves heavy-lifter DBs, such as postgres. I wanted to `tlly try-something-different`.

## Todo for MVP

- [x] get, parse, command-line arguments
- [x] add help
- [x] add new tallies
- [x] increment/decrement tallies
- [x] display tally counts
- [x] delete tally
- [x] display tally by date
- [x] display contiguous tallies
- [x] add tally with arbitrary date
- [x] add demo
- [x] configure storage location (e.g. for dropbox)
- [x] readme
- [x] npm setup + publish

## Todo Backlog

- [] recalc contiguous after user adds arbitrary timestamp, which might have plugged a gap
- [] display arbitrary list of tallies (tlly -c exercise meditation)
- [] display tallies for a particular date
- [] display tallies for a range of dates
- [] allow days off for contiguous (e.g. weekends)
- [] badges (e.g. when you exercise X number of contiguous days, you get praised)
- [] due to lowdb bug, sync fails in some cases[1]. Maybe switch everything to async
- [] optionally display recent contiguous tally as some sort of chain: xxxxx

[1] https://github.com/typicode/lowdb/issues/283
