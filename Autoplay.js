function calculate() {
			
			var coins = parseInt(document.getElementById("coins").value);
			var score = parseInt(document.getElementById("score").value);

			
			var luck = -10;
			var mins = 0.00435;
			var maxs = 0.00455;
			var box = 1;
			var ss = coins / score;
			
			for (var i = 0; i < 21; i++) {
			   

				
				if (ss >= mins && ss <= maxs && luck < 21) {
					
					document.getElementById("result").innerHTML = "您的幸运值为: " + luck;
					document.getElementById("box1").innerHTML = "您的无尽保底: " + box + "个宝箱";
					break;
				} else {
					
					luck++;
					mins += 0.0005;
					maxs += 0.0005;
				}
				if (luck==-9||luck==-6||luck==-3||luck==0||luck==3||luck==6||luck==9){
					box++;
				}
			}
			if (luck > 10){
				document.getElementById("result").innerHTML = "您提供的数据与后台数据不匹配" ;
				document.getElementById("box1").innerHTML = "请重新尝试，或者找月桂反馈" ;
			}
		}
		function clearInput() {
			document.getElementById("coins").value = "";
			document.getElementById("score").value = "";
			document.getElementById("result").innerHTML = "&nbsp;";
			document.getElementById("box1").innerHTML = "&nbsp;";
		}
