
Luwrain.addHook("luwrain.area.clear", function(arg){
    Luwrain.sounds.deleted();
    Luwrain.speak("Очищено");//FIXME:
    return true;
});

