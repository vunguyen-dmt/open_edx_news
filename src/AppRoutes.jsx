import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import {
  AuthenticatedPageRoute,
  PageRoute,
} from '@edx/frontend-platform/react';
import NotFoundPage from './components/NotFoundPage';
import NewsDetails from './components/NewsDetails/NewsDetails';
import NewsList from './components/NewList/NewsList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const AppRoutes = () => (
    <BrowserRouter>
      <Switch>
            <Route exact path="/news" component={NewsList} />
            <Route path="news/:slug" component={NewsDetails} />
            <Route path="/notfound" component={NotFoundPage} />
            <Route path="*" component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);

export default AppRoutes;