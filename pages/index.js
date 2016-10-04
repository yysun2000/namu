	var pageName = "index.js";
	var sqlquery = "SELECT requestname,companyname,registername,isdone,companyworker,companytel,rdate,edate from supportcompany";
	var sqlquery2 = "SELECT worker as label, count(*) as value from supportcompany group by worker;";
	
	var allData = [//["id","id"],
				   ["requestname","요청자"],
				   ["companyname","고객사"],
				   ["registername","등록자"],
				   //["error","에러"],
				   //["result","결과"],
				   ["isdone","진행"],
				   ["companyworker","담당자"],
				   ["companytel","전화번호"],
				   ["rdate","등록일"],
				   ["edate","처리일"]];
	
	
	
	$(function(){ // 메인함수
		main();
	})
	
	// 페이지 레이아웃
	var Page = {
		leftContent : function(tree,width){
			left(tree,width);
			
		},
		rightContent : function(tree,width){
			tree.createLevel('div',{"style" : "float:left;width:"+width,"id":"rcontent"})
			branch.popup(tree,"Chart")
			tree.createLevel('div',{"id":"chart","style":"width:100%;text-align:center;"})
			tree.createLevel('svg',{"width":"500px","height":"500px","style":"margin:0px auto;text-align:center;"})
			tree.endLevelUntil('svg','')
			tree.endLevelUntil('div','')
			branch.popup(tree,"표")		
			tree.createLevel('div',{"style" : "height:100px;"})	
			tree.endLevelUntil('div','')
			tree.fruit.sendSQL(completeData,{sql:sqlquery});
			
			
			tree.endLevelUntil('div','')
		}
	}
	
	
	// 완료부분 
	function completeData(d){
		var dat = (eval(d));
		branch.Table.make("cTable",myTree,dat,"table table-striped table-bordered",allData);
		document.body.innerHTML = myTree.source;
		afterScript();
	}
	
	
	function chartData(d){
		var dat = (eval(d));
		for(var i in dat){
			dat[i]["value"] = dat[i]["value"] *1;
		}
		//afterScript();
		
		console.log(dat);
		nv.addGraph(function() {
		  var chart = nv.models.pieChart()
			  .x(function(d) { return d.label })
			  .y(function(d) { return d.value })
			  .showLabels(true)
			  .showLegend(false);        //Don't show tooltips;

			d3.select("#chart svg")
				.datum(exampleData())
				.transition().duration(350)
				.call(chart)

		  return chart;
		});
		function exampleData() {
		  return dat;
		}
		
	}
	
	// 스크립트
	function afterScript(){
		myTree.fruit.sendSQL(chartData,{sql:sqlquery2});
		$("#cTable").appendTo("#rcontent");
		$("#cTable").parent().css({padding:"20px"});
		$("#cTable").DataTable({});
		
		after();

	}

	


























