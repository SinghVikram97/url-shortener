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

            let heading='<h4 id="shortLink" class="mr-2" data-clipboard-target="#shortLink">'+shortUrl+'</h4>';
            let btn='<button id="copy" class="btn btn-lg animated" data-clipboard-target="#shortLink"><i class="fas fa-copy mr-2" ></i>Copy</button>';

            copyDiv.append(heading);
            copyDiv.append(btn);

        })

    });

    $(document).on('click','#copy',function(){

        let clipboard= new ClipboardJS('#copy');
        clipboard.on('success', function(e) {
           console.log('Text copied into clipboard is: <' + e.text + '>');
            e.clearSelection();
        });

    });

    $(document).on('click','#shortLink',function () {

        let clipboard= new ClipboardJS('#shortLink');
        clipboard.on('success', function(e) {
            console.log('Text copied into clipboard is: <' + e.text + '>');
            e.clearSelection();
        });

    });

    $(document).on('mouseenter','#copy', function (event) {

        $(this).toggleClass('pulse');

    }).on('mouseleave','.top-level',  function(){

        $(this).toggleClass('pulse');
    });


});