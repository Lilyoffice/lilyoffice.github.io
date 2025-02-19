// 禁止的宝可梦 ID 数组
var banpm = [
    144, 145, 146, 150, 151, 201, 243, 244, 245, 249, 250, 251, 377, 378, 379,
    380, 381, 382, 383, 384, 385, 386, 480, 481, 482, 483, 484, 485, 486, 487,
    488, 489, 490, 491, 492, 493, 494, 638, 639, 640, 641, 642, 643, 644, 645,
    646, 647, 648, 649, 716, 717, 718, 719, 720, 721, 772, 773, 785, 786, 787,
    788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802,
    803, 804, 805, 806, 807, 808, 809, 888, 889, 890, 891, 892, 893, 894, 895,
    896, 897, 898, 905, 1001, 1002, 1003, 1004, 1007, 1008, 1009, 1010, 1014,
    1015, 1016, 1017,
  ];
  
  window.onload = function () {
    //alert('即将下载数据文件，可能需要100KB的流量消耗');
    randpm();
  };
  
  // 检查宝可梦是否被禁止
  function banlist(pmid, player) {
    var isBanned = banpm.indexOf(pmid) > -1;
    var message = isBanned
      ? "Player" +
        player +
        "'s Randomize Pokémon ID is:  " +
        pmid +
        " ,Pokemon can't use in this game"
      : "Player" +
        player +
        "'s Randomize Pokémon ID is:  " +
        pmid +
        " ,Pokemon can use in this game";
    console.log(message);
    console.log("--*--");
    return isBanned;
  }
  
  // 从 XML 文件中获取宝可梦数据
  function getPokemonDataFromXml() {
    return new Promise(function (resolve, reject) {
      var xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.open("GET", "pmdex.xml", true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var xmlDoc = xhr.responseXML;
            var pmdexElements = xmlDoc.getElementsByTagName("pmdex");
            var pokemonData = {};
            for (var i = 0; i < pmdexElements.length; i++) {
              var pmIdElement = pmdexElements[i].getElementsByTagName("pm_ID")[0];
              var pmid = parseInt(pmIdElement.textContent);
              pokemonData[pmid] = {
                id: pmid,
                name: pmdexElements[i].getElementsByTagName("pm_Name")[0]
                  .textContent,
                hps: pmdexElements[i].getElementsByTagName("HPS")[0].textContent,
                attack:
                  pmdexElements[i].getElementsByTagName("Attack")[0].textContent,
                defense:
                  pmdexElements[i].getElementsByTagName("Defense")[0].textContent,
                spAttack:
                  pmdexElements[i].getElementsByTagName("SP_Attack")[0]
                    .textContent,
                spDefense:
                  pmdexElements[i].getElementsByTagName("SP_Defense")[0]
                    .textContent,
                spd: pmdexElements[i].getElementsByTagName("Spd")[0].textContent,
              };
            }
            resolve(pokemonData);
          } else {
            reject(new Error("Failed to load pmdex.xml"));
          }
        }
      };
      xhr.send();
    });
  }
  
  // 随机生成宝可梦 ID
  function randpm() {
    document.getElementById("power1").value = "";
    document.getElementById("rate1").value = "";
    document.getElementById("natures1").value = "";
    document.getElementById("power2").value = "";
    document.getElementById("rate2").value = "";
    document.getElementById("natures2").value = "";
    window.pokemonNamepaly1 = NaN;
    window.pokemonNumberpaly1 = 0;
    window.pokemonNamepaly2 = NaN;
    window.pokemonNumberpaly2 = 0;
    var randpmid = 784;
    var pmid1, pmid2;
    var valid = false;
  
    getPokemonDataFromXml()
      .then(function (pokemonData) {
        while (!valid) {
          pmid1 = parseInt(Math.random() * randpmid + 1);
          pmid2 = parseInt(Math.random() * randpmid + 1);
  
          if (banlist(pmid1, 1)) {
            console.log("Player1's Restricted - level Pokémon, retrying.");
            console.log("--*--");
            continue;
          }
  
          if (banlist(pmid2, 2)) {
            console.log("Player2's Restricted - level Pokémon, retrying.");
            console.log("--*--");
            continue;
          }
  
          if (pmid1 === pmid2) {
            console.log("Two randomly selected Pokémon are the same. Retrying.");
            console.log("--*--");
            continue;
          }
  
          if (!pokemonData[pmid1] || !pokemonData[pmid2]) {
            console.log(
              "One or both Pokémon IDs are not in pmdex.xml. Retrying.",
            );
            continue;
          }
  
          valid = true;
        }
  
        var player1Data = pokemonData[pmid1];
        var player2Data = pokemonData[pmid2];
  
        function calculateStats(data, pmid) {
          var hp = parseInt(data.hps) * 2 + 20 + 110;
          if (pmid === 292) {
            hp = 1;
          }
          var attack = parseInt(data.attack);
          var spAttack = parseInt(data.spAttack);
          var adt =
            attack > spAttack
              ? parseInt((attack * 2 + 31 + 252 / 4 + 5) * 1.1)
              : parseInt((attack * 2 + 5) * 0.9);
          var sp_adt =
            attack > spAttack
              ? parseInt((spAttack * 2 + 5) * 0.9)
              : parseInt((spAttack * 2 + 31 + 252 / 4 + 5) * 1.1);
          var def = parseInt((parseInt(data.defense) * 2 + 20 + 5) * 1);
          var sp_def = parseInt((parseInt(data.spDefense) * 2 + 20 + 5) * 1);
          var spd = parseInt((parseInt(data.spd) * 2 + 31 + 252 / 4 + 5) * 1);
          return {
            hp: hp,
            adt: adt,
            sp_adt: sp_adt,
            def: def,
            sp_def: sp_def,
            spd: spd,
          };
        }
  
        var player1Stats = calculateStats(player1Data, pmid1);
        var player2Stats = calculateStats(player2Data, pmid2);
  
        window.playerhp1 = player1Stats.hp;
        window.playerhp2 = player2Stats.hp;
        window.playeradt1 = player1Stats.adt;
        window.playeradt2 = player2Stats.adt;
        window.playerdef1 = player1Stats.def;
        window.playerdef2 = player2Stats.def;
        window.playersp_adt1 = player1Stats.sp_adt;
        window.playersp_adt2 = player2Stats.sp_adt;
        window.playersp_def1 = player1Stats.sp_def;
        window.playersp_def2 = player2Stats.sp_def;
        window.playerspd1 = player1Stats.spd;
        window.playerspd2 = player2Stats.spd;
  
        // 输出到 HTML 页面
        var container = document.createElement("div");
        container.className = "container";
  
        var player1Column = document.createElement("div");
        player1Column.className = "player-column";
        player1Column.innerHTML =
          "<h2>玩家 1</h2>" +
          "<p>精灵序号: " +
          player1Data.id +
          "</p>" +
          "<p>精灵名称: " +
          player1Data.name +
          "</p>" +
          "<p>精灵面板</p>" +
          "<p>体力: " +
          player1Stats.hp +
          "</p>" +
          "<p>攻击: " +
          player1Stats.adt +
          "</p>" +
          "<p>防御: " +
          player1Stats.def +
          "</p>" +
          "<p>特殊攻击: " +
          player1Stats.sp_adt +
          "</p>" +
          "<p>特殊防御: " +
          player1Stats.sp_def +
          "</p>" +
          "<p>速度: " +
          player1Stats.spd +
          "</p>";
  
        var player2Column = document.createElement("div");
        player2Column.className = "player-column";
        player2Column.innerHTML =
          "<h2>玩家 2</h2>" +
          "<p>ID: " +
          player2Data.id +
          "</p>" +
          "<p>Name: " +
          player2Data.name +
          "</p>" +
          "<p>精灵面板</p>" +
          "<p>体力: " +
          player2Stats.hp +
          "</p>" +
          "<p>攻击: " +
          player2Stats.adt +
          "</p>" +
          "<p>防御: " +
          player2Stats.def +
          "</p>" +
          "<p>特殊攻击: " +
          player2Stats.sp_adt +
          "</p>" +
          "<p>特殊防御: " +
          player2Stats.sp_def +
          "</p>" +
          "<p>速度: " +
          player2Stats.spd +
          "</p>";
  
        container.appendChild(player1Column);
        container.appendChild(player2Column);
        window.pokemonNamepaly1 = player1Data.name;
        window.pokemonNumberpaly1 = player1Data.id;
        window.pokemonNamepaly2 = player2Data.name;
        window.pokemonNumberpaly2 = player2Data.id;
  
        // 移除之前的宝可梦信息和按钮
        var mainapp = document.getElementById("mainapp");
        var oldContainer = mainapp.querySelector(".container");
        var oldButton = document.getElementById("reroll-button");
        if (oldContainer) {
          mainapp.removeChild(oldContainer);
        }
        if (oldButton) {
          mainapp.removeChild(oldButton);
        }
  
        mainapp.appendChild(container);
  
        // 创建按钮
        var button = document.createElement("button");
        button.id = "reroll-button";
        button.textContent = "重新随机";
        button.addEventListener("click", randpm);
  
        mainapp.appendChild(button);
      })
      .catch(function (error) {
        console.error("An error occurred:", error);
      });
  }
  function hitinf() {
    var msg = "";
    document.getElementById("msg1").innerHTML = "&nbsp;";
    document.getElementById("msg2").innerHTML = "&nbsp;";
    document.getElementById("msg3").innerHTML = "&nbsp;";
    document.getElementById("msg4").innerHTML = "&nbsp;";
    document.getElementById("msg21").innerHTML = "&nbsp;";

    var power1 = document.getElementById("power1").value;
    var rate1 = document.getElementById("rate1").value;
    var natures1 = document.getElementById("natures1").value;
    var power2 = document.getElementById("power2").value;
    var rate2 = document.getElementById("rate2").value;
    var natures2 = document.getElementById("natures2").value;
    var spd1 = window.playerspd1;
    var spd2 = window.playerspd2;

    // 声明变量
    var hit1, hityz1, hit2, hityz2;

    // 计算伤害的函数
    function calculateDamage(attackerAdt, attackerSpAdt, defenderDef, defenderSpDef, power, nature) {
        var hitran = Math.random() * 0.15 + 0.85;
        var hits = ((210 / 250) * ((attackerAdt > attackerSpAdt? attackerAdt : attackerSpAdt) / (attackerAdt > attackerSpAdt? defenderDef : defenderSpDef)) * power + 2) * hitran;
        var maxhit = Math.random();
        if (maxhit < 1 / 16) {
            hits *= 1.5;
            msg += "攻击方暴击了，";
        }
        if (nature > 1) {
            msg += "效果拔群，";
        } else if (nature < 1) {
            msg += "收效甚微，";
        }
        hits *= nature;
        var YZhits = hits * 1.5;
        if (hits < 1) hits = 1;
        return { hits: hits, YZhits: YZhits };
    }

    if (spd1 >= spd2) {
        // 1p先手
        document.getElementById("msg1").innerHTML = window.pokemonNamepaly1 + "先手\n";
        var Getmiss1 = Math.random() * 100;
        window.Getmiss1 = Getmiss1;
        if (rate1 > Getmiss1) {
            var damage1 = calculateDamage(window.playeradt1, window.playersp_adt1, window.playerdef2, window.playersp_def2, power1, natures1);
            hit1 = damage1.hits;
            hityz1 = damage1.YZhits;
            if (hit1 >= window.playerhp2) {
                document.getElementById("msg2").innerHTML = "玩家1获胜";
                return;
            } else if (hityz1 > window.playerhp2) {
                document.getElementById("msg2").innerHTML = "如果技能属性一致，则玩家1获胜";
                document.getElementById("msg3").innerHTML = window.pokemonNamepaly1 + msg + "如果属性一致，则造成" + parseInt(hityz1) + "点伤害，如果属性不一致，则造成" + parseInt(hit1) + "点伤害";
            } else {
                document.getElementById("msg3").innerHTML = window.pokemonNamepaly1 + msg + "如果属性一致，则造成" + parseInt(hityz1) + "点伤害，如果属性不一致，则造成" + parseInt(hit1) + "点伤害";
            }
        } else {
            document.getElementById("msg3").innerHTML = window.pokemonNamepaly1 + "技能未命中\n";
        }
        msg = "";

        // 2p后手
        var Getmiss2 = Math.random() * 100;
        if (rate2 > Getmiss2) {
            var damage2 = calculateDamage(window.playeradt2, window.playersp_adt2, window.playerdef1, window.playersp_def1, power2, natures2);
            hit2 = damage2.hits;
            hityz2 = damage2.YZhits;
            if (hit2 > window.playerhp1) {
                document.getElementById("msg21").innerHTML = "玩家2获胜";
                return;
            } else if (hityz2 > window.playerhp1) {
                document.getElementById("msg21").innerHTML = "如果技能属性一致，则玩家2获胜";
                document.getElementById("msg4").innerHTML = window.pokemonNamepaly2 + msg + "如果属性一致，则造成" + parseInt(hityz2) + "点伤害，如果属性不一致，则造成" + parseInt(hit2) + "点伤害";
            } else {
                document.getElementById("msg4").innerHTML = window.pokemonNamepaly2 + msg + "如果属性一致，则造成" + parseInt(hityz2) + "点伤害，如果属性不一致，则造成" + parseInt(hit2) + "点伤害";
            }
        } else {
            document.getElementById("msg4").innerHTML = window.pokemonNamepaly2 + "技能未命中\n";
        }
    } else {
        // 2p先手
        document.getElementById("msg1").innerHTML = window.pokemonNamepaly2 + "先手\n";
        var Getmiss2 = Math.random() * 100;
        window.Getmiss2 = Getmiss2;
        if (rate2 > Getmiss2) {
            var damage2 = calculateDamage(window.playeradt2, window.playersp_adt2, window.playerdef1, window.playersp_def1, power2, natures2);
            hit2 = damage2.hits;
            hityz2 = damage2.YZhits;
            if (hit2 > window.playerhp1) {
                document.getElementById("msg21").innerHTML = "玩家2获胜";
                return;
            } else if (hityz2 > window.playerhp1) {
                document.getElementById("msg21").innerHTML = "如果技能属性一致，则玩家2获胜";
                document.getElementById("msg3").innerHTML = window.pokemonNamepaly2 + msg + "如果属性一致，则造成" + parseInt(hityz2) + "点伤害，如果属性不一致，则造成" + parseInt(hit2) + "点伤害";
            } else {
                document.getElementById("msg3").innerHTML = window.pokemonNamepaly2 + msg + "如果属性一致，则造成" + parseInt(hityz2) + "点伤害，如果属性不一致，则造成" + parseInt(hit2) + "点伤害";
            }
        } else {
            document.getElementById("msg3").innerHTML = window.pokemonNamepaly2 + "技能未命中\n";
        }
        msg = "";

        // 1p后手
        var Getmiss1 = Math.random() * 100;
        if (rate1 > Getmiss1) {
            var damage1 = calculateDamage(window.playeradt1, window.playersp_adt1, window.playerdef2, window.playersp_def2, power1, natures1);
            hit1 = damage1.hits;
            hityz1 = damage1.YZhits;
            if (hit1 > window.playerhp2) {
                document.getElementById("msg2").innerHTML = "玩家1获胜";
                return;
            } else if (hityz1 > window.playerhp2) {
                document.getElementById("msg2").innerHTML = "如果技能属性一致，则玩家1获胜";
                document.getElementById("msg4").innerHTML = window.pokemonNamepaly1 + msg + "如果属性一致，则造成" + parseInt(hityz1) + "点伤害，如果属性不一致，则造成" + parseInt(hit1) + "点伤害";
            } else {
                document.getElementById("msg4").innerHTML = window.pokemonNamepaly1 + msg + "如果属性一致，则造成" + parseInt(hityz1) + "点伤害，如果属性不一致，则造成" + parseInt(hit1) + "点伤害";
            }
        } else {
            document.getElementById("msg4").innerHTML = window.pokemonNamepaly1 + "技能未命中\n";
        }
    }

    document.getElementById("msg1").style.color = "red";
    document.getElementById("msg2").style.color = "red";
    document.getElementById("msg21").style.color = "red";
    document.getElementById("msg3").style.color = "red";
    document.getElementById("msg4").style.color = "red";
    //document.getElementById("power1").value = "";
    //document.getElementById("rate1").value = "";
    //document.getElementById("natures1").value = "";
    //document.getElementById("power2").value = "";
    //document.getElementById("rate2").value = "";
    //document.getElementById("natures2").value = "";
}