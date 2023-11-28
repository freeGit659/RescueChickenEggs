cc.Class({
    extends: cc.Component,

    properties: {
        collider: cc.BoxCollider,

        mCar: cc.Node,

        yStart : -50,
        yTarget : -200,

        
        isWalk:false,
        isWalking: false,
        isDeath: false,

        _isPressUp : false,
        _isPressDown: false,

        speed : 40,

        anim:cc.Animation,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
    },

    onCollisionEnter: function (other, self) {
        if(other.node.name == 'Car') {
            this.death();
        }
    },

    // destroy () {
    //     cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    //     cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    // },

    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.up:
                this._isPressUp = true;
                break;
            case cc.macro.KEY.down:
                this._isPressDown = true;
                break;
        }
    },

    onKeyUp: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.up:
                this._isPressUp = false;
                break;
            case cc.macro.KEY.down:
                this._isPressDown = false;
                break;
        }
    },


    start () {
        this.node.y = this.yStart;
        this.anim = this.getComponent(cc.Animation);
    },

    update (dt) {
        if(this.isDeath) return;
        if(this._isPressDown){
            this.node.y -= this.speed*dt;
            this.walk(true);
        }else if(this._isPressUp) {
            this.node.y += this.speed*dt;
            this.walk(true);
        }
        else if (!this._isPressDown || !this._isPressUp){
            this.walk(false);
        }
    },

    walk(isWalk){
        if(isWalk && !this.isWalking){
            this.anim.play('ChickenRun');
            this.isWalking = true;
        }
        else if(!isWalk && this.isWalking){
            this.anim.stop('ChickenRun');
            this.isWalking = false;
        }
        
    },

    death(){
        this.isDeath = true;
        this.anim.play('ChickenDeath');
    }
});
