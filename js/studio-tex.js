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
	{id: "tex-presentation", orderIndex: 0, title: "Презентация TeX"},
	{id: "tex-article", orderIndex: 1, title: "Статья TeX"},
	{id: "tex-thesis", orderIndex: 2, title: "Диссертация TeX"},
	{id: "tex-thesis-referat", orderIndex: 3, title: "Автореферат диссертации TeX"},
	{id: "tex-book", orderIndex: 4, title: "Книга TeX"},
    ];
});

function escapeTex(line)
{
    return line.replaceAll('\\\\', '\\\\\\\\').replaceAll('%', '\\\\%');
}

function writeTextFile(file, lines)
{
    var text = "";
    for(var i = 0;i < lines.length;i++)
	text += (lines[i] + "\n");
    org.luwrain.util.FileUtils.writeTextFileSingleString(file, text, "UTF-8");
}

function createTexPresentation(destDir, author, title, frameTitles)
{
    var destDirFile = new java.io.File(destDir);
    var mainFile = new java.io.File(destDirFile, "presentation.tex");
    var projFile = new java.io.File(destDirFile, "Презентация.lwrproj");
    var mainFileLines = [
	'\\documentclass{beamer}',
	'',
	'\\usepackage[russian]{babel}',
	'\\usepackage[utf8]{inputenc}',
	'\\usepackage{cmap}',
	'\\usepackage{amsmath}',
	'\\usepackage[normalem]{ulem}',
	'\\usepackage{graphicx}',
	'\\usepackage{xspace}',
	'\\usepackage{epsfig}',
	'\\usepackage{hyperref}',
	'',
	'\\setbeamertemplate{footline}[frame number]',
	'\\usecolortheme{seahorse}',
	'',
	'\\author{' + escapeTex(author) + '}',
	'\\title{' + escapeTex(title) + '}',
	'\\date{}',
	'',
	'\\begin{document}',
	'',
	'\\maketitle',
    ];
    for(var i = 0;i < frameTitles.length;i++)
    {
	mainFileLines.push('');
	mainFileLines.push('\\begin{frame}');
	mainFileLines.push('\\frametitle{' + escapeTex(frameTitles[i]) + '}');
	mainFileLines.push('');
	mainFileLines.push('Текст нового слайда');
	mainFileLines.push('');
	mainFileLines.push('\\end{frame}');
    }
    mainFileLines.push('');
    mainFileLines.push('\\begin{frame}');
    mainFileLines.push('\\begin{center}');
    mainFileLines.push('{\\LARGE Спасибо за внимание!}');
    mainFileLines.push('');
    mainFileLines.push('\\vspace{0.5cm}');
    mainFileLines.push('');
    mainFileLines.push('Пишите нам!');
    mainFileLines.push('');
    mainFileLines.push('\\end{center}');
    mainFileLines.push('\\end{frame}');
    mainFileLines.push('');
    mainFileLines.push('\\end{document}');
    var projFileContent = {
	key: org.luwrain.studio.ProjectFactory.KEY_TEX_PRESENTATION,
	name: title,
	folders: {
	    name: title,
	    subfolders: [],
	    sourceFiles: [
		{name: "Главный файл презентации", path: mainFile.getName()},
	    ],
	}
    };
    writeTextFile(mainFile, mainFileLines);
    writeTextFile(projFile, [JSON.stringify(projFileContent)]);
    return projFile.getAbsolutePath();
}

Luwrain.addHook("luwrain.studio.project.create", function(projType, destDirName){
    if (projType != 'tex-presentation')
	return null;
    var popupName = "Новая презентация TeX";
    var author = Luwrain.popups.simple(popupName, "Имя автора:", "");
    if (author == null)
	return false;
    var title = Luwrain.popups.simple(popupName, "Название презентации:", "");
    if (title == null)
	return false;
    if (title.trim().isEmpty())
	title = 'Название новой презентации';
    if (author.trim().isEmpty())
	author = 'Автор новой презентации';
    var frameTitles = [];
    do {
	newFrameTitle = Luwrain.popups.simple(popupName, "Заголовок слайда " + (frameTitles.length + 1) + " (оставьте пустым для окончания ввода заголовков слайдов)", "");
	if (newFrameTitle == null)
	    return false;
	newFrameTitle = newFrameTitle.trim();
	if (!newFrameTitle.isEmpty())
	    frameTitles.push(newFrameTitle);
    } while(!newFrameTitle.isEmpty());
    var destDir = new java.io.File(destDirName);
    destDir.mkdir();
    return createTexPresentation("/tmp/pr", author, title, frameTitles);
});

Luwrain.addHook("luwrain.studio.tex.appearance", function(index, line){
    var  text = line;
    text = text.replaceAll("\\{", " левая фигурная ").replaceAll("\\}", " правая фигурная ");
    Luwrain.speak(text);
    return true;
})
