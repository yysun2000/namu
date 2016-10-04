var myTree;

function createButton(caption,onclick,style){
	var s = style;
	if(s !== "undefined"){
		s ="height:30px; width: 50px; font-family: dotum; vertical-align:middle;";
	}
	myTree.createLevel('button',{  
								   "style" : s,
								   "onclick" : onclick})
	myTree.appendText(caption);
	myTree.popLevel();
}

$(function(){
	myTree = makeNamu("myTree");
	myTree.createLevel('body','')

	myTree.createLevel('div',{});
	myTree.createLevel('input',{   "id":"path",
								   "type" : "text",
								   "style" : "height:30px; width: 100px; font-family: dotum;",
								   "value" : ""})
	myTree.popLevel();
	createButton("edit","editClick()")
	createButton("save","saveClick()")
	myTree.popLevel();


	myTree.createLevel('textarea',{ "id":"result",
								   "name" : "result",
								   "class" : "form-control",
								   "style" : "width: 680px; height: 600px; font-family: dotum;",
								   "value" : ""})
	myTree.endLevelUntil('textarea','')
	myTree.endLevelUntil('body','')
	document.write(myTree.source);
})

function editClick(){	
	openPage($("#path").val(),myTree);
}
function saveClick(){	
	var param = {filename:$("#path").val(),data:$("#result")[0].value}
	savePage(param,myTree);
}

function openPage(filename,tree){
	tree.fruit.openpage(filename,putData);	
}


function savePage(data,tree){
	tree.fruit.savepage(data,success);	
}

function putData(text){
	var data = text.replace(/<br \/>/gi,"");
	$("textarea[name=result]").val(data);
}


function success(text){
	var url = $("#path").val().replace(".js",".html");
	window.open(url);
	
}