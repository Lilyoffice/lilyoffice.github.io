function hit(Adt,Def,rate,power,natures){
    var msg = ""
    //命中判定
    Getmiss = Math.random() * 100;
    if(rate < Getmiss){
        msg = "攻击方的技能未命中，可惜了";
        window.msgs = msg;
        document.getElementById("result1").innerHTML = msg;
    }
    else{
        var hits = ((210/250) * (Adt/Def) * power + 2) * (Math.random() * 0.15 + 0.85);
        // 暴击判定
        maxhit= Math.random() * 1;
        if (maxhit<(1/16)){
            hits = hits * 1.5;
            msg = "攻击方暴击了，";
        }
      // 属性克制关系
        if (natures > 1){msg = msg + "效果拔群，";} else (natures < 1){msg = msg + "收效甚微，";} 
        hits = hits * natures
        // 属性一致性：
        var YZhits = hits * 1.5;
        // 属性一致性(太晶)：
        var YZTJhit = hits * 2;
        if(hits<1){hits=1;}
        msg = msg + "如果属性一致，则造成" + parseInt(YZhits) + "点伤害，如果属性一致且太晶化属性与本属性一致，则造成" + parseInt(YZTJhit) + "点伤害，如果属性不一致，则造成" + parseInt(hits)+ "点伤害";
        window.msgs = msg;
        document.getElementById("result1").innerHTML = msg;
    }
}
