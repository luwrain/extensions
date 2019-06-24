
var pattern = java.util.regex.Pattern.compile("Battery ([0-9]+): +([a-zA-Z]+), +([0-9]+)%, +([0-9:]+) .*");
var pattern2 = java.util.regex.Pattern.compile("Battery ([0-9]+): +([a-zA-Z]+), +([0-9]+)%.*");

function getBatteries()
{
    var res = [];
    var b = new java.lang.ProcessBuilder(["acpi"]);
    var p = b.start();
    var r = new java.io.BufferedReader(new java.io.InputStreamReader(p.getInputStream()));
    var line = r.readLine();
    while (line != null)
    {
	var matcher = pattern.matcher(line);
	if (matcher.find())
	{
	    var battery = {
		id: matcher.group(1),
		state: matcher.group(2).toLowerCase(),
		level: matcher.group(3),
		estimation: matcher.group(4)};
	    res.push(battery);
	} else
	{
	matcher = pattern2.matcher(line);
	if (matcher.find())
	{
	    var battery = {
		id: matcher.group(1),
		state: matcher.group(2).toLowerCase(),
		level: matcher.group(3),
		estimation: ""};
	    res.push(battery);
	}
	}
	line = r.readLine();
    }
    p.getOutputStream().close();
    p.getInputStream().close();
    p.waitFor();
    return res;
}

Luwrain.addCommand("battery", function(){
    batteries = getBatteries();
    if (batteries.length == 0)
    {
	Luwrain.message.error("Информация о батареи отсутствует");
	return;
    }
    Luwrain.message(batteries[0].level);
});
