export const getHelp = () => `Usage
$ tlly <subject> <options> 

Options
--rainbow, -r  Include a rainbow

Examples

$ tlly exercise 1 # Add one to exercise
$ tlly exerise # Add one to exercise
$ tlly # Add one to the most recent tally (e.g. excercise)
$ tlly exercise 5 # add five to exercise
$ tlly exercise 10 2018-06-31 # add 10 to a specific tally on a specific date and time*
$ tlly exercise -2 # subtract 2 from exercise
$ tlly -R exercise # reset exercise (to zero)
$ tlly -S exercise 47 # set exericise tally to 47
$ tlly -c exercise # should count for exercise
$ tlly -c # should count for all tallies
$ tlly -D exercise # delete exercise tally
$ tlly --demo # adds dummy data

* ISO 8601 format
`
export const getConfig = () => ({
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
    delete: {
      type: 'boolean',
      alias: 'D'
    },
    demo: {
      type: 'boolean'
    }
  }
})
