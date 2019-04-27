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

function transformTable(table)
{
    var rows = table.getRows();
    var rowsRes = [];
    for(var i = 0;i < rows.length;i++)
    {
	var row = rows[i];
	var cells = row.getTableCells();
	var cellsRes = [];
	for(var j = 0;j < cells.length;j++)
	{
	    var cell = cells[j];
	    var items = cell.getBodyElements();
	    var itemsRes = [];
	    for(var k = 0;k < items.length;k++)
	    {
		var item = items[k];
		var obj = transformElement(item);
		if (obj != null)
		    itemsRes.push(obj);
	    }
	    cellsRes.push({type: "table_cell", nodes: itemsRes});
	}
	rowsRes.push({type: "table_row", nodes: cellsRes});
    }
    return {type: "table", nodes: rowsRes};
}

function transformElement(el)
{
    	switch (el.getClass().getName())
	{
	    case "org.apache.poi.xwpf.usermodel.XWPFParagraph":
	    return {type: "paragraph", runs: [{text: el.getText()}]};
	    case "org.apache.poi.xwpf.usermodel.XWPFTable":
	    return transformTable(el);
	    default:
	    print("WARNING:docx: Unhandled element of the class " + el.getClass().getName());
	    return null;
	}
}

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
	var obj = transformElement(el);
	if (obj != null)
	paragraphs.push(obj);
    }
    return {nodes: paragraphs};
});

org.apache.poi.openxml4j.util.ZipSecureFile.setMinInflateRatio(0.0009);

