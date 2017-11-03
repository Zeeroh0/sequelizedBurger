
// Need an 2 onclick functions 
  // On click of the Submit Button...
    // Create new DB entry in the burgers table
    // get request to update list on the right 
  // Devour Button...
    // post request to change the devoured value for the corresponding burger
    // have area on left show that now eaten burger

// Bonus: 2 more on clicks
  // 3rd one for delete
  // 4th for reorder
  	// or build this into the devour button...just make it a toggle 




$(document).ready(function() {

	$(".orderForm").on("submit", function (event) {
		event.preventDefault();

		if ( $("#orderUp").val().length > 0) {
			let newburger = {
				burger_name: $("#orderUp").val().trim()
			};

			$.ajax(
				"/api/burgers",
				{
					type: "POST",
					data: newburger
				}
			).then( () => { location.reload() });

		} else {
			alert("Tell me what kind of burger you want first, THEN click submit.");
		}
	});


	$(".changeDevoured").on("click", function () {

		let thisID = $(this).data("id");

		if ( $(this).data("currdevourstate") === 0 ) {
			var newDevourState = {devoured: 1};
		} else {
			var newDevourState = {devoured: 0};
		}

		$.ajax(
			"/api/burgers/"+thisID,
			{
				type: "PUT",
				data: newDevourState
			}

		).then( () => { location.reload() });
	});


	$(".deleteBurger").on("click", function () {

		let thisID = $(this).data("id");

		console.log($(this).data("id"));

		$.ajax(
			"/api/burgers/"+thisID,
			{
				type: "DELETE",
			}

		).then( () => { location.reload() });
	});

});