$(document).ready(function () {

    let btn=$('#submit');
    let shortLink=$('#shortLink');

    btn.click(function () {

        let url=$('#url').val();

        let getUrl='/new/'+url;

        console.log(getUrl);

        $.post(getUrl,function (data) {

            let shortUrl=data.shorterUrl;

            shortUrl='http://localhost:4444/'+shortUrl;

            shortLink.html(shortUrl);

        })

    })


});