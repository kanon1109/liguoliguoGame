/**
 * Created by tangben on 2015/7/1.
 */
/**
 * Created by kanon on 2015/5/23.
 */
class Word extends egret.Sprite
{
    private wordList:any[];
    private tailWord:egret.Bitmap;
    public constructor()
    {
        super();
        this.wordList = [];
    }

    public create(num:number, name:string, gapH:number = 0):void
    {
        this.clear();
        var str:string = num.toString();
        var count:number = str.length;
        for(var i:number = 0; i < count; ++i)
        {
            var n:string = str.charAt(i);
            var numImage:egret.Bitmap = new egret.Bitmap();
            numImage.texture = RES.getRes(name + n);
            numImage.x = (i * numImage.width + gapH);
            numImage.y = 0;
            this.addChild(numImage);
            this.wordList.push(numImage);
        }
        var numImage:egret.Bitmap = this.wordList[count - 1];
        if(this.tailWord) this.tailWord.x = numImage.x + numImage.width + gapH;
    }

    public createTail(name:string):void
    {
        this.removeTail();
        this.tailWord = new egret.Bitmap();
        this.tailWord.texture = RES.getRes(name);
        this.tailWord.y = 0;
        this.addChild(this.tailWord);
    }

    public clear():void
    {
        var count:number = this.wordList.length;
        for(var i:number = count - 1; i >= 0; --i)
        {
            var numImage:egret.Bitmap = this.wordList[i];
            this.removeChild(numImage);
            this.wordList.splice(i, 1);
        }
    }

    public removeTail():void
    {
        if(this.tailWord &&
           this.tailWord.parent)
           this.removeChild(this.tailWord);
    }

    public clearAll():void
    {
        this.clear();
        this.removeTail();
    }

}