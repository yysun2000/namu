	var pageName = "edit2.js";
	var target;
	try{
		target = location.href.split("?")[1].split("=")[1];
	}catch(e){
		location.href="/namu/";
	}
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
			branch.popup(tree,"소스수정");
			branch.textarea(tree,"form-control","width:100%;height:600px;margin:10px;","code");
			branch.button(tree,"Save","btn","left","saveClick()","width:100%;margin:10px;");
			
			branch.popup(tree,"HTML변환");
			branch.textarea(tree,"form-control","width:100%;height:300px;margin:10px;","converttarget");
			branch.button(tree,"convert","btn","left","convertClick()","width:100%;margin:10px;");
			
			tree.createLevel('iframe',{"id":"convertor","style":"display:none;"});
			tree.endLevelUntil('iframe');
			tree.endLevelUntil('div','')
			
			
		}
	}
	
	function openPage(){
		myTree.fruit.openpage(target,putData);	
	}
	
	function putData(data){
		$("#code").text(data.replace(/<br \/>/gi,""));
	}
	function successdata(){
		location.href = target.replace(".js",".html");
	}
	function saveClick(){	
		var param = {filename:target,data:$("#code").val()}
		myTree.fruit.savepage(param,successdata);	
	}
	
	
	// 스크립트
	function afterScript(){
		openPage();
		after();
		$("#converttarget").val("");
	}
	
	function convertClick(){
	var code = code+ $("#converttarget").val();
	convertor.contentWindow.document.body.innerHTML = code;
	var frame = convertor.contentWindow.document;
	$("html",frame).find("*").each(function(){
	
		$(this,frame).contents().each(function(){
			if(this.nodeType == 3){
				$($(this,frame).parent()).attr("textdata",$(this,frame).text().trim());	
			}
		})
	
	})
	
	setTimeout(function(){
		myNamu = makeNamu("myTree",frame.body.innerHTML);
		$("#converttarget").val(myNamu.namuCmd);
	},500)
	
	}
	var myNamu
	


