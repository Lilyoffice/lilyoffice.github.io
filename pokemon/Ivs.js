function readIv(){
  var adtiv = parseInt(document.getElementById("adtIv").value);
  var defiv = parseInt(document.getElementById("defIv").value);
  var hpiv = parseInt(document.getElementById("hpIv").value);
  if (adtiv<=0||defiv<=0||hpiv <=0 ){
    document.getElementById("HPS").innerHTML = "输入的种族值数据不正确，请重试";
    console.log("debug log - 种族值不合法，终止程序" );
  }else{
    console.log("debug log - 种族值合法，继续" );
    var adt = parseInt(((adtiv*2 + 31 + 252/4) + 5)*1.1);
    console.log("我方攻击：" + adt);
    var def = parseInt(((defiv*2 + 20) + 5)*1);
    console.log("敌方防御：" + def);
    var hp = parseInt((hpiv*2 + 20) + 110);
    console.log("敌方体力：" + hp);
    if (window.pokemonNumber == 292){hp = 1;}
    //计算后赋值
    document.getElementById("adt").value = adt;
    document.getElementById("def").value = def;
    document.getElementById("HPS").innerHTML = "敌方体力:" + hp;
    document.getElementById("adtIv").value ="";
    document.getElementById("defIv").value ="";
    document.getElementById(hpIv").value ="";
    
  }
}
