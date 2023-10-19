function main(){
    var pmid = parseInt(document.getElementById("pmid").value);
    var na1 = document.getElementById("pmnature1").value;
    var na2 = document.getElementById("pmnature2").value;
    var zzz = parseInt(document.getElementById("ZZZ").value);
    var Iv = parseInt(document.getElementById("Iv").value);
    var pxg = parseInt(document.getElementById("XG").value);
    a = natures(na1)
    b = natures(na2)
    NatureUID = a + b
    // 性格值
    var XGPID = null
    if (pxg == "孤独"){XGPID = "01";}
    else if(pxg == "固执"){XGPID = "02";}
    else if(pxg == "调皮"){XGPID = "03";}
    else if(pxg == "勇敢"){XGPID = "04";}
    else if(pxg == "大胆"){XGPID = "05";}
    else if(pxg == "顽皮"){XGPID = "06";}
    else if(pxg == "无虑"){XGPID = "07";}
    else if(pxg == "悠闲"){XGPID = "08";}
    else if(pxg == "保守"){XGPID = "09";}
    else if(pxg == "稳重"){XGPID = "00";}
    else if(pxg == "马虎"){XGPID = "21";}
    else if(pxg == "冷静"){XGPID = "22";}
    else if(pxg == "沉着"){XGPID = "23";}
    else if(pxg == "温顺"){XGPID = "24";}
    else if(pxg == "狂妄"){XGPID = "25";}
    else if(pxg == "胆小"){XGPID = "26";}
    else if(pxg == "急躁"){XGPID = "27";}
    else if(pxg == "开朗"){XGPID = "28";}
    else if(pxg == "天真"){XGPID = "29";}
    else if(pxg == "害羞"){XGPID = "99";}
    else if(pxg == "实干"){XGPID = "98";}
    else if(pxg == "坦率"){XGPID = "97";}
    else if(pxg == "浮躁"){XGPID = "96";}
    else if(pxg == "认真"){XGPID = "95";}
    console.log("Get XG ID is " + XGPID);
    console.log("--*-- ");
    let PIDS = parseInt(String(pmid) + NatureUID + String(zzz) + String(Iv) + XGPID);
    let hex = decToHex(PIDS)
    document.getElementById("result").innerHTML = hex

}

function natures(naturename){
    if (naturename == "--"){NatureUID="00";}
    else if (naturename == "草"){NatureUID="01";}
    else if (naturename == "水"){NatureUID="02";}
    else if (naturename == "火"){NatureUID="03";}
    else if (naturename == "飞行"){NatureUID="04";}
    else if (naturename == "地面"){NatureUID="05";}
    else if (naturename == "超能"){NatureUID="06";}
    else if (naturename == "暗影"){NatureUID="07";}
    else if (naturename == "电"){NatureUID="08";}
    else if (naturename == "普通"){NatureUID="09";}
    else if (naturename == "战斗"){NatureUID="10";}
    else if (naturename == "神秘"){NatureUID="11";}
    else if (naturename == "机械"){NatureUID="12";}
    else if (naturename == "冰"){NatureUID="13";}
    else if (naturename == "光"){NatureUID="14";}
    else if (naturename == "龙"){NatureUID="15";}
    else if (naturename == "圣灵"){NatureUID="16";}
    else if (naturename == "次元"){NatureUID="17";}
    else if (naturename == "远古"){NatureUID="18";}
    else if (naturename == "邪灵"){NatureUID="19";}
    else if (naturename == "自然"){NatureUID="20";}
    else if (naturename == "王"){NatureUID="21";}
    else if (naturename == "混沌"){NatureUID="22";}
    else if (naturename == "神灵"){NatureUID="23";}
    else if (naturename == "轮回"){NatureUID="24";}
    else if (naturename == "虫"){NatureUID="25";}
    else if (naturename == "虚空"){NatureUID="26";}
    console.log("Get Nateure ID is " + NatureUID);
    console.log("--*-- ");
    return NatureUID
}

function decToHex(dec) {
    a = dec.toString(32).toUpperCase();
    console.log(a);
    console.log("--*-- ");
    return a
}
