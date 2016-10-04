//
// Namu.js
// 
// 작성자 : 유영선
// 용도 : DOM Tree를 자바스크립트 메서드로써 구현하기 위한 것임.

var makeNamu = function(name,source){
	// 작성자 : 유영선
	// 함수설명 : Namu를 만들기 위한 코드이다. name은 Namu를 구분하기 위한 key값이다.
	// 입력값 : name(String)
	// 예 : var exampleTree = makeNamu("exampleTree");
	
	this.mytree = new Array;
	this.namuCmd = "";
	
	this.namu = {
		init : function(tree,name){ 
			// 작성자 : 유영선
			// 함수설명 : 트리를 만드는 코드이다. makeNamu에서 Tree를 생성했다면 다시 사용할 필요가 없다.
			// 입력값 : tree(Array),name(String)
			// 예 : exampleTree.init(DOMTree,"MyTree");
			
			this.tree = tree;
			this.treeName = name;
			this.source = "";
			this.attrList = new Array;

		},
		setAttribute : function(name,json){
			// 작성자 : 유영선
			// 함수설명 : 요소(Element)의 속성(Atrribute)를 JSON으로 저장한다. name(String)은 해당 JSON을 검색하기 위해서 만들어졌다.
			// 입력값 : name(String), json(Object)
			// 예 : exampleTree.setAttribute("firstAttribute",{"id":"test","style":{"display":"none","height":"100px"}});
			this.attrList.push({"name":name,"json":json});
		},
		getAttribute : function(name,result){
			// 작성자 : 유영선
			// 함수설명 : 요소의 속성을 검색하여 JSON으로 반환한다.
			// 입력값 : name(String)
			// 예 : exampleTree.getAttribute("firstAttribute")
			//var result = "";
			
			for(var i in this.attrList){
				var elem = this.attrList[i]["name"];
				if(elem == name){
					result = this.attrList[i]["json"];
				}
			}
			return result;
		},
		createStyleCode : function(selector,json){
			this.source += selector + "{"+this.convertJSONToStyle(json)+"}\n"
		},
		convertJSONToAttribute : function(json,inputJson,temp){
			// 작성자 : 유영선
			// 함수설명 : JSON 를 Attribute 형태의 String으로 변환한다. 내부함수이므로 참고하길 바란다.
			// 입력값 : json(Object)
			
			inputJson = json;
			temp = "";
			for(var i in inputJson){
				  var key = i;
				  var value = eval("inputJson['"+i+"']");
				  if(typeof value == "object"){
					  value = this.convertJSONToStyle(value);
				  }
				  temp += (key+"=\""+ value+"\" ");
			}
			return temp;
		},
		convertJSONToStyle : function(json,inputJson,temp){
		// 작성자 : 유영선
		// 함수설명 : JSON 를 Style 형태의 String으로 변환한다. 내부함수이므로 참고하길 바란다.
		// 입력값 : json(Object)
			
			inputJson = json;
			temp = "";
			for(var i in inputJson){
				  var key = i;
				  var value = eval("inputJson['"+i+"']");
				  temp += (key+":"+ value+";");
			}
			return temp;
		},
		appendData : function(data){
		// 작성자 : 유영선
		// 함수설명 : text 형태로 소스를 직접 수정하는 함수이다. 이 함수를 사용하면 endLevelUntil 및 popLevel이 제대로 안되므로 사용을 권하지 않는다. DOM Tree가 팁痴?않는 선에서 사용하기를 추천한다.
		// 입력값 : json(Object)
		// 예 : exampleTree.appendData("<div>TEST</div>");
			
			this.source += data;
		},
		createLevel : function(element,json,result){
		// 작성자 : 유영선
		// 함수설명 : 요소를 추가하는 함수이다. endLevelUntil이나 popLevel을 만나지 않고 연속적으로 사용하면 먼저 추가했던 요소의 자식으로 선언된다. 요소에 속성이 필요 없다고 빈값으로 놔둔다.
		// 입력값 : element(string), json(Object)
		// 예 : exampleTree.createLevel("div",exampleTree.getAttribute("firstAttribute"));
		
		  result = "";

		  this.tree.push(element);
		  //console.log("[PUSH] create Tree : "+tree);
		  result += "<"+element+" "+this.convertJSONToAttribute(json)+">\n";
		  this.appendData(result);
		},

		popLevel : function(temp){
		// 작성자 : 유영선
		// 함수설명 : createLevel에서 선언한 요소를 닫는 함수이다. 한개의 단계에 대해서만 닫는 것을 진행한다.
		// 입력값 : 없음
		// 예 : exampleTree.popLevel() ==> <test></test>
		  temp = this.tree.pop();
		  //console.log("[POP] after Tree : "+temp);
		  this.appendData("</" + temp + ">\n");
		},

		endLevelUntil : function(tag,temp,result){
		// 작성자 : 유영선
		// 함수설명 : 요소를 닫는 함수이다. 해당 tag를 만날때까지 닫는다.
		// 입력값 : tag(string)
		// 예 : exampleTree.endLevelUntil("body");
		
		  temp = this.tree.pop();
		  result = "";
		  while(temp != tag){
			result += "</" + temp + ">\n";
			temp = this.tree.pop();
		  }
		  result += "</" + temp + ">\n";

		  this.appendData(result);
		},

		appendLevel : function(element,json,value,temp){
		// 작성자 : 유영선
		// 함수설명 : 요소를 추가하는 함수이다. 단말노드를 추가할때 사용한다. 요소에 속성이나, 값(value)이 필요 없다면 빈값으로 놔둔다.
		// 입력값 : element(string), json(Object), value(string)
		// 예 : exampleTree.createLevel("div",exampleTree.getAttribute("firstAttribute"),"안녕하세요");

		  temp = "";
		  if(element != "")  temp = "<"+element+" "+this.convertJSONToAttribute(json)+">";
		  temp += value;
		  if(element != "")  temp += "</"+element+">\n";

		  this.appendData(temp);


		},
		appendText : function(text){
			// 작성자 : 유영선
			// 함수설명 : text 형태로 소스를 직접 수정하는 함수이다. 이 함수를 사용하면 endLevelUntil 및 popLevel이 제대로 안되므로 사용을 권하지 않는다. DOM Tree가 영향을 받지 않는 선에서 사용하기를 추천한다.
			// 입력값 : json(Object)
			// 예 : exampleTree.appendText("<div>TEST</div>");
		  this.appendData(text);
		},

		completeTree :  function(tree,temp){
		  temp = "";
		  while(this.tree.length > 0){
			var closeElement = this.tree.pop();
			temp += "</" + closeElement + ">\n";
		  }
		  this.appendData(temp);
		},
		htmlToNamu : function(name,source){
		var treeName = name;
		var myString = "";
		function inputData(data){
			myString += data+"\n";
		}
		gtree = (this.htmlToJson(source));
		//inputData("this.namu.init(this.mytree,"+treeName+")");
		gtree.forEach(function(data){
			var attrData = "{";
			var textData = "";
			for(var i in data){
				if(i=="textdata"){
					textData = data[i];
				}
				if(i=="tagName"){
					attrData = attrData.substring(0,attrData.length-1);
					attrData += "}";
					if(data[i].indexOf("/") < 0){
						inputData(treeName+".createLevel('"+data[i]+"',"+attrData+")")
						if(textData != "" && textData != "\"\""){
							inputData(treeName+".appendText('"+textData+"')");	
						}
					}else{
						inputData(treeName+".endLevelUntil('"+data[i].substring(1,data[i].length)+"','')")
					}
				}else{
					attrData += "\""+i+"\" : "+data[i]+","
				}
			}
		})
	return myString.replace(",})",",'')");
	},
	
	htmlToJson : function(htmlsource){
		var htmlText = htmlsource;
		var testtree = [];
		var AllElements = htmlText.match(/([<][^>]*[>])/gi);
	//	console.log(AllElements);
		
		for(i in AllElements){
			var tagName = "";
			var HtmlElement = new Object();
			
			var leaf = AllElements[i].match(/\S*=[\"][^\"]*[\"]/gi);
			var branch = AllElements[i].match(/[<][^\s]+/gi)[0].replace("<","").replace(">","");
		
			//console.log(leaf);
			for(i in leaf){
				var halfLeaf = leaf[i].split("=");
				var key = halfLeaf[0];
				var value = halfLeaf[1];
				HtmlElement[key] = value;
				
			}
			HtmlElement["tagName"] = branch;
			testtree.push(HtmlElement);
				
			
		}
		return testtree;
	},
	fruit : {
		
		sendSQL : function(ret,sql){
			$.ajax({
             
            type : "POST",
            url : "fruit/php/dbcmd.php",
            data : sql,
            error : function(){
                console.log('No!!');
            },
            success : function(data){
				console.log("DB SUCCESS! :"+sql["sql"]);
				if(sql["sql"].indexOf("SELECT") !== -1){
					//console.log(data);
				}else{
					//console.log(data);
				}
                ret(data);
                //$("#dataArea").html(data) ;
            }
             
        });
		},
		setSession : function(key,value){
			$.ajax({
             
            type : "GET",
            url : "fruit/php/setsession.php?key="+key+"&value="+value,
            error : function(){
                console.log('No!!');
            },
            success : function(data){
					console.log(data);
            }
             
        });
		},
		getSession : function(key,ret){
			$.ajax({
             
            type : "GET",
            url : "fruit/php/getsession.php?key="+key,
            error : function(){
                console.log('No!!');
            },
            success : function(data){
					ret(data);
            }
             
        });
		},
		startSession : function(){
			$.ajax({
             
            type : "POST",
            url : "fruit/php/startsession.php", 
            error : function(){
                console.log('No!!');
            },
            success : function(data){
					console.log(data);
            }
             
        });
		},
		destorySession : function(ret){
			$.ajax({
             
            type : "POST",
            url : "fruit/php/destorysession.php", 
            error : function(){
                console.log('No!!');
            },
            success : function(data){
					ret(data);
            }
             
        });
		},
		openpage : function(filename,callback){
			$.ajax({
             
            type : "GET",
            url : "fruit/php/openpage.php?filename="+filename, 
            error : function(){
                console.log('No!!');
            },
            success : function(data){
					callback(data);
            }
             
        });
		},
		savepage : function(dat,callback){
			$.ajax({
             
            type : "POST",
            data : dat,
            url : "fruit/php/savepage.php", 
            error : function(){
                console.log('No!!');
            },
            success : function(data){
					callback(data);
            }
             
        });
		},
		sendInsertSQL : function(table,record,ret){
	
			function gV(target){
				return $("#"+target).val();
			}	
			function cutLastone(data){
				return data.substring(0,data.length-1);
			}
			
			var sqlquery = "INSERT INTO "+table+"(";
			
			for(var i in record){
				sqlquery += record[i]+",";
			}
			sqlquery = cutLastone(sqlquery);
			sqlquery += ") VALUES(";
			
			for(var i in record){
				if(record[i].indexOf("rdate") > -1){
					sqlquery += "NOW(),"; // 예외 추가함
				}else{
					sqlquery += "'"+gV(record[i])+"',";
				}
			}
			sqlquery = cutLastone(sqlquery);
			sqlquery += ")";
			
			this.sendSQL(ret,{"sql":sqlquery});
		}
	}
	}
	
	
	
	
	this.namu.init(this.mytree,name);
	if(source != undefined && source != ""){
		this.namu.namuCmd = this.namu.htmlToNamu(name,source);
		console.log(this.namu.namuCmd);
	}
	return this.namu;
}