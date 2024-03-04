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
this.control.setName("Создание приложения");
}

greeting(){
return this.wizard.createFrame()
.addText("Перечислите идентификаторы валют, для которых вы желаете получить информацию о курсе, в поле ниже.")
.addInput("Валюты:", "USD EUR")
.addClickable("Показать", async()=>{ await this.fetch(); });
}

async fetch(){
const doc = Luwrain.parseXml(await Luwrain.fetchUrl("http://www.cbr.ru/scripts/XML_daily.asp?date_req=03/03/2024"));
const ValCurs = doc.find(n=>{ return n.getType() == "Element" && n.getTagName() == "ValCurs"; });
const res = [];
for(let v of ValCurs.getChildNodes()) {
if (v.getType() != "Element")
continue;
const CharCode = v.find(n=>{ return n.getType() == "Element" && n.getTagName() == "CharCode";});
if (!CharCode || CharCode.getChildNodes().length == 0)
continue;
const name = CharCode.getChildNodes()[0].getText();
if (["USD", "EUR", "GBP", "CNY", "AED"].findIndex(i=>{ return i == name.trim(); }) < 0)
continue;
const VunitRate = v.find(n=>{ return n.getType() == "Element" && n.getTagName() == "VunitRate";});
if (!VunitRate  || VunitRate.getChildNodes().length == 0 || VunitRate.getChildNodes()[0].getType() != "TextNode")
continue;
const value = VunitRate.getChildNodes()[0].getText();
res.push({name, value});
Luwrain.log.debug("proba", "adding res " + value);
}
this.showResult(res);
//});
}

showResult(values){
Luwrain.log.debug("proba", "showing result " + values.length);
const f = this.wizard.createFrame();
for(let v of values)
f.addText(v.name + ": " + v.value);
var l = "";
for(let i of values)
l += (i.name + " ");
f.addInput("Валюты:", l.trim())
f.addClickable("Показать", async()=>{ await this.fetch(); });
f.show();
}

onInput(event, control){
if (event.code == "ESCAPE"){
control.close();
return true;
}
return false;
}
}

Luwrain.launchApp(Frames);
