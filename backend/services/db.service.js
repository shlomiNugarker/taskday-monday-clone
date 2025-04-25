const MongoClient = require('mongodb').MongoClient

const config = require('../config')

module.exports = {
  getCollection,
}

// Database Name
const dbName = 'taskday_db'

var dbConn = null
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000 // 1 second

async function getCollection(collectionName) {
  try {
    const db = await connect()
    const collection = await db.collection(collectionName)
    return collection
  } catch (err) {
    logger.error('Failed to get Mongo collection', err)
    throw err
  }
}

async function connect(retryCount = 0) {
  if (dbConn) return dbConn
  
  try {
    const client = await MongoClient.connect(config.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 5000, // 5 second timeout
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    })
    
    const db = client.db(dbName)
    dbConn = db
    return db
  } catch (err) {
    logger.error(`Cannot Connect to DB (attempt ${retryCount + 1}/${MAX_RETRIES})`, err)
    
    // Retry logic
    if (retryCount < MAX_RETRIES - 1) {
      logger.info(`Retrying DB connection in ${RETRY_DELAY_MS}ms...`)
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS))
      return connect(retryCount + 1)
    }
    
    throw err
  }
}
