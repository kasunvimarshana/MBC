$((function(){$(".btn-destroy").on("click",(function(e){e.preventDefault(),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Swal.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showDenyButton:!0,showCancelButton:!1,confirmButtonColor:"#3085d6",confirmButtonText:"Yes, delete it!",denyButtonColor:"#d33",denyButtonText:"Cancel"}).then((function(n){n.isConfirmed?$.ajax({method:"GET",url:e,data:t}).done((function(e){console.log(e),Swal.fire("Deleted!","","success").then((function(){history.go(0)}))})):n.isDenied&&console.log("result.isDenied",n.isDenied)}))}($(this).attr("href"))}))}));