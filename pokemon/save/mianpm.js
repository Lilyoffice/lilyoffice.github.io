window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "main.xml?ver=230722", true);//注意更新版本号
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