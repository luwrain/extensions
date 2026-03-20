// SPDX-License-Identifier: BUSL-1.1
// Copyright 2012-2026 Michael Pozhidaev <msp@luwrain.org>

package org.luwrain.i18n.ru;

class NumberUtil
{
    public static String chooseNumberDependentForm(int num,
						   String form1,
						   String form2,
String form3)
    {
	int k = num;
	if (k < 0)
	    k *= -1;
	k = k % 100;
	if (k >= 10 && k <= 20)
	    return form3;
	int kk = k % 10;
	if (kk == 1)
	    return form1;
	if (kk >= 2 && kk <= 4)
	    return form2;
	return form3;
    }
}
