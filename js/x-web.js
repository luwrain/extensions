
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
	    if (tagName.toLowerCase() == "script")
		continue;
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
	print(children[i].getClass().getName());
    }
}


Luwrain.addCommand("web-search-google", function(){
    var url = makeGoogleSearchUrl("super", "ru");
    var con = org.jsoup.Jsoup.connect(url);
    con.userAgent(USER_AGENT);
    var doc = con.get();

    printNodes(doc.body());
	
    Luwrain.message("ok");
});
