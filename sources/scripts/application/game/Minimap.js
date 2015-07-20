/*jshint undef:false */
var Minimap = Class.extend({
	init:function(){
		this.collidable = false;
	},
	build:function(gen){
		this.gen = gen;
		this.background = new PIXI.Graphics();

		this.container = new PIXI.DisplayObjectContainer();
		this.roomsContainer = new PIXI.DisplayObjectContainer();
		this.container.addChild(this.background);
		this.container.addChild(this.roomsContainer);
		this.arrayRooms = [];
		this.margin = {x: 15, y: 15};
		this.sizeTile = {x:80, y:50};
		this.sizeGraph = {x:40, y:25};

		// console.log(this.gen.rooms);

		var minX = 9999;
		var minY = 9999;
		var maxX = -9999;
		var maxY = -9999;
		var tempX = 0;
		var tempY = 0;

		for (var j = 0; j < this.gen.rooms.length; j++)
		{
			var item = this.gen.rooms[j];


			for (var i = 0; i < item.length; i++)
			{
				if (item[i].id > 0)
				{
					// console.log('item', item[i]);
					var tempRoomView = new PIXI.Graphics();
					var nodeColor = 0xffffff;
					if(item[i].mode === 1){
						nodeColor = 0x52d468;
					}else if(item[i].mode === 2){
						nodeColor = 0xaeaeae;
					}else if(item[i].mode === 3){
						nodeColor = 0xf7cd39;
					}else if(item[i].mode === 4){
						nodeColor = 0xf73939;
					}else if(item[i].mode === 5){
						nodeColor = 0xCB5B00;
					}else if(item[i].mode === 6){
						nodeColor = 0xcb52c4;
					}else{
						nodeColor = 0xffffff;
					}
					tempRoomView.beginFill(nodeColor);
					var tempSideGraphic;

					tempX = item[i].position[1] * this.sizeTile.x;
					tempY = item[i].position[0] * this.sizeTile.y;
					tempRoomView.position.x = tempX;
					tempRoomView.position.y = tempY;
					tempRoomView.drawRect(0,0,this.sizeGraph.x,this.sizeGraph.y);
					tempRoomView.endFill();
					this.roomsContainer.addChild(tempRoomView);

					for (var k = 0; k < item[i].childrenSides.length; k++) {
						if(item[i].childrenSides[k]){
							if(k === 0){//left
								tempSideGraphic = new PIXI.Graphics();
								tempSideGraphic.beginFill(nodeColor);
								tempSideGraphic.drawRect(0,0,this.sizeGraph.x / 2,this.sizeGraph.y / 2);
								tempX = -this.sizeGraph.x / 2;
								tempY = this.sizeGraph.y / 4;//this.sizeGraph.y;
							}else if(k === 1){//right
								tempSideGraphic = new PIXI.Graphics();
								tempSideGraphic.beginFill(nodeColor);
								tempSideGraphic.drawRect(0,0,this.sizeGraph.x / 2,this.sizeGraph.y / 2);
								tempX = this.sizeGraph.x;//this.sizeGraph.y;
								tempY = this.sizeGraph.y / 4;
							}else if(k === 2){//right
								tempSideGraphic = new PIXI.Graphics();
								tempSideGraphic.beginFill(nodeColor);
								tempSideGraphic.drawRect(0,0,this.sizeGraph.x / 2,this.sizeGraph.y / 2);
								tempX = this.sizeGraph.x / 4;//this.sizeGraph.y;
								tempY = -this.sizeGraph.y / 2;
							}else if(k === 3){//down
								tempSideGraphic = new PIXI.Graphics();
								tempSideGraphic.beginFill(nodeColor);
								tempSideGraphic.drawRect(0,0,this.sizeGraph.x / 2,this.sizeGraph.y / 2);
								tempX = this.sizeGraph.x / 4;//this.sizeGraph.y;
								tempY = this.sizeGraph.y;
							}
							if(tempSideGraphic){
								tempSideGraphic.position.x = tempX;
								tempSideGraphic.position.y = tempY;
								tempRoomView.addChild(tempSideGraphic);
							}
							tempSideGraphic = null;
						}
					}
					if (minX > item[i].position[1]){
						minX = item[i].position[1];
					}
					if (minY > item[i].position[0]){
						minY = item[i].position[0];
					}

					if (maxX < item[i].position[1]){
						maxX = item[i].position[1];
					}
					if (maxY < item[i].position[0]){
						maxY = item[i].position[0];
					}
					// console.log(i,j);
					tempRoomView.positionID = {i:j,j:i};
					this.arrayRooms.push(tempRoomView);
				}
			}
		}
		for (var m = 0; m < this.arrayRooms.length; m++) {
			this.arrayRooms[m].position.x -= minX * this.sizeTile.x - this.margin.x - this.sizeGraph.x/2;
			this.arrayRooms[m].position.y -= minY * this.sizeTile.y - this.margin.y - this.sizeGraph.y/2;
		}
		// console.log(minX,minY,maxX,maxY, maxX * this.margin.x, this.margin.x);
		this.background.beginFill(0x0);
		this.background.drawRect(0,0,
			(maxX - minX + 1) * this.sizeTile.x + this.margin.x * 2 + this.sizeGraph.x/2,
			(maxY - minY + 1) * this.sizeTile.y+ this.margin.y * 2+ this.sizeGraph.y/2);
		this.background.endFill();
		this.background.alpha = 0.5;
		this.updatePlayerNode();
	},
	updatePlayerNode:function(position){
		var tempDist = 0;
		for (var i = 0; i < this.arrayRooms.length; i++) {
			if(position && position[0] === this.arrayRooms[i].positionID.i && position[1] === this.arrayRooms[i].positionID.j){
				this.arrayRooms[i].alpha = 1;
			}else{
				if(position){
					tempDist = pointDistance(position[0] , position[1],  this.arrayRooms[i].positionID.i , this.arrayRooms[i].positionID.j);
				}
				this.arrayRooms[i].alpha = tempDist <= 1?1:0;
			}
		}
		//CENTRALIZAR O MINIMAP AQUI
		console.log(this.roomsContainer.width, position);
	},
	getContent:function(){
		return this.container;
	},
	setPosition:function(x,y){
		this.container.position.x = x;
		this.container.position.y = y;
	}
});
