import express from 'express'
import { Product } from '../models/product.js';

const router = express.Router()

const getMonthNumber = (monthName) => {
  const monthMap = {
      january: 1,
      february: 2,
      march: 3,
      april: 4,
      may: 5,
      june: 6,
      july: 7,
      august: 8,
      september: 9,
      october: 10,
      november: 11,
      december: 12
  };
  return monthMap[monthName.toLowerCase()];
};

router.get('/api/statistics', async (req, res) => {
  const { month } = req.query;

  if (!month) {
      return res.status(400).json({ error: 'Month parameter is required' });
  }

  const monthNumber = getMonthNumber(month);
  if (!monthNumber) {
      return res.status(400).json({ error: 'Invalid month parameter' });
  }

  try {
      // Aggregation pipeline to count sold items, not sold items, and calculate total sale amount
      const stats = await Product.aggregate([
          { $match: { dateOfSale: { $gte: new Date(`2022-${monthNumber}-01`), $lt: new Date(`2022-${monthNumber + 1}-01`) } } },
          { $group: {
              _id: null,
              soldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
              notSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } },
              totalSaleAmount: { $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] } }
          }}
      ]);

      const result = stats.length > 0 ? stats[0] : { soldItems: 0, notSoldItems: 0, totalSaleAmount: 0 };

      res.json(result);
  } catch (error) {
      console.error('Error fetching statistics:', error);
      res.status(500).json({ error: 'Error fetching statistics' });
  }
});



export { router as getStatsRouter }
