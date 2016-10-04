	var myTree;

	function check_values() {
		if ($("#username").val().length != 0 && $("#password").val().length != 0) {
			$("#button1").removeClass("hidden").animate({ left: '250px' });;
			$("#lock1").css("display","none");
			$("#lock1").addClass("hidden").animate({ left: '250px' });;
		}
		
	}

	function login(){
		var user = $("#username").val();
		var pass = $("#password").val();
		myTree.fruit.sendSQL(success,{sql:"SELECT userid,passwd from user where userid='"+user+"' and passwd='"+pass+"'"});
	}

	function success(data){
		var dat = eval(data);
		if(dat.length > 0){
			myTree.fruit.setSession("userid",dat[0]["userid"]);
			location.href="index.html";
		}
	}
	
	
	$(function(){
		myTree = makeNaum("myTree")
		
		myTree.createLevel('div',{"class" : "container","textdata" : ""})
		myTree.createLevel('div',{"class" : "row colored","textdata" : ""})
		myTree.createLevel('div',{"id" : "contentdiv","class" : "contcustom","textdata" : ""})
		myTree.createLevel('span',{"class" : "fa fa-spinner bigicon"})
		myTree.endLevelUntil('span','')
		myTree.createLevel('h2',{"textdata" : "Login"})
		myTree.appendText('"Login"')
		myTree.endLevelUntil('h2','')
		myTree.createLevel('div',{"textdata" : ""})
		myTree.createLevel('input',{"id" : "username","type" : "text","placeholder" : "username","onkeypress" : "check_values();"})
		myTree.createLevel('input',{"id" : "password","type" : "password","placeholder" : "password","onkeypress" : "check_values();"})
		myTree.createLevel('button',{"id" : "button1","onclick":"login()","class" : "btn btn-default wide hidden"})
		myTree.createLevel('span',{"class" : "fa fa-check med"})
		myTree.endLevelUntil('span','')
		myTree.endLevelUntil('button','')
		myTree.createLevel('span',{"id" : "lock1","class" : "fa fa-lock medhidden redborder"})
		myTree.endLevelUntil('span','')
		myTree.endLevelUntil('div','')
		myTree.createLevel('div',{"textdata" : ""})
		myTree.createLevel('br','')
		myTree.createLevel('p',{"textdata" : ""})
		myTree.createLevel('a',{"class" : "btn btn-link","textdata" : "Passwort vergessen ?"})
		myTree.appendText('"Passwort vergessen ?"')
		myTree.endLevelUntil('a','')
		myTree.endLevelUntil('p','')
		myTree.endLevelUntil('div','')
		myTree.endLevelUntil('div','')
		myTree.endLevelUntil('div','')
		myTree.endLevelUntil('div','')

		
		document.body.innerHTML = myTree.source;
		
	})