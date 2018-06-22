/*
   Copyright 2012-2018 Michael Pozhidaev <michael.pozhidaev@gmail.com>

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

package org.luwrain.extensions.emacspeak;

import org.luwrain.core.*;
import org.luwrain.core.events.*;
import org.luwrain.controls.*;
import org.luwrain.cpanel.*;

class SettingsForm extends FormArea implements SectionArea
{
    private ControlPanel controlPanel;
    private Luwrain luwrain;
    private Settings settings;
    private Strings strings;

    SettingsForm(ControlPanel controlPanel, Strings strings, String path)
    {
	super(new DefaultControlEnvironment(controlPanel.getCoreInterface()), strings.formName());
	this.controlPanel = controlPanel;
	this.luwrain = controlPanel.getCoreInterface();
	this.settings = Settings.create (luwrain.getRegistry(), path);
	this.strings = strings;
	fillForm();
    }

    private void fillForm()
    {
	addEdit("name", strings.formChannelName(), settings.getName(""));
    }

    @Override public boolean onInputEvent(KeyboardEvent event)
    {
	NullCheck.notNull(event, "event");
	if (controlPanel.onInputEvent(event))
	    return true;
	return super.onInputEvent(event);
    }

    @Override public boolean onSystemEvent(EnvironmentEvent event)
    {
	NullCheck.notNull(event, "event");
	if (controlPanel.onSystemEvent(event))
	    return true;
	return super.onSystemEvent(event);
    }

    @Override public boolean saveSectionData()
    {
	return true;
    }

    static SettingsForm create(ControlPanel controlPanel, String path)
    {
	NullCheck.notNull(controlPanel , "controlPanel");
	NullCheck.notNull(path, "path");
	final Strings strings = (Strings)controlPanel.getCoreInterface().i18n().getStrings(Strings.NAME);
	return new SettingsForm(controlPanel, strings, path);
    }
}
