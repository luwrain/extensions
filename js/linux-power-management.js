

Luwrain.addCommand("poweroff", ()=>{
    Linux.runAsync("sudo systemctl poweroff");
});

Luwrain.addCommand("reboot", ()=>{
    Linux.runAsync("sudo systemctl reboot");
});

Luwrain.addCommand("suspend", ()=>{
    Linux.runAsync("sudo systemctl suspend");
});

Luwrain.addCommand("battery", ()=>{
    Linux.runAsync("echo proba", (l)=>{
	const line = 'Battery 0: Discharging, 19%, 00:43:09 remaining';
	const m = line.trim().match(/^Battery .* ([0-9]+)%.*$/);
	if (!m) 
	    return;
	Luwrain.message(m[1] + "% заряд батареи");
    });
});
