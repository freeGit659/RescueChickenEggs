
cc.Class({
    extends: cc.Component,

    properties: {
        redSprite: cc.Sprite,
        yellowSprite: cc.Sprite,
        greenSprite: cc.Sprite,

        isGreenLight : false,
        _red : new cc.Color(255,0,0),
        _yellow : new cc.Color(255,255,0),
        _green : new cc.Color(0,255,0),
        _black : new cc.Color(0,0,0),
        _time: 0,
        _timeFlash : 0,
        _count : 0,
        _color: 1,

        chicken:cc.Node,
        car:cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.error(this.node);
    },

    start () {
        this.turnOffLight(this.redSprite);
        this.turnOffLight(this.greenSprite);
        this.turnOffLight(this.yellowSprite);
    },

    update (dt) {
        if(this._time > 0 && this._color == 1){
            this.car.getComponent("CarController").isRun = true;
            this.turnOnLight(this.greenSprite,this._green);
            this.turnOffLight(this.redSprite);
            this.turnOffLight(this.yellowSprite);
            this._color = 2;
        }
        if(this._time >= 3 && this._color == 2){
            if(this.flashLight(this.greenSprite, this._green, 0.5,3,dt)) {
                this._color = 3;
                this.turnOffLight(this.greenSprite);
                this.turnOnLight(this.yellowSprite,this._yellow);
                this.turnOffLight(this.redSprite);
            }
        }

        if(this._time > 6.5 && this._color == 3){
            if(this.flashLight(this.yellowSprite, this._yellow, 0.5,3,dt)) {
                this.turnOffLight(this.yellowSprite);
                this.turnOnLight(this.redSprite,this._red);
                this._color = 4;
            //    this.chicken.getComponent("ChickenController").isWalk=true;
            }
        }
        if(this._time > 12) {
            if(this.flashLight(this.redSprite, this._red, 0.5,3,dt)){
                this._time = 0;
                this._color = 1;
            }
        }
        this._time = this._time + dt;
    },

    turnOnLight(sprite, color){
        sprite.node.opacity = 255;
        sprite.node.color = color;
    },

    turnOffLight(sprite){
        sprite.node.color = this._black;
    },

    flashLight(sprite, color,timeFlash, times, dt){
        if(this._timeFlash ===0 ){
            sprite.node.color = this._black;
        }
        this._timeFlash += dt;
        if(this._timeFlash >= timeFlash){
            sprite.node.color = color;
            this._timeFlash = 0;
            this._count++;
            if(this._count === times) {
                this._count = 0;
                return true;
            }
            else return false;
        }
    },
});
