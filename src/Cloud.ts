/**
 * Created by kanon on 2015/5/23.
 */
class Cloud extends egret.Bitmap
{
    public speed:number = 25;
    public constructor()
    {
        super();
        this.anchorX = .5;
        this.anchorY = 0;
    }

    public update():void
    {
        this.y -= this.speed;
    }
}