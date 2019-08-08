function goToPreviousURL() {
   window.history.back();
}

$('.dir_folder').click(function(event){
    $(this).find('.dropdown').toggle('hidden');
})