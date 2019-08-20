var firstTile = 3; // from mediavoice!
var advertiser = 'ONVZ'; // from mediavoice!
var col = firstTile;

$.fn.advertiser = function() {
    $(this).html(advertiser)
}

$('.native-read-more__wrapper a span').advertiser();
$('.native-carousel__title span').advertiser();

$.fn.grid = function() {
    var array = []
    for(var i = 0; i < this.length; i++) {
        array.push(this[i]);
    }
    
    array.forEach(function(obj, index){ // Data-position = "index";
        var obj = obj;
        obj.attributes = obj.attributes['data-position'].value = index;
        obj.attributes = obj.attributes['data-column-size'].value = col;
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

        $('.native-read-more__wrapper a').on('click', function(event) {
            event.preventDefault();
            $('.native-carousel__wrapper').css({'height': (sectionHeight + sectionMargin) + row + 'px' });
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
                $('.native-read-more__wrapper a').show();
            } else {
                $('.native-read-more__wrapper a').hide();
                $('.native-carousel__wrapper').css({'height': tileBottom + 'px' });
            }
        });
        
    }
    
}
$('article.branded-aankeiler').grid();
