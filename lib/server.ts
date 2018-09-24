/**
 * Configures the server port
 */

import app from './app'
import Config from './constants/config'

const PORT = Config.PORT_NUMBER

app.listen(PORT, () => {
  console.log(Config.EXPRESS_LISTENING + PORT)
})