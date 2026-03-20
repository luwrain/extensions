
Luwrain.addHook("luwrain.area.region.point.set", function(arg){
    Luwrain.speak("Отметка установлена", Luwrain.constants.SOUND_REGION_POINT);//FIXME:
    return true;
});

Luwrain.addHook("luwrain.clipboard.copy.all", function(arg){
    Luwrain.speak("Скопировано полное содержимое в буфер обмена", Luwrain.constants.SOUND_COPIED);//FIXME:
    return true;
});

Luwrain.addHook("luwrain.area.clear", (arg)=>{
    Luwrain.speak("Очищено", Luwrain.constants.SOUND_DELETED);
    return true;
});
