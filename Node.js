const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/save-location', (req, res) => {
    const locationData = req.body;
    // Save to database here
    console.log('Received location:', locationData);
    res.json({ success: true, message: 'Location saved' });
});

app.listen(3000, () => console.log('Server running on port 3000'));