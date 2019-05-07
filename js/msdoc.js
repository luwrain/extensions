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

Luwrain.addHook("luwrain.reader.doc.builder", function(contentType, props, path){
    if (!contentType.equals("application/msword"))
	return null;
    var f = new java.io.FileInputStream(path);
    var doc = new org.apache.poi.hwpf.HWPFDocument(f);
    var docText = doc.getDocumentText();
    var nodes = [];
    var range = doc.getRange();
    var count = range.numParagraphs();
    for(var i = 0;i < count;i++)
    {
	var p = range.getParagraph(i);
	nodes.push({type: "paragraph", runs: [{text: p.text()}]});
    }
    return {nodes: nodes};
});
