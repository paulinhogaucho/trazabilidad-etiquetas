const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bodyParser = require('body-parser');
const cors = require('cors');




// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: 'pauleiro',      // Replace with your AWS access key
  secretAccessKey: 'gaucho',  // Replace with your AWS secret key
  region: 'us-east-2',                      // Replace with your bucket's region
});

// Create an S3 instance
const s3 = new AWS.S3();
const app = express();
const port = 5000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Use CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your React app
    methods: ['GET', 'POST'], // Specify allowed methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
  }));
  
// Setup Multer to upload to AWS S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'etiquetasbucket',  // Replace with your S3 bucket name
    acl: 'public-read',  // Permissions for uploaded files
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // Generate a unique filename based on the serial number and timestamp
      const serialNumber = req.body.serialNumber; // from the form
      const fileExtension = file.originalname.split('.').pop();
      cb(null, `${serialNumber}_${Date.now()}.${fileExtension}`);
    }
  })
});

// Route to handle image upload
app.post('/api/upload', upload.array('images', 6), (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files uploaded.');
  }

  const serialNumber = req.body.serialNumber;  // From the form
  const files = req.files;

  console.log(`Received Serial Number: ${serialNumber}`);
  console.log('Uploaded Files:', files);

  // Respond with the uploaded file URLs (S3 URLs)
  const fileUrls = files.map(file => file.location);

  res.status(200).json({
    message: 'Files uploaded successfully!',
    fileUrls: fileUrls,
    serialNumber: serialNumber
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
