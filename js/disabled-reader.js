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

function onIoException(ex, lines)
{
    if (ex.getMessage() != null && ex.getMessage().startsWith("No suitable handler for"))
    {
	lines.push("Формат файла не поддерживается.");
	return;
    }
    lines.push("Ошибка ввода/вывода:");
    if (ex.getClass().getName().equals("org.luwrain.util.Connections$InvalidHttpResponseCodeException"))
    {
	lines.push("Неверный код ответа HTTP-сервера");
	lines.push("Код ответа: " + ex.getHttpCode());
	return;
    }
    if (ex.getClass().getName().equals("java.io.FileNotFoundException"))
	lines.push("Файл не найден"); else
	    if (ex.getClass().getName().equals("java.net.UnknownHostException"))
		lines.push("Неизвестный хост"); else
		    lines.push(ex.getClass().getName());
    var msg = ex.getMessage();
    if (msg != null && !msg.trim().isEmpty())
	lines.push(msg.trim());
}

function onException (ex, lines)
{
    var cause = ex.getCause();
    if (ex.getClass().getName().equals("java.lang.RuntimeException") && cause != null)
    {
	onException(cause);
	return;
    }
    if (java.io.IOException.class.isInstance(ex))
    {
	onIoException(ex, lines);
	return;
    }
    lines.push(ex.getClass().getName());
    var msg = ex.getMessage();
    if (msg != null && !msg.trim().isEmpty())
	lines.push(msg);
}

Luwrain.addHook("luwrain.reader.doc.error", function(props, ex){
    var res = [];
    res.push("Невозможно открыть документ");
    res.push("Адрес: " + props.url);
    var contentType = "" + props.contentType;
    var charset = "" + props.charset;
    if (!contentType.isEmpty())
	res.push("Тип: " + contentType);
    if (!charset.isEmpty())
	res.push("Кодировка: " + charset);
    res.push("");
    if (ex != null)
	onException(ex, res);
    res.push("");
    res.push("Нажмите Esc для возврата");
    return res;
});

function makeParagraphsEachLine(lines)
{
    var res = [];
    for(var i = 0;i < lines.length;i++)
    {
	var line = lines[i];
	if (line.trim().isEmpty())
	    continue;
	res.push({type: "paragraph", runs: [{text: line.trim()}]});
    }
    return res;
}

Luwrain.addHook("luwrain.reader.doc.builder", function(contentType, props, path){
    if (!contentType.equals("text/plain"))
	return null;
    var text = org.luwrain.util.FileUtils.readTextFileSingleString(new java.io.File(path), "UTF-8");
    var lines = org.luwrain.util.FileUtils.universalLineSplitting(text);
    return {nodes: makeParagraphsEachLine(lines)};

    });
