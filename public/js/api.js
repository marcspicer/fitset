$(document).ready(function(){
    $(".fitset-top-nav li a").on('click', function(){
        const activity_id = $(this).attr('data-id');
        $.ajax({
            url: '/get-class/'+activity_id,
            method: 'GET',
            success: function(res){
                console.log(res);
            }
        })
    });
})