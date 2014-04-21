var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var database = 'TeckTalk';

//++++++++++++++++++++++++++++++++++++++++++++++
// connect to mongoDb
//++++++++++++++++++++++++++++++++++++++++++++++

var mongo_port = 27017;
try{
	var db = mongoose.connect('mongodb://localhost:' + mongo_port + '/' + database);
   
   } catch(e){
	console.log(e.message);
   }


//++++++++++++++++++++++++++++++++++++++++++++++
// Todoitem schema
//++++++++++++++++++++++++++++++++++++++++++++++

var todoitemSchema = mongoose.Schema({
		title: {type: String},
		created_on : {type: Date, default: Date.now }
	});

var Todoitem = db.model('todoitem', todoitemSchema);

module.exports = {

//++++++++++++++++++++++++++++++++++++++++++++++
// Get list of todo items
//++++++++++++++++++++++++++++++++++++++++++++++
getList : function(callback){

	Todoitem.find(function(err, items){
		if(err){
			console.log(err);
			callback(null);
		}
			
		 callback(items);
	});
},

//++++++++++++++++++++++++++++++++++++++++++++++
//create a new todoitem
//++++++++++++++++++++++++++++++++++++++++++++++
addTodoitem : function(_todoitem, callback){
	
	var todoitem = new Todoitem({title: _todoitem});
	todoitem.save(function(err){

		if(err){
			console.log(err);
			callback(null);
		}
			
			callback(todoitem);
		});
},

//++++++++++++++++++++++++++++++++++++++++++++++
//delete todoitem
//++++++++++++++++++++++++++++++++++++++++++++++

delTodoitem : function(_todoitemId, callback){

	Todoitem.remove({_id: ObjectId(_todoitemId)}, function(err){

		console.log("Deleting item!");

		if(err){
			console.log(err);
			callback(err, -1);
		}
		else 
			callback(err, 0);
	});

}


}; 
