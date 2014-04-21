var express = require('express');
var router = express.Router();

var TodoItems = require('../modeles/TodoItemModele.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET list items. */
router.get('/todoitems', function(req, res) {
	TodoItems.getList(function(items){
		if(items!=null)
			res.send(items);
	});
});

/* Create a new  todo item. */
router.post('/todoitems', function(req, res) {
    if(req.body.title != undefined){
  	 TodoItems.addTodoitem(req.body.title, function(item){
  		if(item != null)
  			res.send(item);
  	 });	
    }
});

/* Delete an item. */
router.delete('/todoitems/:id', function(req, res) {
	if(req.params.id != undefined){
		TodoItems.delTodoitem(req.params.id , function(err,code){
			if(code===0)
				res.send();
		});
	}
});

module.exports = router;
