import React from 'react';
import {
  CssBaseline,
  Container,
  // Box,
  Typography,
  Button,
  Hidden,
} from '@material-ui/core';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { Language, Menu } from '@material-ui/icons';

import NavBar from './components/NavBar';
import NavHotItemCard from './components/NavHotItemCard';
import NavItemCard from './components/NavItemCard';
import Footer from './components/Footer';
import Box from './components/Box';

import { getDefaultLanguage } from './helper';

import Resource from './resource.json'
import TagLists from './tagList.json'

import './App.css';
import BoxStyles from './components/Box.module.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#16ff99',
      contrastText: '#000',
    },
    dark: {
      main: '#000',
    }
  },
});

const translations = {
  zh: {
    subTitle: 'Flow 生态资源导航',
    more: '一起发现更多新产品',
    submit: '提　交',
  },
  en: {
    subTitle: 'A Portal to Flow Ecosystem',
    more: 'Discover more new products',
    submit: 'Submit',
  }
}

class App extends React.Component {

  state = {
    tagList: [],
    navList: [],

    language: getDefaultLanguage(),
    drawerVisible: false,
    footerVisible: false,
  }

  componentDidMount() {
    // this.initPageLanguage();
    this.fetchTagList();
    this.fetchNavList();
  }

  fetchTagList = async (navList) => {
    // const res = await get('/tagList.json');
    // const res = await get(`${jsonHost}/main/tagList.json`);
    // if (res && (res || []).length) {
    //   this.setState({
    //     tagList: res,
    //   });
    // }
    this.setState({
      tagList: TagLists
    })
  }

  fetchNavList = async () => {
    // const res = await get('/resource.json');
    // let startTime = new Date().getTime();
    // const res = await get(`${jsonHost}/main/resource.json`);
    // if (res && (res || []).length) {
    //   // console.log('fetch resource times:', new Date().getTime() - startTime);
    //   this.setState({
    //     navList: res,
    //     footerVisible: true,
    //   });
    // }
    this.setState({
      navList: Resource,
      footerVisible: true,
    })
  }

  translate = (key) => {
    const { language } = this.state;
    return translations[language][key];
  }

  render() {

    const {
      navList,
      tagList,
      footerVisible,
      language,

      drawerVisible,
    } = this.state;

    const t = this.translate;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            className={BoxStyles.header}>
            <Hidden lgUp>
              <Box
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  this.setState({
                    drawerVisible: true,
                  });
                }}>
                <Menu />
              </Box>
            </Hidden>
            <Box flex="1" />
            <Button
              disableElevation={true}
              variant="outlined"
              onClick={() => {
                const lng = language === 'zh' ? 'en' : 'zh';
                window.localStorage.setItem('i18nextLng', lng);
                document.cookie = `i18next=${lng};path=/;domain=.flowfans.org`;
                this.setState({ language: lng });
              }}
              size="small"
              startIcon={<Language />}
              className="languageBtn"
              style={{ textTransform: 'none' }}>
              <Box fontWeight="400" className="languageBtn_text">
                {language === "zh" ? 'English' : '中文'}
              </Box>
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            className={BoxStyles.header_title}>
            <Box className={BoxStyles.header_logo}>
              <p style={{ fontSize: '30px', lineHeight: '30px', fontWeight: 700 }}>FlowFans.org</p>
            </Box>
            <Box>
              <Typography color="textSecondary">
                -- {t('subTitle')} --
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row">
            <NavBar
              tagList={tagList}
              language={language}
              key={`NavBar-${(tagList || []).length}`}
              drawerVisible={drawerVisible}
              onClose={() => {
                this.setState({ drawerVisible: false });
              }}
            />
            <Box flex="1" />
            <Box className="tagContent" key={(navList || []).length}>
              <NavHotItemCard
                navList={navList}
                tagList={tagList}
                language={language}
              />
              <NavItemCard
                navList={navList}
                tagList={tagList}
                language={language}
              />
            </Box>
            <Hidden lgUp>
              <Box flex="1" />
            </Hidden>
          </Box>
        </Container>
        <Footer
          footerVisible={footerVisible}
          t={t}
        />
      </ThemeProvider>
    );

  }

}

export default App;
