'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);
	var projectURL = "/project/" + idNumber;
 	$.get(projectURL, callback);
 	console.log("URL that I am calling is " + projectURL);
}

function callback(response) {
	console.log("Response is " + response);

	var projectHTML = '<img src = "' + response.image + '" class=detailsImage>' +
					  '<h4>' + response.title + '</h4>' + 
					  '<p>' + response.date + '</p>' + 
					  response.summary; 

	$("div#project" + response.id + " div.details").html(projectHTML);
/*	var idNumber = result.id;
	var detailsSelector = "div#project" + idNumber + " div.details";

	var htmlInsert = 
		'<img src="' + result.image + '" class="detailsImage">' +
		'<h3>' + result.title + '</h3>' +
		'<p><small>' + result.date + '</small></p>' +
		'<p>' + result.summary + '</p>';

	//result.id. result.title, result.date, result.summary, result.image
	//include image, small header with date, and summary
	//Give the image the class detailsImage

	$(detailsSelector).html(htmlInsert);*/

}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette", callbackPalette);
}

function callbackPalette(response) {
	var colors = response.colors.hex; 
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}