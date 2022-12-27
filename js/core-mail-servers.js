/*
   Copyright 2019-2022 Michael Pozhidaev <msp@luwrain.org>

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

const SERVERS = [
    {suffixes: ['@yandex.ru', '@yandex.com'],
     smtp: { host: 'smtp.yandex.ru', port: 587, ssl: false, tls: true},
     pop3: { host: 'pop3.yandex.ru', port: 995, ssl: true, tls: false}
    },

    {suffixes: ['@gmail.com'],
     smtp: {
	 host: 'smtp.gmail.com',
	 port: 587,
	 ssl: false,
	 tls: true}
    },

    {suffixes: ['@mail.ru'],
     smtp: {
	 host: 'smtp.mail.ru',
	 port: 587,
	 ssl: false,
	 tls: true}
    },

    {suffixes: ['@rambler.ru'],
     smtp: {
	 host: 'smtp.rambler.ru',
	 port: 465,
	 ssl: true,
	 tls: false}
    }]

Luwrain.addHook("luwrain.mail.servers", (addr)=>{
    for(s of SERVERS) {
	var found = false;
	for(j of s.suffixes)
	    if (addr.trim().toLowerCase().endsWith(j.trim().toLowerCase()))
		return s;
    }
    return null;
})
