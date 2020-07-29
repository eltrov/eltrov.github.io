$( document ).ready(function() {
	
	$("#btnFish").click(function(){
	$("#fish").toggle();
	});

	$("#btnFish").click(function(){
	$(this).toggleClass("btnFishPressed");
	});


	$("#btnBugs").click(function(){
	alert("Bugs table coming soon...");
	//$("#bugs").toggle();
	});

	$("#btnBugs").click(function(){
	$(this).toggleClass("btnBugsPressed");
	});
				
});