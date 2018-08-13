# tlly

A command-line tool for keeping tallies

## Build

`npm run build`

## Todo for MVP

[x] get, parse, command-line arguments + help
[x] add new tallies
[x] increment/decrement tallies
[x] display tally counts
[] delete tally
[] display tally by date
[] display recent contiguous tally as count
[] display recent contiguous tally as string of chars

## Todo Backlog

[] configure storage location (e.g. for dropbox)
[] npm setup + publish
[] display arbitrary list of tallies (tlly -c exercise meditation)
[] display tallies for a particular date
[] display tallies for a range of dates
[] allow days off for contiguous (e.g. weekends)
[] badges (e.g. when you exercise X number of contiguous days)
[] due to lowdb bug, sync fails in some cases\*. Maybe switch everything to async

- https://github.com/typicode/lowdb/issues/283
