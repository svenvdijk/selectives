function(renderContext) {
    var $ = renderContext.$;
    window.$ = $;
    window.jQuery = $;
    var teaserSize = renderContext.fill.creatives[0].custom.selectivesTeaser;
    var textPosition = renderContext.fill.creatives[0].custom.selectivesTextAlign;
    var contentPosition = renderContext.fill.creatives[0].custom.selectivesContentLocation;
    var rating = renderContext.fill.creatives[0].custom.selectivesRating;


    /* CXENSE | For all sizes
    * Set LocalStorage with multiple values; vertical and salesteam
    * @author: Sven van Dijk
    * @contact: s.vandijk@persgroep.nl
    */
    var campaignName = renderContext.fill.creatives[0].campaigns[0].name;
    var regexSalesTeam = /(nationaal)|(regio(naal)?)/g

    // Filter
    function isBigEnough(value) {
        return value != null;
    }

    // Check Polar campaign name for the sales team
    function getSalesTeam(team) {
        team = team.toLowerCase();
        team = team.split(/\s+/g);
        team = team.map(team => team.match(regexSalesTeam));
        team = team.filter(isBigEnough);

        if(team.length > 0) {
            if(team[0] == 'regio' || team[0] == 'regionaal') {
                return 'regio';
            } else if(team[0] == 'nationaal') {
                return 'nationaal';
            }
        } else {
            return false;
        }
    }

    // Data object
    var data = {
        branche: {
            name: 'branded_branche',
            content: renderContext.fill.creatives[0].campaigns[0].advertiser.vertical.name
        },
        communication: {
            name: 'branded_categorie',
            content: getSalesTeam(campaignName)
        }
    }

    // push data object to the localStorage
    function SaveDataToLocalStorage(data) {
        var a = [];
        a.push(data);
        localStorage.setItem('session', JSON.stringify(a));
    }

    // Event handler
    function setEventListener(banner) {
        banner.addEventListener("click", function clicked(e) {
            e.preventDefault();
            SaveDataToLocalStorage(data);
        });
    }

    // Set a EventListener on all elements with the classname 'branded-link'
    var bannerAnchor = window.top.document.getElementsByClassName('branded-link', renderContext.$template); //, renderContext.$template
    for (var index = 0; index < bannerAnchor.length; index++) {
        var element = bannerAnchor[index];
        setEventListener(element)
    }

    // RATING | For all sizes
    // The function will add a class that has been styled with an after or before depending on what newstitle.
    // Function Created @ 16 december 2019 | By: Sven van Dijk
    function setRating(rating, element) {
        // Error handler
        if(typeof rating == ('undefined' || 'null') || rating == 0) {
            return false;
        }
        // new class
        var ratingClassCSS = 'rating' + rating;
        // add the new class to the title
        element.classList.add(ratingClassCSS);
    }
    
    var teaserTitle =  window.top.document.getElementsByClassName('title');
    for (var index = 0; index < teaserTitle.length; index++) {
        var element = teaserTitle[index];

        if (rating != 'none') {
            rating = parseInt(rating, 'stars');
            setRating(rating, element)
        }
    }

    /* TEASER |  For 280x280 and 300x600
        Teaser will change the display of the banners too full or half image based on data in Polar Custom Field.
    */
    $.fn.teaser = function() {
       $(this).addClass(teaserSize);
       $(this).find('.image-wrapper picture').addClass(teaserSize);
    }
    $('.adjustable-size', renderContext.$template).teaser();
 
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
                $(this).css({ 'text-align': 'center' });
                break; //Quit loop
            }
            // END HUMO ONLY
        }    
    }
    $('.content-wrapper', renderContext.$template).textAlign();

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

    $('.title', renderContext.$template).textStyling();

    /* For all sizes
        ImageSource will get the right image for the banner. The function looks at the classlist. 
        Get the right src set based on the data attribute [data-size]
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
    $('.branded-aankeiler', renderContext.$template).imageSource();
}
