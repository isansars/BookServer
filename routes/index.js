// Lama:
var express = require('express');
// var router = express.Router();

// ES6:
// import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //asli: res.render('index', { title: 'Express' });
  res.send("Belajar Membuat REST API dengan Express itu menyenangkan.");
});

// Lama:
module.exports = router;

// ES6:
// export default router;
