
Luwrain.addHook("luwrain.area.region.point.set", function(arg){
    Luwrain.speak("Отметка установлена", Luwrain.const.SOUND_REGION_POINT);//FIXME:
    return true;
});

Luwrain.addHook("luwrain.clipboard.copy.all", function(arg){
    Luwrain.speak("Скопировано полное содержимое в буфер обмена", Luwrain.const.SOUND_COPIED);//FIXME:
    return true;
});
