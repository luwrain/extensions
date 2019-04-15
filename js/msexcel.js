/*
   Copyright 2012-2019 Michael Pozhidaev <msp@luwrain.org>

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
    if (!contentType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
	return null;
    var f = new java.io.FileInputStream(path);
    var book = new org.apache.poi.xssf.usermodel.XSSFWorkbook(f);
    var sheet = book.getSheetAt(0);
        	var rows = [];
    var rowIt = sheet.iterator();
    while(rowIt.hasNext())
    {
	var row = rowIt.next();
	var cells = [];
	var cellIt = row.iterator();
	while(cellIt.hasNext())
	{
	    var cell = cellIt.next();
	    //	    print(cell.getCellType());
	    var cellType = "" + cell.getCellType();
		var newCell = {type: "table_cell", nodes: [{type: "paragraph", runs: [{text: "" + cellType}]}]};
	    switch(cellType.toLowerCase())
	    {
		case "string":
newCell = {type: "table_cell", nodes: [{type: "paragraph", runs: [{text: "" + cell.getStringCellValue()}]}]};
		break;
		case "formula":
		print("");
		default:
		print("unprocessed type " + cellType);
	    }
	    cells.push(newCell);
	}
	rows.push({type: "table_row", nodes: cells});
    }
    return {nodes: [{type: "table", nodes: rows}]};
});
