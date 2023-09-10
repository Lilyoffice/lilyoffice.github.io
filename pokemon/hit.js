readhit(){
    var Adt = parseInt(document.getElementById("adt").value);var Def = parseInt(document.getElementById("def").value);
    var rate = parseInt(document.getElementById("rate").value);var power = parseInt(document.getElementById("power").value);
    var natures = parseInt(document.getElementById("natures").value);
    if(Adt < 1 || Def < 1 || rate < 1 || power < 1 || natures < 0 ){
        document.getElementById("result1").innerHTML ="输入的内容不合法，请重试。";
console.log("debug log - lilyoffice:内容不合法，终止程序。");
                                                                   }
    else{
        hit(Adt,Def,rate,power,natures)
console.log("debug log - lilyoffice:合法，执行hit函数");
    }
}


function hit(Adt,Def,rate,power,natures){
    var msg = ""
    //命中判定
    Getmiss = Math.random() * 100;
console.log("debug log - lilyoffice:命中随机数：" + Getmiss)
    if(rate < Getmiss){
        msg = "攻击方的技能未命中，可惜了";
        window.msgs = msg;
        document.getElementById("result1").innerHTML = msg;
    }
    else{
        var hitran = Math.random() * 0.15 + 0.85;
console.log("debug log - lilyoffice:伤害随机数：" + Getmiss);
        var hits = ((210/250) * (Adt/Def) * power + 2) * hitran;
        // 暴击判定
        var maxhit= Math.random() * 1;
console.log("debug log - lilyoffice:暴击随机数：" + maxhit)
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
console.log(window.msgs)
        document.getElementById("result1").innerHTML = msg;
    }
}
