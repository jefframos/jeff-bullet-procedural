/*! goyabpd 20-07-2015 */
function getRandomLevel(){var a=3;return ALL_LEVELS[a]}function testMobile(){return!1}function update(){requestAnimFrame(update);var a=window.innerHeight/windowHeight,b=a<(window.innerWidth-40)/windowWidth?a:(window.innerWidth-40)/windowWidth;windowWidthVar=windowWidth*b,windowHeightVar=windowHeight*b,renderer.view.style.width=windowWidthVar+"px",renderer.view.style.height=windowHeightVar+"px",APP.update(),renderer.render(APP.stage)}var ALL_LEVELS=[[[0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,1,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,1,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0]],[[2,0,0,0,3,0,0,3,0,0,0,2],[0,2,2,0,0,0,0,0,0,2,2,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,2,2,0,0,0,0,0,0,2,2,0],[2,0,0,0,0,0,0,0,0,0,0,2]],[[0,0,0,0,2,0,0,2,0,0,0,0],[0,3,0,0,2,0,0,2,0,0,3,0],[0,0,0,0,2,0,0,2,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,2,0,0,2,0,0,0,0],[0,3,0,0,2,0,0,2,0,0,3,0],[0,0,0,0,2,0,0,2,0,0,0,0]],[[3,0,0,0,0,0,0,0,0,0,0,0,3],[0,0,0,0,2,2,2,2,2,0,0,0,0],[2,2,0,0,0,0,0,0,0,0,0,2,2],[0,0,0,0,0,0,0,0,0,0,0,0,0],[2,2,0,0,0,0,0,0,0,0,0,2,2],[0,0,0,0,2,2,2,2,2,0,0,0,0],[3,0,0,0,0,0,0,0,0,0,0,0,3]],[[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]]],DungeonGenerator=Class.extend({init:function(){this.random=0,this.numActivesNodes=0,this.maxDist=5,this.minNodes=5,this.seeds=1,this.rooms=[],this.maxNodes=10,this.mostDistant=new NodeModel,this.nodeLock=new NodeModel,this.firstNode=new NodeModel,this.keyNode=new NodeModel,this.precision=1,this.seed=0,this.rooms=[]},generate:function(a,b,c,d,e,f){this.seed=a,random=0,0>e&&(e=99999),this.minNodes=c[0],this.maxNodes=c[1],this.precision=b,this.numActivesNodes=0,this.maxDist=-999999999,this.seeds=1;var g=0,h=0;if(this.rooms.length<=0)for(g=0;g<d[0];g++){var i=[];for(h=0;h<d[1];h++){var j=new NodeModel;j.position=[g,h],i.push(j)}this.rooms.push(i)}this.generateNodes(f?f[0]:Math.floor(d[0]/2),f?f[1]:Math.floor(d[1]/2),null,e),this.mostDistant.mode=4;var l=-9999999999;for(k=0;k<this.rooms.length;k++){var m=this.rooms[k];for(g=0;g<m.length;g++){var n=this.pointDistance(this.mostDistant.position[0],this.mostDistant.position[1],m[g].position[0],m[g].position[1]);n>=l&&m[g].active&&m[g].parentId>0&&(l=n,this.keyNode=m[g]),m[g].parentId>0&&m[g].position[0]===this.mostDistant.parentPosition[0]&&m[g].position[1]===this.mostDistant.parentPosition[1]&&(this.nodeLock=m[g])}}this.nodeLock&&(this.nodeLock.mode=5),this.keyNode&&(this.keyNode.mode=6)},log:function(){for(var a=0;a<this.rooms.length;a++){for(var b="",c=this.rooms[a],d=0;d<c.length;d++)0===c[d].mode&&(b+="| - |"),1===c[d].mode&&(b+="| ♥ |"),2===c[d].mode&&(b+="| o |"),3===c[d].mode&&(b+="| c |"),4===c[d].mode&&(b+="| b |"),5===c[d].mode&&(b+="| l |"),6===c[d].mode&&(b+="| K |");console.log(b+"   "+a)}console.log(this.firstNode)},generateNodes:function(a,b,c,d,e){if(!((this.numActivesNodes>=this.maxNodes||0>=d)&&!e||this.numActivesNodes>50)){for(var f=null,g=0;g<this.rooms.length;g++)for(var h=this.rooms[g],i=0;i<h.length;i++)h[i].position[0]===a&&h[i].position[1]===b&&(f=h[i]);if(!f)return void(e&&console.log("numActivesNodes",this.numActivesNodes));if(f.active&&!e)return void this.minNodes++;if(this.minNodes--,f.mode=2,this.numActivesNodes++,f.active=!0,f.id<0&&(f.id=this.numActivesNodes),c&&1!==f.id){f.parentPosition=c.position,f.parentId=c.id,f.parent=c;var j=this.pointDistance(c.position[0],c.position[1],this.firstNode.position[0],this.firstNode.position[1]);for(f.dist=j,this.maxDist<=j&&f.parentId>2&&(this.maxDist=j,this.mostDistant=f),f.dist=j,ri=this.rooms.length-1;ri>=0;ri--){var k=this.rooms[ri];for(nj=k.length-1;nj>=0;nj--)k[nj].id===f.parentId&&(k[nj].position[1]>f.position[1]?k[nj].childrenSides[0]=f:k[nj].position[1]<f.position[1]?k[nj].childrenSides[1]=f:k[nj].position[0]>f.position[0]?k[nj].childrenSides[2]=f:k[nj].position[0]<f.position[0]&&(k[nj].childrenSides[3]=f))}f.parent.position[1]<f.position[1]?f.childrenSides[0]=f.parent:f.parent.position[1]>f.position[1]?f.childrenSides[1]=f.parent:f.parent.position[0]<f.position[0]?f.childrenSides[2]=f.parent:f.parent.position[0]>f.position[0]&&(f.childrenSides[3]=f.parent)}else f.id=1,f.mode=1,this.firstNode=f;var l=!1;if(this.getNextFloat()<this.seeds||this.minNodes>0){this.seeds*=this.precision;for(var m=[0,0],n=[],o=1===f.id,p=o?.9:.4,q=0;4>q;q++)if(this.getNextFloat()<p){l=!0,0===q?m=[-1,0]:1===q?m=[1,0]:2===q?m=[0,1]:3===q&&(m=[0,-1]);var r={};r.i=a+m[0],r.j=b+m[1],r.parentPosition=[a,b],r.parent=f,n.push(r)}for(var s=n.length-1;s>=0;s--){var t=n[s];o||d--,this.generateNodes(t.i,t.j,t.parent,d,o)}if(this.minNodes>0||this.seeds>=1){var u=this.getNextFloat();m=.25>u?[-1,0]:.5>u?[1,0]:.75>u?[0,1]:[0,-1],this.generateNodes(a+m[0],b+m[1],f,--d)}}l||(f.mode=3)}},pointDistance:function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)},getNextFloat:function(){var a=1e4*Math.sin(this.seed++);return a-Math.floor(a)}}),NodeModel=Class.extend({init:function(){this.position=[],this.dist=0,this.parentPosition=[],this.childrenSides=[null,null,null,null],this.parentId=-1,this.parent=null,this.active=!1,this.mode=0,this.id=-1}}),SmartObject=Class.extend({init:function(){MicroEvent.mixin(this)},show:function(){},hide:function(){},build:function(){},destroy:function(){}}),SmartSocket=Class.extend({init:function(){MicroEvent.mixin(this)},build:function(){},writeObj:function(a){this.trigger(SmartSocket.WRITE_OBJ,a)},readSocketList:function(a){this.trigger(SmartSocket.READ_SOCKET_SNAPSHOT,a)},readObj:function(a){this.trigger(SmartSocket.READ_OBJ,a)},readLast:function(a){this.trigger(SmartSocket.READ_LAST,a)},setReadCallback:function(a){this.readCallback=a},socketError:function(a){this.trigger(SmartSocket.SOCKET_ERROR,obj)},setObj:function(a){this.trigger(SmartSocket.SET_OBJ,a)},updateObj:function(a){this.trigger(SmartSocket.UPDATE_OBJ,a)},destroy:function(){}});SmartSocket.UPDATE_OBJ="updateObj",SmartSocket.READ_OBJ="readObj",SmartSocket.READ_SOCKET_SNAPSHOT="readSocketSnapshot",SmartSocket.READ_LAST="readLast",SmartSocket.WRITE_OBJ="writeObj",SmartSocket.SET_OBJ="setObj",SmartSocket.SOCKET_ERROR="socketError";var Application=AbstractApplication.extend({init:function(a){this._super(windowWidth,windowHeight),this.stage.setBackgroundColor(0),this.stage.removeChild(this.loadText),this.appContainer=document.getElementById("rect"),this.id=parseInt(1e11*Math.random()),this.gen=new DungeonGenerator,this.gen.generate(16777215*Math.random(),1,[10,15],[12,12],5),this.tileSize={x:80,y:80}},build:function(){this._super(),this.onAssetsLoaded()},onAssetsLoaded:function(){this.mainApp=new DesktopMainScreen("Main"),this.screenManager.addScreen(this.mainApp),this.screenManager.change("Main")}}),Door=Entity.extend({init:function(a){this._super(!0),this.updateable=!1,this.deading=!1,this.side=a,this.range=APP.tileSize.x/2,this.width=APP.tileSize.x,this.height=APP.tileSize.y,this.centerPosition={x:this.width/2,y:this.height/2},this.type="door",this.node=null,this.updateable=!0},getBounds:function(){return this.bounds={x:this.getPosition().x-this.width/2,y:this.getPosition().y-this.height/2,w:this.width,h:this.height},this.collisionPoints={up:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y},down:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y+this.bounds.h},bottomLeft:{x:this.bounds.x,y:this.bounds.y+this.bounds.h},topLeft:{x:this.bounds.x,y:this.bounds.y},bottomRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y+this.bounds.h},topRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y}},this.polygon=new PIXI.Polygon(new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y)),this.bounds},debugPolygon:function(a,b){if(this.lastColorDebug!==a||b){null===this.debugGraphic.parent&&null!==this.getContent().parent&&this.getContent().parent.addChild(this.debugGraphic),this.lastColorDebug=a,this.gambAcum++,void 0!==this.debugGraphic?this.debugGraphic.clear():this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(a,.5),this.debugGraphic.lineStyle(1,16767232),this.debugGraphic.moveTo(this.polygon.points[this.polygon.points.length-1].x,this.polygon.points[this.polygon.points.length-1].y);for(var c=this.polygon.points.length-2;c>=0;c--)this.debugGraphic.lineTo(this.polygon.points[c].x,this.polygon.points[c].y);this.debugGraphic.endFill()}},build:function(){this._super("dist/img/cubo2.png");this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(16724736),this.debugGraphic.lineStyle(1,16767232,1),this.debugGraphic.endFill(),this.getContent().scale.x=.5,this.getContent().scale.y=.5,this.getContent().alpha=.5},update:function(){this._super(),this.getBounds(),this.debugPolygon(5596740,!0)},preKill:function(){this._super(),this.debugGraphic.parent&&this.debugGraphic.parent.removeChild(this.debugGraphic)},pointDistance:function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)}}),Fire=Entity.extend({init:function(a){this._super(!0),this.updateable=!1,this.deading=!1,this.range=60,this.width=1,this.height=1,this.type="fire",this.node=null,this.velocity.x=a.x,this.velocity.y=a.y,this.timeLive=10,this.power=1,this.defaultVelocity=1},getBounds:function(){return this.bounds={x:this.getPosition().x-this.width/2,y:this.getPosition().y-this.height/2,w:this.width,h:this.height},this.centerPosition={x:this.width/2,y:this.height/2},this.collisionPoints={up:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y},down:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y+this.bounds.h},bottomLeft:{x:this.bounds.x,y:this.bounds.y+this.bounds.h},topLeft:{x:this.bounds.x,y:this.bounds.y},bottomRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y+this.bounds.h},topRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y}},this.polygon=new PIXI.Polygon(new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y)),this.bounds},debugPolygon:function(a,b){if(this.lastColorDebug!==a||b){null===this.debugGraphic.parent&&null!==this.getContent().parent&&this.getContent().parent.addChild(this.debugGraphic),this.lastColorDebug=a,this.gambAcum++,void 0!==this.debugGraphic?this.debugGraphic.clear():this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(a,.5),this.debugGraphic.lineStyle(1,16767232),this.debugGraphic.moveTo(this.polygon.points[this.polygon.points.length-1].x,this.polygon.points[this.polygon.points.length-1].y);for(var c=this.polygon.points.length-2;c>=0;c--)this.debugGraphic.lineTo(this.polygon.points[c].x,this.polygon.points[c].y);this.debugGraphic.endFill()}},build:function(){this._super("dist/img/fireball.png"),this.updateable=!0,this.collidable=!0,this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(1127168),this.debugGraphic.lineStyle(1,16767232,1),this.debugGraphic.endFill()},update:function(){this._super(),this.timeLive--,this.timeLive<=0&&this.preKill(),this.getContent()&&(this.width=this.getContent().width,this.height=this.getContent().height),this.getBounds(),this.range=this.width/2},collide:function(a){this.collidable&&"enemy"===a[0].type&&(this.getContent().tint=16711680,this.preKill(),a[0].hurt(this.power))},preKill:function(){if(this.collidable){var a=this;this.updateable=!1,this.collidable=!1,TweenLite.to(this.getContent().scale,.3,{x:.2,y:.2,onComplete:function(){a.kill=!0}}),this.debugGraphic.parent&&this.debugGraphic.parent.removeChild(this.debugGraphic)}},pointDistance:function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)},touch:function(a){this.preKill()}}),Heart=SpritesheetEntity.extend({init:function(){this._super(!0),this.updateable=!1,this.deading=!1,this.range=60,this.width=142,this.height=142,this.type="heart",this.node=null,this.life=5},hurt:function(a){console.log("hurt"),this.life-=a,this.life<=0&&this.preKill()},collide:function(a){console.log("this.node",this.node),console.log("col enemy")},getBounds:function(){return this.bounds={x:this.getPosition().x,y:this.getPosition().y,w:this.width,h:this.height},this.centerPosition={x:this.width/2,y:this.height/2},this.collisionPoints={up:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y},down:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y+this.bounds.h},bottomLeft:{x:this.bounds.x,y:this.bounds.y+this.bounds.h},topLeft:{x:this.bounds.x,y:this.bounds.y},bottomRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y+this.bounds.h},topRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y}},this.polygon=new PIXI.Polygon(new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y)),this.bounds},debugPolygon:function(a,b){if(this.lastColorDebug!==a||b){null===this.debugGraphic.parent&&null!==this.getContent().parent&&this.getContent().parent.addChild(this.debugGraphic),this.lastColorDebug=a,this.gambAcum++,void 0!==this.debugGraphic?this.debugGraphic.clear():this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(a,.5),this.debugGraphic.lineStyle(1,16767232),this.debugGraphic.moveTo(this.polygon.points[this.polygon.points.length-1].x,this.polygon.points[this.polygon.points.length-1].y);for(var c=this.polygon.points.length-2;c>=0;c--)this.debugGraphic.lineTo(this.polygon.points[c].x,this.polygon.points[c].y);this.debugGraphic.endFill()}},build:function(){var a=this.getFramesByRange("dragon10",0,14),b=new SpritesheetAnimation;b.build("idle",a,1,!0,null),this.spritesheet=new Spritesheet,this.spritesheet.addAnimation(b),this.spritesheet.play("idle"),this.respaw()},update:function(){this._super(),this.getBounds(),this.getTexture()&&(this.getContent().position.x=80,this.getContent().position.y=-20,this.range=this.bounds.w/2)},preKill:function(){var a=this;this.updateable=!1,this.collidable=!1,TweenLite.to(this.getContent(),.5,{alpha:0,onComplete:function(){a.kill=!0}})},respaw:function(){this.deading=!1;var a={x:142*Math.floor(12*Math.random()*142/142)+104,y:142*Math.floor(7*Math.random()*142/142)+177+142};this.pointDistance(a.x,a.y,windowWidth/2,windowHeight/2)<200&&this.respaw(),this.setPosition(7*Math.floor(a.x/7),7*Math.floor(a.y/7)),this.spritesheet.play("idle"),this.setVelocity(0,0),this.updateable=!0,this.collidable=!0},pointDistance:function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)}}),Minimap=Class.extend({init:function(){this.collidable=!1},build:function(a){this.gen=a,this.background=new PIXI.Graphics,this.container=new PIXI.DisplayObjectContainer,this.roomsContainer=new PIXI.DisplayObjectContainer,this.container.addChild(this.background),this.container.addChild(this.roomsContainer),this.arrayRooms=[],this.margin={x:15,y:15},this.sizeTile={x:80,y:50},this.sizeGraph={x:40,y:25};for(var b=9999,c=9999,d=-9999,e=-9999,f=0,g=0,h=0;h<this.gen.rooms.length;h++)for(var i=this.gen.rooms[h],j=0;j<i.length;j++)if(i[j].id>0){var k=new PIXI.Graphics,l=16777215;l=1===i[j].mode?5428328:2===i[j].mode?11447982:3===i[j].mode?16239929:4===i[j].mode?16202041:5===i[j].mode?13327104:6===i[j].mode?13324996:16777215,k.beginFill(l);var m;f=i[j].position[1]*this.sizeTile.x,g=i[j].position[0]*this.sizeTile.y,k.position.x=f,k.position.y=g,k.drawRect(0,0,this.sizeGraph.x,this.sizeGraph.y),k.endFill(),this.roomsContainer.addChild(k);for(var n=0;n<i[j].childrenSides.length;n++)i[j].childrenSides[n]&&(0===n?(m=new PIXI.Graphics,m.beginFill(l),m.drawRect(0,0,this.sizeGraph.x/2,this.sizeGraph.y/2),f=-this.sizeGraph.x/2,g=this.sizeGraph.y/4):1===n?(m=new PIXI.Graphics,m.beginFill(l),m.drawRect(0,0,this.sizeGraph.x/2,this.sizeGraph.y/2),f=this.sizeGraph.x,g=this.sizeGraph.y/4):2===n?(m=new PIXI.Graphics,m.beginFill(l),m.drawRect(0,0,this.sizeGraph.x/2,this.sizeGraph.y/2),f=this.sizeGraph.x/4,g=-this.sizeGraph.y/2):3===n&&(m=new PIXI.Graphics,m.beginFill(l),m.drawRect(0,0,this.sizeGraph.x/2,this.sizeGraph.y/2),f=this.sizeGraph.x/4,g=this.sizeGraph.y),m&&(m.position.x=f,m.position.y=g,k.addChild(m)),m=null);b>i[j].position[1]&&(b=i[j].position[1]),c>i[j].position[0]&&(c=i[j].position[0]),d<i[j].position[1]&&(d=i[j].position[1]),e<i[j].position[0]&&(e=i[j].position[0]),k.positionID={i:h,j:j},this.arrayRooms.push(k)}for(var o=0;o<this.arrayRooms.length;o++)this.arrayRooms[o].position.x-=b*this.sizeTile.x-this.margin.x-this.sizeGraph.x/2,this.arrayRooms[o].position.y-=c*this.sizeTile.y-this.margin.y-this.sizeGraph.y/2;this.background.beginFill(0),this.background.drawRect(0,0,(d-b+1)*this.sizeTile.x+2*this.margin.x+this.sizeGraph.x/2,(e-c+1)*this.sizeTile.y+2*this.margin.y+this.sizeGraph.y/2),this.background.endFill(),this.background.alpha=.5,this.updatePlayerNode()},updatePlayerNode:function(a){for(var b=0,c=0;c<this.arrayRooms.length;c++)a&&a[0]===this.arrayRooms[c].positionID.i&&a[1]===this.arrayRooms[c].positionID.j?this.arrayRooms[c].alpha=1:(a&&(b=pointDistance(a[0],a[1],this.arrayRooms[c].positionID.i,this.arrayRooms[c].positionID.j)),this.arrayRooms[c].alpha=1>=b?1:0);console.log(this.roomsContainer.width,a)},getContent:function(){return this.container},setPosition:function(a,b){this.container.position.x=a,this.container.position.y=b}}),Obstacle=Entity.extend({init:function(a){this._super(),this.updateable=!0,this.collidable=!0,this.arrayObstacles=["dist/img/2.png","dist/img/3.png","dist/img/2.png"],this.srcImg=this.arrayObstacles[a],this.type="environment",this.width=APP.tileSize.x,this.height=APP.tileSize.x,this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(16724736),this.debugGraphic.lineStyle(1,16767232,1),this.debugGraphic.endFill(),this.range=0},preKill:function(){this._super(),this.debugGraphic.parent&&this.debugGraphic.parent.removeChild(this.debugGraphic)},getBounds:function(){return this.bounds={x:this.getPosition().x-this.width*this.sprite.anchor.x,y:this.getPosition().y-this.height*this.sprite.anchor.y,w:this.width,h:this.height},this.bounds},build:function(){this._super(this.srcImg);this.sprite.anchor.x=0,this.sprite.anchor.y=1},update:function(){this._super(),null===this.debugGraphic.parent&&null!==this.getContent().parent&&(this.getBounds(),this.debugGraphic.drawRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h),this.getContent().parent.addChild(this.debugGraphic))},respaw:function(){var a={x:142*Math.floor(12*Math.random()*142/142)+104,y:142*Math.floor(7*Math.random()*142/142)+177+142};this.pointDistance(a.x,a.y,windowWidth/2,windowHeight/2)<200&&this.respaw(),this.setPosition(a.x,a.y),this.collidable=!0},pointDistance:function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)}}),Player=SpritesheetEntity.extend({init:function(){this._super(!0),this.updateable=!1,this.deading=!1,this.collidable=!0,this.range=APP.tileSize.x/2,this.width=.8*APP.tileSize.x,this.height=.8*APP.tileSize.y,this.type="player",this.collisionPointsMarginDivide=0,this.isTouch=!1,this.boundsCollision=!0,this.defaultVelocity=3,this.endLevel=!1,this.fireSpeed=10,this.fireFreq=5,this.fireFreqAcum=0,this.fireStepLive=20,this.firePower=20,this.touchCollection={up:!1,down:!1,left:!1,right:!1,middleUp:!1,middleDown:!1,bottomLeft:!1,bottomRight:!1,topLeft:!1,topRight:!1}},debug:function(){null===this.debugGraphic.parent&&null!==this.getContent().parent&&this.getContent().parent.addChild(this.debugGraphic),this.debugGraphic.clear(),this.debugGraphic.beginFill(16724736),this.debugGraphic.lineStyle(1,16767232),this.debugGraphic.moveTo(this.bounds.x,this.bounds.y),this.debugGraphic.lineTo(this.bounds.x+this.bounds.w,this.bounds.y),this.debugGraphic.lineTo(this.bounds.x+this.bounds.w,this.bounds.y+this.bounds.h),this.debugGraphic.lineTo(this.bounds.x,this.bounds.y+this.bounds.h),this.debugGraphic.endFill()},getBounds:function(){return this.bounds={x:this.getPosition().x,y:this.getPosition().y,w:this.width,h:this.height},this.collisionPoints={up:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y},down:{x:this.bounds.x+this.bounds.w/2,y:this.bounds.y+this.bounds.h},bottomLeft:{x:this.bounds.x,y:this.bounds.y+this.bounds.h},topLeft:{x:this.bounds.x,y:this.bounds.y},bottomRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y+this.bounds.h},topRight:{x:this.bounds.x+this.bounds.w,y:this.bounds.y}},this.polygon=new PIXI.Polygon(new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y),new PIXI.Point(this.bounds.x,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w/2,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y+this.bounds.h),new PIXI.Point(this.bounds.x+this.bounds.w,this.bounds.y)),this.bounds},build:function(){var a=this,b=this.getFramesByRange("chinesa10",0,8),c=new SpritesheetAnimation;c.build("idle",b,1,!0,null);var d=this.getFramesByRange("chinesa10",0,8),e=new SpritesheetAnimation;e.build("dead",d,2,!1,function(){TweenLite.to(a.spritesheet.scale,.2,{x:0,y:0})}),this.spritesheet=new Spritesheet,this.spritesheet.addAnimation(c),this.spritesheet.addAnimation(e),this.spritesheet.play("idle"),this.reset(),this.counter=0,this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(16724736),this.debugGraphic.lineStyle(1,16767232,1),this.debugGraphic.endFill(),this.vecPositions=[]},update:function(){this.isTouch||(this.velocity=this.virtualVelocity),this.deading&&this.setVelocity(0,0),this.debugPolygon(5596740,!0),this.getTexture()&&(this.getContent().position.x=20),this._super()},preKill:function(){this._super(),this.debugGraphic.parent&&this.debugGraphic.parent.removeChild(this.debugGraphic)},reset:function(){this.deading=!1,this.setPosition(windowWidth/2,windowHeight/2),this.spritesheet.play("idle"),this.setVelocity(0,0),this.updateable=!0,this.vecPositions=[]},collide:function(a){"door"===a[0].type&&(console.log("door collider"),("up"===a[0].side&&this.virtualVelocity.y<0||"down"===a[0].side&&this.virtualVelocity.y>0||"left"===a[0].side&&this.virtualVelocity.x<0||"right"===a[0].side&&this.virtualVelocity.x>0)&&(this.endLevel=!0,this.nextNode=a[0].node,this.nextDoorSide=a[0].side)),"enemy"===a[0].type},touch:function(a){this.isTouch=!0,(a.left||a.right&&0!==this.virtualVelocity.x)&&(this.velocity.x=0),(a.up||a.down&&0!==this.virtualVelocity.y)&&(console.log("Y TOUCH"),this.velocity.y=0)},updatePlayerVel:function(a){if(console.log("UPDATE"),this&&a){var b=!1,c=!1;0===a.length&&(this.virtualVelocity.x=0,this.virtualVelocity.y=0);for(var d=a.length-1;d>=0;d--)"up"===a[d]?(this.virtualVelocity.y=-this.defaultVelocity,b=!0):"down"===a[d]&&(this.virtualVelocity.y=this.defaultVelocity,b=!0),"left"===a[d]?(this.virtualVelocity.x=-this.defaultVelocity,c=!0):"right"===a[d]&&(this.virtualVelocity.x=this.defaultVelocity,c=!0);0!==this.virtualVelocity.y&&0!==this.virtualVelocity.x&&(this.virtualVelocity.y/=1.5,this.virtualVelocity.x/=1.5),b||(this.virtualVelocity.y=0),c||(this.virtualVelocity.x=0)}}}),Enemy=SpritesheetEntity.extend({init:function(a){this._super(!0),this.updateable=!1,this.deading=!1,this.range=APP.tileSize.x/2,this.width=.9*APP.tileSize.x,this.height=.9*APP.tileSize.y,this.type="enemy",this.node=null,this.life=1e3,this.boundsCollision=!0,this.defaultVelocity=1,this.player=a,this.behaviour=new DefaultBehaviour(this,a)},hurt:function(a){console.log("hurt"),this.getTexture().tint=16711680,this.life-=a,this.life<=0&&this.preKill()},build:function(){var a=this.getFramesByRange("dragon10",0,14),b=new SpritesheetAnimation;b.build("idle",a,1,!0,null),this.spritesheet=new Spritesheet,this.spritesheet.addAnimation(b),this.spritesheet.play("idle"),this.centerPosition={x:this.width/2,y:this.height/2},this.updateable=!0,this.collidable=!0},update:function(){this.behaviour.update(),this.isTouch||(this.velocity=this.virtualVelocity),this._super(),this.getBounds(),this.getTexture()&&(this.getContent().position.x=20)},preKill:function(){var a=this;this.updateable=!1,this.collidable=!1,TweenLite.to(this.getContent(),.5,{alpha:0,onComplete:function(){a.kill=!0}})},pointDistance:function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)},touch:function(a){this.isTouch=!0,(a.left||a.right&&0!==this.virtualVelocity.x)&&(this.velocity.x=0),(a.up||a.down&&0!==this.virtualVelocity.y)&&(this.velocity.y=0)}}),FlightEnemy=Enemy.extend({init:function(a){this._super(!0),this.updateable=!1,this.deading=!1,this.range=60,this.width=71,this.height=71,this.type="flight",this.node=null,this.life=5e4,this.radius=200,this.acumSimCos=0,this.setPosition(a.x,a.y),this.boundsCollision=!0},build:function(){var a=this.getFramesByRange("dragon10",0,14),b=new SpritesheetAnimation;b.build("idle",a,1,!0,null),this.spritesheet=new Spritesheet,this.spritesheet.addAnimation(b),this.spritesheet.play("idle"),this.centerPosition={x:this.width/2,y:this.height/2},this.updateable=!0,this.collidable=!0,this.debugGraphic=new PIXI.Graphics,this.debugGraphic.beginFill(16724736),this.debugGraphic.lineStyle(1,16767232,1),this.debugGraphic.endFill(),this.virtualVelocity.x=5,this.virtualVelocity.y=-5},debug:function(){null===this.debugGraphic.parent&&null!==this.getContent().parent&&this.getContent().parent.addChild(this.debugGraphic),this.debugGraphic.clear(),this.debugGraphic.beginFill(16724736),this.debugGraphic.lineStyle(1,16767232),this.debugGraphic.moveTo(this.bounds.x,this.bounds.y),this.debugGraphic.lineTo(this.bounds.x+this.bounds.w,this.bounds.y),this.debugGraphic.lineTo(this.bounds.x+this.bounds.w,this.bounds.y+this.bounds.h),this.debugGraphic.lineTo(this.bounds.x,this.bounds.y+this.bounds.h),this.debugGraphic.endFill()},update:function(){this._super(),this.getBounds(),this.acumSimCos+=.05,this.virtualVelocity.x=5*Math.sin(this.acumSimCos),this.virtualVelocity.y=5*Math.cos(this.acumSimCos)},preKill:function(){var a=this;this.updateable=!1,this.collidable=!1,TweenLite.to(this.getContent(),.5,{alpha:0,onComplete:function(){a.kill=!0}})},pointDistance:function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)},touch:function(a){this.isTouch=!0,(a.left||a.right&&0!==this.virtualVelocity.x)&&(this.velocity.x=0),(a.up||a.down&&0!==this.virtualVelocity.y)&&(this.velocity.y=0)}}),DefaultBehaviour=Class.extend({init:function(a,b){this.player=b,this.entity=a,this.life=8,this.entity.setVelocity(-2,3*(Math.random()-.5)),this.sideAcum=0,this.sideMaxAcum=200,this.fireFreq=25,this.fireAcum=0,this.fireSpeed=6},update:function(){}}),AppModel=Class.extend({init:function(){this.isMobile=!1,this.action="default",this.id=0,this.position=0,this.angle=0,this.side=0},build:function(){},destroy:function(){},serialize:function(){}}),RainParticle=Class.extend({init:function(a,b,c,d,e){this.fallSpeed=a,this.windSpeed=b,this.dir=e,this.hArea=c,this.vArea=d,this.texture=new PIXI.Texture.fromImage("dist/img/drop.png"),this.content=new PIXI.Sprite(this.texture),this.content.position.x=Math.random()*c,this.content.position.y=Math.random()*d,this.gambAccum=0},update:function(){var a=1;switch(this.dir){case"left":this.content.rotation=15/180*3.14;break;case"right":a=-1,this.content.rotation=-15/180*3.14;break;default:console.log("There is some error dude...")}this.content.position.x-=this.windSpeed*a,this.content.position.y+=Math.random()*this.fallSpeed,this.content.position.y>this.vArea&&(this.content.position.x=Math.random()*this.hArea,this.content.position.y=-200)}}),DesktopMainScreen=AbstractScreen.extend({init:function(a){MicroEvent.mixin(this),this._super(a),this.levelContainer=new PIXI.DisplayObjectContainer,this.addChild(this.levelContainer);var b=new SimpleSprite("dist/img/rascunho-mapa.jpg");this.levelContainer.addChild(b.getContent()),this.currentAppModel=new AppModel,this.mainLayer=new Layer("main"),this.entityLayer=new Layer("fire"),this.environmentLayer=new Layer("environment"),this.layerManager=new LayerManager,this.layerManager.addLayer(this.environmentLayer),this.layerManager.addLayer(this.entityLayer),this.levelContainer.addChild(this.layerManager.getContent()),this.margin={x:APP.tileSize.x/2*3,y:80},this.mouseDown=!1},destroy:function(){this._super()},build:function(){this._super();var a=["dist/img/spritesheet/dragon.json","dist/img/spritesheet/dragon.png","dist/img/dragao-perdido.png","dist/img/fireball.png","dist/img/spritesheet/chinesa.json","dist/img/spritesheet/finn.json","dist/img/spritesheet/finn.png","dist/img/spritesheet/chinesa.png"];this.loader=new PIXI.AssetLoader(a),this.initLoad()},onAssetsLoaded:function(){this._super(),this.currentNode=APP.gen.firstNode,this.rainContainer=new PIXI.DisplayObjectContainer;this.inputManager=new InputManager(this),this.graphDebug=new PIXI.Graphics,this.addChild(this.graphDebug),this.blackShape=new PIXI.Graphics,this.blackShape.beginFill(0),this.blackShape.drawRect(0,0,windowWidth,windowHeight),this.addChild(this.blackShape),TweenLite.to(this.blackShape,1,{alpha:0}),this.levelLabel=new PIXI.Text("",{fill:"white",align:"center",font:"bold 20px Arial"}),this.addChild(this.levelLabel),this.minimap=new Minimap,this.minimap.build(APP.gen),this.addChild(this.minimap.getContent()),this.minimap.getContent().scale.x=.5,this.minimap.getContent().scale.y=.5,this.minimap.setPosition(windowWidth-this.minimap.getContent().width-5,5),this.resetLevel(),this.collisionSystem=new BoundCollisionSystem(this,!0)},shoot:function(){var a=Math.atan2(this.player.getPosition().y-APP.stage.getMousePosition().y,this.player.getPosition().x-APP.stage.getMousePosition().x);a=180*a/Math.PI*-1,a+=270,a=a/180*Math.PI;for(var b=1,c=1;b>=c;c++){var d=new Fire({x:this.player.fireSpeed*Math.sin(a*c),y:this.player.fireSpeed*Math.cos(a*c)});d.timeLive=this.player.fireStepLive,d.power=this.player.firePower,d.build(),d.setPosition(this.player.getPosition().x+40,this.player.getPosition().y+10),this.entityLayer.addChild(d),this.player.fireFreqAcum=this.player.fireFreq}},update:function(){if(this._super(),this.player){this.mouseDown&&(this.player.fireFreqAcum--,this.player.fireFreqAcum<=0&&this.shoot()),this.collisionSystem.applyCollision(this.entityLayer.childs,this.entityLayer.childs),this.entityLayer.collideChilds(this.player),this.environmentLayer.collideChilds(this.player),(this.player.getPosition().x+this.player.virtualVelocity.x<this.margin.x&&this.player.virtualVelocity.x<0||this.player.getPosition().x+this.player.width+this.player.virtualVelocity.x>windowWidth-this.margin.x&&this.player.virtualVelocity.x>0)&&(this.player.virtualVelocity.x=0),(this.player.getPosition().y+this.player.virtualVelocity.y<this.margin.y&&this.player.virtualVelocity.y<0||this.player.getPosition().y+this.player.height+this.player.virtualVelocity.y>windowHeight-this.margin.y&&this.player.virtualVelocity.y>0)&&(this.player.virtualVelocity.y=0);for(var a=0;a<this.entityLayer.childs.length;a++)"fire"===this.entityLayer.childs[a].type&&this.entityLayer.collideChilds(this.entityLayer.childs[a]);this.layerManager&&this.layerManager.update()}this.entityLayer.getContent().children.sort(this.depthCompare),this.player&&this.player.endLevel&&(this.player.endLevel=!1,this.currentNode=this.player.nextNode,this.currentPlayerSide=this.player.nextDoorSide,this.endLevel(this.resetLevel),this.player=null)},endLevel:function(a){var b=this;this.updateable=!1;for(var c=this.entityLayer.childs.length-1;c>=0;c--)this.entityLayer.childs[c].preKill();for(var d=this.environmentLayer.childs.length-1;d>=0;d--)this.environmentLayer.childs[d].preKill();this.player.getContent().alpha=0;var e=new PIXI.RenderTexture(windowWidth,windowHeight);e.render(this.levelContainer),
this.oldBackground=new PIXI.Sprite(e),this.addChild(this.oldBackground),setTimeout(function(){b.resetLevel()},700)},resetLevel:function(){this.updateable=!0,TweenLite.to(this.blackShape,1,{alpha:0});var a="first room";switch(this.currentNode.mode){case 2:a="standard";break;case 3:a="item";break;case 4:a="boss";break;case 5:a="lock";break;case 6:a="key"}this.levelLabel.setText("room id:"+this.currentNode.id+"   -    state:"+a),this.level=getRandomLevel(),console.log(this.currentNode),this.minimap.updatePlayerNode(this.currentNode.position),this.player=new Player,this.player.build();var b={x:0,y:0};"up"===this.currentPlayerSide?(this.player.setPosition(windowWidth/2,windowHeight-this.margin.y-this.player.height),b.y=-windowHeight):"down"===this.currentPlayerSide?(this.player.setPosition(windowWidth/2,this.margin.y),b.y=windowHeight):"left"===this.currentPlayerSide?(this.player.setPosition(windowWidth-this.margin.x-this.player.width,windowHeight/2),b.x=-windowWidth):"right"===this.currentPlayerSide&&(this.player.setPosition(this.margin.x,windowHeight/2),b.x=windowWidth),TweenLite.from(this.levelContainer,.7,b),this.oldBackground&&TweenLite.to(this.oldBackground,.7,{x:-1*b.x,y:-1*b.y}),this.heart=new Enemy,this.heart.build(),this.entityLayer.addChild(this.player);for(var c=this.level.length-1;c>=0;c--)for(var d=this.level[c].length-1;d>=0;d--)if(this.level[c][d]>0){var e=new Obstacle(this.level[c][d]-1);e.build(),e.setPosition(d*APP.tileSize.x+this.margin.x,(c+1)*APP.tileSize.y+this.margin.y),this.entityLayer.addChild(e)}this.createDoors()},createDoors:function(){this.currentNode.childrenSides[0]&&(this.doorLeft=new Door("left"),this.doorLeft.build(),this.doorLeft.setPosition(this.margin.x-APP.tileSize.x/2,windowHeight/2),this.doorLeft.node=this.currentNode.childrenSides[0],this.environmentLayer.addChild(this.doorLeft)),this.currentNode.childrenSides[1]&&(this.doorRight=new Door("right"),this.doorRight.build(),this.doorRight.setPosition(windowWidth-this.margin.x+APP.tileSize.x/2,windowHeight/2),this.doorRight.node=this.currentNode.childrenSides[1],this.environmentLayer.addChild(this.doorRight)),this.currentNode.childrenSides[2]&&(this.doorUp=new Door("up"),this.doorUp.build(),this.doorUp.setPosition(windowWidth/2,this.margin.y-APP.tileSize.y/2),this.doorUp.node=this.currentNode.childrenSides[2],this.environmentLayer.addChild(this.doorUp)),this.currentNode.childrenSides[3]&&(this.doorDown=new Door("down"),this.doorDown.build(),this.doorDown.setPosition(windowWidth/2,windowHeight-this.margin.y+APP.tileSize.y/2),this.doorDown.node=this.currentNode.childrenSides[3],this.environmentLayer.addChild(this.doorDown))},depthCompare:function(a,b){var c=a.position.y,d=b.position.y;return a.children.length>0&&(c=a.children[0].position.y+a.children[0].height),b.children.length>0&&(d=b.children[0].position.y+b.children[0].height),d>c?-1:c>d?1:0}}),InputManager=Class.extend({init:function(a){var b=a,c=this;this.vecPositions=[],document.body.addEventListener("mouseup",function(a){b.player&&(b.mouseDown=!1)}),document.body.addEventListener("mousedown",function(a){b.player&&(b.mouseDown=!0)}),document.body.addEventListener("keyup",function(a){b.player&&(87===a.keyCode||38===a.keyCode?c.removePosition("up"):83===a.keyCode||40===a.keyCode?c.removePosition("down"):65===a.keyCode||37===a.keyCode?c.removePosition("left"):(68===a.keyCode||39===a.keyCode)&&c.removePosition("right"),b.player.updatePlayerVel(c.vecPositions))}),document.body.addEventListener("keydown",function(a){var d=!1;b.player&&(87===a.keyCode||38===a.keyCode?(c.removePosition("down"),d=c.addPosition("up")):83===a.keyCode||40===a.keyCode?(c.removePosition("up"),d=c.addPosition("down")):65===a.keyCode||37===a.keyCode?(c.removePosition("right"),d=c.addPosition("left")):(68===a.keyCode||39===a.keyCode)&&(c.removePosition("left"),d=c.addPosition("right")),b.player.updatePlayerVel(c.vecPositions))})},removePosition:function(a){for(var b=this.vecPositions.length-1;b>=0;b--)this.vecPositions[b]===a&&this.vecPositions.splice(b,1)},addPosition:function(a){for(var b=!1,c=this.vecPositions.length-1;c>=0;c--)this.vecPositions[c]===a&&(b=!0);return b||this.vecPositions.push(a),b}}),SOCKET=null,windowWidth=1280,windowHeight=720,renderer,windowWidthVar=window.innerWidth,windowHeightVar=window.innerHeight,renderer=PIXI.autoDetectRenderer(windowWidth,windowHeight);document.body.appendChild(renderer.view);var APP;APP=new Application,APP.build();var initialize=function(){PIXI.BaseTexture.SCALE_MODE=2,requestAnimFrame(update)};!function(){var a={init:function(){initialize()}};$(a.init)}();var pointDistance=function(a,b,c,d){return Math.sqrt((a-=c)*a+(b-=d)*b)};