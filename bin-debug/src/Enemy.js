/**
 * Created by kanon on 2015/5/23.
 */
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        _super.call(this);
        this.speed = 20;
        this.speedScale = 1;
        this.anchorX = .5;
        this.anchorY = 0;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }
    var __egretProto__ = Enemy.prototype;
    __egretProto__.create = function (type) {
        if (!this.ani) {
            var texture = RES.getRes("m" + type);
            var json = RES.getRes("m" + type + "Json");
            var mcdf = new egret.MovieClipDataFactory(json, texture);
            this.ani = new egret.MovieClip(mcdf.generateMovieClipData());
            this.ani.frameRate = 12;
            this.ani.play(-1);
            this.addChild(this.ani);
        }
    };
    __egretProto__.removeFromStage = function (event) {
        if (this.ani) {
            this.ani.stop();
            this.ani.parent.removeChild(this.ani);
            this.ani = null;
        }
    };
    __egretProto__.update = function () {
        this.y -= this.speed * this.speedScale;
    };
    return Enemy;
})(egret.Sprite);
Enemy.prototype.__class__ = "Enemy";
