import express from 'express'
import { Product } from '../models/product.js';

const router = express.Router()

const priceRanges = [
  { range: '0 - 100', min: 0, max: 100 },
  { range: '101 - 200', min: 101, max: 200 },
  { range: '201 - 300', min: 201, max: 300 },
  { range: '301 - 400', min: 301, max: 400 },
  { range: '401 - 500', min: 401, max: 500 },
  { range: '501 - 600', min: 501, max: 600 },
  { range: '601 - 700', min: 601, max: 700 },
  { range: '701 - 800', min: 701, max: 800 },
  { range: '801 - 900', min: 801, max: 900 },
  { range: '901 - Above', min: 901, max: Infinity }
];

router.get('/api/combined-data', async (req, res) => {
  try {
      // Assuming you have a function to calculate the total count of items within each price range
      const counts = await Promise.all(priceRanges.map(async (range) => {
          // Replace this with your actual query logic
          return await Product.countDocuments({
              price: { $gte: range.min, $lte: range.max }
          });
      }));

      // Map the counts to the original priceRanges for easier processing
      const result = priceRanges.map((range, index) => ({
          ...range,
          count: counts[index]
      }));

      res.json(result);
  } catch (error) {
      console.error('Error fetching combined data:', error);
      res.status(500).json({ error: 'Error fetching combined data' });
  }
});

// Utility function to convert month name to month number
function getMonthNumber(monthName) {
  const monthMap = {
      january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
      july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
  };
  return monthMap[monthName.toLowerCase()];
}


export { router as aggregateDataRouter }