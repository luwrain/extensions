
var USER_AGENT = "MOZILLA/5.0";

function makeGoogleSearchUrl(query, lang)
{
    return "http://www.google.ru/search?q=" + java.net.URLEncoder.encode(query) + "&hl=" + lang + "&ie=utf-8";
}

function getAttr(node)
{
    var attr = node.attributes();
    if (attr != null)
	attr = Java.from(attr.asList());
    if (attr == null)
	return {array: [], map: {}};
    var res = {array: [], map: {}, id: "", cl: ""};
    for(var i = 0;i < attr.length;i++)
    {
	var key = attr[i].getKey();
	if (key == null)
	    continue;
	var value = attr[i].getValue();
	if (value == null)
	    value = "";
	res.array.push({key: key, value: value});
	res.map[key] = value;
	if (key.toLowerCase() == "id")
	    res.id = value;
	if (key.toLowerCase() == "class")
	    res.cl = value;
    }
    return res;
}

function getNodeText(node)
{
    var children = node.childNodes();
    if (children == null)
	return "";
        var res = "";
    for(var i = 0;i < children.length;i++)
    {
	var cl = children[i].getClass().getName();
	if (cl == "org.jsoup.nodes.Element")
	{
	    res += getNodeText(children[i]);
	    continue;
	}
	if (cl == "org.jsoup.nodes.TextNode")
	{
res += children[i].text();
	    continue;
    }
    }
return res;
}


function googleFindRes(node, result)
{
    var children = node.childNodes();
    if (children == null)
	return;
    for(var i = 0;i < children.length;i++)
    {
	var cl = children[i].getClass().getName();
	if (cl == "org.jsoup.nodes.Element")
	{
	    var tagName = children[i].nodeName();
	    var attr = getAttr(children[i]);
	    var id = attr.id.toLowerCase();
	    if (id == "res")
	    {
		result.items = children[i];
		return;
	    }
	    googleFindRes(children[i], result);
	    if (result.items != null)
		return;
	    continue;
	}
    }
}

function googleParseItem(node, result)
{
    var header = node.getElementsByTag("h3");
    if (header != null && header.length == 1)
	header = getNodeText(header[0]);
    print("Header: " + header);
    //printNodes(node);
    var cite = node.getElementsByTag("cite");
    if (cite != null && cite.length == 1)
	cite = getNodeText(cite[0]);
    print("Cite: " + cite);
    /*
    var stored = node.getElementsByTag("li");
    print(stored[0]);
    /*
    if (stored != null && stored.length == 1)
	stored = stored[0];
    printNodes(stored);
    */
    */
}


function printNodes(node)
{
    var children = node.childNodes();
    if (children == null)
	return;
    for(var i = 0;i < children.length;i++)
    {
	var cl = children[i].getClass().getName();
	if (cl == "org.jsoup.nodes.Element")
	{
	    var tagName = children[i].nodeName();
	    var attr = getAttr(children[i]);
	    var id = attr.id.toLowerCase();
	    print("<" + tagName + ">");
	    if (!attr.id.isEmpty())
		print("ID: " + attr.id);
	    printNodes(children[i]);
	    continue;
	}
	if (cl == "org.jsoup.nodes.TextNode")
	{
	    print("\"" + children[i].text() + "\"");
	    continue;
	}
    }
}

Luwrain.addCommand("web-search-google", function(){
    var url = makeGoogleSearchUrl("super", "ru");
    var con = org.jsoup.Jsoup.connect(url);
    con.userAgent(USER_AGENT);
    var doc = con.get();
    var result = {items: null};
    googleFindRes(doc.body(), result);
    if (result.items != null)
    {
	var items = result.items.children()[1].children()[0].children()[0].children();
	for(var i = 0;i < items.length;i++)
	googleParseItem(items[i]);
    }

    Luwrain.message("ok");
});
