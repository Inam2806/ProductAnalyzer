const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dkdz37uxc',
  api_key: '484962139399987',
  api_secret: 'cGLj-ao8zmYsyZO0-0HjPVTfaRk',
  secure: true,
});

module.exports = cloudinary;
