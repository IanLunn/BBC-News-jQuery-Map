//FUNCTION FOR SELECTING ALL CHECKBOXES IN A REGION
function selectall(area){
	$('.'+area+'-t input').attr('checked', true);
}

//FUNCTION FOR SDEELECTING ALL CHECKBOXES IN A REGION
function deselectall(area){
	$('.'+area+'-t input').attr('checked', false);
}

//FUNCTION FOR COUNTING HOW MANY AREAS HAVE BEEN CHECKED IN A REGION
function countchecks(areas)
{
	numchecked = 0; //set up the variable that contains the number of checked boxes
	$('.'+areas + '-t input').each( //for each <input class="checkbox"> in an area list...
		function() { 
			if(this.checked == true){ //if the checkbox is checked...
				numchecked++; //add 1 to the number of checkboxes checked
			}
		}

	);
		if(numchecked != 0){ //if the number of areas checked is not 0...
			$('.'+areas+'-n').html("("+numchecked+")"); //change the region in the list to show how many areas were seleced 
		}else{ //else if there aren't any selected areas
			$('.'+areas+'-n').html(""); //change the number of areas selected in the region list so it appears blank (rather than a messy looking (0))
		}
}

$(document).ready(function(){
	
	//this function hides each <div class="counties-container"> and is called onload and when the user selects a region
	function hideall(){ 
		$('.counties-container').css("display","none");
	}

	//ONLOAD - these several lines are used to help with graceful degradation (when the user doesn't have JavaScript enabled)
	hideall(); //initiate the hideall function
	$('#st-c').css("display","block"); //show the start up div with the explanation of how to start using the form
	$('.select').css("display","block"); //shows the select all/deselect all links (that only work with JavaScript enabled)
	$('#regions').css("display","block"); //show the list of selectable regions

		
	//DOUBLE CLICK HANDLER
	$('.nw, .ne, .yl, .wm, .em, .sw, .e, .s, .se, .scot, .ni, .w').dblclick( //double click listener
		function () {
			var area = ($(this).attr("class")); //get the class of the element that is being double clicked
			$('.'+area+'-t input').each( //for each <input class="checkbox"> in an area list...
				function() {
					ischecked = this.checked; //check if it's checked
				}
			);	
			if(ischecked == false){ //if not checked...
				selectall(area); //select all checkboxes
				countchecks(area); //count all checkboxes and update
			}else{ //else
				deselectall(area); //deselect all checkboxes
				countchecks(area); //count all checkboxes and update
			}
	
		}
	);


	//HOVER EFFECTS
	$('area, #regions li').hover( //hover listener
	
		function() { //if the user hovers over an <area> element or a <li> in <ul class="regions">...
			var area = ($(this).attr("class")); //get the class of the element the mouse is hovering over
			$('#map').attr("src","images/map-"+ area +"-mo.gif");  //change the image of the <area> to the mouseover version
			$('.'+area).css("background-color","#3c3e52") //change the background color of the corresponding area in the list
		;},
		
		function() { //if the mouse leaves an <area> element or a <li> in <ul class="regions">...
			var area = ($(this).attr("class")); //get the class of the element the mouse is leaving
			$('#map').attr("src","images/map.gif"); //change the image of the <area> back to default
			$('.'+area).css("background-color","#262835"); //change the background color of the corresponding area in the list back to default
			}
	)


	//SHOW/HIDE AREA PANELS
	$('area, #regions li').click(  //click listener
		function() {
			var area = ($(this).attr("class")); //get the class of the element that has been clicked
			hideall(); //initate the hideall function (hide all area panels)
			$('#' + area).css("display","block"); //show the area panel for the area that has been clicked	
		}
	)
	
	
	$('input, .selectall, .deselectall').click(  //click listener
		function() {
			var area = $(this).parents(".counties-container").attr("id"); //get the region being clicked
			if(this.className == "selectall"){
				selectall(area);
			}
			if(this.className == "deselectall"){
				deselectall(area);
			}
			countchecks(area); //count all checkboxes and update

		}
	)

});