$(document).ready(function () {

    let btn=$('#submit');

    btn.click(function () {

        let url=$('#url').val();

        let getUrl='/new/'+url;

        console.log(getUrl);

        $.get(getUrl,function (data) {
            console.log(data);
        })

    })


});