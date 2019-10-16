function(renderContext) {
    var $ = renderContext.$;
    window.$ = $;
    window.jQuery = $;
    var teaserSize = renderContext.fill.creatives[0].custom.selectivesTeaser;
    var textPosition = renderContext.fill.creatives[0].custom.selectivesTextAlign;
    var contentPosition = renderContext.fill.creatives[0].custom.selectivesContentLocation;

    /* TEASER |  For 280x280 and 300x600
        Teaser will change the display of the banners too full or half image based on data in Polar Custom Field.
    */
    $.fn.teaser = function() {
       $(this).addClass(teaserSize);
       $(this).find('.image-wrapper picture').addClass(teaserSize);
    }
    $('.branded-aankeiler', renderContext.$template).teaser();
 
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
            // HUMO ONLY
            if(articleClassList[i] == 'half') { 
                $(this).css({ 'text-align': textPosition });
                break; //Quit loop
            }
            // END HUMO ONLY
            
        }    
    }
    $('.content-wrapper', renderContext.$template).textAlign();


    /* Only for 280x280
        AspectRatio is a function for the 280x280 banner. For mobile it will calculate the perfect sizes. 

        If screenssize has a greater width than 640px it will change the image size to 280x140. 
        Else the screensize will be calcuted based on aspect ratio
    */
    var windowWidth = $(window.top).width(); 
    $.fn.aspectRatio = function(event) {
        var width = $(this).width();
        var ratioWidth = 2;
        var ratioHeight = 1;
        var ratio = width / ratioWidth;
        var height = ratio * ratioHeight;
        var articleClassList = $(this).parent().parent().parent('article.branded-aankeiler')[0].classList;

        for(var i = 0; i < articleClassList.length; i++) { // iterate over classes
            if(articleClassList.length > 8) {
                break;
            }
            if(articleClassList[i] == 'half') { // See if the class 'half' is present
                if (windowWidth < 640) {
                    $(this).css({ 'height': + height + 'px' });
                } else {
                    $(this).css({ 'height': + '140' + 'px' });
                }
            }
        }
    }
    $('.image-wrapper', renderContext.$template).aspectRatio();

    $(window.top).on('resize', function(){
        $('.image-wrapper', renderContext.$template).aspectRatio();
    });

    /* For all sizes
        ImageSource will get the right image for the banner. The function looks at the classlist. 
        
        If the class 'half' or 'full' exists then it will use the source with the same data-attributes.
        Else
    */
   $.fn.imageSource = function() {
        var dataSize;
        var array = Array.prototype.slice.call(this);

        for(var i = 0; i < array.length; i++) {
            if(array.length > 20) {
                break;
            }

            var anchor = array[i].childNodes[1];
            var picture = $(anchor).children('.wrapper').children('.image-wrapper').children('picture');
            picture.class = picture[0].classList;
            var source = $(picture).children('source');
        
            for(var i = 0; i < source.length; i++) {
                if(source.length > 8) {
                    break;
                }
                source.size = source[i].attributes['data-size'].value;     
                if(source.size == picture.class) {
                    source.src = source[i].attributes['srcset'].value;
                }
                picture[0].setAttribute('style', 'background-image: url(' + source.src + ');');
            }
        }
    }
    $('.branded-aankeiler-square', renderContext.$template).imageSource();
}
