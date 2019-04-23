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
    if (!contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
	return null;
    var f = new java.io.FileInputStream(path);
    var doc = new org.apache.poi.xwpf.usermodel.XWPFDocument(f);
    var body = doc.getBodyElements();
    var paragraphs = [];
    for(var i = 0;i < body.length;i++)
    {
	var el = body[i];
		    print("super " + el.getClass().getName());
	switch (el.getClass().getName())
	{
	    case "org.apache.poi.xwpf.usermodel.XWPFParagraph":
	    paragraphs.push({type: "paragraph", runs: [{text: el.getText()}]});
	    continue;
	    	    case "org.apache.poi.xwpf.usermodel.XWPFTable":
	    continue;
	    default:
	    //print("unknown " + el.getClass().getName());
	    //return;
	}
    }
    return {nodes: paragraphs};
});
