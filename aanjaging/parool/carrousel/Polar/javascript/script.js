function(renderContext) {
    var $ = renderContext.$;
    window.$ = $;
    window.jQuery = $;

    var slickJS = window.document.createElement('script');
    slickJS.src = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';
    slickJS.type = 'text/javascript';
    window.document.getElementsByTagName('head')[0].appendChild(slickJS);

    ///////////////////////////////////////////////////////////////////////
    // Function to set the correct data for each article in the promofeed. All the custom options are handled here.
    $.fn.grid = function() {
        var array = []
        for(var i = 0; i < this.length; i++) {
            array.push(this[i]);
        }
        
        array.forEach(function(obj, index){ // Data-position = "index";
            teaserSize = renderContext.fill.creatives[index].custom.selectivesTeaser;
            textPosition = renderContext.fill.creatives[index].custom.selectivesTextAlign;
            contentPosition = renderContext.fill.creatives[index].custom.selectivesContentLocation;

            $.fn.teaser = function() {
                $(obj).addClass(teaserSize);
                $(obj).find('.image-wrapper picture').addClass(teaserSize);
            }
            $(obj).teaser();
        
            $.fn.textAlign = function() {
                var text = $(obj).children('a').children('.wrapper').children('.content-wrapper');
                var articleClassList = $(obj)[0].classList;
        
                for(var i = 0; i < articleClassList.length; i++) { // iterate over classes
                    if(articleClassList[i] == 'full') { // See if the class 'full' is present
                        $(text).css({ 'text-align': textPosition });
                        $(text).addClass(contentPosition);
                    }
                }
            }
            $(obj).textAlign();
        });
    }
    $('article.branded-aankeiler', renderContext.$template).grid();
    // End of Grid Function.
    ///////////////////////////////////////////////////////////////////////

    $.fn.responsiveImage = function() {
        var imageWidth = $(this).width();
        var halfImageHeight = imageWidth / 2;
        var article = $(this).parent('.wrapper').parent('a').parent('.branded-aankeiler');
        article.class = article[0].classList;
        article.class.half = article.class.contains('half');
    
        if(article.class.half && $(window.top).width() < 640) {
            $(this).css({'height': + halfImageHeight + 'px'});
        }
        if(article.class.half && $(window.top).width() >= 640) {
            $(this).css({'height': '50%'});
        } 
    }
    
    $('.image-wrapper', renderContext.$template).responsiveImage(); // Must be changed on window width

    $.fn.carousel = function() {
        console.log('carousel function activated')

        var articles = $('article', renderContext.$template);
        articles.length = articles.length;
    
        var small = $(window.top).width() < 640; // 1 columns
        var medium = $(window.top).width() >= 640 && $(window.top).width() < 960; // 2 columns
        var large = $(window.top).width() >= 960 && $(window.top).width() < 1320; // 3 columns
        var xlarge = $(window.top).width() >= 1320; // 4 columns
        var howManySlideToShow;
    
        var arrowContainer = $('.arrow-container', renderContext.$template);
    
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
        /* wait for slick to load,
        then initiate carousel */
        console.log('this', this)
        slickJS.onload = function() {
            console.log('SlickJS loaded correctly')
            $('.responsive', renderContext.$template).slick({
                arrows: false,
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
        }
    }
    $('.responsive', renderContext.$template).carousel();

    // Vertical Border on last visible object.

    $.fn.lastBorder = function() {
        var last = this.length - 1;
        var i;
        
        for( i = 0; i < this.length; i++ ){
            if(i == last) {
                $(this[i]).addClass('last-active');
            } else {
                $(this[i]).removeClass('last-active');
            }
        }
    }

    $('.native-carousel__wrapper', renderContext.$template).on('swipe', function(_event, _slick, _direction){
        $('.slick-active', renderContext.$template).lastBorder();
    });

    setTimeout(function() {
        $('.slick-active', renderContext.$template).lastBorder();
    },200)
    

    // End of Vertical Border on last visible object
    $('.arrow-next', renderContext.$template).click(function(){
        $('.responsive', renderContext.$template).slick('slickNext');
        $('.slick-active', renderContext.$template).lastBorder();
    });
    $('.arrow-previous', renderContext.$template).click(function(){
        $('.responsive', renderContext.$template).slick('slickPrev');
        $('.slick-active', renderContext.$template).lastBorder();
    });
    
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
            $(picture).css({'background' : 'url(' + srcset + ') no-repeat', 'background-size' : 'cover'});
        });
    }
    
    $('.branded-aankeiler.hmp-carousel', renderContext.$template).image();
}