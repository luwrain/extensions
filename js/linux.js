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

function getTypeDescr(type)
{
    switch(type)
    {
    case "volume_root":
	return Luwrain.i18n.static.partitionsPopupItemRoot;
    case "volume_user_home":
	return Luwrain.i18n.static.partitionsPopupItemUserHome;
    case "volume_regular":
	return Luwrain.i18n.static.partitionsPopupItemRegular;
    case "volume_remote":
	return Luwrain.i18n.static.partitionsPopupItemRemote;
    case "volume_removable":
	return Luwrain.i18n.static.partitionsPopupItemRemovable;
    default:
	return "";
    }
}

Luwrain.addHook("luwrain.linux.popups.disks.list", function(volumes, disks){
    var res = [];

        //disks contains removable disks only
        for(var i = 0;i < disks.length;i++)
	    res.push({title: disks[i].device + " съёмный диск"});


    
    for(var i = 0;i < volumes.length;i++)
	if (!volumes[i].type.equals("volume_regular"))
	res.push({title: volumes[i].name + " " + getTypeDescr(volumes[i].type)});



    
    return res;
});
