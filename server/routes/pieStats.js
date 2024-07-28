import express from 'express'
import { Product } from '../models/product.js ';
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

router.get('/api/pie-stats', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: 'Month parameter is required' });
    }

    const monthNumber = getMonthNumber(month);
    if (!monthNumber || isNaN(monthNumber)) {
        return res.status(400).json({ error: 'Invalid month parameter' });
    }

    const startDate = new Date(`1970-${monthNumber}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    try {
        const pieChartData = await Product.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        const result = pieChartData.map(({ _id, count }) => ({ category: _id, count }));

        res.json(result);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ error: 'Error fetching pie chart data' });
    }
});



export { router as pieStatsRouter }