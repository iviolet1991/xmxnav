/**
 * 
 */
 $(function(){
 
 		$("#full").click(init)
 		$("#search").click(function(){
 		
 			var n = $("#name").val()
 			console.log(n)
 		//	console.log(findname(n))
 			$("#name2").html(findname(n))
 		})
 		
 		function init(){
 			var tb=""
 			namelist.forEach(function(e,i){
 				tb+="<tr><td>"+e[0]+"<td/><td>"+e[1]+"<td/><tr/>"			
 			})
 			$("tbody").html(tb)
 		}
 		
 		function findname(n){
 			var nn=""
 			namelist.forEach(function(e,i){
 				if(n==e[0]){
 					nn= e[1]
 					
 				}else if(n==e[1]){
 					nn= e[0]
 					
 				}		
 			})
 			return nn
 		}
 })