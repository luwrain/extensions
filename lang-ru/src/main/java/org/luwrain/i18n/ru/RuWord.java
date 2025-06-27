/*
   Copyright 2012-2024 Michael Pozhidaev <msp@luwrain.org>

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

package org.luwrain.i18n.ru;

import java.util.*;

import com.google.gson.annotations.*;

import org.luwrain.core.*;
import org.luwrain.nlp.*;
import org.luwrain.nlp.ru.*;

public final class RuWord implements Word
{
    @SerializedName("pos")
    private POS pos = null;

    @SerializedName("lemma")
    private String lemma = null;

    @SerializedName("gram")
    private String gramBaseStr = null;

    @SerializedName("forms")
    private List<Form> forms = null;

    private transient GramAttr gramBase = null;

    public void init()
    {
	if (lemma != null)
	    lemma = lemma.toUpperCase();
	if (gramBaseStr != null)
	    gramBase = GramAttr.fromString(gramBaseStr); else
	    gramBase = new GramAttr(null, null, null);
	if (forms != null)
	    for(Form f: forms)
		f.init(gramBase);
    }

    @Override public POS getPos()
    {
	return pos;
    }

    public String getLemma()
    {
	return this.lemma != null?this.lemma:"";
    }

    public GramAttr getGram()
    {
	return this.gramBase;
    }

    public Form[] getForms()
    {
	if (forms == null)
	    return new Form[0];
	return forms.toArray(new Form[forms.size()]);
    }

    static public final class Form
    {
	@SerializedName("gram")
	private String gramStr = null;
	@SerializedName("word")
	private String word = null;
	private transient GramAttr gram = null;
	void init(GramAttr gramBase)
	{
	    NullCheck.notNull(gramBase, "gramBase");
	    if (word != null)
		word = word.toUpperCase();
	    if (gramStr != null)
		gram = new GramAttr(gramBase, GramAttr.fromString(gramStr)); else
		gram = gramBase;
	}
	public GramAttr getGram()
	{
	    return gram;
	}
	public String getWord()
	{
	    return word;
	}
    }
}
