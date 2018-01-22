import * as React from "react";
import { Component, Children } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import AppBar from 'material-ui/AppBar';
import {AppFrameState,AppFrameActionDispatcher} from './AppFrameReducer';
import ImageDefinition from './icons/ImageDefinition';

import ja_JP from './lang/ja';
import en_US from './lang/en';
import * as en from 'react-intl/locale-data/en';
import * as ja from 'react-intl/locale-data/ja';
import {addLocaleData,IntlProvider,FormattedMessage} from 'react-intl';
addLocaleData([...en,...ja]);
const intlProvider = new IntlProvider({ locale:"ja",messages:ja_JP }, {});
const { intl } = intlProvider.getChildContext();

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();



export interface AppFrameProps extends AppFrameState
{
  actions?:AppFrameActionDispatcher;
//   children?:JSX.Element;
//   history?:H.History;
}

class AppFrame extends Component<AppFrameProps> {
  constructor(props: any) {
    super(props);
  }

  getLanguage():string[]
  {
      // 最優先の言語だけ取得
        var language = (window.navigator.languages && window.navigator.languages[0]) ||
        window.navigator.language ||
        (window.navigator as any).userLanguage ||
        (window.navigator as any).browserLanguage;

        // クライアント側で受け付けている言語リストを取得
        var languages = window.navigator.languages || [
        window.navigator.language||
        (window.navigator as any).userLanguage ||
        (window.navigator as any).browserLanguage
        ];
        return languages;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <IntlProvider locale={'ja'} messages={ja_JP}>
        <div>
          <ImageDefinition/>
            <AppBar
                title={intl.formatMessage({id:"Common_Title", defaultMessage:"Fake Schnappt Hubi"})}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
          {this.props.children}
        </div>
        </IntlProvider>
      </MuiThemeProvider>
    );
  }

}

export default AppFrame;
