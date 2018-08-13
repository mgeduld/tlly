export const getHelp = () => `Usage

To update a tally:
$ tlly <tally name> <amount> 

The default amount is 1

If you omit both tally name and amount, 1 will be added 
to the most recent tally name.

You can add negative amounts

To display tally counts:
$ tlly -c <tally name>

If you omit the tally name, all tally counts will be displayed

To display tallies that have been updated every day:
$ tlly -s <tally name>

To display tallies by timestamp:
$ tlly -t <tally name>

To delete a tally:
$ tlly --delete tally_name

To force a specific date[1]
$ tlly exercise 10 2018-06-31

[1]ISO 8601 format
`
export const getConfig = () => ({
  flags: {
    count: {
      type: 'boolean',
      alias: 'c'
    },
    delete: {
      type: 'boolean'
    },
    demo: {
      type: 'boolean'
    },
    seinfeldCount: {
      type: 'boolean',
      alias: 's'
    },
    timestamp: {
      type: 'boolean',
      alias: 't'
    }
  }
})
