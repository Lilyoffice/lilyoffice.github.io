window.onload = function() {
    var SaveTime = "2023/8/27 17:00"//存档时间
    document.getElementById("Time").innerHTML=SaveTime

    var SaveName = "陆猛"//存档时间
    document.getElementById("Name").innerHTML=SaveName

    var SaveOtherTrainName = "双笙、嘉德丽雅、卡芙卡"//同行人
    document.getElementById("OName").innerHTML=SaveOtherTrainName

// 以下内容注意修改

    var Area = "合众地区"//所在地区
    var City = "贵宾船"//所在位置
    var HZ = "2 (包含特殊徽章 1 :随机精灵挑战 )" //徽章数
    document.getElementById("Area").innerHTML=Area
    document.getElementById("City").innerHTML=City
    document.getElementById("HZ").innerHTML=HZ

    //以下内容为读取XML，不要改
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "main.xml?ver=230828&III", true);//注意更新版本号
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 解析 XML 文件
            var xmlDoc = xhr.responseXML;
            var students = xmlDoc.getElementsByTagName("pm");

            // 填充表格内容
            var tableBody = document.querySelector("#myTable tbody");
            for (var i = 0; i < students.length; i++) {
                var student = students[i];
                var id = student.getElementsByTagName("id")[0].textContent;
                var name = student.getElementsByTagName("name")[0].textContent;
                var nature = student.getElementsByTagName("nature")[0].textContent;
                var level = student.getElementsByTagName("level")[0].textContent;
                var tx = student.getElementsByTagName("tx")[0].textContent;
                var note = student.getElementsByTagName("note")[0].textContent;
                

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
