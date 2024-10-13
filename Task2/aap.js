const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

const tempData = path.join(__dirname, 'data', 'data.json');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
});

app.post('/submit', (req, res) => {
    const { name, email, dob, mobile, password, message } = req.body;

    
    if (!name || !email || !dob || !mobile || !password || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    if (!validateMobile(mobile)) {
        return res.status(400).json({ success: false, message: 'Invalid mobile number format.' });
    }

    const data = { name, email, dob, mobile, password, message };

    fs.readFile(tempData, 'utf-8', (err, file_data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Server error.' });
        }

        let temp_data = [];
        if (file_data) {
            temp_data = JSON.parse(file_data);
        }
        temp_data.push(data);

        fs.writeFile(tempData, JSON.stringify(temp_data, null, 2), (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, message: 'Server error.' });
            }
            res.status(200).json({ success: true, message: 'Form submitted and data stored temporarily.' });
        });
    });
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMobile(mobile) {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
