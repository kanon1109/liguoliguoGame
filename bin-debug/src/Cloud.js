/**
 * Created by kanon on 2015/5/23.
 */
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud() {
        _super.call(this);
        this.speed = 25;
        this.anchorX = .5;
        this.anchorY = 0;
    }
    var __egretProto__ = Cloud.prototype;
    __egretProto__.update = function () {
        this.y -= this.speed;
    };
    return Cloud;
})(egret.Bitmap);
Cloud.prototype.__class__ = "Cloud";
