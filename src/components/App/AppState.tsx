import React from "react"

import { INavLink } from "office-ui-fabric-react"
import { NavLinkProps, Route } from "react-router-dom"
import { INavPage } from '@src/components/Nav.types';

interface ICustomNav extends INavPage{
  subPage?: INavPage[]
}

export interface IAppState {
  appTitle: string
  version: string
  pages: ICustomNav[]
}

export function getSubPageRoute(key: string) {
  let subPageRoute: any = []

  AppState.pages.forEach((page: any, pageIndex: number) => {
    if(page.subPage && page.key == key){
      page.subPage.forEach((subRoute: any, pageIndex: number) => {
        subPageRoute.push(
          <Route
            exact={subRoute.isExactPath}
            key={subRoute.key}
            path={subRoute.url}
            component={subRoute.component}
          />
        )
      })
    }
  })

  return subPageRoute
}

export const AppState: IAppState = {
  appTitle: "flex-io",
  version: "1.0.0.0",
  pages: [
    {
      key: "",
      name: "Dashboard",
      title: "Dashboard",
      url: "/",
      isExactPath: true,
      component: require<any>("../../pages/dashboard").Dashboard,
    },
    {
      name: "Personal",
      title: "no-select",
      key: "personal",
      url: "/personal",
      isExpanded: true,
      links: [
        {
          key: "task",
          name: "Task",
          title: "Task",
          url: "/task",
          component: require<any>("../../pages/task").TaskPage,

        },
      ],
    },
    {
      key: "/projects",
      name: "Projects",
      title: "Projects",
      icon: "ProjectCollection",
      url: "/project",
      isExactPath: true,
      component: require<any>("../../pages/project").ProjectPage,
    },
    {
      key: "/clients",
      name: "Clients",
      title: "Clients",
      icon: "WorkforceManagement",
      url: "/client",
      isExactPath: true,
      component: require<any>("../../pages/client").ClientPage,
    },
    {
      key: "/calendar",
      name: "Calendar",
      title: "no-select",
      // icon: "Calendar",
      url: "/calendar",
      // component: require<any>("../../pages/client").ClientViewPage,
      isExpanded: true,
      links: [
        {
          key: "/calendar/day",
          name: "Day",
          title: "Day",
          icon: "CalendarDay",
          url: "/calendar/day",
          component: require<any>("../../pages/calendar/DayCalendar").DayCalendarPage,
          'Test': 'test'
        },
        {
          key: "/calendar/week",
          name: "Week",
          title: "Week",
          icon: "CalendarWeek",
          url: "/calendar/week",
          component: require<any>("../../pages/calendar/WeekCalendar").WeekCalendarPage,
        },
        {
          key: "/calendar/month",
          name: "Month",
          title: "Month",
          icon: "Calendar",
          url: "/calendar/month",
          component: require<any>("../../pages/calendar/MonthCalendar").MonthCalendarPage,
        },
      ],
    },
  ],
}
