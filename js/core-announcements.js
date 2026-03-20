
Luwrain.addHook("luwrain.announcement", (args)=>{
    if (args.component == "vk")
	return true;
    Luwrain.message(args.text);
});
