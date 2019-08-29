    var windowWidth = $(window.top).width(); 
    $.fn.aspectRatio = function(event) {
        var padding = 40;
        var width = windowWidth - padding;
        var ratioWidth = 125;
        var ratioHeight = 224;
        var ratio = width / ratioWidth;
        var height = ratio * ratioHeight;
        
    }
    $('.image-wrapper').aspectRatio();