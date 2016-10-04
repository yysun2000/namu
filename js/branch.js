var branch = {
	Menu : {
		make : function(tree,param){
			this.tree = tree;
			this.param = param;
			this.layout();
		},
		
		layout:function(){
			this.tree.createLevel('div',{"class" : "navbar navbar-static-top navbar-inverse","id" : "top","role" : "banner","style" : "font-family: dotum;margin-bottom:0px;","textdata" : ""})
			this.tree.createLevel('div',{"class" : "container","style" : "font-family: dotum;","textdata" : ""})
			
			this.menuLeftButton(this.param[0][0],this.param[0][1]);

			this.tree.createLevel('nav',{"class" : "collapse navbar-collapse bs-navbar-collapse","style" : "font-family: dotum;","textdata" : ""})
			this.menuButtonGroup();
			
			this.menuRightButton(this.param[this.param.length-1][0],this.param[this.param.length-1][1]);
			this.tree.endLevelUntil('div','')
			this.tree.endLevelUntil('div','')
		},
		
		menuButtonGroup:function(){
			this.tree.createLevel('ul',{"class" : "nav navbar-nav","style" : "font-family: dotum;","textdata" : ""})
			for(i=1;i<this.param.length-1;i++){
				this.menuButton(this.param[i][0],this.param[i][1]);
			}
			this.tree.endLevelUntil('ul','')
			
		},
		menuButton:function(caption,link){
			this.tree.createLevel('li',{"style" : "font-family: dotum;","textdata" : ""})
			this.tree.createLevel('a',{"href" : link,"style" : "font-family: dotum;"})
			this.tree.appendText(caption)
			this.tree.endLevelUntil('li','')
		},

		menuLeftButton:function(text,link){
			this.tree.createLevel('div',{"class" : "navbar-header","style" : "font-family: dotum;","textdata" : ""})
			this.tree.createLevel('a',{"href" :link,"class" : "navbar-brand","style" : "font-family: dotum;","textdata" : "기술지원"})
			this.tree.appendText(text)
			this.tree.endLevelUntil('div','')
		},
		
		menuRightButton:function(text,link){	
			this.tree.createLevel('ul',{"class" : "nav navbar-nav navbar-right","style" : "font-family: dotum;","textdata" : ""})
			this.tree.createLevel('li',{"style" : "font-family: dotum;","textdata" : ""})
			this.tree.createLevel('a',{"href" : link,"style" : "font-family: dotum;","textdata" : "고객지원"})
			this.tree.appendText(text)
			this.tree.endLevelUntil('ul','')
		}
	},
	Layout :{
		make: function(tree,width1,width2,page1,page2){
			this.tree = tree;
			this.tree.createLevel('div',{"style" : "width:100%;height:100%"})
			this.left(page1,width1);
			this.right(page2,width2);
			this.tree.endLevelUntil('div','')
			console.log("DONE!");
		},
		left : function(page1,width){
			page1(this.tree,width)
			
		},
		right : function(page2,width){
			page2(this.tree,width)
			
		}
		
	},
	Table :{
		
		
		make:function(id,tree,dat,cls,array){
		
			var targetData = array;
			tree.createLevel("table",{"id":id,"class":cls});
			
			var makeHeader = function(tree){			
				tree.createLevel("thead",{});
				tree.createLevel("tr",{});	
				for(var k in targetData){
					tree.appendLevel("th",{},targetData[k][1]);	
				}
				//tree.popLevel();
				tree.endLevelUntil("thead");
			}
			
			var makeBody = function(tree){
				tree.createLevel("tbody",{});
				for(var i in dat){
				tree.createLevel("tr",{});
					for (var j in dat[i]){
						var flag = 0;
						for(var k in targetData){
							if(j == targetData[k][0]){
								flag = 1;
							}
						}
						if(flag == 1){
							tree.appendLevel("td",{},dat[i][j]);	
						}
					}
				tree.endLevelUntil("tr");
				}
				tree.popLevel();
			}
		
			makeHeader(tree);
			makeBody(tree);
			tree.endLevelUntil("table");
		}
	},
	image:function(tree,src,cls,align){
		
		tree.createLevel("div",{"style":"margin:0px auto;text-align:"+align+";","class":cls});
		tree.appendLevel("img",{"src":src},"");
		tree.popLevel();
	},
	label:function(tree,text,cls,align,id){
		
		tree.createLevel("div",{"id":id,"style":"margin:0px auto;text-align:"+align+";","class":cls});
		tree.appendLevel("span",{"style":""},text);
		tree.popLevel();
	},
	popup : function(tree,text){
		tree.createLevel('div',{"class" : "alert alert-info","style" : "width:100%;margin:10px auto;float:left;margin-left:10px;","textdata" : ""})
		tree.createLevel('div',{"class" : "popupstyle"})
		tree.createLevel('span','')
		tree.createLevel('b',{"textdata" : "접수자 정보"})
		tree.appendText(text)
		tree.endLevelUntil('b','')
		tree.endLevelUntil('span','')
		tree.endLevelUntil('div','')
		tree.endLevelUntil('div','')
	},
	inputBox : function(tree,caption,name){
		tree.createLevel('ul',{"textdata" : ""})
		tree.createLevel('li',{"textdata" : "접수자"})
		tree.appendText(caption)
		tree.endLevelUntil('li','')
		tree.createLevel('li','')
		tree.createLevel('input',{"id" : name,"type" : "input","class" : "form-control"})
		tree.endLevelUntil('li','')
		tree.endLevelUntil('ul','')
	},
	button:function(tree,text,cls,align,onclick,style){
		if(style !== undefined){
			tree.createLevel("div",{"style":style});
		}else{
			tree.createLevel("div",{"style":"text-align:"+align+";"});
		}
		tree.appendLevel("button",{"class":cls,"onclick":onclick},text);
		tree.popLevel();
	},
	textarea:function(tree,cls,style,id){
		tree.createLevel("div",{});
		tree.appendLevel("textarea",{"id":id,"class":cls,"style":style});
		tree.popLevel();	
	}

}