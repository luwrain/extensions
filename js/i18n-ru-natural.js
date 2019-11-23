/*
   Copyright 2019 Michael Pozhidaev <msp@luwrain.org>

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

var RULES = [];

var CYRIL = 'cyril';
var LATIN = 'latin';
var NUM = 'num';
var PRED = 'pred';
var PUNC = 'punc';
var SPACE = {type: 'space'};

function cyril(text)
{
    return {type: CYRIL, text: text};
}
function latin(text)
{
    return {type: LATIN, text: text};
}
function num(text)
{
    return {type: NUM, text: text};
}
function pred(text)
{
    return {class: PRED, text: text};
}
function punc(text)
{
    return {type: PUNC, text: text};
}

function buildNumText(group)
{
    var res = '';
    if (group.prefix != null && group.prefix != undefined)
	res += group.prefix;
    res += (' ' + group.value + ' ');
    if (group.suffix != null && group.suffix != undefined)
	res += group.suffix;
    return res.trim();
}
function buildFixedText(group)
{
    if (group.text != null && group.text != undefined)
	return group.text;
    return "";
}
function buildDollarsText(group)
{
    return group.value + ' долларов';
}
function buildCentGroupText(group)
{
    res = '';
    if (group.prefix != null && !group.prefix.isEmpty())
	res += (group.prefix + ' ');
    res += group.value;//FIXME:proper form
    res += ' веке';
    return res;
}
function buildPercentGroupText(group)
{
    res = '';
    if (group.prefix != null && !group.prefix.isEmpty())
	res += (group.prefix + ' ');
    res += group.value;//FIXME:proper form
    res += ' процентов';
    return res;
}

function fixed(conds, text)
{
    return {conds: conds,
	    groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: text}; }};
}

function buildGroupText(group)
{
    if (group.textFunc == null || group.textFunc == undefined)
	return "No text function";
    return group.textFunc(group);
}

var RU_PREDS = [
    "в",
    "к",
    "на",
    'до',
    "от",
];

var ROMAN_NUMS = [
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
    "XIII",
    "XIV",
    "XV",
    "XVI",
    "XVII",
    "XVIII",
    "XIX",
    "XX",
    "XXI",
    "XXII",
    "XXIII",
    "XXIV",
    "XXV",
    "XXVI",
    "XXVII",
    "XXVIII",
    "XXIX",
    "XXX",
    "XXXI",
    "XXXII",
    "XXXIII",
    "XXXIV",
    "XXXV",
    "XXXVI",
    "XXXVII",
    "XXXVIII",
    "XXXIX",
    "XL",
    "XLI",
    "XLII",
    "XLIII",
    "XLIV",
    "XLV",
    "XLVI",
    "XLVII",
    "XLVIII",
    "XLIX",
    "L",
    "LI",
    "LII",
    "LIII",
    "LIV",
    "LV",
    "LVI",
    "LVII",
    "LVIII",
    "LIX",
    "LX",
    "LXI",
    "LXII",
    "LXIII",
    "LXIV",
    "LXV",
    "LXVI",
    "LXVII",
    "LXVIII",
    "LXIX",
    "LXX",
    "LXXI",
    "LXXII",
    "LXXIII",
    "LXXIV",
    "LXXV",
    "LXXVI",
    "LXXVII",
    "LXXVIII",
    "LXXIX",
    "LXXX",
    "LXXXI",
    "LXXXII",
    "LXXXIII",
    "LXXXIV",
    "LXXXV",
    "LXXXVI",
    "LXXXVII",
    "LXXXVIII",
    "LXXXIX",
    "XC",
    "XCI",
    "XCII",
    "XCIII",
    "XCIV",
    "XCV",
    "XCVI",
    "XCVII",
    "XCVIII",
    "XCIX",
    "C",
    "CI",
    "CII",
    "CIII",
    "CIV",
    "CV",
    "CVI",
    "CVII",
    "CVIII",
    "CIX",
    "CX",
    "CXI",
    "CXII",
    "CXIII",
    "CXIV",
    "CXV",
    "CXVI",
    "CXVII",
    "CXVIII",
    "CXIX",
    "CXX",
    "CXXI",
    "CXXII",
    "CXXIII",
    "CXXIV",
    "CXXV",
    "CXXVI",
    "CXXVII",
    "CXXVIII",
    "CXXIX",
    "CXXX",
    "CXXXI",
    "CXXXII",
    "CXXXIII",
    "CXXXIV",
    "CXXXV",
    "CXXXVI",
    "CXXXVII",
    "CXXXVIII",
    "CXXXIX",
    "CXL",
    "CXLI",
    "CXLII",
    "CXLIII",
    "CXLIV",
    "CXLV",
    "CXLVI",
    "CXLVII",
    "CXLVIII",
    "CXLIX",
    "CL",
    "CLI",
    "CLII",
    "CLIII",
    "CLIV",
    "CLV",
    "CLVI",
    "CLVII",
    "CLVIII",
    "CLIX",
    "CLX",
    "CLXI",
    "CLXII",
    "CLXIII",
    "CLXIV",
    "CLXV",
    "CLXVI",
    "CLXVII",
    "CLXVIII",
    "CLXIX",
    "CLXX",
    "CLXXI",
    "CLXXII",
    "CLXXIII",
    "CLXXIV",
    "CLXXV",
    "CLXXVI",
    "CLXXVII",
    "CLXXVIII",
    "CLXXIX",
    "CLXXX",
    "CLXXXI",
    "CLXXXII",
    "CLXXXIII",
    "CLXXXIV",
    "CLXXXV",
    "CLXXXVI",
    "CLXXXVII",
    "CLXXXVIII",
    "CLXXXIX",
    "CXC",
    "CXCI",
    "CXCII",
    "CXCIII",
    "CXCIV",
    "CXCV",
    "CXCVI",
    "CXCVII",
    "CXCVIII",
    "CXCIX",
    "CC",
    "CCI",
    "CCII",
    "CCIII",
    "CCIV",
    "CCV",
    "CCVI",
    "CCVII",
    "CCVIII",
 "CCIX",
    "CCX",
    "CCXI",
    "CCXII",
    "CCXIII",
    "CCXIV",
    "CCXV",
    "CCXVI",
    "CCXVII",
    "CCXVIII",
    "CCXIX",
    "CCXX",
    "CCXXI",
    "CCXXII",
    "CCXXIII",
    "CCXXIV",
    "CCXXV",
    "CCXXVI",
    "CCXXVII",
    "CCXXVIII",
    "CCXXIX",
    "CCXXX",
    "CCXXXI",
    "CCXXXII",
    "CCXXXIII",
    "CCXXXIV",
    "CCXXXV",
    "CCXXXVI",
    "CCXXXVII",
    "CCXXXVIII",
    "CCXXXIX",
    "CCXL",
    "CCXLI",
    "CCXLII",
    "CCXLIII",
    "CCXLIV",
    "CCXLV",
    "CCXLVI",
    "CCXLVII",
    "CCXLVIII",
    "CCXLIX",
    "CCL",
    "CCLI",
    "CCLII",
    "CCLIII",
    "CCLIV",
    "CCLV",
    "CCLVI",
    "CCLVII",
    "CCLVIII",
    "CCLIX",
    "CCLX",
    "CCLXI",
    "CCLXII",
    "CCLXIII",
    "CCLXIV",
    "CCLXV",
    "CCLXVI",
    "CCLXVII",
    "CCLXVIII",
    "CCLXIX",
    "CCLXX",
    "CCLXXI",
    "CCLXXII",
    "CCLXXIII",
    "CCLXXIV",
    "CCLXXV",
    "CCLXXVI",
    "CCLXXVII",
    "CCLXXVIII",
    "CCLXXIX",
    "CCLXXX",
    "CCLXXXI",
    "CCLXXXII",
    "CCLXXXIII",
    "CCLXXXIV",
    "CCLXXXV",
    "CCLXXXVI",
    "CCLXXXVII",
    "CCLXXXVIII",
    "CCLXXXIX",
    "CCXC",
    "CCXCI",
    "CCXCII",
    "CCXCIII",
    "CCXCIV",
    "CCXCV",
    "CCXCVI",
    "CCXCVII",
    "CCXCVIII",
    "CCXCIX",
    "CCC",
    "CCCI",
    "CCCII",
    "CCCIII",
    "CCCIV",
    "CCCV",
    "CCCVI",
    "CCCVII",
    "CCCVIII",
    "CCCIX",
    "CCCX",
    "CCCXI",
    "CCCXII",
    "CCCXIII",
    "CCCXIV",
    "CCCXV",
    "CCCXVI",
    "CCCXVII",
    "CCCXVIII",
    "CCCXIX",
    "CCCXX",
    "CCCXXI",
    "CCCXXII",
    "CCCXXIII",
    "CCCXXIV",
    "CCCXXV",
    "CCCXXVI",
    "CCCXXVII",
    "CCCXXVIII",
    "CCCXXIX",
    "CCCXXX",
    "CCCXXXI",
    "CCCXXXII",
    "CCCXXXIII",
    "CCCXXXIV",
    "CCCXXXV",
    "CCCXXXVI",
    "CCCXXXVII",
    "CCCXXXVIII",
    "CCCXXXIX",
    "CCCXL",
    "CCCXLI",
    "CCCXLII",
    "CCCXLIII",
    "CCCXLIV",
    "CCCXLV",
    "CCCXLVI",
    "CCCXLVII",
    "CCCXLVIII",
    "CCCXLIX",
    "CCCL",
    "CCCLI",
    "CCCLII",
    "CCCLIII",
    "CCCLIV",
    "CCCLV",
    "CCCLVI",
    "CCCLVII",
    "CCCLVIII",
    "CCCLIX",
    "CCCLX",
    "CCCLXI",
    "CCCLXII",
    "CCCLXIII",
    "CCCLXIV",
    "CCCLXV",
    "CCCLXVI",
    "CCCLXVII",
    "CCCLXVIII",
    "CCCLXIX",
    "CCCLXX",
    "CCCLXXI",
    "CCCLXXII",
    "CCCLXXIII",
    "CCCLXXIV",
    "CCCLXXV",
    "CCCLXXVI",
    "CCCLXXVII",
    "CCCLXXVIII",
    "CCCLXXIX",
    "CCCLXXX",
    "CCCLXXXI",
    "CCCLXXXII",
    "CCCLXXXIII",
    "CCCLXXXIV",
    "CCCLXXXV",
    "CCCLXXXVI",
    "CCCLXXXVII",
    "CCCLXXXVIII",
    "CCCLXXXIX",
    "CCCXC",
    "CCCXCI",
    "CCCXCII",
    "CCCXCIII",
    "CCCXCIV",
    "CCCXCV",
    "CCCXCVI",
    "CCCXCVII",
    "CCCXCVIII",
    "CCCXCIX",
    "CD",
    "CDI",
    "CDII",
    "CDIII",
    "CDIV",
    "CDV",
    "CDVI",
    "CDVII",
    "CDVIII",
    "CDIX",
    "CDX",
    "CDXI",
    "CDXII",
    "CDXIII",
    "CDXIV",
    "CDXV",
    "CDXVI",
    "CDXVII",
    "CDXVIII",
    "CDXIX",
    "CDXX",
    "CDXXI",
    "CDXXII",
    "CDXXIII",
    "CDXXIV",
    "CDXXV",
    "CDXXVI",
    "CDXXVII",
    "CDXXVIII",
    "CDXXIX",
    "CDXXX",
    "CDXXXI",
    "CDXXXII",
    "CDXXXIII",
    "CDXXXIV",
    "CDXXXV",
    "CDXXXVI",
    "CDXXXVII",
    "CDXXXVIII",
    "CDXXXIX",
    "CDXL",
    "CDXLI",
    "CDXLII",
    "CDXLIII",
    "CDXLIV",
    "CDXLV",
    "CDXLVI",
    "CDXLVII",
    "CDXLVIII",
    "CDXLIX",
    "CDL",
    "CDLI",
    "CDLII",
    "CDLIII",
    "CDLIV",
    "CDLV",
    "CDLVI",
    "CDLVII",
    "CDLVIII",
    "CDLIX",
    "CDLX",
    "CDLXI",
    "CDLXII",
    "CDLXIII",
    "CDLXIV",
    "CDLXV",
    "CDLXVI",
    "CDLXVII",
    "CDLXVIII",
    "CDLXIX",
    "CDLXX",
    "CDLXXI",
    "CDLXXII",
    "CDLXXIII",
    "CDLXXIV",
    "CDLXXV",
    "CDLXXVI",
    "CDLXXVII",
    "CDLXXVIII",
    "CDLXXIX",
    "CDLXXX",
    "CDLXXXI",
    "CDLXXXII",
    "CDLXXXIII",
    "CDLXXXIV",
    "CDLXXXV",
    "CDLXXXVI",
    "CDLXXXVII",
    "CDLXXXVIII",
    "CDLXXXIX",
    "CDXC",
    "CDXCI",
    "CDXCII",
    "CDXCIII",
    "CDXCIV",
    "CDXCV",
    "CDXCVI",
    "CDXCVII",
    "CDXCVIII",
    "CDXCIX",
    "D",
    "DI",
    "DII",
    "DIII",
    "DIV",
    "DV",
    "DVI",
    "DVII",
    "DVIII",
    "DIX",
    "DX",
    "DXI",
    "DXII",
    "DXIII",
    "DXIV",
    "DXV",
    "DXVI",
    "DXVII",
    "DXVIII",
    "DXIX",
    "DXX",
    "DXXI",
    "DXXII",
    "DXXIII",
    "DXXIV",
    "DXXV",
    "DXXVI",
    "DXXVII",
    "DXXVIII",
    "DXXIX",
    "DXXX",
    "DXXXI",
    "DXXXII",
    "DXXXIII",
    "DXXXIV",
    "DXXXV",
    "DXXXVI",
    "DXXXVII",
    "DXXXVIII",
    "DXXXIX",
    "DXL",
    "DXLI",
    "DXLII",
    "DXLIII",
    "DXLIV",
    "DXLV",
    "DXLVI",
    "DXLVII",
    "DXLVIII",
    "DXLIX",
    "DL",
    "DLI",
    "DLII",
    "DLIII",
    "DLIV",
    "DLV",
    "DLVI",
    "DLVII",
    "DLVIII",
    "DLIX",
    "DLX",
    "DLXI",
    "DLXII",
    "DLXIII",
    "DLXIV",
    "DLXV",
    "DLXVI",
    "DLXVII",
    "DLXVIII",
    "DLXIX",
    "DLXX",
    "DLXXI",
    "DLXXII",
    "DLXXIII",
    "DLXXIV",
    "DLXXV",
    "DLXXVI",
    "DLXXVII",
    "DLXXVIII",
    "DLXXIX",
    "DLXXX",
    "DLXXXI",
    "DLXXXII",
    "DLXXXIII",
    "DLXXXIV",
    "DLXXXV",
    "DLXXXVI",
    "DLXXXVII",
    "DLXXXVIII",
    "DLXXXIX",
    "DXC",
    "DXCI",
    "DXCII",
    "DXCIII",
    "DXCIV",
    "DXCV",
    "DXCVI",
    "DXCVII",
    "DXCVIII",
    "DXCIX",
    "DC",
    "DCI",
    "DCII",
    "DCIII",
    "DCIV",
    "DCV",
    "DCVI",
    "DCVII",
    "DCVIII",
    "DCIX",
    "DCX",
    "DCXI",
    "DCXII",
    "DCXIII",
    "DCXIV",
    "DCXV",
    "DCXVI",
    "DCXVII",
    "DCXVIII",
    "DCXIX",
    "DCXX",
    "DCXXI",
    "DCXXII",
    "DCXXIII",
    "DCXXIV",
    "DCXXV",
    "DCXXVI",
    "DCXXVII",
    "DCXXVIII",
    "DCXXIX",
    "DCXXX",
    "DCXXXI",
    "DCXXXII",
    "DCXXXIII",
    "DCXXXIV",
    "DCXXXV",
    "DCXXXVI",
    "DCXXXVII",
    "DCXXXVIII",
    "DCXXXIX",
    "DCXL",
    "DCXLI",
    "DCXLII",
    "DCXLIII",
    "DCXLIV",
    "DCXLV",
    "DCXLVI",
    "DCXLVII",
    "DCXLVIII",
    "DCXLIX",
    "DCL",
    "DCLI",
    "DCLII",
    "DCLIII",
    "DCLIV",
    "DCLV",
    "DCLVI",
    "DCLVII",
    "DCLVIII",
    "DCLIX",
    "DCLX",
    "DCLXI",
    "DCLXII",
    "DCLXIII",
    "DCLXIV",
    "DCLXV",
    "DCLXVI",
    "DCLXVII",
    "DCLXVIII",
    "DCLXIX",
    "DCLXX",
    "DCLXXI",
    "DCLXXII",
    "DCLXXIII",
    "DCLXXIV",
    "DCLXXV",
    "DCLXXVI",
    "DCLXXVII",
    "DCLXXVIII",
    "DCLXXIX",
    "DCLXXX",
    "DCLXXXI",
    "DCLXXXII",
    "DCLXXXIII",
    "DCLXXXIV",
    "DCLXXXV",
    "DCLXXXVI",
    "DCLXXXVII",
    "DCLXXXVIII",
    "DCLXXXIX",
    "DCXC",
    "DCXCI",
    "DCXCII",
    "DCXCIII",
    "DCXCIV",
    "DCXCV",
    "DCXCVI",
    "DCXCVII",
    "DCXCVIII",
    "DCXCIX",
    "DCC",
    "DCCI",
    "DCCII",
    "DCCIII",
    "DCCIV",
    "DCCV",
    "DCCVI",
    "DCCVII",
    "DCCVIII",
    "DCCIX",
    "DCCX",
    "DCCXI",
    "DCCXII",
    "DCCXIII",
    "DCCXIV",
    "DCCXV",
    "DCCXVI",
    "DCCXVII",
    "DCCXVIII",
    "DCCXIX",
    "DCCXX",
    "DCCXXI",
    "DCCXXII",
    "DCCXXIII",
    "DCCXXIV",
    "DCCXXV",
    "DCCXXVI",
    "DCCXXVII",
    "DCCXXVIII",
    "DCCXXIX",
    "DCCXXX",
    "DCCXXXI",
    "DCCXXXII",
    "DCCXXXIII",
    "DCCXXXIV",
    "DCCXXXV",
    "DCCXXXVI",
    "DCCXXXVII",
    "DCCXXXVIII",
    "DCCXXXIX",
    "DCCXL",
    "DCCXLI",
    "DCCXLII",
    "DCCXLIII",
    "DCCXLIV",
    "DCCXLV",
    "DCCXLVI",
    "DCCXLVII",
    "DCCXLVIII",
    "DCCXLIX",
    "DCCL",
    "DCCLI",
    "DCCLII",
    "DCCLIII",
    "DCCLIV",
    "DCCLV",
    "DCCLVI",
    "DCCLVII",
    "DCCLVIII",
    "DCCLIX",
    "DCCLX",
    "DCCLXI",
    "DCCLXII",
    "DCCLXIII",
    "DCCLXIV",
    "DCCLXV",
    "DCCLXVI",
    "DCCLXVII",
    "DCCLXVIII",
    "DCCLXIX",
    "DCCLXX",
    "DCCLXXI",
    "DCCLXXII",
    "DCCLXXIII",
    "DCCLXXIV",
    "DCCLXXV",
    "DCCLXXVI",
    "DCCLXXVII",
    "DCCLXXVIII",
    "DCCLXXIX",
    "DCCLXXX",
    "DCCLXXXI",
    "DCCLXXXII",
    "DCCLXXXIII",
    "DCCLXXXIV",
    "DCCLXXXV",
    "DCCLXXXVI",
    "DCCLXXXVII",
    "DCCLXXXVIII",
    "DCCLXXXIX",
    "DCCXC",
    "DCCXCI",
    "DCCXCII",
    "DCCXCIII",
    "DCCXCIV",
    "DCCXCV",
    "DCCXCVI",
    "DCCXCVII",
    "DCCXCVIII",
    "DCCXCIX",
    "DCCC",
    "DCCCI",
    "DCCCII",
    "DCCCIII",
    "DCCCIV",
    "DCCCV",
    "DCCCVI",
    "DCCCVII",
    "DCCCVIII",
    "DCCCIX",
    "DCCCX",
    "DCCCXI",
    "DCCCXII",
    "DCCCXIII",
    "DCCCXIV",
    "DCCCXV",
    "DCCCXVI",
    "DCCCXVII",
    "DCCCXVIII",
    "DCCCXIX",
    "DCCCXX",
    "DCCCXXI",
    "DCCCXXII",
    "DCCCXXIII",
    "DCCCXXIV",
    "DCCCXXV",
    "DCCCXXVI",
    "DCCCXXVII",
    "DCCCXXVIII",
    "DCCCXXIX",
    "DCCCXXX",
    "DCCCXXXI",
    "DCCCXXXII",
    "DCCCXXXIII",
    "DCCCXXXIV",
    "DCCCXXXV",
    "DCCCXXXVI",
    "DCCCXXXVII",
    "DCCCXXXVIII",
    "DCCCXXXIX",
    "DCCCXL",
    "DCCCXLI",
    "DCCCXLII",
    "DCCCXLIII",
    "DCCCXLIV",
    "DCCCXLV",
    "DCCCXLVI",
    "DCCCXLVII",
    "DCCCXLVIII",
    "DCCCXLIX",
    "DCCCL",
    "DCCCLI",
    "DCCCLII",
    "DCCCLIII",
    "DCCCLIV",
    "DCCCLV",
    "DCCCLVI",
    "DCCCLVII",
    "DCCCLVIII",
    "DCCCLIX",
    "DCCCLX",
    "DCCCLXI",
    "DCCCLXII",
    "DCCCLXIII",
    "DCCCLXIV",
    "DCCCLXV",
    "DCCCLXVI",
    "DCCCLXVII",
    "DCCCLXVIII",
    "DCCCLXIX",
    "DCCCLXX",
    "DCCCLXXI",
    "DCCCLXXII",
    "DCCCLXXIII",
    "DCCCLXXIV",
    "DCCCLXXV",
    "DCCCLXXVI",
    "DCCCLXXVII",
    "DCCCLXXVIII",
    "DCCCLXXIX",
    "DCCCLXXX",
    "DCCCLXXXI",
    "DCCCLXXXII",
    "DCCCLXXXIII",
    "DCCCLXXXIV",
    "DCCCLXXXV",
    "DCCCLXXXVI",
    "DCCCLXXXVII",
    "DCCCLXXXVIII",
    "DCCCLXXXIX",
    "DCCCXC",
    "DCCCXCI",
    "DCCCXCII",
    "DCCCXCIII",
    "DCCCXCIV",
    "DCCCXCV",
    "DCCCXCVI",
    "DCCCXCVII",
    "DCCCXCVIII",
    "DCCCXCIX",
    "CM",
    "CMI",
    "CMII",
    "CMIII",
    "CMIV",
    "CMV",
    "CMVI",
    "CMVII",
    "CMVIII",
    "CMIX",
    "CMX",
    "CMXI",
    "CMXII",
    "CMXIII",
    "CMXIV",
    "CMXV",
    "CMXVI",
    "CMXVII",
    "CMXVIII",
    "CMXIX",
    "CMXX",
    "CMXXI",
    "CMXXII",
    "CMXXIII",
    "CMXXIV",
    "CMXXV",
    "CMXXVI",
    "CMXXVII",
    "CMXXVIII",
    "CMXXIX",
    "CMXXX",
    "CMXXXI",
    "CMXXXII",
    "CMXXXIII",
    "CMXXXIV",
    "CMXXXV",
    "CMXXXVI",
    "CMXXXVII",
    "CMXXXVIII",
    "CMXXXIX",
    "CMXL",
    "CMXLI",
    "CMXLII",
    "CMXLIII",
    "CMXLIV",
    "CMXLV",
    "CMXLVI",
    "CMXLVII",
    "CMXLVIII",
    "CMXLIX",
    "CML",
    "CMLI",
    "CMLII",
    "CMLIII",
    "CMLIV",
    "CMLV",
    "CMLVI",
    "CMLVII",
    "CMLVIII",
    "CMLIX",
    "CMLX",
    "CMLXI",
    "CMLXII",
    "CMLXIII",
    "CMLXIV",
    "CMLXV",
    "CMLXVI",
    "CMLXVII",
    "CMLXVIII",
    "CMLXIX",
    "CMLXX",
    "CMLXXI",
    "CMLXXII",
    "CMLXXIII",
    "CMLXXIV",
    "CMLXXV",
    "CMLXXVI",
    "CMLXXVII",
    "CMLXXVIII",
    "CMLXXIX",
    "CMLXXX",
    "CMLXXXI",
    "CMLXXXII",
    "CMLXXXIII",
    "CMLXXXIV",
    "CMLXXXV",
    "CMLXXXVI",
    "CMLXXXVII",
    "CMLXXXVIII",
    "CMLXXXIX",
    "CMXC",
    "CMXCI",
    "CMXCII",
    "CMXCIII",
    "CMXCIV",
    "CMXCV",
    "CMXCVI",
    "CMXCVII",
    "CMXCVIII",
    "CMXCIX",
    "M",
];

function findRomanNum(value)
{
    for(var i = 1;i < ROMAN_NUMS.length;i++)
	if (ROMAN_NUMS[i] == value)
	    return i;
    return -1;
}

function markRomanNumbers(tokens)
{
    for(var i = 0;i < tokens.length;i++)
    {
	var token = tokens[i];
	if (token.type == 'latin')
	{
	    var value = findRomanNum(token.text);
	    if (value >= 0)
	    {
		token.classes.push("romannum");
		tokens[i].isRomanNum = true;
		token.romanNum = value;
	    }
	}
    }
}

function markPreds(tokens)
{
    for(var i in tokens)
    {
	if (tokens[i].type != "cyril")
	    continue;
	var j = 0;
	for(j = 0;j < RU_PREDS.length;j++)
	    if (RU_PREDS[j] == tokens[i].text.toLowerCase())
		break;
	if (j >= RU_PREDS.length)
	    continue;
	tokens[i].classes.push("pred");
	tokens[i].isPred = true;
    }
}

function assignClasses(tokens)
{
    for(var i in tokens)
	tokens[i].classes = [];
    markRomanNumbers(tokens);
    markPreds(tokens);
}

function condSatisfies(cond, token)
{
    if (cond.type != undefined && cond.type != token.type)
	    return false;
    if (cond.text != undefined && cond.text.toLowerCase() != token.text.toLowerCase())
	return false;
    if (cond.class != undefined)
    {
	var i = 0;
	for(var i = 0;i < token.classes.length;i++)
	    if (cond.class == token.classes[i])
		break;
	if (i >= token.classes.length)
	    return false;
    }
    return true;
}

function condsSatisfy(conds, tokens, pos)
{
    for(var i in conds)
	if (!condSatisfies(conds[i], tokens[parseInt(pos) + parseInt(i)]))
	    	    return false;
    return true;
}

function applyRule(rule, tokens)
{
    var conds = rule.conds;
    if (conds.length > tokens.length)
	return [];
    var res = [];
    for(var i = 0;i < tokens.length - conds.length + 1;i++)
	if (condsSatisfy(rule.conds, tokens, i))
    {
	var r = rule.groupFunc(tokens, i, i + rule.conds.length);
	r.posFrom = i;
	r.posTo = i + rule.conds.length;
	res.push(r);
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
	tokens[g.posFrom] = {type: 'group', text: buildGroupText(g)};
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
	tokens.push({type: tokensList[i].type, text: tokensList[i].text});
    assignClasses(tokens);
    var groups = applyRules(tokens);
    groups = resolveGroupConflicts(groups);
    insertGroups(tokens, groups);
    return buildResult(tokens);
})

RULES = [

    //brackets
    {conds: [ punc('(') ],
     groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: ' в круглых скобках '}; }},
    {conds: [ punc(')') ],
     groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: ' закрылась круглая скобка '}; }},
    {conds: [ punc('[') ],
     groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: ' в квадратных скобках '}; }},
    {conds: [ punc(']') ],
     groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: ' закрылась квадратная скобка '}; }},
    {conds: [ punc('{') ],
     groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: ' в фигурных скобках '}; }},
    {conds: [ punc('}') ],
     groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: ' закрылась фигурная скобка '}; }},

    //90-е
    {conds: [ {type: 'num', text: '90'},
	      {type: "punc", text: '-'},
	      {type: "cyril", text: "е"},],
     groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: 'девяностые'}; }},

            //РСПП
    fixed([cyril('РСПП')], 'эрэспэпэ'),

                    //nginx
    fixed([latin('nginx')], 'enginx'),
                        //апл
    fixed([cyril('АПЛ')], 'апээл'),
    //FIXME:анб
                //ГИБДД
    fixed([cyril('ГИБДД')], 'гибэдэдэ'),
        //ВКС
    fixed([cyril('ВКС')], 'вэкаэс'),
    //СССР
    fixed([cyril('СССР')], 'эсэсэсэр'),
        //Макдоналдс
    fixed([cyril('Макдоналдс')], 'макдональдс'),
    //УМВД
    fixed([cyril('УМВД')], 'уэмвэдэ'),
    //РБК
    fixed([cyril('РБК')], 'эрбэк+а'),
        //США
    fixed([cyril('США')], 'сэш+а'),
            //СПГ
    fixed([cyril('СПГ')], 'эспэг+э'),
        //ФСБ
    {conds: [
	cyril('ФСБ')
	],
     groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: 'фээсбэ'}; }},
            //ФСО
    {conds: [
	cyril('ФСО')
	],
     groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: 'фэсэо'}; }},
                //МГУ
    {conds: [
	cyril('МГУ')
	],
     groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: 'эмгэу'}; }},
    //ТГУ
    fixed([ cyril('ТГУ') ], 'тэгэ+у'),
    //ТГПУ
    fixed([ cyril('ТГПУ') ], 'тэгэпэ+у'),
    //ТПУ
    fixed([ cyril('ТПУ') ], 'тэпэ+у'),
    //РЖД
    fixed([ cyril('РЖД') ], 'эржэд+э'),
    //ВТБ
    fixed([cyril('ВТБ')], 'вэтэб+э'),
    //АЗС
    fixed([ cyril('АЗС') ], 'азээс'),
    //ГСС
    fixed([cyril('ГСС')], 'гээс+эс'),
                            //ВКонтакте
    fixed([cyril('ВКонтакте')], 'В контакте'),
    //МФЦ
    fixed([cyril('МФЦ') ], 'эмэфц+э'),
    fixed([latin('Huawei'), SPACE, latin('Corporation')], 'Хуавэй Корпорейшэн'),
    //Deutsche
    fixed([latin('Deutsche')], 'Дойче'),
    fixed([latin('Deutsche'), SPACE, latin('Telekom')], 'Дойче Телеком'),

        //ЦБ
    fixed([cyril('ЦБ')], 'цэб+э'),
    fixed([cyril('ЦБРФ')], 'цэб+ээрэф'),


    //до н. э.
    {conds: [ {class: 'pred', text: 'до'},
	      SPACE,
	      {type: 'cyril', text: 'н'}, {type: 'punc', text: '.'},
	      SPACE,
	      {type: 'cyril', text: 'э'}, {type: 'punc', text: '.'}],
     groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: 'до нашей эры'}; }},
    //н. э.
    {conds: [ 
	cyril('н'),punc('.'),SPACE, cyril('э'), punc('.')
    ],
     groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: 'нашей эры'}; }},

    //FIXME:ст. ч.

    //СК  завёл
    fixed([cyril('СК'), SPACE, cyril('завел')], 'следственный комитет завёл'),

    //род.
    //FIXME:только с последующей полной датой
    {conds: [ 
	cyril('род'), punc('.')
    ],
     groupFunc: function(tokens, posFrom, posTo){ return {textFunc: buildFixedText, text: 'рождение'}; }},


    //см. на стр. n
    {conds: [
	cyril('см'), punc('.'), SPACE, pred('на'), SPACE, cyril('стр'), punc('.'), SPACE, num(null)
    ], 
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom + 8].text, prefix: 'смотрите на странице '};
     }},
    //стр. n
    {conds: [
	cyril('стр'), punc('.'), SPACE, num(null)
    ], 
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom + 3].text, prefix: 'страница '};
     }},

    //-n
    {conds: [
	SPACE, punc('-'), num(null)
    ], 
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom + 2].text, prefix: ' минус '};
     }},

    //$num млрд.
    {conds: [
	punc('$'), num(null), SPACE, cyril('млрд'), punc('.')
],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom + 1].text, suffix: 'миллиардов долларов'};
     }},
        //$num млн.
    {conds: [
	punc('$'), num(null), SPACE, cyril('млн'), punc('.')
],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom + 1].text, suffix: 'миллионов долларов'};
     }},
        //$num млрд
    {conds: [
	punc('$'), num(null), SPACE, cyril('млрд')
],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom + 1].text, suffix: 'миллиардов долларов'};
     }},
        //$num млн
    {conds: [
	punc('$'), num(null), SPACE, cyril('млн')
],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom + 1].text, suffix: 'миллионов долларов'};
     }},
        //num млрд. руб.
    {conds: [
	num(null), SPACE, cyril('млрд'), punc('.'), SPACE, cyril('руб'), punc('.')
],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom].text, suffix: 'миллиардов рублей'};
     }},
        //num млн. руб.
    {conds: [
	num(null), SPACE, cyril('млн'), punc('.'), SPACE, cyril('руб'), punc('.')
],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom].text, suffix: 'миллионов рублей'};
     }},
            //num млрд руб.
    {conds: [
	num(null), SPACE, cyril('млрд'), SPACE, cyril('руб'), punc('.')
],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom].text, suffix: 'миллиардов рублей'};
     }},
        //num млн руб.
    {conds: [
	num(null), SPACE, cyril('млн'), SPACE, cyril('руб'), punc('.')
],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom].text, suffix: 'миллионов рублей'};
     }},

    // (n век)
    {conds: [
	punc('('), {class: "romannum"}, SPACE, cyril('век'), punc(')')
    ], groupFunc: function(tokens, posFrom, posTo){
	return {textFunc: buildNumText, value: tokens[posFrom + 1].romanNum, suffix: ' век '};
    }},
    //в ... в.
    {conds: [
	{class: "pred", text: "в"},
	{type: "space"},
	{class: "romannum"},
	{type: "space"},
	{type: "cyril", text: "в"},
    ],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildCentGroupText, value: tokens[posFrom + 2].romanNum, form: 'ord_prae', prefix: 'в'};
     }},

    // Гл. n
    {conds: [
	cyril('Гл'), punc('.'), SPACE, {class: "romannum"}
    ], groupFunc: function(tokens, posFrom, posTo){
	return {textFunc: buildNumText, value: tokens[posFrom + 3].romanNum, prefix: ' Глава '};
    }},

        // n созыва
    {conds: [
	{class: "romannum"}, SPACE, cyril('созыва')
    ], groupFunc: function(tokens, posFrom, posTo){
	return {textFunc: buildNumText, value: tokens[posFrom].romanNum, suffix: ' созыва '};
    }},


    //лат. число
    /*
    {conds: [
	{class: "romannum"}
    ], groupFunc: function(tokens, posFrom, posTo){
	return {textFunc: buildNumText, value: tokens[posFrom].romanNum, suffix: ' римскими '};
    }},
*/

    // Глава n
    {conds: [
	cyril('Глава'), SPACE, {class: "romannum"}
    ], groupFunc: function(tokens, posFrom, posTo){
	return {textFunc: buildNumText, value: tokens[posFrom + 2].romanNum, prefix: ' Глава '};
    }},

    // n %
    {conds: [
	num(null), SPACE, punc('%')],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom].text, suffix: ' процентов'};
     }},
//n%
        {conds: [
	num(null), punc('%')],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom].text, suffix: ' процентов'};
     }},


    //на n%
    {conds: [
	pred('на'),SPACE, num(null), punc('%')
],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom + 2].text, prefix: 'на ', suffix: ' процентов'};
     }},

        //на n %
    {conds: [
	pred('на'),SPACE, num(null), SPACE, punc('%')
],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildNumText, value: tokens[posFrom + 2].text, prefix: 'на ', suffix: ' процентов'};
     }},


    //в СК сообщили
    {conds: [
	pred('в'), SPACE, cyril('СК'), SPACE, cyril('сообщили')
    ],
     groupFunc: function(tokens, posFrom, posTo){
	 return {textFunc: buildFixedText, text: 'в следственном комитете сообщили'};
     }},
];

function latinSubst(lat, cyr)
{
    RULES.push({conds: [{type: CYRIL}, SPACE, {type: LATIN, text: lat}], groupFunc: function(tokens, posFrom, posTo){return {textFunc: buildFixedText, text: tokens[posFrom].text + ' ' + cyr};}});
    RULES.push({conds: [{type: LATIN, text: lat}, SPACE, {type: CYRIL}], groupFunc: function(tokens, posFrom, posTo){return {textFunc: buildFixedText, text: cyr + ' ' + tokens[posFrom + 2].text};}});
}
function latinSubstMult(c, cyr)
{
    var cond = [{type: CYRIL}, SPACE];
    for(var i = 0;i < c.length;i++)
	cond.push(c[i]);
    RULES.push({conds: cond, groupFunc: function(tokens, posFrom, posTo){return {textFunc: buildFixedText, text: tokens[posFrom].text + ' ' + cyr};}});
    cond = c;
    cond.push({type: CYRIL});
    cond.push(SPACE);
    RULES.push({conds: cond, groupFunc: function(tokens, posFrom, posTo){return {textFunc: buildFixedText, text: cyr + ' ' + tokens[posFrom + c.length + 1].text};}});
}

latinSubst('Alphabet', 'Альфабэт');
latinSubst('Amazon', 'Амазон');
latinSubst('AMD', 'аэмд+и');
latinSubst('Airbus', 'Эйрбас');
latinSubst('Android', 'Андроид');
latinSubst('Apple', 'Эппл');
latinSubst('BigData', 'Бигдата');
latinSubst('Bloomberg', 'Блумберг');
latinSubst('Boeing', 'Боинг');
latinSubst('Chrome', 'Хром');
latinSubst('CNEWS', 'синьюз');
latinSubst('Doom', 'дум');
latinSubst('Facebook', 'Фэйсбук');
latinSubst('Forbes', 'Форбс');
latinSubst('Google', 'Гугл');
latinSubst('Grammy', 'Грэмми');
latinSubst('Huawei', 'Хуавэй');
latinSubst('Intel', 'Интл');
latinSubst('IPO', 'айпи+о');
latinSubst('instagram', 'Инстаграм');
latinSubst('iOS', 'аи+ос');
latinSubst('iPhone', 'айфон');
latinSubst('iPad', 'айпад');
latinSubst('KPI', 'кипиай');
latinSubst('LibreOffice', 'Либреоффис');
latinSubst('Linux', 'Линукс');
latinSubst('luwrain', 'лур+эйн');
latinSubst('Microsoft', 'Майкрософт');
latinSubst('Mozilla', 'Мозилла');
latinSubst('Rambler', 'Рамблер');
latinSubst('Snickers', 'Сникерс');
latinSubst('Samsung', 'Самсунг');
latinSubst('TAdviser', 'Тадвайзер');
latinSubst('Telegram', 'Телеграм');
latinSubst('Tesla', 'Тесла');
latinSubst('Time', "Тайм");
latinSubst('Times', "Таймс");
latinSubst('Twitter', 'Твиттер');
latinSubst('uber', 'Убер');
latinSubst('YouTube', 'Ютуб');
latinSubst('WSJ', 'Уолл стрит дж+орнал');
latinSubst('Xiaomi', 'Сиаоми');

latinSubstMult([latin('Coca'), punc('-'), latin('Кола')], 'Кока кола');
latinSubstMult([latin('Apple'), SPACE, latin('Music')], 'Эппл Мьюзик');
latinSubstMult([latin('Google'), SPACE, latin('Chrome')], 'Гугл Хром');
latinSubstMult([latin('Financial'), SPACE, latin('Times')], 'Файнэншл Таймс');
latinSubstMult([latin('Goldman'), SPACE, latin('Sachs')], 'Голдман Сакс');
latinSubstMult([latin('Louis'), SPACE, latin('Vuitton')], 'Луи Виттон');
//Mail.ru group
latinSubstMult([latin('Mail'), punc('.'), latin('ru')], 'мэйлру');
latinSubstMult([latin('Mail'), punc('.'), latin('ru'), SPACE, latin('Group')], 'мэйлру груп');
latinSubstMult([latin('Rambler'), SPACE, latin('Group')], 'Рамблер груп');
latinSubstMult([latin('wi'), punc('-'), latin('fi')], 'вайфай');

//Creating regex patterns
for(var i = 0;i < RULES.length;i++)
    for(var j = 0;j < RULES[i].conds.length;j++)
{
    var c = RULES[i].conds[j];
    if (c.text == null || c.text == undefined)
	continue;
    if (c.type === 'punc')
	continue;
    c.patt = java.util.regex.Pattern.compile(c.text);
}
