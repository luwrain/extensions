/*
   Copyright 2019-2021 Michael Pozhidaev <msp@luwrain.org>

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

var RULES = [
    {filter: 'luwrain', text: 'лур+эйн'},

    //static latin
    /*
    {filter: '3d', text: 'три дэ'},
    {filter: '3g', text: 'три жи'},
    {filter: 'alphabet', text: '+Альфабэт'},
    {filter: 'amazon', text: 'Амазон'},
    {filter: 'amd', text: 'аэмд+и'},
    {filter: 'airbus', text: 'Эйрбас'},
    {filter: 'android', text: 'Андроид'},
    {filter: 'apple', text: 'Эппл'},
        {filter: 'appstore', text: 'апстор'},
    {filter: 'audi', text: '+аУДИ'},
    {filter: 'aurus', text: '+Аурус'},
    {filter: 'bbc', text: 'бибис+и'},
            {filter: 'bentley', text: 'бэнтли'},
    {filter: 'bigdata', text: 'Бигдата'},
        {filter: 'bitcoin', text: 'биткойн'},
    {filter: 'bloomberg', text: 'Блумберг'},
    {filter: 'boeing', text: 'Боинг'},
    {filter: 'build', text: 'билд'},
        {filter: 'building', text: 'билдинг'},
        {filter: 'capslock', text: 'капслок'},
    {filter: 'chevrolet', text: 'Шевро+ле'},
    {filter: 'chrome', text: 'Хром'},
    {filter: 'cnews', text: 'синьюз'},
            {filter: 'cnn', text: 'сиэнэн'},
    {filter: 'coca-cola', text: 'кока кола'},
        {filter: 'coca-cola', text: 'кока кола'},
    {filter: 'covid', text: 'ковид'},
            {filter: 'data science', text: 'дэйта сайенс'},
        {filter: 'debian', text: 'дебиан'},
    {filter: 'doom', text: 'дум'},
    {filter: 'enter', text: 'энтэр'},
    {filter: 'esc', text: 'эск+ейп'},
    {filter: 'escape', text: 'эск+ейп'},
    {filter: 'кetc', text: 'этсэтра'},
    {filter: 'facebook', text: 'Фэйсбук'},
        {filter: 'fedora', text: 'федора'},
    {filter: 'femen', text: 'Фем+ен'},
    {filter: 'financial times', text:  'Файнэншл Таймс'},
        {filter: 'firefox', text:  'файрфокс'},
    {filter: 'forbes', text: 'Форбс'},
    {filter: 'fortnite', text: 'фортнайт'},
        {filter: 'fox news', text: 'фокс ньюс'},
    {filter: 'gmail', text: 'Джимэйл'},
    {filter: 'google', text: 'Гугл'},
    {filter: 'gpl', text: 'джипи+эль'},
    {filter: 'grammy', text: 'Грэмми'},
    {filter: 'huawei', text: 'Хуавэй'},
        {filter: 'honda', text: 'хонда'},
    {filter: 'intel', text: 'Интл'},
    {filter: 'ipo', text: 'айпи+о'},
    {filter: 'instagram', text: 'Инстаграм'},
    {filter: 'ios', text: 'аи+ос'},
    {filter: 'iphone', text: 'айфон'},
    {filter: 'ip', text: 'айпи'},
    {filter: 'ipad', text: 'айпад'},
        {filter: 'it', text: 'айти'},
    {filter: 'jaguar', text: 'Ягуар'},
    {filter: 'java', text: 'Джава'},
    {filter: 'javascript', text: 'Джава скрипт'},
    {filter: 'jaws', text: 'джос'},
        {filter: 'jaws for windows', text: 'джос фор в+индоус'},
        {filter: 'kindle', text: 'киндл'},
    {filter: 'kpi', text: 'кипиай'},
    {filter: 'lg', text: 'элджи'},
    {filter: 'libreoffice', text: 'Либреоффис'},
    {filter: 'lilypond', text: 'Лилипонд'},
    {filter: 'linux', text: 'Линукс'},
    {filter: 'lucasfilm', text: 'Лукасфилм'},
    {filter: 'lte', text: 'элтэйе'},
        {filter: 'lts', text: 'элтээс'},
    {filter: 'mastercard', text: 'мастеркард'},
            {filter: 'mazda', text: 'мазда'},
    {filter: 'michelin', text: 'мишлен'},
    {filter: 'microsoft', text: 'Майкрософт'},
    {filter: 'mozilla', text: 'Мозилла'},
    {filter: 'nasa', text: 'НАСА'},
    {filter: 'netflix', text: 'Нетфликс'},
    {filter: 'nokia', text: 'Нокиа'},
    {filter: 'numlock', text: 'намлок'},
    {filter: 'nvda', text: 'энвидэа'},
        {filter: 'nvidia', text: 'энвидиа'},
    {filter: 'opera', text: 'опера'},
        {filter: 'open source', text: 'оупэнсоурс'},
    {filter: 'ok', text: 'окей'},
    {filter: 'panasonic', text: 'панасоник'},
    {filter: 'pentium', text: 'Пентиум'},
    {filter: 'python', text: 'Пайтон'},
    {filter: 'qiwi', text: 'киви'},
    {filter: 'qr', text: 'кьюар'},
    {filter: 'rambler', text: 'Рамблер'},
    {filter: 'room', text: 'рум'},
    {filter: 'reuters', text: 'Рейтэр'},
    {filter: 'snickers', text: 'Сникерс'},
    {filter: 'samsung', text: 'Самсунг'},
    {filter: 'sony', text: 'Сони'},
    {filter: 'tadviser', text: 'Тадвайзер'},
        {filter: 'tcp', text: 'тисип+и'},
    {filter: 'telegram', text: 'Телеграм'},
    {filter: 'tesla', text: 'Тесла'},
    {filter: 'tex', text: 'Тех'},
        {filter: 'tiktok', text: 'тикток'},
    {filter: 'time', text: 'Тайм'},
        {filter: 'tinder', text: 'тиндэр'},
    {filter: 'times', text: 'Таймс'},
    {filter: 'toyota', text: 'Тойота'},
    {filter: 'twitter', text: 'Твиттер'},
    {filter: 'uber', text: 'Убер'},
    {filter: 'ubuntu', text: 'Убунту'},
    {filter: 'youtube', text: 'Ютуб'},
    {filter: 'usb', text: 'юэсб+и'},
    {filter: 'utair', text: 'Ютэйр'},
        {filter: 'visa', text: 'виза'},
    {filter: 'vr', text: 'ви+ар'},
        {filter: 'vs', text: 'виэс'},
    {filter: 'wada', text: 'ВАДА'},
    {filter: 'walmart', text: '+уолмарт'},
    {filter: 'walt disney', text: 'уолт дисней'},
        {filter: 'wechat', text: 'вичат'},
    {filter: 'whatsapp', text: 'вотсапп'},
    {filter: 'wikileaks', text: 'викиликс'},
    {filter: 'windows', text: 'Виндоуз'},
    {filter: 'wsj', text: 'Уоллстрит джорнл'},
    {filter: 'xiaomi', text: 'Сиаоми'},
*/

    //acronyms
    {filter: 'т. *е.', text: 'то есть'},
            {filter: 'т. *к.', text: 'так как'},
    {filter: '90-е', text: 'девяностые'},
    {filter: 'н. э.', text: 'нашей эры'},

];

function getFilter(exp)
{
    return org.luwrain.nlp.ru.TokenFilters.get(exp);
}
for(var i = 0;i < RULES.length;i++)
    RULES[i].filter = getFilter(RULES[i].filter);

function applyRule(rule, tokens)
{
    var res = [];
    for(var i = 0;i < tokens.length;i++) {
	var k = rule.filter.match(tokens, i);
	if (k > 0) {
	    var r = {
		text: rule.text,
		posFrom: i,
		posTo: i + k
	    };
	    res.push(r);
	}
    }
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
	    if (i != j && res[i] != null && res[j] != null) {
	var g1 = res[i];
	var g2 = res[j];
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

function insertCustom(tokens)
{
    for(var i = 0;i < tokens.length;i++)
    {
	if (tokens[i] == null)
	    continue;
	if (tokens[i].text === '(')
	{
	    tokens[i] = {text: ' в круглых скобках '};
	    continue;
	}
		if (tokens[i].text === ')')
	{
	    tokens[i] = {text: ' закрылась скобка '};
	    continue;
	}
			if (tokens[i].text === '\"')
	{
	    tokens[i] = {text: ' двойная кавычка '};
	    continue;
	}
    }
}

Luwrain.addHook("luwrain.i18n.ru.speakable.natural", function(tokensList){
    var tokens = [];
    for(var i = 0;i < tokensList.length;i++)
	tokens.push(tokensList[i]);
    var groups = applyRules(tokens);
    groups = resolveGroupConflicts(groups);
    insertGroups(tokens, groups);
    insertCustom(tokens);
    return buildResult(tokens);
})
