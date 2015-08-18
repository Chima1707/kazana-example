module.exports = {
  name: 'myapp',
  version: '1.0.0',
  port: 5000,

  // serve static assets at root folder
  static: 'public',

  // hapi routes
  routes: [{
    method: 'GET',
    path: '/indices/movementsByCategory',
    handler: function (request, reply) {
      var server = request.connection.server
      var store = server.methods.getStore({
        name: 'integrated-data',
        auth: request
      })

      store.db.query('movementsByCategory', {
        group_level: 1
      })
        .then(function (response) {
          var movementsByCategory = response.rows.reduce(function (map, row) {
            map[row.key] = row.value.amount
            return map
          }, {})
          reply(JSON.stringify(movementsByCategory, null, 4))
        })
        .catch(reply.pouchdbError)
    }
  }],

  // simple definition of indicies, by database & index
  indices: {
    'integrated-data': {
      'movementsByCategory': {
        version: '1.0.0',
        /* globals emit */
        map: function (integrated) {
          emit(integrated.data.category, integrated.data.amount)
        },
        /* globals sum */
        reduce: function (keys, values) {
          return {
            amount: sum(values)
          }
        }
      }
    }
  },

  // transformation scripts by dataReport.type => [indicator.type, handler]
  transform: {
    'bookkeeping': ['movement', function (server, dataReport, callback) {
      var lines = dataReport.data.split(/\n/)
      var integrated = []
      var matches
      for (var i = 0; i < lines.length; i++) {
        matches = lines[i].match(/^([+-]?[\d\.]+)\s*(.*)$/)
        if (!matches) return callback(new Error('Data could not be parsed'))
        integrated.push({
          amount: parseFloat(matches[1]),
          category: matches[2] || 'not set'
        })
      }
      callback(null, integrated)
    }]
  }
}
