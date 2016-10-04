
$(document).ready(function(){
	
		$("html").find("*").each(function(){
	
		$(this).contents().each(function(){
			if(this.nodeType == 3){
				$($(this).parent()).attr("textdata",$(this).text().trim());	
			}
		})


	});
	
	
	setTimeout(function(){
		var myNamu = makeNamu("myTree",document.body.outerHTML);
		$("html").append("<div>"+myNamu+"</div>");
	},500)
	
})

