var TodoApp = angular.module('TodoApp', ['ngResource']);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//services
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
TodoApp.factory('TodoFactory',['$resource', function($resource){
	return {
		todolist : $resource('/todoitems',{},{
            delete: {
                method: 'DELETE'
                , params: {id: '@_id'}
                , url: '/todoitems/:id'
            }
        })
    }
	
}]);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//controllers
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//mainController
TodoApp.controller("mainController", ['$scope','TodoFactory', function($scope, TodoFactory){

$scope.todolist = TodoFactory.todolist.query();

$scope.addItem = function(){
	var target = $("#newItem");
	var newItem = target.val();
	if(newItem.length>0){
		var item = new TodoFactory.todolist({title:newItem});
		item.$save(function(_item,response){
			$scope.todolist.push(_item);
			target.val('');
		});
		
	}
	else{
		alert("Enter a title please!");
	}
}

$scope.editItem = function(_item){
//TODO
}

$scope.delItem = function(_item){
	if(confirm("Delete item \"" + _item.title + "\"" )){
		var item = new TodoFactory.todolist({});
		_item.$delete({},
			//success
			function(response){
				$scope.todolist.splice($scope.todolist.indexOf(_item),1);
			},
			//failure
			function(response){
				alert("Cant delete item");
			}
			);
	}
}

}]);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//directives
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//filters
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
