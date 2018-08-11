export const help = `Usage
$ tlly <subject> <options> 

Options
--rainbow, -r  Include a rainbow

Examples

$ tlly exercise 1 # Add one to exercise
$ tlly exerise # Add one to exercise
$ tlly # Add one to the most recent tally (e.g. excercise)
$ tlly exercise 5 # add five to exercise
$ tlly exercise -2 # subtract 2 from exercise
$ tlly -R exercise # reset exercise (to zero)
$ tlly -S exercise 47 # set exericise tally to 47
$ tlly -c exercise # should count for exercise
$ tlly -c # should count for all tallies
$ tlly -D exercise # delete exercise tally
`
export const config = {
  flags: {
    reset: {
      type: 'boolean',
      alias: 'R'
    },
    set: {
      type: 'boolean',
      alias: 'S'
    },
    count: {
      type: 'boolean',
      alias: 'c'
    },
    boolean: {
      type: 'boolean',
      alias: 'D'
    }
  }
}
