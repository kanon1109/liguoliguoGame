/**
 * Created by tangben on 2015/7/1.
 */
/**
 * Created by kanon on 2015/5/23.
 */
var Word = (function (_super) {
    __extends(Word, _super);
    function Word() {
        _super.call(this);
        this.wordList = [];
    }
    var __egretProto__ = Word.prototype;
    __egretProto__.create = function (num, name, gapH) {
        if (gapH === void 0) { gapH = 0; }
        this.clear();
        var str = num.toString();
        var count = str.length;
        for (var i = 0; i < count; ++i) {
            var n = str.charAt(i);
            var numImage = new egret.Bitmap();
            numImage.texture = RES.getRes(name + n);
            numImage.x = (i * numImage.width + gapH);
            numImage.y = 0;
            this.addChild(numImage);
            this.wordList.push(numImage);
        }
        var numImage = this.wordList[count - 1];
        if (this.tailWord)
            this.tailWord.x = numImage.x + numImage.width + gapH;
    };
    __egretProto__.createTail = function (name) {
        this.removeTail();
        this.tailWord = new egret.Bitmap();
        this.tailWord.texture = RES.getRes(name);
        this.tailWord.y = 0;
        this.addChild(this.tailWord);
    };
    __egretProto__.clear = function () {
        var count = this.wordList.length;
        for (var i = count - 1; i >= 0; --i) {
            var numImage = this.wordList[i];
            this.removeChild(numImage);
            this.wordList.splice(i, 1);
        }
    };
    __egretProto__.removeTail = function () {
        if (this.tailWord && this.tailWord.parent)
            this.removeChild(this.tailWord);
    };
    __egretProto__.clearAll = function () {
        this.clear();
        this.removeTail();
    };
    return Word;
})(egret.Sprite);
Word.prototype.__class__ = "Word";
