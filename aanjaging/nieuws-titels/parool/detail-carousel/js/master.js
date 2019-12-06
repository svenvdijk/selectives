var teaserSize = 'full'; // renderContext.fill.creatives[0].custom.selectiveTeaser;
var textPosition = 'center'; // renderContext.fill.creatives[0].custom.selectiveAlignText;
var contentPosition = 'center'; // renderContext.fill.creatives[0].custom.selectiveContentPosition;

$.fn.teaser = function() {
    $(this).addClass(teaserSize);
    $(this).find('.image-wrapper picture').addClass(teaserSize);
}
$('.branded-aankeiler').teaser();

$.fn.textAlign = function() {
    var text = $(this).children();
    var articleClassList = $(this).parent().parent().parent('article.branded-aankeiler')[0].classList;

    for(var i = 0; i < articleClassList.length; i++) { // iterate over classes
        if(articleClassList[i] == 'full') { // See if the class 'full' is present
            for(var i = 0; i < text.length; i++) {
                $(text[i]).css({ 'text-align': textPosition });
            }
            $(this).addClass(contentPosition);
        }
    }
}
$('.content-wrapper').textAlign();

var windowWidth = $(window.top).width();
$.fn.image = function() {
    var article = this;
    var array = Array.prototype.slice.call(article);

    for( var i = 0; i < array.length; i++ ) {
        if(windowWidth >= 1280 && windowWidth < 1600) {
            if($(article).hasClass('col2')) {
                // console.log(array)
            }
            if($(article).hasClass('col3') || $(article).hasClass('col4')) {
                if(i < 3) {
                    console.log(array[i])
                }
            }
        } else if (windowWidth >= 1600) {
            if($(article).hasClass('col2')) {
                // console.log(array)
            }
            if($(article).hasClass('col3')) {
                // console.log(array)
            }
            if($(article).hasClass('col4')) {
                // console.log(array)
            }
        }

    }



    if(windowWidth >= 1280 && windowWidth < 1600) {
        if($(article).hasClass('col2')) {
            // console.log(array)
        }
        if($(article).hasClass('col3') || $(article).hasClass('col4')) {
            // console.log(array);
        }
    } else if (windowWidth >= 1600) {
        if($(article).hasClass('col2')) {
            // console.log(array)
        }
        if($(article).hasClass('col3')) {
            // console.log(array)
        }
        if($(article).hasClass('col4')) {
            // console.log(array)
        }
    }

    $(array).each(function(index) {
        article = this;
        article.class = this.classList
        article.image = $(this).children('a').children('.wrapper').children('.image-wrapper');
        article.picture = $(article.image).children('picture');
        article.pictureClass = article.picture[0].classList;
        article.pictureWidth = $(article.picture).width();
        article.source = $(article.picture).children('source');
        article.position = this.attributes['data-position'].value;
        var dataSize, srcset, dataCol;

        $(article).each(function() {
            // Images Source
            var col
            if(article.pictureWidth == '920') { 
                col = 3; 
            } else if (article.pictureWidth == '1240') {
                col = 4; 
            } else {
                col = 0; 
            }

            $(article.source).each(function(){
                dataSize = this.attributes['data-size'].value; // DOM Element 'Source' values
                dataCol  = this.attributes['data-col'].value; 

                if(dataSize == article.pictureClass && dataCol == col) {
                    srcset = this.attributes['srcset'].value;
                }
                $(article.picture).css({ 'background-image': 'url(' + srcset + ')' })
            });
        });

        var width = $(article).width();
        var ratioWidth = 2;
        var ratioHeight = 1;
        var ratio = width / ratioWidth;
        var height = ratio * ratioHeight;

        if($(article).hasClass('half')) {
            if(windowWidth < 640) {
                $(article.image).css({ 'height': + height + 'px' });
            }
            if($(article).hasClass('col2') || $(article).hasClass('col3') || $(article).hasClass('col4')){
                if(windowWidth > 640) {
                    $(article.image).css({ 'height': + 391 + 'px' });
                }
            } else {
                if(windowWidth > 640) {
                    $(article.image).css({ 'height': + 140 + 'px' });
                }
            }
        }

    });

}
$('.branded-aankeiler').image();