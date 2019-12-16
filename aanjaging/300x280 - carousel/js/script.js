var teaserSize = 'full'; // renderContext.fill.creatives[0].custom.selectiveTeaser;
var textPosition = 'center'; // renderContext.fill.creatives[0].custom.selectiveAlignText;
var contentPosition = 'center'; // renderContext.fill.creatives[0].custom.selectiveContentPosition;

$.fn.teaser = function() {
    $(this).addClass(teaserSize);
    $(this).find('.image-wrapper picture').addClass(teaserSize);
}
$('.branded-aankeiler').teaser();

/* TEXT ALIGN |  For all sizes
    Text align will change the position or the text align based on data in Polar Custom Field.
*/
$.fn.textAlign = function() {
    var articleClassList = $(this).parent().parent().parent('article.branded-aankeiler')[0].classList;
    for(var i = 0; i < articleClassList.length; i++) { // iterate over classes

        if(articleClassList.length > 8) {
            break;
        }

        if(articleClassList[i] == 'full') { // See if the class 'full' is present
            $(this).css({ 'text-align': textPosition });
            $(this).addClass(contentPosition);
            break; //Quit loop
        } 
        // HUMO ONLY Center always on half
        if(articleClassList[i] == 'half') { 
            $(this).css({ 'text-align': 'center' });
            break; //Quit loop
        }
        // END HUMO ONLY
    }    
}
$('.content-wrapper').textAlign();

$.fn.carousel = function() {

    var articles = $('article');
    articles.length = articles.length;

    var small = $(window).width() < 640; // 1 columns
    var medium = $(window).width() >= 640 && $(window).width() < 960; // 2 columns
    var large = $(window).width() >= 960 && $(window).width() < 1320; // 3 columns
    var xlarge = $(window).width() >= 1320; // 4 columns
    var howManySlideToShow;

    var arrowContainer = $('.arrow-container');

    for(i = 0; i < articles.length; i++) {
        var col = articles[i].attributes['data-col'];

        if(small) {
            col.value = 1;
            howManySlideToShow = 1;
            if(articles.length <= 1) {
                $(arrowContainer).hide();
            }
        }
        // 1 articles
        if(medium) {
            if(articles.length == 1) { // 1 Articles
                col.value = 2;
                howManySlideToShow = 1;
            }
            if(articles.length >= 2) { // 2 Articles
                col.value = 1;
                howManySlideToShow = 2;
            }
            if(articles.length <= 2) {
                $(arrowContainer).hide();
            }
        }
        if(large) {
            if(articles.length == 1) { // 1 Articles
                col.value = 3;
                howManySlideToShow = 1;
            }
            if(articles.length == 2) { // 2 Articles
                articles[0].attributes['data-col'].value = 2;
                articles[1].attributes['data-col'].value = 1;
                howManySlideToShow = 2;
            }
            if(articles.length >= 3) { // 3 Articles
                col.value = 1
                howManySlideToShow = 3;
            }
            if(articles.length <= 3) {
                $(arrowContainer).hide();
            }
        }
        if(xlarge) {
            if(articles.length == 1) { // 1 Articles
                col.value = 4;
                howManySlideToShow = 1;
            }
            if(articles.length == 2) { // 2 Articles
                col.value = 2;
                howManySlideToShow = 2;
            }
            if(articles.length == 3) { // 3 Articles
                articles[0].attributes['data-col'].value = 2;
                articles[i].attributes['data-col'].value = 1;
                howManySlideToShow = 3;
            }
            if(articles.length >= 4) { // 4+ Articles
                col.value = 1;
                howManySlideToShow = 4;
            }
            if(articles.length <= 4) {
                $(arrowContainer).hide();
            }
        }
    }

    // Slick slider
    $(this).slick({
        arrows: false,
        infinite: false,
        responsive: 
        [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: howManySlideToShow
                },
                breakpoint: 960,
                settings: {
                    slidesToShow: howManySlideToShow
                },
                breakpoint: 1320,
                settings: {
                    slidesToShow: howManySlideToShow
                },
                breakpoint: 99999,
                settings: {
                    slidesToShow: howManySlideToShow
                },
            }
        ]
    });



    // Vertical Border on last visible object.

    $.fn.lastBorder = function() {
        var last = this.length - 1;
        var i;

        var firstArticle = articles.first()[0].attributes['aria-hidden'].value;
        var lastArticle = articles.last()[0].attributes['aria-hidden'].value;

        if(lastArticle == 'false') {
            $('#right-arrow').css({'fill': '#f1f1f1'})
        } else {
            $('#right-arrow').css({'fill': '#000'})
        }
        if(firstArticle == 'false') {
            $('#left-arrow').css({'fill': '#f1f1f1'})
        } else {
            $('#left-arrow').css({'fill': '#000'})
        }

        // Last border
        for( i = 0; i < this.length; i++ ){
            if(i == last) {
                $(this[i]).addClass('last-active');
            } else {
                $(this[i]).removeClass('last-active');
            }
        }
    }

    $('.native-carousel__wrapper').on('swipe', function(_event, _slick, _direction){
        $('.slick-active').lastBorder();
    });
    
    $('.slick-active').lastBorder();

    // End of Vertical Border on last visible object

    $('.arrow-next').click(function(){
        $('.responsive').slick('slickNext');
        $('.slick-active').lastBorder();
    });
    $('.arrow-previous').click(function(){
        $('.responsive').slick('slickPrev');
        $('.slick-active').lastBorder();
    });
}

$('.responsive').carousel();

$.fn.image = function() {
    var articles = []
    var source
    var srcset

    for(i = 0; i < this.length; i++) {
        articles.push(this[i]);
    }
    articles.forEach(element => {
        article = element;

        // console.log($(article)[0].attributes)
        article.dataCol = $(article)[0].attributes['data-col'].value;

        if($(article)[0].classList.contains('half')) {
            article.dataSize = 'half';
        } else if($(article)[0].classList.contains('full')) {
            article.dataSize = 'full';
        }

        var sources  = $(element).find('picture').children();
        for(i = 0; i < sources.length; i++) {
            source = sources[i];
            // console.log($(source)[0].attributes)
            source.dataCol = $(source)[0].attributes['data-col'].value;
            source.dataSize = $(source)[0].attributes['data-size'].value;

            if(source.dataCol == article.dataCol && source.dataSize == article.dataSize) {
                srcset = source.attributes['srcset'].value;
            }
        }

        picture = $(element).find('picture')[0];
        $(picture).css({'background-image' : 'url(' + srcset + ')'});
    });
}

$('.branded-aankeiler.hmp-carousel').image();