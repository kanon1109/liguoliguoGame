/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    private startUI: StartUI;
    private gameScene:GameScene;
    private failPanel:FailPanel;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event)
    {
        //egret.Profiler.getInstance().run();

        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
            //this.createFailPanel();
        }
    }
    /**
    * 资源组加载出错
     *  The resource group loading failed
    */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void
    {
        if(!this.startUI) this.startUI = new StartUI();
        this.startUI.addEventListener("StartGame", this.startGameHandler, this);
        this.addChild(this.startUI);
    }

    private startGameHandler(event:egret.Event):void
    {
        this.startUI.reset();
        this.startUI.parent.removeChild(this.startUI);
        this.startUI.removeEventListener("StartGame", this.startGameHandler, this);
        if(!this.gameScene) this.gameScene = new GameScene();
        this.gameScene.addEventListener("fail", this.failHandler, this);
        this.gameScene.addEventListener("playAgain", this.playAgainHandler, this);
        this.addChild(this.gameScene);
    }

    private failHandler(event:egret.Event):void
    {
        this.gameScene.removeEventListener("fail", this.failHandler, this);
        this.createFailPanel();
    }

    //创建失败界面
    private createFailPanel():void
    {
        if(!this.failPanel) this.failPanel = new FailPanel();
        this.failPanel.x = this.stage.stageWidth + this.failPanel.width;
        this.failPanel.y = this.stage.stageHeight / 2;

        this.failPanel.addEventListener("playAgain", this.playAgainHandler, this);
        this.failPanel.addEventListener("back", this.backHandler, this);
        this.addChild(this.failPanel);

        TweenMax.to(this.failPanel, .3, {x:this.stage.stageWidth / 2});
    }

    private playAgainHandler(event:egret.Event):void
    {
        if(this.failPanel && this.failPanel.parent)
        {
            TweenMax.killTweensOf(this.failPanel);
            this.failPanel.parent.removeChild(this.failPanel);
        }
        this.gameScene.startGame();
        this.gameScene.addEventListener("fail", this.failHandler, this);
    }

    private backHandler(event:egret.Event):void
    {
        TweenMax.killTweensOf(this.failPanel);
        this.failPanel.parent.removeChild(this.failPanel);
        this.gameScene.parent.removeChild(this.gameScene);
        this.createGameScene();
    }
}


