
Luwrain.addHook("luwrain.area.region.point.set", function(arg){
    Luwrain.speak("Отметка установлена", Luwrain.const.SOUND_REGION_POINT);//FIXME:
    return true;
});
