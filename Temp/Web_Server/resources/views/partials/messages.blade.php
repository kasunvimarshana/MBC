@if (session()->has('success'))
<script>
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Success',
        text: "{{ session()->get('success') }}",
        showConfirmButton: false,
        timer: 1500
    });
</script>
@endif


@if (session()->has('error'))
<script>
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error',
        text: "{{ session()->get('error') }}",
        showConfirmButton: false,
        timer: 1500
    });
</script>
@endif


@if (session()->has('warning'))
<script>
    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Warning',
        text: "{{ session()->get('warning') }}",
        showConfirmButton: false,
        timer: 1500
    });
</script>
@endif


@if (session()->has('info'))
<script>
    Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Info',
        text: "{{ session()->get('info') }}",
        showConfirmButton: false,
        timer: 1500
    });
</script>
@endif


@if ($errors->any())
<!-- div class="alert alert-danger">
	<button type="button" class="close" data-dismiss="alert">×</button>	
	Please check the form below for errors
</div -->
@endif