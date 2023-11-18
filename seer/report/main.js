window.onload = function() {
    // 230923 标准化用语
    // 使用 AJAX 加载外部 XML 文件
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "main.xml?ver=231118&Form=xlb", true);//注意更新版本号
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 解析 XML 文件
            var xmlDoc = xhr.responseXML;
            var Pms = xmlDoc.getElementsByTagName("pm");

            // 填充表格内容
            var tableBody = document.querySelector("#myTable tbody");
            for (var i = 0; i < Pms.length; i++) {
                var Pokemon = Pms[i];
                //精灵基础信息
                var id = Pokemon.getElementsByTagName("id")[0].textContent;
                var name = Pokemon.getElementsByTagName("name")[0].textContent;
                var naI = Pokemon.getElementsByTagName("natureI")[0].textContent;
                var naII = Pokemon.getElementsByTagName("natureII")[0].textContent;
                //精灵养成信息
                var race = Pokemon.getElementsByTagName("race")[0].textContent;
                var level = Pokemon.getElementsByTagName("level")[0].textContent;
                var ind = Pokemon.getElementsByTagName("ind")[0].textContent;
                var cha = Pokemon.getElementsByTagName("cha")[0].textContent;
                var chara = Pokemon.getElementsByTagName("chara")[0].textContent;
                    //精灵学习力 <Adt><Adf><Apt><Apf><spd><hp>
                    var Adt = Pokemon.getElementsByTagName("Adt")[0].textContent;
                    var Adf = Pokemon.getElementsByTagName("Adf")[0].textContent;
                    var Apt = Pokemon.getElementsByTagName("Apt")[0].textContent;
                    var Apf = Pokemon.getElementsByTagName("Apf")[0].textContent;
                    var Spd = Pokemon.getElementsByTagName("Spd")[0].textContent;
                    var HP = Pokemon.getElementsByTagName("HP")[0].textContent;
                    var zzz = parseInt(Adt) + parseInt(Adf) + parseInt(Apt) + parseInt(Apf) + parseInt(Spd) + parseInt(HP)
                //精灵标识相关 巡礼部 20230718
                var pmlabel = Pokemon.getElementsByTagName("pmlabel")[0].textContent;
                

                

                var row = tableBody.insertRow();
                row.insertCell().textContent = id;
                row.insertCell().textContent = name;
                row.insertCell().textContent = naI;
                row.insertCell().textContent = naII;
                row.insertCell().textContent = race;
                row.insertCell().textContent = level;
                row.insertCell().textContent = ind;
                row.insertCell().textContent = cha;
                row.insertCell().textContent = chara;

                row.insertCell().textContent = Adt;
                row.insertCell().textContent = Adf;
                row.insertCell().textContent = Apt;
                row.insertCell().textContent = Apf;
                row.insertCell().textContent = Spd;
                row.insertCell().textContent = HP;

                row.insertCell().textContent = zzz;
                //精灵标识相关 巡礼部 20230718
                row.insertCell().textContent = pmlabel;


            }
        }
    };
    xhr.send();
};
