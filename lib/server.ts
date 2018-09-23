/**
 * Configures the server port
 */

import app from './app'

const PORT = 4000

app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT)
})