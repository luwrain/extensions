
function commit(item, res)
{
    if (current.type === 'none')
	return;
    res.push(current);
}

var res = [];
var line = "\\sqrt x \\frac {y}{z}";

var current = {type: 'none'};

for(var i = 0;i < line.length;i++)
{
    var c = line[i];
    //backslash
    if (c === '\\')
    {
	commit(current, res);
	current = {type: 'none'};
	res.push({type: 'backslash'});
	continue;
    }
    //block
    if (c === '{' || c === '(' || c === '}' || c === ')')
    {
	commit(current, res);
	current = {type: 'none'};
	res.push({type: 'block', value: c});
	continue;
    }
    //space
    if (line[i] === ' ')
    {
	commit(current, res);
	current = {type: 'none'};
	res.push({type: 'space'});
	continue;
    }
    //letters
    if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'))
    {
	if (current.type != 'letters')
	{
	    commit(current, res);
	    current.type = 'letters';
	    current.value = '';
	}
	current.value += c;
	continue;
    }
}
commit(current, res);

print(res.length);

for(var i = 0;i < res.length;i++)
{
    print(res[i].type + " " + res[i].value);
}
