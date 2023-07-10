/*
心の絆夢への努力   心的羁绊 为梦想而努力
ラウレル工房       月桂工作室

项目名称：崩坏3水晶公式JS（测试）
编写人：ラウレル  更新人：ラウレル  更新日期：20230708
已经适配手机
*/
function calculate() {
//  Dubug : 输入错误 终止程序 20230710
	// 月卡开启Dubug
    var days = parseInt(document.getElementById("days").value);      // 获取时间内容
    var BoolCard = parseInt(document.getElementById("Cards").value); // 月卡是否开启：1 - 开启 0 = 不开启

    if (BoolCard < 0 || BoolCard > 1) {
      document.getElementById("maxs").innerHTML ="输入的月卡开启内容有误，请重试";
      document.getElementById("mins").innerHTML ="&nbsp;"
      return;
    }
    if (isNaN(BoolCard)) {
      document.getElementById("maxs").innerHTML ="输入的月卡开启内容为空，请重试";
      document.getElementById("mins").innerHTML ="&nbsp;"
      return;
    }
    if(isNaN(days)){
      document.getElementById("maxs").innerHTML ="输入的天数为空，请重试";
      document.getElementById("mins").innerHTML ="&nbsp;"
      return;
    }
    if(days <= 0){
      document.getElementById("maxs").innerHTML ="输入的天数错误，请重试";
      document.getElementById("mins").innerHTML ="&nbsp;"
      return;   
    }
// 20230710更新结束
  
    var daily = 40; // 日常
    var DailyCard = 60; // 月卡，每日登录
    var CardXV = 500; // 月卡，15天奖励
    var BuyCard = 300; // 月卡续费
    var QA = 120; // 问卷
    var Live = 350; // 直播
    var Update = 600; // 版本更新
    var qiandao = 50; // 签到
    var HD = 1500 // 活动
    var ElysianRealm = 500 //往世乐土 爱莉希雅 我老婆 月桂发癫中。。。。。。
  
    // 版本更新时间
    var BigUpDay = 42;
    var MinUpDay = 35;
  
    // 以下参数可以修改
    // var PolarRegionBool = 1; // 究极区是否开启：1 - 开启 0 = 不开启
  
    var Abyss = 500;
    var ZC = 140;
  
    // 计算模块
    // 月卡计算



    var CryCard = BoolCard == 1 ? (days * DailyCard + parseInt(days / 15) * CardXV + parseInt(days / 30) * BuyCard) : 0; // 计算月卡 -单独计算-
    var Crys = 0;
  
    // 深渊计算和签到计算
    var weeks = parseInt(days/7);
    var ODD = days - weeks * 7; // ODD是多余的天数
    if (days <= 14){ //如果日期小于14，活动奖励按0计算
      HD = 0;
    }
    if (ODD >= 4){ // 签到 + 深渊
      Crys = Crys + Abyss + qiandao;
    }
    if (ODD >= 1){
      Crys = Crys + ElysianRealm;
    }
  
    var VerODDmax = parseInt(days / BigUpDay);
    var VerODDmin = parseInt(days / MinUpDay);
    var maxCRY =parseInt(Crys + daily * days + weeks * (Abyss * 2 + ZC + qiandao * 2 + ElysianRealm) + CryCard + VerODDmax * (QA + Live + Update) + HD * (VerODDmax + 1)); // 大版本计算
    var minCRY =parseInt(Crys + daily * days + weeks * (Abyss * 2 + ZC + qiandao * 2 + ElysianRealm) + CryCard + VerODDmin * (QA + Live + Update) + HD * (VerODDmin + 1)); // 小版本计算
    
	// 内容显示
  
    document.getElementById("maxs").innerHTML =  "大版本(42天)获取的水晶为: "  + maxCRY;
    document.getElementById("mins").innerHTML =  "小版本(35天)获取的水晶为: "  + minCRY;
}


function clearInput() {  // 清屏 cls
    document.getElementById("days").value = "";
	document.getElementById("Cards").value = "";
    document.getElementById("maxs").innerHTML = "&nbsp;";
	document.getElementById("mins").innerHTML = "&nbsp;";
}
