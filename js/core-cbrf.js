/*
   Copyright 2019-2022 Michael Pozhidaev <msp@luwrain.org>

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

class Frames {
constructor(control){
this.control = control;
this.wizard = Luwrain.createWizardArea({
input: (event)=>this.onInput(event, control)
});
this.greeting().show();
this.control.setLayout(this.wizard);
this.control.setName("ЦБРФ");
}

greeting(){
return this.wizard.createFrame()
.addClickable("Продолжить", async()=>{
const doc = Luwrain.parseXml(await Luwrain.fetchUrl("http://www.cbr.ru/scripts/XML_daily.asp?date_req=03/03/2024"));
const ValCurs = doc.find(n=>{ return n.getType() == "Element" && n.getTagName() == "ValCurs"; });
for(let v of ValCurs.getChildNodes()) {
if (v.getType() != "Element")
continue;
const CharCode = v.find(n=>{ return n.getType() == "Element" && n.getTagName() == "CharCode";});
if (!CharCode || CharCode.getChildNodes().length == 0)
continue;
const name = CharCode.getChildNodes()[0].getText();
if (name.trim() != "USD")
continue;
const VunitRate = v.find(n=>{ return n.getType() == "Element" && n.getTagName() == "VunitRate";});
if (!VunitRate  || VunitRate.getChildNodes().length == 0 || VunitRate.getChildNodes()[0].getType() != "TextNode")
continue;
Luwrain.log.debug("proba", VunitRate.getChildNodes()[0].getText());
}
});
}

onInput(event, control){
if (event.code == "ESCAPE"){
control.close();
return true;
}
return false;
}
}

//Luwrain.launchApp(Frames);
