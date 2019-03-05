
Luwrain.addCommand("suspend", function(){
    if (!Luwrain.popups.confirmDefaultYes(Luwrain.i18n.static.powerSuspendPopupName, Luwrain.i18n.static.powerSuspendPopupText))
	return;
    Luwrain.os.suspend();
});
