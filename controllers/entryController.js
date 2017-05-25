'use strict'

// Dependencies
const Entry = require('../models/Entry')

module.exports = {
  /**
   * Retrieve 10 entries from database then send it to the user
   */
  get: function (req, res, next) {
  	// find 10 entries from our entry model
    Entry.find().limit(10).exec(function (err, entries) {
      // always handle the case where the database request failed
      if (err) {
        return res.render('error', { err: err })
      }

      // now we can assume that we have a list of entries from the database
      // but it can be empty
      if (entries.length === 0) {
        return res.render('entries', {
          entries: 'It looks like there is nothing inside the database'
        })
      }

      // now we are sure that we have entries, so we will display them
      return res.render('entries', { entries: JSON.stringify(entries, null, 4) })
    })
  }
}