/*jshint undef:false */
var DesktopMainScreen = AbstractScreen.extend({
    init: function (label) {
        MicroEvent.mixin(this);
        this._super(label);

        this.levelContainer = new PIXI.DisplayObjectContainer();
        this.addChild(this.levelContainer);

        var bg = new SimpleSprite('dist/img/rascunho-mapa.jpg');
        this.levelContainer.addChild(bg.getContent());

        this.currentAppModel = new AppModel();

        this.mainLayer = new Layer('main');

        this.entityLayer = new Layer('fire');
        this.environmentLayer = new Layer('environment');
        this.layerManager = new LayerManager();
        this.layerManager.addLayer(this.environmentLayer);
        this.layerManager.addLayer(this.entityLayer);

        this.levelContainer.addChild(this.layerManager.getContent());

        this.margin = {x:APP.tileSize.x / 2 * 3,y:160 / 2};
        this.mouseDown = false;
    },
    destroy: function () {
        this._super();
    },
    build: function () {
        this._super();
        var assetsToLoader = [
            'dist/img/spritesheet/dragon.json',
            'dist/img/spritesheet/dragon.png',
            'dist/img/dragao-perdido.png',
            'dist/img/fireball.png',
            'dist/img/spritesheet/chinesa.json',
            'dist/img/spritesheet/finn.json',
            'dist/img/spritesheet/finn.png',
            'dist/img/spritesheet/chinesa.png'
        ];
        this.loader = new PIXI.AssetLoader(assetsToLoader);
        this.initLoad();
    },
    onAssetsLoaded:function()
    {
        this._super();

        this.currentNode = APP.gen.firstNode;
        this.rainContainer = new PIXI.DisplayObjectContainer();

        var self = this;

        //apply movment
        this.inputManager = new InputManager(this);


        //add rain particles
        // var tempRain = null;
        // this.vecRain = [];
        // for (var j = 300; j >= 0; j--) {
        //     tempRain = new RainParticle(50, 5, windowWidth + 200, windowHeight, 'left');
        //     this.rainContainer.addChild(tempRain.content);
        //     this.vecRain.push(tempRain);
        // }
        // this.addChild(this.rainContainer);

        this.graphDebug = new PIXI.Graphics();
        this.addChild(this.graphDebug);

        this.blackShape = new PIXI.Graphics();
        this.blackShape.beginFill(0x000000);
        this.blackShape.drawRect(0,0,windowWidth, windowHeight);
        this.addChild(this.blackShape);
        TweenLite.to(this.blackShape, 1, {alpha:0});

        this.levelLabel = new PIXI.Text('', {fill:'white', align:'center', font:'bold 20px Arial'});
        this.addChild(this.levelLabel);


        this.minimap = new Minimap();
        this.minimap.build(APP.gen);
        this.addChild(this.minimap.getContent());
        this.minimap.getContent().scale.x = 0.5;
        this.minimap.getContent().scale.y = 0.5;
        this.minimap.setPosition(windowWidth - this.minimap.getContent().width - 5,5);

        this.resetLevel();
        // console.log(new BoundCollisionSystem(),'col system BoundCollisionSystem');

        this.collisionSystem = new BoundCollisionSystem(this, true);
        // console.log(this.collisionSystem,'col system');
    },

    //colocar isso dentro do personagem
    shoot:function(){
        var self = this;
        var angle = Math.atan2(this.player.getPosition().y-APP.stage.getMousePosition().y,  this.player.getPosition().x-APP.stage.getMousePosition().x);
        angle = angle * 180 / Math.PI * -1;
        angle += 90 + 180;
        angle = angle / 180 * Math.PI;
        var quant = 1;
        for (var i = 1; i <= quant; i++) {
            var tempFire = new Fire({x:this.player.fireSpeed * Math.sin(angle * i), y: this.player.fireSpeed * Math.cos(angle * i)});
            tempFire.timeLive = this.player.fireStepLive;
            tempFire.power = this.player.firePower;
            tempFire.build();
            tempFire.setPosition(this.player.getPosition().x + 40, this.player.getPosition().y +10);
            this.entityLayer.addChild(tempFire);
            this.player.fireFreqAcum = this.player.fireFreq;
        }
    },
    update:function()
    {
        this._super();
        if(this.player){
            if(this.mouseDown){
                this.player.fireFreqAcum --;
                if(this.player.fireFreqAcum <= 0){
                    this.shoot();
                }
            }
            this.collisionSystem.applyCollision(this.entityLayer.childs, this.entityLayer.childs);
            //collide entities with entities
            this.entityLayer.collideChilds(this.player);
            //collide entities with environment
            this.environmentLayer.collideChilds(this.player);
            //zera as posições aqui, caso encontre uma porte, por isso a colisao antes
            if(((this.player.getPosition().x + this.player.virtualVelocity.x < this.margin.x ) && this.player.virtualVelocity.x < 0) ||
                ((this.player.getPosition().x + this.player.width + this.player.virtualVelocity.x > windowWidth -  this.margin.x)&& this.player.virtualVelocity.x > 0)){
                this.player.virtualVelocity.x = 0;
            }
            if(((this.player.getPosition().y + this.player.virtualVelocity.y < this.margin.y ) && this.player.virtualVelocity.y < 0) ||
                ((this.player.getPosition().y + this.player.height + this.player.virtualVelocity.y > windowHeight -  this.margin.y)&& this.player.virtualVelocity.y > 0)){
                this.player.virtualVelocity.y = 0;
            }

            for (var i = 0; i < this.entityLayer.childs.length; i++) {
                if(this.entityLayer.childs[i].type === 'fire'){
                    this.entityLayer.collideChilds(this.entityLayer.childs[i]);
                }
            }
            if(this.layerManager){
                this.layerManager.update();
            }

        }


        //change z-index
        this.entityLayer.getContent().children.sort(this.depthCompare);

        if(this.player && this.player.endLevel)
        {
            this.player.endLevel = false;
            this.currentNode = this.player.nextNode;
            this.currentPlayerSide = this.player.nextDoorSide;
            this.endLevel(this.resetLevel);
            this.player = null;
        }

    },
    endLevel:function(callback){
        // console.log('kill here');
        var self = this;
        this.updateable = false;
        for (var k = this.entityLayer.childs.length - 1; k >= 0; k--) {
            this.entityLayer.childs[k].preKill();
        }

        for (var t = this.environmentLayer.childs.length - 1; t >= 0; t--) {
            this.environmentLayer.childs[t].preKill();
        }

        // this.blackShape.alpha = 0.5;
        // TweenLite.to(this.blackShape, 0.5, {alpha:1});
        this.player.getContent().alpha = 0;
        var texture = new PIXI.RenderTexture(windowWidth, windowHeight);
        texture.render(this.levelContainer);
        this.oldBackground = new PIXI.Sprite(texture);
        this.addChild(this.oldBackground);
        setTimeout(function(){
            self.resetLevel();
        }, 700);

    },
    resetLevel:function()
    {
        this.updateable = true;

        TweenLite.to(this.blackShape, 1, {alpha:0});

        var roomState = 'first room';
        switch(this.currentNode.mode)
        {
            case 2:
                roomState = 'standard';
                break;
            case 3:
                roomState = 'item';
                break;
            case 4:
                roomState = 'boss';
                break;
            case 5:
                roomState = 'lock';
                break;
            case 6:
                roomState = 'key';

        }
        //console.log(this, 'ESSE É O ID DO LEVEL ATUAL -> ', this.currentNode);
        this.levelLabel.setText('room id:'+this.currentNode.id+'   -    state:'+roomState);
        this.level = getRandomLevel();
        console.log(this.currentNode);
        this.minimap.updatePlayerNode(this.currentNode.position);
        this.player = new Player();
        this.player.build();

        var beforeRoom = {x:0, y:0};
        if(this.currentPlayerSide === 'up')
        {
            this.player.setPosition(windowWidth/2,windowHeight - this.margin.y- this.player.height);
            beforeRoom.y = -windowHeight;
        }else if(this.currentPlayerSide === 'down')
        {
            this.player.setPosition(windowWidth/2,this.margin.y );
            beforeRoom.y = windowHeight;
        }else if(this.currentPlayerSide === 'left')
        {
            this.player.setPosition(windowWidth - this.margin.x - this.player.width,windowHeight/2);
            beforeRoom.x = -windowWidth;
        }else if(this.currentPlayerSide === 'right')
        {
            this.player.setPosition(this.margin.x,windowHeight/2);
            beforeRoom.x = windowWidth;
        }


        TweenLite.from(this.levelContainer, 0.7, beforeRoom);
        if(this.oldBackground){
            TweenLite.to(this.oldBackground, 0.7, {x:beforeRoom.x * -1, y:beforeRoom.y * -1});
        }

        this.heart = new Enemy();
        this.heart.build();

        // this.fly = new FlightEnemy(500,500);
        // this.fly.build();
        // this.heart.setPosition(700,200);
        // this.fly.setPosition(100,200);

        this.entityLayer.addChild(this.player);
        // this.entityLayer.addChild(this.heart);
        // this.entityLayer.addChild(this.fly);


        for (var i = this.level.length - 1; i >= 0; i--) {
            for (var j = this.level[i].length - 1; j >= 0; j--) {
                if(this.level[i][j] > 0)
                {
                    var obs = new Obstacle(this.level[i][j] - 1);
                    obs.build();
                    obs.setPosition((j)* APP.tileSize.x+ this.margin.x, (i+1)* APP.tileSize.y+ this.margin.y);
                    this.entityLayer.addChild(obs);

                }
            }
        }


        this.createDoors();
    },
    createDoors:function(){
        if(this.currentNode.childrenSides[0]){
            this.doorLeft = new Door('left');
            this.doorLeft.build();
            this.doorLeft.setPosition(this.margin.x - APP.tileSize.x / 2,windowHeight/2);

            this.doorLeft.node = this.currentNode.childrenSides[0];
            this.environmentLayer.addChild(this.doorLeft);

        }
        if(this.currentNode.childrenSides[1]){
            this.doorRight = new Door('right');
            this.doorRight.build();
            this.doorRight.setPosition(windowWidth - this.margin.x + APP.tileSize.x / 2,windowHeight/2);

            this.doorRight.node = this.currentNode.childrenSides[1];
            this.environmentLayer.addChild(this.doorRight);

        }
        if(this.currentNode.childrenSides[2]){
            this.doorUp = new Door('up');
            this.doorUp.build();
            this.doorUp.setPosition(windowWidth/2,this.margin.y - APP.tileSize.y / 2);

            this.doorUp.node = this.currentNode.childrenSides[2];
            this.environmentLayer.addChild(this.doorUp);

        }
        if(this.currentNode.childrenSides[3]){
            this.doorDown = new Door('down');
            this.doorDown.build();
            this.doorDown.setPosition(windowWidth/2,windowHeight - this.margin.y + APP.tileSize.y / 2);

            this.doorDown.node = this.currentNode.childrenSides[3];
            this.environmentLayer.addChild(this.doorDown);

        }
    },
    depthCompare:function(a,b) {
        var yA = a.position.y;
        var yB = b.position.y;
        if(a.children.length > 0){
            yA = a.children[0].position.y + a.children[0].height;
        }
        if(b.children.length > 0){
            yB = b.children[0].position.y + b.children[0].height;
        }
        if (yA < yB){
            return -1;
        }
        if (yA > yB){
            return 1;
        }
        return 0;
    },
});
