/*jshint undef:false */
var Application = AbstractApplication.extend({
	init:function(firebaseURL){

        this._super(windowWidth, windowHeight);
        this.stage.setBackgroundColor(0x000);
        this.stage.removeChild(this.loadText);
        this.appContainer = document.getElementById('rect');
        this.id = parseInt(Math.random() * 100000000000);

        //create a dungeon generator
        this.gen = new DungeonGenerator();
        //genereta the dungeon with a seed, and sizes
        this.gen.generate(Math.random() * 0xFFFFFF, 1, [10, 15], [12,12], 5);
        this.gen.log();
        //size of tile
        this.tileSize = {x:80, y: 80};
	},
    build:function(){
        this._super();
        this.onAssetsLoaded();
    },
    onAssetsLoaded:function()
    {
        this.mainApp = new DesktopMainScreen('Main');
        this.screenManager.addScreen(this.mainApp);
        this.screenManager.change('Main');
    },
});
