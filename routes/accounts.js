var express = require('express');
var accounts = require('../models/accounts');
 
var router = express.Router();
 
// 獲取 前綴是/accounts 請求
router.route('/')
    // 取得所有資源
    .get(function (req, res) {
        accounts.items(req, function (err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }
 
            // 沒有找到指定的資源
            if (!results.length) {
                res.sendStatus(404);
                return;
            }
            // var results = res.json(results);
            
            res.render('index',{results:results});
            
            
        });
    })
    // 新增一筆資源
    .post(function (req, res) {        
        accounts.add(req, function (err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }
 
            // 新的資源已建立 (回應新增資源的 id)
            res.status(201).json(results.insertId);
        });
    });
 
// 獲取如 /accounts/1 請求
router.route('/:id')
    // 取得指定的一筆資源
    .get(function (req, res) {
        accounts.item(req, function (err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }
 
            if (!results.length) {
                res.sendStatus(404);
                return;
            }
 
            res.json(results);
            
        });
    })
    // 刪除指定的一筆資源
    .delete(function (req, res) {        
        accounts.delete(req, function (err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }
 
            // 指定的資源已不存在
            // SQL DELETE 成功 results.affectedRows 會返回 1，反之 0
            if (!results.affectedRows) {
                res.sendStatus(410);
                return;
            }
 
            // 沒有內容 (成功)
            res.sendStatus(204);
        });
    })
    // 覆蓋指定的一筆資源
    .put(function (req, res) {
        accounts.put(req, function (err, results) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }
 
            if (results === 410) {
                res.sendStatus(410);
                return;
            }
             
            accounts.item(req, function (err, results, fields) {
                res.json(results);
            });
        });
    })
    // 更新指定的一筆資源 (部份更新)
    .patch(function (req, res) {
        accounts.patch(req, function (err, results, fields) {
            if (err) {
                res.sendStatus(500);
                return console.error(err);
            }
             
            if (!results.affectedRows) {
                res.sendStatus(410);
                return;
            }
             
            // response 被更新的資源欄位，但因 request 主體的欄位不包含 id，因此需自行加入
            req.body.id = req.params.id;
            res.json([req.body]);
        });
    });
 
module.exports = router;