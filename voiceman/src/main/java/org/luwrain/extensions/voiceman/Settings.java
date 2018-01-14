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

package org.luwrain.extensions.voiceman;

import org.luwrain.core.*;

interface Settings
{
    String getHost(String defValue);
    void setHost(String value);
    int getPort(int defValue);
    void setPort(int value);
    String getName(String defValue);
    void setName(String value);
    boolean getDefault(boolean defValue);
    void setDefault(boolean value);

    static Settings create(Registry registry, String path)
    {
	NullCheck.notNull(registry, "registry");
	NullCheck.notNull(path, "path");
	return RegistryProxy.create(registry, path, Settings.class);
    }
}
