window.onload = function() {
    // 使用 AJAX 加载外部 XML 文件
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "main.xml", true);
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
                var naI = student.getElementsByTagName("natureI")[0].textContent;
                var naII = student.getElementsByTagName("natureII")[0].textContent;

                var row = tableBody.insertRow();
                row.insertCell().textContent = id;
                row.insertCell().textContent = name;
                row.insertCell().textContent = naI;
                row.insertCell().textContent = naII;
            }
        }
    };
    xhr.send();
};
