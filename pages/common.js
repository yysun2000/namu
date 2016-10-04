	var myTree;
	
	function main(){	
	    myTree = makeNamu("myTree");
		branch.Menu.make(myTree,[["기술지원","index.html"],["접수하기","reg.html"],["미완료건",""],["완료건",""],["수정","edit2.html?page="+pageName]]);
		branch.Layout.make(myTree,"15%","85%",Page.leftContent,Page.rightContent);
	}
	
	function settingUser(data){
		if(data == "" || data == undefined) location.href="login.html";
		$("#userid").text(data+"님")
	}
	function lg(data){
		location.href="login.html";
	}
	
	function esuccess(data){
		location.href = "index.html";
	}
	
	function left(tree,width){
		tree.createLevel("div",{"style":"float:left;height:100%;background-color:#778899;padding-top:30px;width:"+width});
//		tree.createLevel("span",{"id":})
		branch.label(tree,"님","","center","userid");
		
		branch.image(tree,"image/tree.png","","center");
		branch.label(tree,"로그아웃","","center","logout");
		tree.endLevelUntil("div");
	}
	
	function after(){
		$("body").css("height","100%");
		$("html").css("height",$("html").height());
		
		myTree.fruit.getSession("userid",settingUser);
		$("#logout").css("cursor","pointer");
		$("#logout").attr("onclick","myTree.fruit.destorySession(lg)");
	}