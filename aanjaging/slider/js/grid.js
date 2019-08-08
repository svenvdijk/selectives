var doc = window;
var oneColumn, twoColumn, threeColumn, fourColumn;
var screenSize

var article_sizes = {
    s_square: {
        height: 280,
        width: 280
    },
    l_square: {
        height: 280,
        width: 280        
    },
    h_rectangle: {
        height: 280,
        width: 600
    },
    v_rectangle: {
        height: 600,
        width: 280
    }
}

var columns = {
    breakpoint: {
        oneColumn: 0,
        twoColumn: 640,
        threeColumn: 960,
        fourColumn: 1320
    }
}

$.fn.grid = function() {

    if(screenSize >= columns.breakpoint.oneColumn && screenSize < columns.breakpoint.twoColumn) { // mobile
        try {
            $('.aankeiler-slider').slick({
                dots: true,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1
            });
        } catch(err){
            return false
        }

    } else {
        $('.aankeiler-slider').slick('unslick');
    }
    if(screenSize >= columns.breakpoint.twoColumn && screenSize < columns.breakpoint.threeColumn) { // portret tablet

        console.log('Columns: 2')
    }
    if(screenSize >= columns.breakpoint.threeColumn && screenSize < columns.breakpoint.fourColumn) { // landscape tablet
        console.log('Columns: 3')
    }
    if(screenSize >= columns.breakpoint.fourColumn) { // laptop
        console.log('Columns: 4')
    }

}

$(doc).resize(function(){
    screenSize = $(doc).width();
    $('article').grid(columns, article_sizes);
});

$('article').grid(columns, article_sizes);
