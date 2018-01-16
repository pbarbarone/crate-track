console.log('file loaded');
$(document).ready(function(){
	$('.delete').submit(function(e){
		e.preventDefault();
		console.log("butt click");
		console.log($(this).attr('action'));
		$.ajax({
			url: $(this).attr('action'),
			method: 'DELETE'
		}).done(function(data){
			window.location.href='/profile';
		});
	}); 

}); 