window.onload = function() {
    // 使用 AJAX 加载外部 XML 文件
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "main.xml?ver=112&Form=JS112", true);//注意更新版本号
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 解析 XML 文件
            var xmlDoc = xhr.responseXML;
            var students = xmlDoc.getElementsByTagName("pm");

            // 填充表格内容
            var tableBody = document.querySelector("#myTable tbody");
            for (var i = 0; i < students.length; i++) {
                var student = students[i];
                //精灵基础信息
                var id = student.getElementsByTagName("id")[0].textContent;
                var name = student.getElementsByTagName("name")[0].textContent;
                var naI = student.getElementsByTagName("natureI")[0].textContent;
                var naII = student.getElementsByTagName("natureII")[0].textContent;
                //精灵养成信息
                var race = student.getElementsByTagName("race")[0].textContent;
                var level = student.getElementsByTagName("level")[0].textContent;
                var ind = student.getElementsByTagName("ind")[0].textContent;
                var cha = student.getElementsByTagName("cha")[0].textContent;
                var chara = student.getElementsByTagName("chara")[0].textContent;
                    //精灵学习力 <Adt><Adf><Apt><Apf><spd><hp>
                    var Adt = student.getElementsByTagName("Adt")[0].textContent;
                    var Adf = student.getElementsByTagName("Adf")[0].textContent;
                    var Apt = student.getElementsByTagName("Apt")[0].textContent;
                    var Apf = student.getElementsByTagName("Apf")[0].textContent;
                    var Spd = student.getElementsByTagName("Spd")[0].textContent;
                    var HP = student.getElementsByTagName("HP")[0].textContent;
                    var zzz = parseInt(Adt) + parseInt(Adf) + parseInt(Apt) + parseInt(Apf) + parseInt(Spd) + parseInt(HP)
                //精灵标识相关 巡礼部 20230718
                var pmlabel = student.getElementsByTagName("pmlabel")[0].textContent;
                

                

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
