window.onload = function() {
    var SaveTime = "2025/2/1 23:00"//存档时间
    document.getElementById("Time").innerHTML=SaveTime

    var SaveName = "陆猛"//存档时间
    document.getElementById("Name").innerHTML=SaveName

    var SaveOtherTrainName = "双笙、公孙离"//同行人
    document.getElementById("OName").innerHTML=SaveOtherTrainName

// 以下内容注意修改

    var Area = "合众地区"//所在地区
    var City = "卡那兹市"//所在位置
    var HZ = "5 (包含特殊徽章 1 :随机精灵挑战 )" //徽章数
    document.getElementById("Area").innerHTML=Area
    document.getElementById("City").innerHTML=City
    document.getElementById("HZ").innerHTML=HZ

    //以下内容为读取XML，不要改
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "main.xml?ver=231004&0X18A", true);//注意更新版本号
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 解析 XML 文件
            var xmlDoc = xhr.responseXML;
            var pms = xmlDoc.getElementsByTagName("pm");

            // 填充表格内容
            var tableBody = document.querySelector("#myTable tbody");
            for (var i = 0; i < pms.length; i++) {
                var Pokemon = pms[i];
                var id = Pokemon.getElementsByTagName("id")[0].textContent;
                var name = Pokemon.getElementsByTagName("name")[0].textContent;
                var nature = Pokemon.getElementsByTagName("nature")[0].textContent;
                var level = Pokemon.getElementsByTagName("level")[0].textContent;
                var tx = Pokemon.getElementsByTagName("tx")[0].textContent;
                var note = Pokemon.getElementsByTagName("note")[0].textContent;
                

                var row = tableBody.insertRow();
                
                row.insertCell().textContent = id;
                row.insertCell().textContent = name;
                row.insertCell().textContent = nature;
                row.insertCell().textContent = level;
                row.insertCell().textContent = tx;
                row.insertCell().textContent = note;
                
                

            }
        }
    };
    xhr.send();
}
