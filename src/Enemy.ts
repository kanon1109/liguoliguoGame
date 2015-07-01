/**
 * Created by kanon on 2015/5/23.
 */
class Enemy extends egret.Sprite
{
    public speed:number = 35;
    public speedScale:number = 1;
    private ani:egret.MovieClip;
    public type:number;
    public constructor()
    {
        super();
        this.anchorX = .5;
        this.anchorY = 0;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    public create(type:number):void
    {
        this.type = type;
        if(!this.ani)
        {
            var texture = RES.getRes("m" + type);
            var json = RES.getRes("m" + type + "Json");
            var mcdf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json, texture);
            this.ani = new egret.MovieClip(mcdf.generateMovieClipData());
            this.ani.frameRate = 12;
            this.ani.play(-1);
            this.addChild(this.ani);
        }
    }

    private removeFromStage(event:egret.Event):void
    {
        if(this.ani)
        {
            this.ani.stop();
            this.ani.parent.removeChild(this.ani);
            this.ani = null;
        }
    }

    public update():void
    {
        this.y -= this.speed * this.speedScale;
    }
}