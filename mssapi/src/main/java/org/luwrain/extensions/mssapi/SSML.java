/*
   Copyright 2012-2025 Michael Pozhidaev <msp@luwrain.org>
   Copyright 2015-2016 Roman Volovodov <gr.rPman@gmail.com>

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
package org.luwrain.extensions.mssapi;

import org.apache.commons.lang3.StringEscapeUtils;

public class SSML
{
	/** convert text to ssml xml with upper pitch control for each upper case char
	 * @param pitch pitch increase in % */
	public static String upperCasePitchControl(String text,int pitch)
	{
		String xml=StringEscapeUtils.escapeXml11(text);
		StringBuilder sb=new StringBuilder(xml.length());
		sb.append("<?xml version='1.0' encoding='utf-8'?><speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='ru-RU'><prosody pitch='+0%'>");
		StringBuilder sbul=new StringBuilder(xml.length());
		Boolean lasupper=null;
		for(char c:xml.toCharArray())
		{
			if(lasupper==null) lasupper=Character.isUpperCase(c);
			if(lasupper!=Character.isUpperCase(c))
			{
				if(lasupper)
				{
					sb.append("<prosody pitch='");
					sb.append(String.format("%+d",pitch));
					sb.append("%'>");
					sb.append(sbul);
					sb.append("</prosody>");
				}
				else
				{
					sb.append(sbul);
				}
				sbul.delete(0,sbul.length());
			}
			lasupper=Character.isUpperCase(c);
			sbul.append(c);
		}
		if(lasupper)
		{
			sb.append("<prosody pitch='");
			sb.append(String.format("%+d",pitch));
			sb.append("%'>");
			sb.append(sbul);
			sb.append("</prosody>");
		}
		else
		{
			sb.append(sbul);
		}
		sb.append("</prosody></speak>");
		return sb.toString();
	}
}
