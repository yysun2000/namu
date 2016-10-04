	var pageName = "reg.js";
	var allData = ["registername","requestname","companyname","companyworker","companytel","error","rdate"];
	$(function(){ // 메인함수
		main();
		document.body.innerHTML = myTree.source;
		afterScript();
	})
	// 페이지 레이아웃
	var Page = {
		leftContent : function(tree,width){
			left(tree,width);
		},
		rightContent : function(tree,width){
			tree.createLevel('div',{"style" : "float:left;width:"+width,"id":"rcontent"})
			tree.createLevel('div',{"class" : "li_table","style" : "width:100%;margin:0 auto;padding:10 30 10 10","textdata" : ""})
			branch.popup(tree,"접수자 정보");
			branch.inputBox(tree,"접수자","registername");
			branch.popup(tree,"요청자 정보");
			branch.inputBox(tree,"요청자","requestname");
			branch.popup(tree,"고객 정보");
			branch.inputBox(tree,"고객사","companyname");
			branch.inputBox(tree,"담당자","companyworker");
			branch.inputBox(tree,"전화번호","companytel");
			branch.popup(tree,"요청 정보");
			branch.inputBox(tree,"요청내용","error");
			tree.createLevel('ul',{});
			tree.createLevel('li',{"style":"padding-left:20px;padding-top:50px;"})
			branch.button(tree,"접수하기","btn btn-default","left","insert()");
			tree.endLevelUntil('li','') // END
			tree.endLevelUntil('ul','') // END
			tree.endLevelUntil('div','') // END
			tree.endLevelUntil('div','')
		}
	}
	function insert(){
		myTree.fruit.sendInsertSQL("supportcompany",allData,esuccess);
	}
	function afterScript(){
		after();
	}