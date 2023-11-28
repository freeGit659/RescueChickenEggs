cc.Class({
    extends: cc.Component,

    properties: {
        xStart : 300,
        xTarget : -700,

        
        isRun:false,
        speed : 300,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.x = this.xStart;
    },

    update (dt) {
        if(this.isRun && this.node.x > this.xTarget){
            this.node.x -= this.speed*dt;
        }
    },
});
