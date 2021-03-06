import * as React from "react";
import { Component, Children } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import AppBar from 'material-ui/AppBar';
import {AppFrameState,AppFrameActionDispatcher} from './AppFrameReducer';
import ImageDefinition from './icons/ImageDefinition';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

import MyIntlLib from './MyIntlLib';
import MyIntl from './MyIntl';

import ja_JP from './lang/ja';
import en_US from './lang/en';
import * as en from 'react-intl/locale-data/en';
import * as ja from 'react-intl/locale-data/ja';
import {addLocaleData,IntlProvider,FormattedMessage} from 'react-intl';
import check from "material-ui/svg-icons/navigation/check";
addLocaleData([...en,...ja]);

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
      <IntlProvider locale={this.props.language} messages={this.props.localizedMessages}>
        <div>
          <ImageDefinition/>
            <AppBar
                title={MyIntlLib.format("Common_Title")}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonTouchTap={()=>this.props.actions.changeDrawerState(true)}
                />
          {this.props.children}
          <Drawer 
            open={this.props.drawOpened} 
            docked={false}
            onRequestChange={(open) => this.props.actions.changeDrawerState(open)}>
            <MenuItem onClick={()=>{this.props.actions.changeDrawerState(false)}}><MyIntl id="AppFrame_ContinueGame"/></MenuItem>
            <MenuItem onClick={()=>{this.props.actions.backToStart()}}><MyIntl id="AppFrame_BackToStart"/></MenuItem>
            <MenuItem onClick={()=>{this.props.actions.openSettings()}}><MyIntl id="AppFrame_Settings"/></MenuItem>
            <MenuItem onClick={()=>{this.props.actions.toggleDebugMode()}} checked={this.props.debugMode}><MyIntl id="AppFrame_DebugMode"/></MenuItem>
          </Drawer>
          <Dialog
            title={MyIntlLib.format("Common_Settings")}
            actions={[(
              <FlatButton 
                label={MyIntlLib.format("Common_Cancel")}
                primary={false}
                onClick={()=>{this.props.actions.settingsCancel()}}/>
              ),(
              <FlatButton 
                label={MyIntlLib.format("Common_Ok")}
                primary={true}
                onClick={()=>{this.props.actions.settingsOk()}}/>
                )]}
            modal={true}
            open={this.props.settingsDialogOpened}
          >
          <p>げんごをきりかえるよ / Select lnaguage</p>
          <SelectField
            floatingLabelText="Language"
            value={this.props.settingsSelectedLanguage}
            onChange={(e: any, index: number, menuItemValue: string)=>this.props.actions.changeSettingsSelectedLanguage(menuItemValue)}
          >
            <MenuItem value={"ja"} primaryText="にほんご" />
            <MenuItem value={"en"} primaryText="English" />
          </SelectField>
        </Dialog>
        <Dialog
            title={MyIntlLib.format("Common_Password")}
            actions={[(
              <FlatButton 
                label={MyIntlLib.format("Common_Cancel")}
                primary={false}
                onClick={()=>{this.props.actions.passwordDialogCancel()}}/>
              ),(
              <FlatButton 
                label={MyIntlLib.format("Common_Ok")}
                primary={true}
                onClick={()=>{this.props.actions.passwordDialogOk()}}/>
                )]}
            modal={true}
            open={this.props.passwordDialogOpened}
          >
          <p><MyIntl id="AppFrame_PasswordForDebug"/></p>
          <TextField
            hintText={MyIntlLib.format("Common_Password")}
            floatingLabelText={MyIntlLib.format("Common_Password")}
            type="password"
            value={this.props.passwordForDebug}
            onChange={(e: React.FormEvent<{}>, newValue: string)=>{this.props.actions.changePasswordForDebug(newValue)}}
          />          
        </Dialog>
        </div>
        </IntlProvider>
      </MuiThemeProvider>
    );
  }

}

export default AppFrame;
