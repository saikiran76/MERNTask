import express from 'express'
import bodyParser from 'body-parser'
import { barStatsRouter } from './routes/barStats.js'
import { pieStatsRouter } from './routes/pieStats.js'
import { getStatsRouter } from './routes/statistics.js'
import { transactionsRouter } from './routes/transactions.js'
import { aggregateDataRouter } from './routes/aggregateData.js'


const app = express()

app.use(bodyParser.json());

app.use(transactionsRouter)
app.use(getStatsRouter)
app.use(barStatsRouter)
app.use(pieStatsRouter)
app.use(aggregateDataRouter)

export { app }

