# tlly

A command-line tool for keeping tallies

## Build

`npm run build`

## Todo for MVP

[x] get, parse, command-line arguments + help
[x] add new tallies
[x] increment/decrement tallies
[x] display tally counts
[x] delete tally
[x] display tally by date
[x] display recent contiguous tally as count
[x] configure storage location (e.g. for dropbox)
[] npm setup + publish

## Todo Backlog

[] display arbitrary list of tallies (tlly -c exercise meditation)
[] display tallies for a particular date
[] display tallies for a range of dates
[] allow days off for contiguous (e.g. weekends)
[] badges (e.g. when you exercise X number of contiguous days)
[] due to lowdb bug, sync fails in some cases[1]. Maybe switch everything to async
[] display recent contiguous tally as string of chars

[1] https://github.com/typicode/lowdb/issues/283
