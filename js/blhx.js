/**
 * 
 */
 
  $(function(){
 	
 	var  option = {
				  title: {
				    text: '老婆'
				  },
				  tooltip: {
				    trigger: 'axis'
				  },
				  legend: {
				    show:false
				  },
				  grid: {
				    left: '3%',
				    right: '4%',
				    bottom: '3%',
				    containLabel: true
				  },
				  toolbox: {
				    feature: {
				      saveAsImage: {}
				    }
				  },
				  xAxis: {
				    type: 'value'
				    
				  },
				  yAxis: {
				    type: 'category'
				  },
				  series: []
				};
 	$("#creat").click(function(){
 		
 		var value = $("#name").val()
 		switch(value){
 			case "hm0": creatHm(0);
 			break;
 			case "hm1": creatHm(1);
 			break;
 			case "hm2": creatHm(2);
 			break;
 			case "huayuan":tongyong("花园");
 			break;
 			case "huteng1":tongyong("胡腾旗舰");
 			break;
 			case "huteng2":huteng("胡腾僚舰");
 			break;
 			case "dadi":dadi("大帝");
 			break;
 			case "qianwei":tongyong("前卫");
 			break;
 			case "yueke":tongyong("二哥");
 			break;
 			case "wuzang":tongyong("武藏");
 			break;
 			case "shahei":tongyong("傻黑");
 			break;
 			case "bosimao":tongyong("波斯猫");
 			break;
 			case "qiershazhi":tongyong("奇尔沙治");
 			break;
 			case "sumengmeng":tongyong("苏萌萌");
 			break;
 			case "aersasi":tongyong("阿尔萨斯");
 			break;
			case "lafeier":tongyong("拉斐尔");
			break;
 			case "other":tongyong($("#lp").val());
 			break;
 		}
 	})
 	$("#clear").click(function(){
 		
 		option.series=[]
 		setChart(option)
 	})
 	$("#name").change(function(){
 		var zt = $("#name option:selected").data("zt")
 		var jnzt = $("#name option:selected").data("jnzt")
 		if(zt){
	 		$("#zt").val(zt)
 		}
 		if(jnzt || jnzt==0){
 			$("#jnzt").val(jnzt)
 		}
 	})
 	/**
 	 * 生成图表
 	 */
 	function setChart(option){
 		var myChart = echarts.init(document.getElementById('chart'));
 		myChart.setOption(option,true);
 	}
 	
 	/**
 	 * 创建数据序列
 	 */
 	function checkSeries(name){
 		var series=option.series
 		series.forEach(function(e,i){
 			if(name==e.name){
 				return true
 			}else{
 				return false}
 		})
 	}
 	
 	/**
 	 * 创建海妈轴
 	 */
 	function creatHm(n){
 		var data=[
	 		[[16,"海马16"],[36,"海马16"],[56,"海马16"],[76,"海马16"],[96,"海马16"]],
	 		[[20,"海马20"],[40,"海马20"],[60,"海马20"],[80,"海马20"],[100,"海马20"]],
	 		[[15,"黑海马15"],[30,"黑海马15"],[45,"黑海马15"],[60,"黑海马15"],[75,"黑海马15"],[90,"黑海马15"]]
 		]
 		var series={
	 			type: 'line',
	 			name:"hm"+n,
		      	smooth: true,
		      	label:{show:true},
		      	data: data[n]
	 		}
	 	option.series.push(series)
	 	setChart(option)
 	}
 	/**
 	 * 大帝
 	 */
 	function dadi(name){
 		
 		var zt=parseFloat($("#zt").val())
 		var kjzt=parseFloat($("#kjzt").val())
 		var jnzt=parseFloat($("#jnzt").val())
 		var ss=parseFloat($("#ss").val())
 		var jhk = $(".jhk:checked").val()
 		var data=[]
 		name = name+"_"+$("#ss option:selected").text()+"_"+"金火控"+jhk
 		zt = zt+kjzt
		zt = zt*(1+jnzt/100)+100
 		var ss1=ss * Math.sqrt(200/zt)
 		ss1= parseInt(ss1*1000)
 		ss1 = ss1/1000
 		console.log(ss1)
 		var zt2 = zt*(1+(jnzt+50)/100)+100
 		var ss2 = ss * Math.sqrt(200/zt2)
 		ss2= parseInt(ss2*1000)
 		ss2 = ss2/1000
 		console.log(ss2)
 		var  fss= 0
 		var i=1
 		while(fss<=100&&i<=20){
 			if(i%2==0){
 				fss+=ss2
 			}else{
 				if(i==1 && jhk == "yes"){
 					fss+=ss1*0.85
 				}else{
	 				fss+=ss1
 				}
 			}
 			data.push([parseInt(fss*1000)/1000,name])
 			
 			i++
 		}
 		var series={
	 			type: 'line',
	 			name:name,
		      	smooth: true,
		      	label:{show:true},
		      	data: data
	 		}
	 	option.series.push(series)
	 	setChart(option)
 	}
 	/**
 	 * 虎腾
 	 */
 	function huteng(name){
 		var zt=parseFloat($("#zt").val())
 		var kjzt=parseFloat($("#kjzt").val())
 		var jnzt=parseFloat($("#jnzt").val())
 		var ss=parseFloat($("#ss").val())
 		var jhk = $(".jhk:checked").val()
 		var data=[]
 		name = name+"_"+$("#ss option:selected").text()+"_"+"金火控"+jhk
 		zt = zt+kjzt
 		zt = zt*(1+jnzt/100)+100
 		ss=ss * Math.sqrt(200/zt)
 		ss= parseInt(ss*1000)
 		ss = ss/1000/2
 		
 		var dss=ss
 		if(jhk=="yes"){
 			ss = ss * 0.85
 			console.log(jhk)
 		}
 		var i=1
 		while(ss<=100&&i<=20){
 			data.push([parseInt(ss*1000)/1000,name])
 			ss+=dss
 			i++
 		}
 		var series={
	 			type: 'line',
	 			name:name,
		      	smooth: true,
		      	label:{show:true},
		      	data: data
	 		}
	 	option.series.push(series)
	 	setChart(option)
 	}
 	
 	/**
 	 * 通用战列
 	 */
 	function tongyong(name){
 		var zt=parseFloat($("#zt").val())
 		var kjzt=parseFloat($("#kjzt").val())
 		var jnzt=parseFloat($("#jnzt").val())
 		var ss=parseFloat($("#ss").val())
 		var jhk = $(".jhk:checked").val()
 		var data=[]
 		name = name+"_"+$("#ss option:selected").text()+"_"+"金火控"+jhk
 		zt = zt+kjzt
 		console.log(zt)
 		zt = zt*(1+jnzt/100)+100
 		console.log(zt)
 		ss=ss * Math.sqrt(200/zt)
 		ss= parseInt(ss*1000)
 		ss = ss/1000
 		var dss=ss
 		console.log(ss)
 		if(jhk=="yes"){
 			ss = ss * 0.85
 			console.log(jhk)
 		}
 		var i=1
 		while(ss<=100&&i<=20){
 			data.push([parseInt(ss*1000)/1000,name])
 			ss+=dss
 			i++
 		}
 		var series={
	 			type: 'line',
	 			name:name,
		      	smooth: true,
		      	label:{show:true},
		      	data: data
	 		}
	 	option.series.push(series)
	 	setChart(option)
 	}
 })