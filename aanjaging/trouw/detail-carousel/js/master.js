var teaserSize = ''; // renderContext.fill.creatives[0].custom.selectiveTeaser;
var textPosition = ''; // renderContext.fill.creatives[0].custom.selectiveAlignText;
var contentPosition = ''; // renderContext.fill.creatives[0].custom.selectiveContentPosition;
var windowWidth = $(window).width();

var polarApi = $.getJSON('https://polarcdn-terrax.com/distribution/v2.0.0/json/persgroep/1830468663964a4cbbde4d58fe405a09', function(data) {

    var arrayJSON = []

    for(var i = 0; i < data.creatives.length; i++) {
        arrayJSON.push(data.creatives[i]);
    }
        
    arrayJSON.forEach(function(obj, index) {
        var mediavoice = obj;
        mediavoice.columnSize = obj.customFields.selectivesTeaserSize; 
        mediavoice.teaserSize = obj.customFields.selectivesTeaser; 
        mediavoice.textPosition = obj.customFields.selectivesTextAlign; 
        mediavoice.contentPosition = obj.customFields.selectivesContentLocation;

        mediavoice.title = obj.title;
        mediavoice.url = obj.url;
        mediavoice.label = obj.advertiser.label;

        

        $.fn.teaser = function() {
            // Function for calculating aspect ratio
            function gcd (a, b) {
                return (b == 0) ? a : gcd (b, a%b);
            }
            // End of Function for calculating aspect ratio

            //DOM Article
            article = $(this[index]);
            article.size = $(article).attr('data-size',mediavoice.teaserSize); // Set [data-size] to the mediavoice teasersize (half/full)
            article.size = $(article).attr('data-size');
            $(article).addClass(article.size); // Add Class from the mediavoice teasersize (half/full)

            article.width = $(article).width() // <article> width
            article.height = $(article).height() // <article> height
            article.ratio;  // <article> ratio
            //End DOM Article

            article.contentWrapper = $(article).find('.content-wrapper');
            article.contentWrapper.label = $(article.contentWrapper).children('.label');
            article.contentWrapper.title = $(article.contentWrapper).children('.title');

            if(article.size == 'full') {
                $(article.contentWrapper).css('text-align', mediavoice.textPosition);
                $(article.contentWrapper).addClass(mediavoice.contentPosition);
            }

            article.imageWrapper = $(article).find('.image-wrapper');
            article.imageWrapper.width = $(article.imageWrapper).width();
            article.imageWrapper.height = $(article.imageWrapper).height();

            article.imageWrapper.picture = $(article.imageWrapper).children('picture');
            $(article.imageWrapper.picture).addClass(article.size)

            if(article.size == 'half') {
                article.imageWrapper.height = article.imageWrapper.width / 2;
            }
            $(article.imageWrapper).css({'height': + article.imageWrapper.height + 'px'});
        
            // Loading Mediavoice content into the DOM
            article[0].attributes['data-column-size'].value = mediavoice.columnSize; // Setting column size based on Mediavoice Data
            $(article.contentWrapper.title).text(mediavoice.title); // Setting title 
            // $(article.contentWrapper.label).text(mediavoice.label);

            // Image Sizing and creating sources based on the amount of image in mediavoice.
            article.ratio = gcd (article.width, article.imageWrapper.height);
            x = article.width / article.ratio;
            y = article.imageWrapper.height / article.ratio;

            for(i = 0; i < mediavoice.image.length; i++) {
                mediavoice.image.ratio = gcd (mediavoice.image[i].width, mediavoice.image[i].height);

                a = mediavoice.image[i].width / mediavoice.image.ratio;
                b = mediavoice.image[i].height / mediavoice.image.ratio;
                
                if(x == a && y == b) {
                    article.imageWrapper.picture[0].setAttribute('style', 'background-image: url(' + mediavoice.image[i].url + ');');
                }
            }
        }
        $('.branded-aankeiler').teaser();
    });

        ///////////////////
    $.fn.grid = function() {
        var array = []
        for(var i = 0; i < this.length; i++) {
            array.push(this[i]);
        }
        var position = 0;
        
        if($(array[0]).attr('data-column-size') == 3 && windowWidth >= 960 && windowWidth < 1320 || $(array[0]).attr('data-column-size') == 4 && windowWidth >= 960 && windowWidth < 1320) {
            if($(array[0]).attr('data-column-size') == 4) { // If 4 columns change the position to 3 not 4. 
                position = 3
            } else { // If the position equals 3 columns then change the position to 3. 
                position = $(array[0]).attr('data-column-size');
            }
            firstArticle = array.shift() // removes the first object from the array.
        }

        if( $(array[0]).attr('data-column-size') == 3 && windowWidth >= 1320 || $(array[0]).attr('data-column-size') && windowWidth >= 1320 ) {

            if($(array[0]).attr('data-column-size') == 3) {
                $(array[1]).attr('data-position', 2);
                $(array[2]).attr('data-position', 3);
                firstArticle = array.splice(0,2); //remove first 3 item from array
                position = 4; 
            }
            if( $(array[0]).attr('data-column-size') == 4 ) {
                firstArticle = array.shift()
                position = 5;
            }
        }

        array.forEach(function(obj, index){
            $(obj).attr('data-position', position) // The position is added to the 'data-attribute' in the DOM.
            position++; // For each object in array add 1 extra position
        });
    }
    $('.branded-aankeiler').grid();
    

});

