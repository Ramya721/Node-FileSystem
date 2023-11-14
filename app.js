// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Create a folder if it doesn't exist
const folderPath = path.join(__dirname, 'files');
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// Endpoint to create a text file with current timestamp
app.post('/create-file', (req, res) => {
  const timestamp = new Date().toISOString();
  const fileName = `${timestamp}.txt`;
  const filePath = path.join(folderPath, fileName);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating file.' });
    }

    res.status(201).json({ message: 'File created successfully.', fileName });
  });
});

// Endpoint to retrieve all text files
app.get('/get-files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading files.' });
    }

    res.status(200).json({ files });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
