/*
   Copyright 2019-2021 Michael Pozhidaev <msp@luwrain.org>

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
    var maxOffset = 0;
    var rowsRes = [];
    var rowCount = table.numRows();
    for(var i = 0;i < rowCount;i++)
    {
	var row = table.getRow(i);
	var cellsRes = [];
	var cellCount = row.numCells();
	for(var j = 0;j < cellCount;j++)
	{
	    var cell = row.getCell(j);
	    var nodes = [];
	    var count = cell.numParagraphs();
	    for(var k =0;k < count;k++)
	    {
		var text = cell.getParagraph(k).text();
		if (text == null)
		    text = "";
		nodes.push({type: "paragraph", runs: [{text: text}]});
	    }
	    if (cell.getEndOffset() > maxOffset)
		maxOffset = cell.getEndOffset();
	    cellsRes.push({type: "table_cell", nodes: nodes});
	}
	rowsRes.push({type: "table_row", nodes: cellsRes});
    }
    var tableRes = {type: "table", nodes: rowsRes};
    return {endOffset: maxOffset, table: tableRes};
}

Luwrain.addHook("luwrain.reader.doc.builder", function(contentType, props, path){
    if (!contentType.equals("application/msword"))
	return null;
    var f = new java.io.FileInputStream(path);
    var doc = new org.apache.poi.hwpf.HWPFDocument(f);
    var docText = doc.getDocumentText();
    var nodes = [];
    var range = doc.getRange();
    var count = range.numParagraphs();
    var skipUntilOffset = -1;
    for(var i = 0;i < count;i++)
    {
	var p = range.getParagraph(i);
	if (p.getStartOffset() <= skipUntilOffset)
	    continue;
	if (p.getTableLevel() > 0)
	{
	    var res = transformTable(range.getTable(p));
	    nodes.push(res.table);
	    skipUntilOffset = res.endOffset;
	    continue;
	}
	nodes.push({type: "paragraph", runs: [{text: p.text()}]});
    }
    return {nodes: nodes};
});
