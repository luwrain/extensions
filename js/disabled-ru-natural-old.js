

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
        //РВК
    fixed([cyril('РВК')], 'эрвэк+а'),
    //ПК
    fixed([cyril('ПК')], 'пэк+а'),
    //субд
            fixed([cyril('СУБД')], 'субэд+э'),
        //США
    fixed([cyril('США')], 'сэш+а'),
            //СПГ
    fixed([cyril('СПГ')], 'эспэг+э'),
    //ГК
        fixed([cyril('ГК')], 'г+эка'),
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



//b2b
//b2c
//1с


latinSubstMult([num('5'), latin('G')], 'пять жи');
latinSubstMult([latin('Big'), SPACE, latin('data')], 'биг дэйта');

latinSubstMult([latin('Apple'), SPACE, latin('Music')], 'Эппл Мьюзик');


latinSubstMult([latin('Goldman'), SPACE, latin('Sachs')], 'Голдман Сакс');
latinSubstMult([latin('Louis'), SPACE, latin('Vuitton')], 'Луи Виттон');
//Mail.ru group
latinSubstMult([latin('Mail'), punc('.'), latin('ru')], 'мэйлру');
latinSubstMult([latin('Mail'), punc('.'), latin('ru'), SPACE, latin('Group')], 'мэйлру груп');
latinSubstMult([latin('Microsoft'), SPACE, latin('Office')], 'Майкрософт Офис');
latinSubstMult([latin('Microsoft'), SPACE, latin('Windows')], 'Майкрософт Винд+оус');
latinSubstMult([latin('Rambler'), SPACE, latin('Group')], 'Рамблер груп');
latinSubstMult([latin('Sukhoi'), SPACE, latin('SuperJet')], 'Сухой Суперджет');
latinSubstMult([latin('Tax'), SPACE, latin('free')], 'такс фри');
latinSubstMult([latin('Tele'), num('2')], 'Теле два');
latinSubstMult([latin('wi'), punc('-'), latin('fi')], 'вайфай');
