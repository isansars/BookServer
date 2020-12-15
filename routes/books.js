// import express from 'express'
var express = require('express');
// Menambahkan baris kode ini untuk import models
const models = require('../models/index');

const router = express.Router();

/**
 * Route untuk mengambil semua data buku
 */
router.get('/', async function(req, res, next) {
    //res.send('router books');
    try{
        // Mengambil semua data
        const books = await models.books.findAll({});

        if (books.length !== 0){
            res.json({
                'error': false,
                'status': 'OK',
                'messages': '',
                'books': books
            });
        } else{
            res.json({
                'status': 'EMPTY',
                'messages': 'Tidak ada Buku',
                'books': {}
            })
        }
    } catch(err){
        res.status(500).json({
            'status': 'ERROR',
            'messages': 'Internal Server Error'
        })
    }
});

/**
 * Route untuk mengambil buku berdasarkan ID
 */
router.get('/:id', async function(req, res, next) {
	try{
        // Menangkap param ID
        const id = req.params.id;
        const book = await models.books.findByPk(id);

        if (book){
            res.json({
                'status': 'OK',
                'messages': '',
                'books': book
            });
        } else{
            res.status(404).json({
                'status': 'NOT_FOUND',
                'messages': 'Buku tidak ditemukan',
                'books': null
            });
        }
    } catch(err){
        res.status(500).json({
            'status': 'ERROR',
            'messages': 'Internal Server Error'
        });
    }
});

/**
 * Route untuk menambahkan buku baru
 */
router.post('/', async function(req, res, next) {
    try{
        // Menangkap form data yang dikirim melalui request body
        const{
            title,
            price,
            author,
            cover
        } = req.body;

        // Membuat data baru di DB menggunakan metode create
        const book = await models.books.create({
            title,
            price,
            author,
            cover
        });

        // Jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (book){
            res.status(201).json({
                'status': 'OK',
                'messages': 'Buku berhasil ditambahkan',
                'books': book
            });
        }
    } catch(err){
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
});

/**
 * Route untuk mengupdate buku berdasarkan ID
 */
router.put('/:id', async function(req, res, next) {
    try{
        const id = req.params.id
        const{
            title,
            price,
            author,
            cover
        } = req.body

        const book = await models.books.update({
            title,
            price,
            author,
            cover
        }, {
            where: {
                id: id
            }
        })

        if (book){
            res.json({
                'status': 'OK',
                'messages': 'Buku berhasil diubah'
            })
        }
    } catch(err){
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
});

/**
 * Route untuk menghapus buku berdasarkan ID
 */
router.delete('/:id', async function(req, res, next) {
    try{
        const id = req.params.id
        const book = models.books.destroy({
            where: {
                id: id
            }
        })

        if (book){
            res.json({
                'status': 'OK',
                'messages': 'Buku berhasil dihapus'
            })
        }
    } catch(err){
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
});

// export default router;
module.exports = router;