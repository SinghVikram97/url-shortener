$(document).ready(function () {

    let btn=$('#submit');
    let shortLink=$('#shortLink');
    let copyDiv=$('#copyDiv');

    btn.click(function () {

        console.log('Hi');

        let url=$('#url').val();

        let getUrl='/new/'+url;

        console.log(getUrl);

        $.post(getUrl,function (data) {

            copyDiv.empty();

            let shortUrl=data.shorterUrl;

            shortUrl='http://localhost:4444/'+shortUrl;

            let heading='<h4 id="shortLink" class="mr-2">'+shortUrl+'</h4>';
            let btn='<button id="copy" class="btn btn-lg animated pulse"><i class="fas fa-copy mr-2" ></i>Copy</button>';

            copyDiv.append(heading);
            copyDiv.append(btn);

        })

    });



});