

Luwrain.addCommand("proba", function(){
    var f = new java.io.FileInputStream("/tmp/proba.docx");
    var doc = new org.apache.poi.xwpf.usermodel.XWPFDocument(f);
    var body = doc.getBodyElements();
    for(var i = 0;i < body.length;i++)
    {
	var el = body[i];
	switch (el.getClass().getName())
	{
	    case "org.apache.poi.xwpf.usermodel.XWPFParagraph":
	    continue;
	    	    case "org.apache.poi.xwpf.usermodel.XWPFTable":
	    continue;
	    default:
	    Luwrain.message(el.getClass().getName());
	    return;
	}
    }
    Luwrain.message("ok ");
});
