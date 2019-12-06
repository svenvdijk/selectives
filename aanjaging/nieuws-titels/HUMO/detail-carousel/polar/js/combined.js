function(renderContext) {
    var $ = renderContext.$;
    window.$ = $;
    window.jQuery = $;
    var win = window.top;
    var doc = win.document;
    var teaserSize, textPosition, contentPosition, firstTile, col

    $.fn.grid = function() {
        var array = []
        for(var i = 0; i < this.length; i++) {
            array.push(this[i]);
        }
        
        array.forEach(function(obj, index){ // Data-position = "index";
            teaserSize = renderContext.fill.creatives[index].custom.selectivesTeaser;
            textPosition = renderContext.fill.creatives[index].custom.selectivesTextAlign;
            contentPosition = renderContext.fill.creatives[index].custom.selectivesContentLocation;
            firstTile = renderContext.fill.creatives[0].custom.selectivesTeaserSize // Should be first of all the object. Since this will be used in the CSS.
            col = firstTile;
            var obj = obj;
            obj.attributes = obj.attributes['data-position'].value = index; // Add data-position value to the DOM based on index
            obj.attributes = obj.attributes['data-column-size'].value = col; // Add data-column-size value to the DOM

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

        if(window.top.innerWidth >= 640) {
            var tile = array[0];
            if(tile && firstTile > 1) {
                $(tile).addClass('col' + col);
            }
        
            var last = $(array).last(); // Last Article
            var offsetTop = last[0].offsetTop; // Last Article Pixel from top
            var tileHeight = last[0].clientHeight; // Last Article Height
            var tileBottom = offsetTop + tileHeight; // Article Height + offsetTop = Bottom of last Article
            var row = tileHeight;
            var section = $(this).parent(); // Section
            var sectionHeight = section[0].clientHeight;  // Section Height
            var sectionMargin = 20; // Section Margin

            $('.native-read-more__wrapper a', renderContext.$template).on('click', function(event) {
                event.preventDefault();
                $('.native-carousel__wrapper', renderContext.$template).css({'height': (sectionHeight + sectionMargin) + row + 'px' });
                sectionHeight = section[0].clientHeight
                
                if(sectionHeight >= tileBottom) {
                    $(this).hide();
                }
            });
            
            $(window.top).on('load resize', function(){
                offsetTop = last[0].offsetTop; // Last Article Pixel from top
                tileHeight = last[0].clientHeight; // Last Article Height
                tileBottom = offsetTop + tileHeight; 
                sectionHeight = section[0].clientHeight;

                console.log('sectie height: ', sectionHeight, 'last tile position: ', tileBottom);

                if(sectionHeight <= tileBottom) {
                    $('.native-read-more__wrapper a', renderContext.$template).show();
                } else {
                    $('.native-read-more__wrapper a', renderContext.$template).hide();
                    $('.native-carousel__wrapper', renderContext.$template).css({'height': tileBottom + 'px' });
                }
            });
            
        }
        
    }
    $('article.branded-aankeiler', renderContext.$template).grid();
    // End of Grid Javascript

    var windowWidth = $(window.top).width();
    $.fn.image = function() {
        var article = this;
        var array = Array.prototype.slice.call(article);

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
    $('.branded-aankeiler', renderContext.$template).image();
}