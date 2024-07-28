import express from 'express';
import { Product } from '../models/product.js';

const router = express.Router();

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

router.get('/api/transactions', async (req, res) => {
    try {
        const { page = 1, perPage = 10, search = '', month } = req.query;

        if (!month) {
            return res.status(400).json({ error: 'Month parameter is required' });
        }

        const monthNumber = getMonthNumber(month);
        if (!monthNumber) {
            return res.status(400).json({ error: 'Invalid month parameter' });
        }

        let query = {
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, monthNumber]
            }
        };

        // Apply search criteria if present
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search, $options: 'i' } },
            ];
        }

        const total = await Product.countDocuments(query);
        const products = await Product.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));

        res.status(200).json({ total, products });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { router as transactionsRouter };
