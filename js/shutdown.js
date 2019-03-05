
Luwrain.addCommand("quit", function(){
    if (Luwrain.popups.confirmDefaultYes(Luwrain.i18n.static.quitPopupName, Luwrain.i18n.static.quitPopupText))
	Luwrain.quit();
    
});
