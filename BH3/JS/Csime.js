/*
心の絆夢への努力   心的羁绊 为梦想而努力
ラウレル工房       月桂工作室

项目名称：崩坏3水晶公式JS（测试）
编写人：ラウレル  更新人：ラウレル  更新日期：20230708
已经适配手机
*/
function calculate() {
    
    var days = parseInt(document.getElementById("days").value); 
    var BoolCard = parseInt(document.getElementById("Cards").value); // 月卡是否开启：1 - 开启 0 = 不开启
    if(isNaN(days)){
       days = 0;
    }
  
    var daily = 40; // 日常
    var DailyCard = 60; // 月卡，每日登录
    var CardXV = 500; // 月卡，15天奖励
    var BuyCard = 300; // 月卡续费
    var QA = 120; // 问卷
    var Live = 350; // 直播
    var Update = 600; // 版本更新
    var qiandao = 50; // 签到
    var HD = 1500 // 活动
  
    // 版本更新时间
    var BigUpDay = 42;
    var MinUpDay = 35;
  
    // 以下参数可以修改
    // var PolarRegionBool = 1; // 究极区是否开启：1 - 开启 0 = 不开启
  
    var Abyss = 500;
    var ZC = 140;
  
    // 计算模块
    // 月卡计算
    if (BoolCard < 0 || BoolCard > 1 || isNaN(BoolCard)) {
      document.getElementById("maxs").innerHTML ="输入的月卡开启内容有误，请重试";
      document.getElementById("maxs").innerHTML ="&nbsp;"
      return;
    }
    var CryCard = BoolCard == 1 ? (days * DailyCard + parseInt(days / 15) * CardXV + parseInt(days / 30) * BuyCard) : 0;
    var Crys = 0;
  
    // 深渊计算和签到计算
    var weeks = parseInt(days/7);
    var ODD = days - weeks * 7;
    if (days <= 14){
      HD = 0;
    }
    if (ODD >= 4){
      Crys = Abyss + qiandao;
    }
  
    var VerODDmax = parseInt(days / BigUpDay);
    var VerODDmin = parseInt(days / MinUpDay);
    var maxCRY = Crys + daily * days + weeks * (Abyss * 2 + ZC + qiandao * 2) + CryCard + VerODDmax * (QA + Live + Update) + HD * (VerODDmax + 1);
    var minCRY = Crys + daily * days + weeks * (Abyss * 2 + ZC + qiandao * 2) + CryCard + VerODDmin * (QA + Live + Update) + HD * (VerODDmin + 1);
  
    document.getElementById("maxs").innerHTML =  "大版本(42天)获取的水晶为: "  + maxCRY;
    document.getElementById("mins").innerHTML =  "小版本(35天)获取的水晶为: "  + minCRY;
}


function clearInput() {
    document.getElementById("days").value = "";
	document.getElementById("Cards").value = "";
    document.getElementById("maxs").innerHTML = "&nbsp;";
	document.getElementById("mins").innerHTML = "&nbsp;";
}