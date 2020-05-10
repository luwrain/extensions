/*
   Copyright 2019-2020 Michael Pozhidaev <msp@luwrain.org>

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

Luwrain.addHook("luwrain.studio.project.types", function(){
    return [
	{id: "py-console", orderIndex: 300, title: "Консольное приложение Python"},
    ];
});

function writeTextFile(file, lines)
{
    var text = "";
    for(var i = 0;i < lines.length;i++)
	text += (lines[i] + "\n");
    org.luwrain.util.FileUtils.writeTextFileSingleString(file, text, "UTF-8");
}

function createPyConsoleApp(destDir)
{
    var destDirFile = new java.io.File(destDir);
    var mainFile = new java.io.File(destDirFile, "console.py");
    var projFile = new java.io.File(destDirFile, "Консольный проект Python.lwrproj");
    var mainFileLines = [
	'print(\'\')',
    ];
    var projFileContent = {
	key: org.luwrain.studio.ProjectFactory.KEY_PYTHON_CONSOLE,
	name: 'Консольное приложение Python',
	folders: {
	    name: 'Консольное приложение Python',
	    subfolders: [],
	    sourceFiles: [
		{name: "Главный файл приложения", path: mainFile.getName()},
	    ],
	}
    };
    writeTextFile(mainFile, mainFileLines);
    writeTextFile(projFile, [JSON.stringify(projFileContent)]);
    return projFile.getAbsolutePath();
}

Luwrain.addHook("luwrain.studio.project.create", function(projType){
    if (projType != 'py-console')
	return null;
    var destDir = new java.io.File("/tmp/py");
    destDir.mkdir();
    return createPyConsoleApp("/tmp/py");
});
