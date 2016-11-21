/* Copyright (C) 2013  Olga Yakovleva <yakovleva.o.v@gmail.com> */

/* This program is free software: you can redistribute it and/or modify */
/* it under the terms of the GNU Lesser General Public License as published by */
/* the Free Software Foundation, either version 3 of the License, or */
/* (at your option) any later version. */

/* This program is distributed in the hope that it will be useful, */
/* but WITHOUT ANY WARRANTY; without even the implied warranty of */
/* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the */
/* GNU Lesser General Public License for more details. */

/* You should have received a copy of the GNU Lesser General Public License */
/* along with this program.  If not, see <http://www.gnu.org/licenses/>. */

package com.github.olga_yakovleva.rhvoice;

public final class LanguageInfo
{
    private String name=null;
    private String alpha2_code=null;
    private String alpha3_code=null;
    private String alpha2_country_code=null;
    private String alpha3_country_code=null;

    void setName(String name)
    {
        this.name=name;
    }

    public String getName()
    {
        return name;
    }

    void setAlpha2Code(String code)
    {
        alpha2_code=code;
    }

    public String getAlpha2Code()
    {
        return alpha2_code;
    }

    void setAlpha3Code(String code)
    {
        alpha3_code=code;
    }

    public String getAlpha3Code()
    {
        return alpha3_code;
    }

    void setAlpha2CountryCode(String code)
    {
        alpha2_country_code=code;
    }

    public String getAlpha2CountryCode()
    {
        return alpha2_country_code;
    }

    void setAlpha3CountryCode(String code)
    {
        alpha3_country_code=code;
    }

    public String getAlpha3CountryCode()
    {
        return alpha3_country_code;
    }
}
