function(templateContext) {

    var el = window.top.document.querySelectorAll("p.artstyle__text");
    var lengthCharacters = 0;

    function getCharacters(text) {
        textLength = text.innerText.length;
        lengthCharacters = lengthCharacters + textLength
    }

    function getParagraph(paragraph) {
        if(paragraph.length > 0) {
            for (var i = 0; i < paragraph.length; i++) {
                var element = paragraph[i];
                getCharacters(element)
            }
        } else {
            getCharacters(paragraph[0]);
        }
    } 
    
    getParagraph(el);
    if(el.length > 2 && lengthCharacters >= 800) {
        console.log('Element to append to: ', el[1]);
        console.log('The amount of characters in the article: ', lengthCharacters);
        return {
                "injectionTarget": el[1],
                "injectionBehaviour": "after"
                };
    } else {
        console.error('Not enough characters in the article for the in-article to append. Should be 800+ instead of ', lengthCharacters);
        return false; 
    }
}
