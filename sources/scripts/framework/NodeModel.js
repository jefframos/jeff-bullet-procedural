/*jshint undef:false */
//node model
var NodeModel = Class.extend({
	init:function(){
		//position
		this.position = [];
		//distance
		this.dist = 0;
		//parent position
		this.parentPosition = [];
		//side of the childs
		this.childrenSides = [null,null,null,null];
		//parent id
		this.parentId = -1;
		//node parent
		this.parent = null;
		//is active
		this.active = false;
		//mode
		this.mode = 0;
		//id
		this.id = -1;
	}
});
