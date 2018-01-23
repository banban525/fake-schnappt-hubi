import ja_JP from './lang/ja';
import en_US from './lang/en';
import {addLocaleData,IntlProvider,FormattedMessage} from 'react-intl';

import * as en from 'react-intl/locale-data/en';
import * as ja from 'react-intl/locale-data/ja';
addLocaleData([...en,...ja]);

export class MyIntlLib
{
    intl:ReactIntl.InjectedIntl;
    defaultIntl:ReactIntl.InjectedIntl;

    constructor()
    {
        const intlProvider = new IntlProvider({ locale:"ja",messages:ja_JP }, {});
        this.intl = intlProvider.getChildContext().intl;

        const defaultIntlProvider = new IntlProvider({ locale:"en",messages:en_US }, {});
        this.defaultIntl = defaultIntlProvider.getChildContext().intl;
    }

    changeLocale(locale:string){
        var props:{locale:string, messages:any};
        if(locale === "ja")
        {
            props = { locale:"ja",messages:ja_JP };
        }
        else if(locale === "en")
        {
            props = { locale:"en",messages:en_US };
        }
        else
        {
            return;
        }

        const intlProvider = new IntlProvider(props, {});
        var temp = intlProvider.getChildContext();
        this.intl = temp.intl;
    }
    format(messageId:string):string {
        var defaultMessage = this.defaultMessage(messageId);
        return this.intl.formatMessage({id:messageId, defaultMessage:defaultMessage})
    }
    defaultMessage(messageId:string):string{
        return this.defaultIntl.formatMessage({id:messageId})
    }
}

export default new MyIntlLib();
