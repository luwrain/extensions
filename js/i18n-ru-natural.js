/*
   Copyright 2019-2020 Michael Pozhidaev <msp@luwrain.org>

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

function getFilter(exp)
{
    return org.luwrain.nlp.ru.TokenFilters.get(exp);
}

var RULES = [
    {filter: 'luwrain', text: 'лур+эйн'},
];

for(var i = 0;i < RULES.length;i++)
    RULES[i].filter = getFilter(RULES[i].filter);

function applyRule(rule, tokens)
{
    var res = [];
    for(var i = 0;i < tokens.length;i++)
	if (rule.filter.match(tokens, i))
    {
	var r = {
	    text: rule.text,
	    posFrom: i,
	    posTo: i + rule.filter.length
	};
	print(r);
	res.push(r);
    }
    print('result ' + res.length);
    return res;
}

function applyRules(tokens)
{
    var res = [];
    for(var i in RULES)
    {
	var r = applyRule(RULES[i], tokens);
	for(var j in r)
	    res.push(r[j]);
    }
    return res;
}

function resolveGroupConflicts(groups)
{
    var res = groups;
    for(var i = 0;i < res.length;i++)
	for(var j = 0;j < res.length;j++)
	    if (i != j && res[i] != null && res[j] != null)
    {
	var g1 = res[i];
	var g2 = groups[j];
	    if (g1.posFrom >= g2.posTo || g2.posFrom >= g1.posTo)
		continue;
	var len1 = g1.posTo - g1.posFrom;
	var len2 = g2.posTo - g2.posFrom;
	if (len1 > len2)
	    res[j] = null; else
		res[i] = null;
    }
    var cleaned = [];
    for(var i = 0;i < res.length;i++)
	if (res[i] != null)
	    cleaned.push(res[i]);
    return cleaned;
}

function insertGroups(tokens, groups)
{
    for(var i in groups)
    {
	var g = groups[i];
	tokens[g.posFrom] = {type: 'group', text: g.text};
	for(var j = g.posFrom + 1;j < g.posTo;j++)
	    tokens[j] = null;
    }
}

function buildResult(tokens)
{
    var res = '';
    for(var i in tokens)
    {
	var token = tokens[i];
	if (token != null && token != undefined)
	    res += token.text;
    }
    return res;
}

Luwrain.addHook("luwrain.i18n.ru.speakable.natural", function(tokensList){
    var tokens = [];
    for(var i = 0;i < tokensList.length;i++)
	tokens.push(tokensList[i]);
    var groups = applyRules(tokens);
    groups = resolveGroupConflicts(groups);
    insertGroups(tokens, groups);
    return buildResult(tokens);
})
