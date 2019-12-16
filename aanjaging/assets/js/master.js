    var teaserSize = 'half'; //renderContext.fill.creatives[0].custom.selectivesTeaser;
    var textPosition = 'center'; //renderContext.fill.creatives[0].custom.selectivesTextAlign;
    var contentPosition = 'bottom'; //renderContext.fill.creatives[0].custom.selectivesContentLocation;
    var rating = ''; 

    /* TEASER |  For 280x280 and 300x600
        Teaser will change the display of the banners too full or half image based on data in Polar Custom Field.
    */
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
            // HUMO ONLY
            if(articleClassList[i] == 'half') { 
                $(this).css({ 'text-align': textPosition });
                break; //Quit loop
            }
            // END HUMO ONLY
        }    
    }
    $('.content-wrapper').textAlign();

    /*
    For all banners ->
    @Function name: Text Styling
    @Created by: Sven van Dijk

    */ 
    $.fn.textStyling = function() {
        var text = this[0].innerText
        var err = 'Error: No Bold Text Found!'
        var regexBold = /(?:^| )(_(?:[\w ]+?)_|([*~])(?:[\w ]+?)\2)(?= |$)/gm;

        if(text.split(regexBold)) {
            textArray = text.split(regexBold);

            for(i = 0; i < textArray.length; i++) {
                if(textArray[i] != undefined || textArray[i] != null) {
                    textArray[i] = textArray[i].replace('_', '<b>');
                    textArray[i] = textArray[i].replace('_', '</b>');
                }
                if(i == 300) {break;}
            }

            var textAsString = textArray.join(' '); 
            textAsString = textAsString.toString();
            console.log(textAsString);
            this[0].innerHTML = textAsString;

        } else { 
            console.error(err)
        }  
    }

    $('.title').textStyling();

    /* For all sizes
        ImageSource will get the right image for the banner. The function looks at the classlist. 
        
        If the class 'half' or 'full' exists then it will use the source with the same data-attributes.
        Else
    */
   $.fn.imageSource = function() {
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

                /* If Interview is selected it will get the sqaure image */
                if(picture.class == 'interview') {
                    picture.class = 'full';
                }
                /* End of Interview */

                source.size = source[i].attributes['data-size'].value;
                if(source.size == picture.class) {
                    source.src = source[i].attributes['srcset'].value;
                }
                picture[0].setAttribute('style', 'background-image: url(' + source.src + ');');
            }
        }
    }
    $('.branded-aankeiler').imageSource();
