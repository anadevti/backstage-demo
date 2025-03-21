import React, { PropsWithChildren } from 'react';
import { makeStyles } from '@material-ui/core';
import ExtensionIcon from '@material-ui/icons/Extension';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';

import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
  Link,
} from '@backstage/core-components';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { MyGroupsSidebarItem } from '@backstage/plugin-org';
import { useLocation } from 'react-router-dom';
import WhatshotTwoToneIcon from '@mui/icons-material/WhatshotTwoTone';

// Importação do componente Notifications
import { Notifications } from '../notifications/notifications';

const useSidebarLogoStyles = makeStyles({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  },
});

const SidebarLogo = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      <Link to="/" underline="none" className={classes.link} aria-label="Home">
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};

export const Root = ({ children }: PropsWithChildren<{}>) => {
  const location = useLocation();

  return (
    <SidebarPage>
      <Sidebar>
        <SidebarLogo />
        <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
        <SidebarGroup label="Deploy" icon={<SearchIcon />} to="/should-i-deploy"></SidebarGroup>
          <SidebarSearchModal />
        </SidebarGroup>
        <SidebarDivider />
        <SidebarGroup label="Menu" icon={<MenuIcon />}>
          {/* Global nav, not org-specific */}
          <SidebarItem icon={HomeTwoToneIcon} to="catalog" text="Home" />
          <MyGroupsSidebarItem
            singularTitle="My Group"
            pluralTitle="My Groups"
            icon={GroupAddTwoToneIcon}
          />
          <SidebarItem icon={ExtensionIcon} to="api-docs" text="APIs" />
          <SidebarItem icon={ArticleTwoToneIcon} to="docs" text="Docs" />
          <SidebarItem icon={AddCircleOutlineIcon} to="create" text="Create" />
          <SidebarItem icon={AppRegistrationIcon} to="catalog-import" text="Register" />
          <SidebarItem icon={WhatshotTwoToneIcon} to="should-i-deploy" text="Deploy Today?" />
          
          <SidebarItem
            icon={NotificationsActiveTwoToneIcon}
            to="notifications"
            text="Notifications"
          />
          {/* End global nav */}
          <SidebarDivider />
          <SidebarScrollWrapper>
            {/* Items in this group will be scrollable if they run out of space */}
          </SidebarScrollWrapper>
        </SidebarGroup>
        <SidebarSpace />
        <SidebarDivider />
        <SidebarGroup
          label="Settings"
          icon={<UserSettingsSignInAvatar />}
          to="/settings"
        >
          <SidebarSettings />
        </SidebarGroup>
      </Sidebar>
      {/* Renderiza o componente Notifications se a rota for /notifications */}
      {location.pathname === '/notifications' ? <Notifications /> : children}
    </SidebarPage>
  );
};
