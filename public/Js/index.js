$(document).ready(function () {

    let btn=$('#submit');
    let shortLink=$('#shortLink');
    let copyDiv=$('#copyDiv');
    let copymsgDiv=$('#copymsgDiv');
    let copymsgRow=$('#copymsgRow');
    let clipboard1;
    let clipboard2;

    btn.click(function () {

        console.log('Hi');

        let url=$('#url').val();

        let getUrl='/new/'+url;

        console.log(getUrl);

        $.post(getUrl,function (data) {

            copyDiv.empty();

            let shortUrl=data.shorterUrl;

            shortUrl='https://dat-short.herokuapp.com/'+shortUrl;

            let heading='<h4 id="shortLink" class="mr-2 ml-2" data-clipboard-target="#shortLink">'+shortUrl+'</h4>';
            let btn='<button id="copy" class="btn btn-lg animated" data-clipboard-target="#shortLink"><i class="fas fa-copy mr-2" ></i>Copy</button>';

            copyDiv.append(heading);
            copyDiv.append(btn);

            clipboard1= new ClipboardJS('#copy');
            clipboard2= new ClipboardJS('#shortLink');


            clipboard1.on('success', function(e) {
                console.log('Text copied into clipboard is: <' + e.text + '>');
                e.clearSelection();
            });

            clipboard2.on('success', function(e) {
                console.log('Text copied into clipboard is: <' + e.text + '>');
                e.clearSelection();
            });

        })

    });


    $(document).on('click','#copy',function(){


          copymsgRow.css('display','');

          copymsgDiv.empty();


          let span='<span id="copymsg">Copied to clipboard</span>';

          copymsgDiv.append(span);

        setTimeout(function(){

            copymsgDiv.empty();

        }, 2000);


    });



    $(document).on('click','#shortLink',function () {

        copymsgRow.css('display','');

        copymsgDiv.empty();

        let span='<span id="copymsg">Copied to clipboard</span>';

        copymsgDiv.append(span);

        setTimeout(function(){

            copymsgDiv.empty();

        }, 2000);


    });



    $(document).on('mouseenter','#copy', function (event) {

        $(this).toggleClass('pulse');

    }).on('mouseleave','.top-level',  function(){

        $(this).toggleClass('pulse');
    });



});