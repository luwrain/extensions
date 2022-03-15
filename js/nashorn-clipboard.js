
Luwrain.addHook("luwrain.clipboard.copy.all", function(arg){
    Luwrain.sounds.copied();
    Luwrain.speak("Скопировано полное содержимое в буфер обмена");//FIXME:
    return true;
});

Luwrain.addHook("luwrain.area.clear", function(arg){
    Luwrain.sounds.deleted();
    Luwrain.speak("Очищено");//FIXME:
    return true;
});

