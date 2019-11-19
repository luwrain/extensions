/*
   Copyright 2019 Michael Pozhidaev <msp@luwrain.org>

   This file is part of LUWRAIN.

   LUWRAIN is free software; you can redistribute it and/or
   modify it under the terms of the GNU General Public
   License as published by the Free Software Foundation; either
   version 3 of the License, or (at your option) any later version.

   LUWRAIN is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
   General Public License for more details.
*/

Luwrain.addHook("luwrain.area.region.point.set", function(arg){
    Luwrain.sounds.regionPoint();
    Luwrain.speak("Строка " + (arg.y + 1) + ", столбец " + (arg.x + 1) + ", отметка установлена");//FIXME:
    return true;
});

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

