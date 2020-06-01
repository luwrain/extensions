

function getMountedVolumes()
{
    var fileSystem = java.nio.file.FileSystems.getDefault();
    var stores = fileSystem.getFileStores();
    var it = stores.iterator();
    var res = [];
    while(it.hasNext())
    {
	var item = it.next();
	var name = item.toString();
	if (name.startsWith("/sys"))
	    continue;
	if (name.startsWith("/proc"))
	    continue;
	if (name.startsWith("/dev"))
	    continue;
	if (name.startsWith("/run"))
	    continue;
	res.push(name);
    }
    return res;
}
