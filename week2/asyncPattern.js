const express = require('express');
const app = express();
const PORT = 3000;


const mockData = {
    user: { id: 1, name: 'AAA' },
    cart: [
        { product: 'Lap', price: 1200 },
        { product: 'Mouse', price: 25 },
        { product: 'KB', price: 75 },
    ],
};
function fetchUserCallback(userId, callback) {
    setTimeout(() => {
        callback(null, mockData.user);
    }, 500);
}

function fetchCartCallback(userId, callback) {

    setTimeout(() => {
        callback(null, mockData.cart);
    }, 500);
}

function calculateTotalCallback(cart, callback) {
    setTimeout(() => {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        callback(null, total);
    }, 500);
}

function processPaymentCallback(total, callback) {
    setTimeout(() => {
        callback(null, { success: true });
    }, 500);
}



const fetchUserPromise = (userId) => new Promise((resolve, reject) => fetchUserCallback(userId, (err, data) => err ? reject(err) : resolve(data)));
const fetchCartPromise = (userId) => new Promise((resolve, reject) => fetchCartCallback(userId, (err, data) => err ? reject(err) : resolve(data)));
const calculateTotalPromise = (cart) => new Promise((resolve, reject) => calculateTotalCallback(cart, (err, data) => err ? reject(err) : resolve(data)));
const processPaymentPromise = (total) => new Promise((resolve, reject) => processPaymentCallback(total, (err, data) => err ? reject(err) : resolve(data)));



app.get('/callback', (req, res) => {
    fetchUserCallback(1, (err1, user) => {
        if (err1) return res.status(500).send(err1.message);
        
        fetchCartCallback(user.id, (err2, cart) => {
            if (err2) return res.status(500).send(err2.message);
            
            calculateTotalCallback(cart, (err3, total) => {
                if (err3) return res.status(500).send(err3.message);
                
                processPaymentCallback(total, (err4, confirmation) => {
                    if (err4) return res.status(500).send(err4.message);
                    
                    res.status(200).json({ pattern: 'Callback', confirmation });
                });
            });
        });
    });
});


app.get('/promise', (req, res) => {
    fetchUserPromise(1)
        .then(user => fetchCartPromise(user.id))
        .then(cart => calculateTotalPromise(cart))
        .then(total => processPaymentPromise(total))
        .then(confirmation => {
            res.status(200).json({ confirmation });
        })
        .catch(error => {
            res.status(500).send(error.message);
        });
});


app.get('/async', async (req, res) => {
    try {
        const user = await fetchUserPromise(1);
        const cart = await fetchCartPromise(user.id);
        const total = await calculateTotalPromise(cart);
        const confirmation = await processPaymentPromise(total);

        res.status(200).json({ confirmation });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
