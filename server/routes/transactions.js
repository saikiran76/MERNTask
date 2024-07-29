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
            console.error('Month parameter is missing');
            return res.status(400).json({ error: 'Month parameter is required' });
        }

        const monthNumber = getMonthNumber(month);
        if (!monthNumber) {
            console.error('Invalid month parameter:', month);
            return res.status(400).json({ error: 'Invalid month parameter' });
        }

        let query = {
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, monthNumber]
            }
        };

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { title: searchRegex },
                { description: searchRegex }
            ];
        }

        console.log('Query:', JSON.stringify(query, null, 2));

        const total = await Product.countDocuments(query);
        console.log('Total products found:', total);

        const products = await Product.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));

        console.log('Products:', products);

        res.status(200).json({ total, products });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        if (error.name === 'MongoError') {
            return res.status(500).json({ error: 'Database error occurred' });
        }
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});


export { router as transactionsRouter };
