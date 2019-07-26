



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
    //FIXME:
    return line;
}

function writeTextFile(file, lines)
{
    var text = "";
    for(var i = 0;i < lines.length;i++)
	text += (lines[i] + "\n");
    org.luwrain.util.FileUtils.writeTextFileSingleString(file, text, "UTF-8");
}

function createTexPresentation(destDir, author, title)
{
    var destDirFile = new java.io.File(destDir);
    var mainFile = new java.io.File(destDirFile, "presentation.tex");
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
    writeTextFile(mainFile, mainFileLines);
}

Luwrain.addHook("luwrain.studio.project.create", function(projType){
    if (projType != 'tex-presentation')
	return null;
    	var popupName = "Новая презентация TeX";
    var author = Luwrain.popups.simple(popupName, "Имя автора:", "");
    if (author == null)
	return false;
    var title = Luwrain.popups.simple(popupName, "Название презентации:", "");
    var destDir = new java.io.File("/tmp/pr");
    destDir.mkdir();
    createTexPresentation("/tmp/pr", author, title);
});
