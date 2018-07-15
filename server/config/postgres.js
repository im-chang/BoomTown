const { Pool } = require('pg')

module.exports = function(app) {
  /**
   * @TODO: Configuration Variables
   *
   *  Retrieve the necessary information to connect to Postgres
   *  For example: app.get('PG_DB')
   */
  return new Pool({
    /**
     *  @TODO: Supply the correct configuration values to connect to postgres
     */

    host: app.get('PG_HOST'),
    user: app.get('PG_USER'),
    password: app.get('PG_PASSWORD'),
    database: app.get('PG_DB'),
    // port: app.get('PG_PORT'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  })
}
